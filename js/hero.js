// js/hero.js — home page: rotating Moon with pulsing landing-site markers,
// plus the featured story cards.

import { createViewer, buildMoon } from './moon3d.js';
import { loadContent, currentLang, tr, onLangChange, observeReveal } from './main.js';

const content = await loadContent();
const byId = Object.fromEntries(content.instruments.map((i) => [i.id, i]));
const pick = (o) => o?.[currentLang()] ?? o?.en ?? '';

// ---------- rotating Moon ----------
const viewer = createViewer(document.getElementById('hero-moon'));
viewer.camera.position.set(0, 0.25, 3.6);

const pins = Object.values(content.missions).map((m) => ({ lat: m.lat, lon: m.lon }));
const moon = buildMoon(pins);
moon.root.position.y = -1.0;   // lower the Moon so its surface curves across the bottom of the hero
viewer.root.add(moon.root);

let time = 0;
viewer.setTick((dt) => {
  time += dt;
  if (document.documentElement.dataset.motion !== 'reduced') {
    moon.spin.rotation.y += dt * 0.06;
    moon.pulse(time);
  }
});

// ---------- featured cards ----------
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