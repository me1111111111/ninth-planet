// js/moon3d.js — the 3D Moon.
// A plain sphere wears the Moon texture (assets/textures/moon.jpg). This is much lighter
// than the 15 MB model it replaces, and the pin coordinates line up exactly with it.
// The Moon can be dragged to turn, with a little momentum.

import * as THREE from 'three';

export const MOON_RADIUS = 1;
const MOON_TEXTURE = 'assets/textures/moon.jpg';
const deg = THREE.MathUtils.degToRad;
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

// ---------- one shared texture, loaded once ----------
let texturePromise = null;
function moonTexture() {
  texturePromise ??= new Promise((resolve) => {
    new THREE.TextureLoader().load(
      MOON_TEXTURE,
      (tex) => {
        tex.flipY = false;                       // checked: this makes the texture match the pin coordinates
        tex.colorSpace = THREE.SRGBColorSpace;
        resolve(tex);
      },
      undefined,
      () => { console.warn('Moon texture not found at ' + MOON_TEXTURE); resolve(null); }
    );
  });
  return texturePromise;
}

// one geometry for every Moon: a smooth sphere is all the Moon needs
let sphereGeometry = null;
const getSphere = () => (sphereGeometry ??= new THREE.SphereGeometry(MOON_RADIUS, 128, 96));

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

// ---------- glowing markers ----------
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
    new THREE.SphereGeometry(0.018, 12, 10),
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
  g.position.copy(latLonToVec3(lat, lon, MOON_RADIUS + 0.012));
  g.userData = { halo, phase: Math.random() * Math.PI * 2 };
  return g;
}

// ---------- the Moon ----------
// Returns { root, spin, face(lat, lon), pulse(t), step(dt) }.
//   root  tilts the Moon, spin turns it. Everything on the surface belongs in `spin`.
//   face  turns the Moon so a site faces the camera.
//   step  applies the momentum left after a drag.
export function buildMoon(pins = []) {
  const tilt = new THREE.Group();
  const spin = new THREE.Group();
  tilt.add(spin);

  const material = new THREE.MeshStandardMaterial({ color: 0xbfc3c9, roughness: 1, metalness: 0 });
  spin.add(new THREE.Mesh(getSphere(), material));
  moonTexture().then((tex) => {
    if (!tex) return;
    material.map = tex;
    material.color.set(0xffffff);
    material.needsUpdate = true;
  });

  const markers = pins.map((p) => {
    const m = makeMarker(p.lat, p.lon);
    spin.add(m);
    return m;
  });

  const moon = {
    root: tilt,
    spin,
    vy: 0,   // turning speed after a drag (radians per second)
    vx: 0,   // tilting speed after a drag
    face(lat, lon) {
      tilt.rotation.x = deg(lat);
      spin.rotation.y = -(Math.PI / 2 + deg(lon));
    },
    pulse(t) {
      for (const m of markers) {
        const { halo, phase } = m.userData;
        const k = 0.5 + 0.5 * Math.sin(t * 2.4 + phase);
        halo.scale.setScalar(0.16 + 0.12 * k);
        halo.material.opacity = 0.55 + 0.45 * k;
      }
    },
    step(dt) {
      if (Math.abs(moon.vy) > 1e-3) {
        spin.rotation.y += moon.vy * dt;
        moon.vy *= Math.exp(-dt * 3);
      }
      if (Math.abs(moon.vx) > 1e-3) {
        tilt.rotation.x = clamp(tilt.rotation.x + moon.vx * dt, -1.2, 1.2);
        moon.vx *= Math.exp(-dt * 3);
      }
    },
  };
  return moon;
}

// ---------- drag to turn ----------
// getMoon is a function so the viewer can swap in a different Moon later.
// Returns a function that removes the listeners.
export function attachDrag(canvas, getMoon, { onDrag } = {}) {
  let last = null;
  canvas.style.touchAction = 'none';
  canvas.style.cursor = 'grab';

  const down = (e) => {
    last = { x: e.clientX, y: e.clientY };
    canvas.setPointerCapture?.(e.pointerId);
    canvas.style.cursor = 'grabbing';
    onDrag?.();
    const m = getMoon();
    if (m) { m.vy = 0; m.vx = 0; }
  };
  const move = (e) => {
    if (!last) return;
    const m = getMoon();
    const dx = e.clientX - last.x, dy = e.clientY - last.y;
    last = { x: e.clientX, y: e.clientY };
    if (!m) return;
    const k = 0.008;
    m.spin.rotation.y += dx * k;
    m.root.rotation.x = clamp(m.root.rotation.x + dy * k * 0.6, -1.2, 1.2);
    m.vy = dx * k * 60;          // momentum: what the last movement was worth per second
    m.vx = dy * k * 0.6 * 60;
  };
  const up = () => { last = null; canvas.style.cursor = 'grab'; };

  canvas.addEventListener('pointerdown', down);
  canvas.addEventListener('pointermove', move);
  canvas.addEventListener('pointerup', up);
  canvas.addEventListener('pointercancel', up);
  return () => {
    canvas.removeEventListener('pointerdown', down);
    canvas.removeEventListener('pointermove', move);
    canvas.removeEventListener('pointerup', up);
    canvas.removeEventListener('pointercancel', up);
  };
}

// ---------- viewer ----------
// Set pause() when the Moon is hidden, so it stops drawing. resume() starts it again.
export function createViewer(canvas) {
  const renderer = new THREE.WebGLRenderer({
    canvas, antialias: true, alpha: true, powerPreference: 'low-power',
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

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
    if (!w || !h) return;               // hidden: wait for the ResizeObserver
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };
  const ro = new ResizeObserver(resize);
  ro.observe(canvas);
  resize();

  const clock = new THREE.Clock();
  let tick = null, running = true, paused = false, frameId = 0;
  const loop = () => {
    if (!running) return;
    const dt = clock.getDelta();
    if (!paused) {
      tick?.(dt);
      renderer.render(scene, camera);
    }
    frameId = requestAnimationFrame(loop);
  };
  loop();

  return {
    scene, camera, root,
    setTick(fn) { tick = fn; },
    pause() { paused = true; },
    resume() { paused = false; },
    dispose() {
      running = false;
      cancelAnimationFrame(frameId);
      ro.disconnect();
      renderer.dispose();
      renderer.forceContextLoss();
    },
  };
}
