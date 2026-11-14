// js/exhibit.js — exhibition page: instrument cards, photo gallery, story and maps.

import { createViewer, buildMoon, attachDrag } from './moon3d.js';
import { loadContent, currentLang, tr, onLangChange, readAloud, stopReading, observeReveal } from './main.js';

const content = await loadContent();
const byId = Object.fromEntries(content.instruments.map((i) => [i.id, i]));
const pick = (o) => o?.[currentLang()] ?? o?.en ?? '';
const $ = (id) => document.getElementById(id);

const grid = $('grid');
const search = $('search');
const inspect = $('inspect');
const mapdlg = $('mapdlg');
const story = $('story');

let filter = 'all';
let current = null;     // instrument open in the inspector
let gIndex = 0;         // which photo is showing
let earthMap = null;
let moonView = null;

// ---------- grid ----------
function renderGrid() {
  const q = search.value.trim().toLowerCase();
  const list = content.instruments.filter((ins) => {
    const catOk = filter === 'all' || filter.split(',').some((c) => ins.category.includes(c));
    const hay = `${ins.abbr} ${pick(ins.name)} ${pick(ins.short)}`.toLowerCase();
    return catOk && (!q || hay.includes(q));
  });
  grid.innerHTML = list.map((ins) => {
    const first = ins.images[0];
    return `
      <article class="card reveal" id="${ins.id}">
        <div class="thumb">
          <span class="abbr">${ins.abbr}</span>
          ${first
            ? `<img src="${first.src}" alt="${pick(first.caption)}" loading="lazy">`
            : `<div class="nophoto">${tr('photo_soon')}</div>`}
        </div>
        <div class="card-body">
          <h3>${pick(ins.name)}</h3>
          <p>${pick(ins.short)}</p>
          ${ins.status ? `<span class="tag ${ins.status.tone || ''}">${pick(ins.status)}</span><br>` : ''}
          <button class="pill" data-open="${ins.id}">${tr('inspect')} ↗</button>
        </div>
      </article>`;
  }).join('') || '<p class="lead">—</p>';
  observeReveal(grid);
}

grid.addEventListener('click', (e) => {
  const b = e.target.closest('[data-open]');
  if (b) openInspect(byId[b.dataset.open]);
});
search.addEventListener('input', renderGrid);
$('chips').addEventListener('click', (e) => {
  const c = e.target.closest('.chip');
  if (!c) return;
  document.querySelectorAll('.chip').forEach((x) => x.classList.toggle('active', x === c));
  filter = c.dataset.cats;
  renderGrid();
});

// ---------- story panel ----------
function storyHTML(ins) {
  const missions = ins.missions.map((m) => `${tr('apollo')} ${m}`).join(', ');
  const status = ins.status ? `<span class="tag ${ins.status.tone || ''}">${pick(ins.status)}</span>` : '';
  return `
    <p class="kicker">${pick(ins.name)}</p>
    <h2>${pick(ins.question)}</h2>
    <p class="imagined">${tr('imagined')}</p>
    <blockquote>${pick(ins.story)}</blockquote>
    <dl>
      <dt>${tr('what_it_did')}</dt><dd>${pick(ins.what)}</dd>
      <dt>${tr('impact')}</dt><dd>${pick(ins.impact)}</dd>
      <dt>${tr('missions')}</dt><dd>${missions}</dd>
      ${status ? `<dt>${tr('status')}</dt><dd>${status}</dd>` : ''}
    </dl>
    ${ins.note ? `<p class="mm-alert">${pick(ins.note)}</p>` : ''}`;
}

// ---------- photo gallery ----------
function renderStrip(images) {
  $('strip').innerHTML = images.map((it, i) =>
    `<button class="thumbbtn" data-i="${i}" aria-label="${pick(it.caption)}"><img src="${it.src}" alt=""></button>`
  ).join('');
}

function markStrip() {
  document.querySelectorAll('.thumbbtn').forEach((b, i) => b.classList.toggle('on', i === gIndex));
}

function showImage(i, animate = true) {
  const images = current?.images ?? [];
  const img = $('gimg');
  const empty = $('nophoto');
  const multi = images.length > 1;
  $('gprev').hidden = $('gnext').hidden = !multi;

  if (!images.length) {
    img.hidden = true;
    empty.hidden = false;
    $('gcap').textContent = '';
    $('gkind').textContent = '';
    $('gcount').textContent = '';
    return;
  }

  img.hidden = false;
  empty.hidden = true;
  gIndex = (i + images.length) % images.length;
  const item = images[gIndex];

  const apply = () => {
    img.src = item.src;
    img.alt = pick(item.caption);
    $('gcap').textContent = pick(item.caption);
    $('gkind').textContent = item.kind === 'illustration' ? tr('kind_illus') : tr('kind_photo');
    $('gcount').textContent = `${gIndex + 1} / ${images.length}`;
    markStrip();
    requestAnimationFrame(() => img.classList.remove('swap'));
  };

  // "file browser" feel: slide and fade out, swap, slide back in
  if (animate && img.getAttribute('src')) {
    img.classList.add('swap');
    setTimeout(apply, 320);
  } else {
    apply();
  }
}

$('gprev').addEventListener('click', () => showImage(gIndex - 1));
$('gnext').addEventListener('click', () => showImage(gIndex + 1));
$('strip').addEventListener('click', (e) => {
  const b = e.target.closest('.thumbbtn');
  if (b) showImage(Number(b.dataset.i));
});
document.addEventListener('keydown', (e) => {
  if (!inspect.open) return;
  if (e.key === 'ArrowLeft') showImage(gIndex - 1);
  if (e.key === 'ArrowRight') showImage(gIndex + 1);
});

// swipe on touch screens
let swipeX = null;
$('stage').addEventListener('pointerdown', (e) => { swipeX = e.clientX; });
$('stage').addEventListener('pointerup', (e) => {
  if (swipeX === null) return;
  const dx = e.clientX - swipeX;
  swipeX = null;
  if (Math.abs(dx) > 40) showImage(gIndex + (dx < 0 ? 1 : -1));
});

// ---------- inspector ----------
function openInspect(ins) {
  if (!ins) return;
  current = ins;
  story.innerHTML = storyHTML(ins);
  $('gcredit').textContent = pick(ins.credit);
  renderStrip(ins.images);
  inspect.showModal();
  showImage(0, false);
}

$('btn-read').addEventListener('click', () => {
  if (!current) return;
  readAloud([pick(current.question), pick(current.story), pick(current.what), pick(current.impact)].join('. '));
});

inspect.addEventListener('close', () => stopReading());
inspect.addEventListener('click', (e) => { if (e.target === inspect) inspect.close(); });

// ---------- maps ----------
// One Moon viewer for the whole page. It is created the first time Show maps is pressed,
// then reused, and paused whenever the dialog is closed.
let mapMoon = null;
attachDrag($('moonview'), () => mapMoon);

function getMoonView() {
  moonView ??= createViewer($('moonview'));
  return moonView;
}

$('btn-maps').addEventListener('click', () => {
  if (!current) return;
  mapdlg.showModal();
  showMaps(current);
});

function showMaps(ins) {
  // Earth: where it was built, with satellite imagery when the maker is known
  const el = $('earthmap');
  earthMap?.remove();
  earthMap = null;
  el.innerHTML = '';
  if (ins.maker) {
    earthMap = L.map(el).setView([ins.maker.lat, ins.maker.lon], 10);
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles © Esri',
      maxZoom: 18,
    }).addTo(earthMap);
    L.marker([ins.maker.lat, ins.maker.lon]).addTo(earthMap)
      .bindPopup(`<strong>${ins.maker.name}</strong><br>${pick(ins.maker.place)}`)
      .openPopup();
    setTimeout(() => earthMap?.invalidateSize(), 80);
  } else {
    el.innerHTML = `
      <div class="earth-fallback">
        <img src="assets/scene/earth.png" alt="${tr('earth_alt')}">
        <p>${tr('research_pending')}</p>
      </div>`;
  }

  // Moon: where it was left, with a pulsing marker at the landing site
  const view = getMoonView();
  const mission = content.missions[ins.missions[0]];
  view.root.traverse((o) => o.material?.dispose?.());
  view.root.clear();
  mapMoon = buildMoon([{ lat: mission.lat, lon: mission.lon }]);
  mapMoon.face(mission.lat, mission.lon);
  view.root.add(mapMoon.root);
  view.camera.position.set(0, 0, 3.2);
  let t = 0;
  view.setTick((dt) => {
    t += dt;
    if (mapMoon) { mapMoon.step(dt); mapMoon.pulse(t); }
  });
  view.resume();
  $('moon-caption').textContent = `${tr('map_moon')} — ${pick(mission.site)}`;
}

mapdlg.addEventListener('close', () => {
  earthMap?.remove();
  earthMap = null;
  moonView?.pause();
});
mapdlg.addEventListener('click', (e) => { if (e.target === mapdlg) mapdlg.close(); });

// ---------- language changes ----------
onLangChange(() => {
  renderGrid();
  if (current && inspect.open) {
    story.innerHTML = storyHTML(current);
    $('gcap').textContent = pick(current.images[gIndex]?.caption) ?? '';
    if (current.images[gIndex]) $('gkind').textContent = current.images[gIndex].kind === 'illustration' ? tr('kind_illus') : tr('kind_photo');
    renderStrip(current.images);
    markStrip();
  }
  if (current && mapdlg.open) {
    const mission = content.missions[current.missions[0]];
    $('moon-caption').textContent = `${tr('map_moon')} — ${pick(mission.site)}`;
  }
});

// ---------- first render; open an instrument if the URL has #id ----------
renderGrid();
const fromHash = location.hash.slice(1);
if (fromHash && byId[fromHash]) openInspect(byId[fromHash]);
