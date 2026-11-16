

import { createViewer, buildMoon, addHalo } from './moon3d.js';
import { loadContent, currentLang, tr, onLangChange, observeReveal } from './main.js';

const HERO_MOON_SCALE = 1.4;   
const HORIZON_Y = 0.67;        

const content = await loadContent();
const byId = Object.fromEntries(content.instruments.map((i) => [i.id, i]));
const pick = (o) => o?.[currentLang()] ?? o?.en ?? '';
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

const canvas = document.getElementById('hero-moon');
const viewer = createViewer(canvas);
viewer.camera.position.set(0, 0.25, 3.6);

const pins = Object.values(content.missions).map((m) => ({ lat: m.lat, lon: m.lon }));
const moon = buildMoon(pins);
moon.root.scale.setScalar(HERO_MOON_SCALE);
moon.root.position.y = HORIZON_Y - HERO_MOON_SCALE;
addHalo(moon.root, 1.3);          
viewer.root.add(moon.root);

let time = 0;
viewer.setTick((dt) => {
  time += dt;
  if (document.documentElement.dataset.motion !== 'reduced') {
    moon.spin.rotation.y += dt * 0.06;
  }
  moon.pulse(time, viewer.camera);
});

const heroEl = document.querySelector('.hero');
const fadeEl = document.getElementById('hero-fade');
let scrollTicking = false;

function updateFade() {
  const p = clamp(window.scrollY / (heroEl.offsetHeight * 0.9), 0, 1);
  canvas.style.opacity = String(1 - p * 0.85);
  fadeEl.style.opacity = String(p);
  
  document.getElementById('scroll-dark').style.opacity = String(clamp(window.scrollY / (window.innerHeight * 1.2), 0, 0.92));
  scrollTicking = false;
}
window.addEventListener('scroll', () => {
  if (!scrollTicking) {
    scrollTicking = true;
    requestAnimationFrame(updateFade);
  }
}, { passive: true });
updateFade();

const o = content.origin;
function renderOrigin() {
  if (!o) return;
  document.getElementById('origin-title').textContent = pick(o.title);
  document.getElementById('origin-text').innerHTML = o.paragraphs.map((p) => `<p>${pick(p)}</p>`).join('');
  const img = document.getElementById('origin-img');
  img.src = o.image.src;
  img.alt = pick(o.image.caption);
  document.getElementById('origin-cap').textContent = `${pick(o.image.caption)} · ${pick(o.credit)}`;
  observeReveal(document.getElementById('origin'));
}
renderOrigin();
onLangChange(renderOrigin);

function renderFeatured() {
  const box = document.getElementById('featured');
  if (!box) return;
  box.innerHTML = ['pse', 'hfe'].map((id, i) => {
    const ins = byId[id];
    const first = ins.images[0];
    return `
      <a class="card feature reveal" href="exhibition.html#${id}">
        <div class="thumb">
          ${first ? `<img src="${first.src}" alt="${pick(first.caption)}" loading="lazy">` : ''}
          <span class="abbr">${ins.abbr}</span>
        </div>
        <div class="card-body">
          <span class="num">0${i + 1}</span>
          <h3>${pick(ins.question)}</h3>
          <p>${pick(ins.short)}</p>
          <span class="tag gold">${tr('inspect')} ↗</span>
        </div>
      </a>`;
  }).join('');
  observeReveal(box);
}
renderFeatured();
onLangChange(renderFeatured);
