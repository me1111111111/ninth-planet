// js/moon3d.js — 3D helpers built on three.js.
// Loads the Moon model (assets/models/moon.glb), adds glowing landing-site markers,
// and provides a small viewer that handles sizing, animation and cleanup.

import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export const MOON_RADIUS = 1;
const MOON_URL = 'assets/models/moon.glb';
const deg = THREE.MathUtils.degToRad;

// ---------- loading the Moon model (once, shared by every viewer) ----------
let modelPromise = null;
function loadMoonModel() {
  modelPromise ??= new GLTFLoader().loadAsync(MOON_URL).catch((err) => {
    console.warn('Moon model could not be loaded. A plain sphere is shown instead.', err);
    return null;
  });
  return modelPromise;
}

// Rotation that turns the Moon.glb surface so the texture lines up with the
// latitude/longitude used for pins. Measured from the model's own UV coordinates
// (fit error 0.0007, checked against the dark maria in the texture).
const MOON_ORIENTATION = new THREE.Quaternion(-0.242108, -0.476082, 0.143581, 0.833135);

// Orient, scale and centre the imported model so it fits a sphere of radius MOON_RADIUS
function fitToMoon(scene) {
  const holder = new THREE.Group();
  holder.quaternion.copy(MOON_ORIENTATION);
  holder.add(scene);
  holder.updateMatrixWorld(true);
  const box = new THREE.Box3().setFromObject(holder);
  const size = box.getSize(new THREE.Vector3());
  const center = box.getCenter(new THREE.Vector3());
  const s = (2 * MOON_RADIUS) / Math.max(size.x, size.y, size.z);
  holder.scale.setScalar(s);
  holder.position.copy(center).multiplyScalar(-s);
  return holder;
}

// ---------- latitude / longitude -> point on the sphere ----------
export function latLonToVec3(lat, lon, r = MOON_RADIUS) {
  const phi = deg(90 - lat);
  const theta = deg(lon + 180);
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta)
  );
}

// ---------- glowing marker ----------
let glowTex = null;
function glowTexture() {
  if (glowTex) return glowTex;
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const g = c.getContext('2d');
  const gr = g.createRadialGradient(64, 64, 0, 64, 64, 64);
  gr.addColorStop(0, 'rgba(255,255,255,1)');
  gr.addColorStop(0.18, 'rgba(166,240,247,0.8)');
  gr.addColorStop(0.5, 'rgba(166,240,247,0.15)');
  gr.addColorStop(1, 'rgba(166,240,247,0)');
  g.fillStyle = gr;
  g.fillRect(0, 0, 128, 128);
  glowTex = new THREE.CanvasTexture(c);
  glowTex.colorSpace = THREE.SRGBColorSpace;
  return glowTex;
}

function makeMarker(lat, lon) {
  const g = new THREE.Group();
  const dot = new THREE.Mesh(
    new THREE.SphereGeometry(0.018, 16, 12),
    new THREE.MeshBasicMaterial({ color: 0xffe3a3 })
  );
  const halo = new THREE.Sprite(new THREE.SpriteMaterial({
    map: glowTexture(),
    color: 0xa6f0f7,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  }));
  halo.scale.setScalar(0.2);
  g.add(dot, halo);
  g.position.copy(latLonToVec3(lat, lon, MOON_RADIUS + 0.012)); // lift slightly off the surface
  g.userData = { halo, phase: Math.random() * Math.PI * 2 };
  return g;
}

function pulseMarkers(markers, t) {
  for (const m of markers) {
    const { halo, phase } = m.userData;
    const k = 0.5 + 0.5 * Math.sin(t * 2.4 + phase);
    halo.scale.setScalar(0.16 + 0.12 * k);
    halo.material.opacity = 0.55 + 0.45 * k;
  }
}

// ---------- the Moon ----------
// Returns { root, spin, face(lat, lon), pulse(t) }.
//   root  tilts the Moon, spin turns it.
//   face  turns the Moon so a landing site faces the camera.
export function buildMoon(pins = []) {
  const tilt = new THREE.Group();
  const spin = new THREE.Group();
  tilt.add(spin);

  // plain sphere until the GLB has loaded (or if it fails)
  const placeholder = new THREE.Mesh(
    new THREE.SphereGeometry(MOON_RADIUS, 64, 48),
    new THREE.MeshStandardMaterial({ color: 0x8a8a92, roughness: 1 })
  );
  spin.add(placeholder);
  loadMoonModel().then((gltf) => {
    if (!gltf) return;
    spin.remove(placeholder);
    spin.add(fitToMoon(gltf.scene.clone(true)));
  });

  const markers = pins.map((p) => {
    const m = makeMarker(p.lat, p.lon);
    spin.add(m);
    return m;
  });

  return {
    root: tilt,
    spin,
    face(lat, lon) {
      tilt.rotation.x = deg(lat);
      spin.rotation.y = -(Math.PI / 2 + deg(lon));
    },
    pulse(t) { pulseMarkers(markers, t); },
  };
}

// ---------- viewer ----------
export function createViewer(canvas) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, 1, 0.01, 100);
  camera.position.set(0, 0.2, 3.4);
  scene.add(new THREE.AmbientLight(0xdfe8ff, 0.55));
  const sun = new THREE.DirectionalLight(0xffffff, 2.6);
  sun.position.set(3, 2, 4);
  scene.add(sun);
  const rim = new THREE.DirectionalLight(0xa6f0f7, 0.8);
  rim.position.set(-4, 1, -2);
  scene.add(rim);

  const root = new THREE.Group();
  scene.add(root);

  const resize = () => {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    if (!w || !h) return; // hidden: wait for the ResizeObserver
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };
  const ro = new ResizeObserver(resize);
  ro.observe(canvas);
  resize();

  const clock = new THREE.Clock();
  let tick = null, running = true, frameId = 0;
  const loop = () => {
    if (!running) return;
    tick?.(clock.getDelta());
    renderer.render(scene, camera);
    frameId = requestAnimationFrame(loop);
  };
  loop();

  return {
    scene, camera, root,
    setTick(fn) { tick = fn; },
    dispose() {
      running = false;
      cancelAnimationFrame(frameId);
      ro.disconnect();
      renderer.dispose();
      renderer.forceContextLoss(); // free the WebGL context
    },
  };
}
