// js/moonmap.js — moon map page.
// The 3D Moon shows the real Apollo landing sites. Labels are placed over the Moon by
// projecting each site from 3D into the screen, so they stay attached as the Moon turns.

import { createViewer, buildMoon, latLonToVec3, attachDrag } from './moon3d.js';
import { loadContent, currentLang, tr, onLangChange } from './main.js';
const isThai = () => currentLang() === 'th';

const content = await loadContent();
const pick = (o) => o?.[currentLang()] ?? o?.en ?? '';
const $ = (id) => document.getElementById(id);
const byId = Object.fromEntries(content.instruments.map((i) => [i.id, i]));
const sites = Object.entries(content.missions).map(([k, m]) => ({ key: k, ...m }));

let group = 'all';     // all | inside | fields | particles
let siteKey = '12';
let instrumentId = 'pse';
let focused = false;   // true once a site has been chosen, so the Moon stops turning

const instrumentsAt = (k) => content.instruments.filter(
  (i) => i.missions.includes(k) && (group === 'all' || i.category.includes(group)));
const siteVisible = (k) => instrumentsAt(k).length > 0;

// ---------- 3D Moon ----------
const canvas = $('moon');
const viewer = createViewer(canvas);
viewer.camera.position.set(0, 0, 3.3);
const moon = buildMoon(sites.map((s) => ({ lat: s.lat, lon: s.lon })));
viewer.root.add(moon.root);
attachDrag(canvas, () => moon, { onDrag: () => { focused = true; } });

let time = 0;
viewer.setTick((dt) => {
  if (document.documentElement.dataset.motion !== 'reduced') {
    time += dt;
    moon.pulse(time, viewer.camera);
    if (!focused) moon.spin.rotation.y += dt * 0.05;
  }
  moon.step(dt);
  placeLabels();
});

// ---------- site labels ----------
const labelLayer = $('labels');

function renderLabels() {
  labelLayer.innerHTML = sites.map((s) => `
    <button class="mm-label" data-site="${s.key}" aria-label="${tr('apollo')} ${s.key}: ${pick(s.site)}">
      <span class="n">${tr('apollo')} ${s.key}</span>
      <span class="s">${pick(s.site)}</span>
    </button>`).join('');
  markLabels();
}

function markLabels() {
  labelLayer.querySelectorAll('[data-site]').forEach((el) => {
    el.classList.toggle('on', el.dataset.site === siteKey);
    el.setAttribute('aria-pressed', String(el.dataset.site === siteKey));
  });
}

// Project every visible site onto the screen, hide the ones on the far side,
// and nudge labels apart vertically so they never stack on top of each other.
function placeLabels() {
  const w = canvas.clientWidth, h = canvas.clientHeight;
  if (!w || !h) return;
  viewer.root.updateMatrixWorld(true);
  const cam = viewer.camera;
  const placed = [];

  for (const s of sites) {
    const el = labelLayer.querySelector(`[data-site="${s.key}"]`);
    if (!el) continue;
    const world = latLonToVec3(s.lat, s.lon, 1).applyMatrix4(moon.spin.matrixWorld);
    const facing = world.clone().normalize().dot(cam.position.clone().sub(world).normalize()) > 0.08;
    const show = facing && siteVisible(s.key);
    el.hidden = !show;
    if (!show) continue;
    const p = world.clone().project(cam);
    const x = (p.x + 1) / 2 * w;
    const y = (1 - p.y) / 2 * h;
    const lw = el.offsetWidth;
    // open the label to the right of the site, or to the left near the edge
    const lx = x + 14 + lw > w - 8 ? x - 14 - lw : x + 14;
    placed.push({ el, lx, y });
  }

  placed.sort((a, b) => a.y - b.y);
  for (let i = 1; i < placed.length; i++) {
    if (placed[i].y - placed[i - 1].y < 46) placed[i].y = placed[i - 1].y + 46;
  }
  for (const p of placed) p.el.style.transform = `translate(${p.lx}px, ${p.y - 18}px)`;
}

// ---------- instrument chips and dossier ----------
// Mission block: dates, landing site, power, summary and the mission's photos
function renderSiteInfo() {
  const m = content.missions[siteKey];
  $('site-info').innerHTML = `
    <dl class="site-facts">
      <div><dt>${tr('mm_dates')}</dt><dd>${pick(m.dates)}</dd></div>
      <div><dt>${tr('mm_landing')}</dt><dd>${pick(m.site)}</dd></div>
      <div><dt>${tr('mm_power')}</dt><dd>${pick(m.power)}</dd></div>
    </dl>
    <p class="site-summary"><strong>${tr('mm_missionsum')}:</strong> ${pick(m.summary)}</p>`;
  $('site-photos').innerHTML = m.photos.length ? `
    <p class="sub-label">${tr('mm_missionphotos')}</p>
    <div class="photo-strip">${m.photos.map((p, i) => `
      <button class="photo-thumb" data-i="${i}" aria-label="${pick(p.caption)}">
        <img src="${p.src}" alt="" loading="lazy">
      </button>`).join('')}</div>
    <p class="caption">${pick(m.photo_credit)}</p>` : '';
}

function renderSiteChips() {
  const s = content.missions[siteKey];
  $('site-title').textContent = `${tr('apollo')} ${siteKey} · ${pick(s.site)}`;
  renderSiteInfo();
  const list = instrumentsAt(siteKey);
  $('site-chips').innerHTML = list.length
    ? list.map((i) => `
        <button class="mm-chip ${i.id === instrumentId ? 'on' : ''}" data-id="${i.id}"
                aria-pressed="${i.id === instrumentId}">
          <b>${i.abbr}</b><span>${i.name.en}</span>
        </button>`).join('')
    : `<p class="mm-empty">${tr('mm_none')}</p>`;
}

// The plinth's top surface centre is 47% down a square box. The object's height is 46% of the box,
// and its visible base (measured per picture as "feet") is placed on that centre line.
function objectBottom(img) {
  const surface = 47, height = 46;
  const feet = img.feet ?? 0.97;
  const boxBottomFromTop = surface + (1 - feet) * height;
  return (100 - boxBottomFromTop).toFixed(2);
}

function renderDossier() {
  const ins = byId[instrumentId];
  const box = $('dossier');
  if (!ins) {
    box.innerHTML = `<div class="mm-entry"><p class="mm-empty">${tr('mm_none')}</p></div>`;
    return;
  }
  const illus = ins.images.find((x) => x.kind === 'illustration') ?? ins.images[0];
  const missions = ins.missions.map((m) => `${tr('apollo')} ${m} · ${pick(content.missions[m].site)}`).join('<br>');
  const status = ins.status ? `<p><span class="tag ${ins.status.tone || ''}">${pick(ins.status)}</span></p>` : '';
  const nameBlock = `<h2>${ins.name.en}</h2>${isThai() ? `<p class="th-sub">${ins.name.th}</p>` : ''}`;
  box.innerHTML = `
    <div class="mm-dossier-top">
      <span class="mono">${tr('mm_dossier')}</span>
      <small>${tr('mm_dossier_hint')}</small>
    </div>
    <div class="mm-entry">
      <div class="mm-plinth">
        <img class="mm-plinth-img" src="assets/scene/museum-plinth.png" alt="">
        ${illus ? `<img class="mm-object" src="${illus.src}" alt="${pick(illus.caption)}" style="bottom:${objectBottom(illus)}%">` : ''}
      </div>
      <p class="mm-kicker">${ins.abbr}</p>
      ${nameBlock}
      ${status}
      <dl class="mm-facts">
        <div><dt>${tr('missions')}</dt><dd>${missions}</dd></div>
        <div><dt>${tr('what_it_did')}</dt><dd>${pick(ins.what)}</dd></div>
        <div><dt>${tr('impact')}</dt><dd>${pick(ins.impact)}</dd></div>
      </dl>
      ${ins.note ? `<p class="mm-alert">${pick(ins.note)}</p>` : ''}
      <p class="mm-credit">${pick(ins.credit)}</p>
    </div>`;
}

// ---------- power and findings (static text from the content file) ----------
function renderExtras() {
  const mm = content.moonMap;
  $('power').innerHTML = `
    <div class="mm-power-img">
      <img src="assets/instruments/snap-27.png" alt="${pick({
        en: 'Concept illustration of SNAP-27 power generator',
        th: 'ภาพแนวคิดเครื่องกำเนิดไฟฟ้าจากไอโซโทปรังสี SNAP-27',
      })}">
    </div>
    <h2>${pick(mm.power.title)}</h2>
    <p>${pick(mm.power.text)}</p>
    <p class="small">${pick(mm.power.clarify)}</p>`;
  $('findings').innerHTML = `
    <h2>${tr('mm_findings_title')}</h2>
    <ul>${mm.findings.map((f) => `<li>${pick(f)}</li>`).join('')}</ul>`;
}

// ---------- selection ----------
function selectSite(key, face) {
  siteKey = key;
  if (face) {
    focused = true;
    const s = content.missions[key];
    moon.face(s.lat, s.lon);
  }
  const list = instrumentsAt(key);
  if (!list.some((i) => i.id === instrumentId)) instrumentId = list[0]?.id ?? null;
  markLabels();
  renderSiteChips();
  renderDossier();
}

labelLayer.addEventListener('click', (e) => {
  const b = e.target.closest('[data-site]');
  if (b) selectSite(b.dataset.site, true);
});

$('site-chips').addEventListener('click', (e) => {
  const b = e.target.closest('[data-id]');
  if (!b) return;
  instrumentId = b.dataset.id;
  renderSiteChips();
  renderDossier();
});

$('filters').addEventListener('click', (e) => {
  const b = e.target.closest('[data-group]');
  if (!b) return;
  group = b.dataset.group;
  document.querySelectorAll('#filters .chip').forEach((x) => {
    x.classList.toggle('active', x === b);
    x.setAttribute('aria-pressed', String(x === b));
  });
  if (!siteVisible(siteKey)) {
    const first = sites.find((s) => siteVisible(s.key));
    if (first) siteKey = first.key;
  }
  selectSite(siteKey, false);
});

$('show-all').addEventListener('click', () => { focused = false; });

// photos open larger in the photo dialog
$('site-photos').addEventListener('click', (e) => {
  const b = e.target.closest('[data-i]');
  if (!b) return;
  const m = content.missions[siteKey];
  const p = m.photos[Number(b.dataset.i)];
  $('photo-img').src = p.src;
  $('photo-img').alt = pick(p.caption);
  $('photo-cap').textContent = pick(p.caption);
  $('photo-credit').textContent = pick(m.photo_credit);
  $('photo-dialog').showModal();
});

// ---------- first render and language changes ----------
renderLabels();
renderExtras();
selectSite('12', false);

onLangChange(() => {
  renderSiteInfo();
  renderLabels();
  renderExtras();
  renderSiteChips();
  renderDossier();
});
