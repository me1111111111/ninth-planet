// js/main.js — shared pieces used on every page:
// header and footer, Thai/English switch, settings, star field, reveal animation, read-aloud.

export const DICT = {
  en: {
    nav_home: 'Home', nav_exhibition: 'Exhibition', nav_map: 'Moon map', nav_credits: 'Credits',
    settings: 'Settings', reduce_motion: 'Reduce motion', text_size: 'Text size',
    size_normal: 'A', size_large: 'A+', size_xl: 'A++',
    footer_tag: 'An independent Space Apps project',
    footer_disc: 'NASA Space Apps Challenge 2026 concept · No NASA endorsement implied.',
    hero_tag: 'A lunar museum for every explorer',
    hero_title: 'The Moon remembers.',
    hero_sub: 'The astronauts came home. Their instruments kept exploring.',
    hero_giant: 'APOLLO',
    hero_caption: 'Abandoned, but not forgotten',
    hero_stat1: '5 ALSEP deployments',
    hero_stat2: '1969–1977 · A legacy of lunar science',
    btn_enter: 'Enter the exhibition', btn_map: 'Explore the Moon map', btn_maps: 'Show maps',
    story_title: 'Every object has a story.',
    story_sub: 'Choose an instrument. Discover the question it carried, the work it did, and what it helped us learn.',
    ex_eyebrow: 'The lunar collection', ex_title: 'Meet the instruments.',
    ex_sub: 'Small machines. Questions as big as the Moon.', ex_search: 'Find an instrument…',
    filter_all: 'All exhibits', filter_inside: 'Inside the Moon',
    filter_fields: 'Fields & particles', filter_support: 'Mission support',
    inspect: 'Open exhibit', read_aloud: 'Read aloud',
    what_it_did: 'What it did', impact: 'What it helped us learn',
    missions: 'Missions', status: 'Status', instruments: 'Instruments', apollo: 'Apollo',
    imagined: 'Imagined voice · fictionalized narration for learning',
    photo_soon: 'Photo coming soon',
    gallery_hint: 'Use the arrows, swipe, or pick a thumbnail to see more photos',
    research_pending: 'Maker details: team research pending',
    map_earth: 'Built on Earth', map_moon: 'Left on the Moon',
    map_note: 'Illustrative maps · satellite imagery © Esri',
    moon_map_title: 'Moon map',
    moon_map_sub: 'Five Apollo landing sites where ALSEP was set up. Pick a mission to turn the Moon toward it.',
    show_all: 'Show all sites',
    credits_eyebrow: 'The people & the paper trail', credits_title: 'Exploration is a shared story.',
    credits_sub: 'Meet the team and explore the sources behind the lunar collection.',
    team_title: 'The Ninth Planet team',
    team_1: 'Research & fact-checking', team_2: 'Story & learning design',
    team_3: 'UI & visual design', team_4: 'Development & accessibility',
    team_note: 'Team names and roles to be confirmed.',
    sources_title: 'Follow the evidence.', ack_title: 'Acknowledgments',
    ack_text: 'Photographs are NASA archive images shared through Wikimedia Commons. The 3D Moon model is by RenderX on Sketchfab. Historical facts were checked against NASA sources. Instrument narration is fictionalized and labeled as an imagined voice.',
    moon_credit: '3D Moon model by RenderX on Sketchfab',
    back_exhibit: 'Return to the exhibition',
  },
  th: {
    nav_home: 'หน้าแรก', nav_exhibition: 'นิทรรศการ', nav_map: 'แผนที่ดวงจันทร์', nav_credits: 'ผู้จัดทำ',
    settings: 'ตั้งค่า', reduce_motion: 'ลดการเคลื่อนไหว', text_size: 'ขนาดตัวอักษร',
    size_normal: 'A', size_large: 'A+', size_xl: 'A++',
    footer_tag: 'โครงการอิสระจากงาน Space Apps',
    footer_disc: 'แนวคิดจากการแข่งขัน NASA Space Apps Challenge 2026 · ไม่ได้รับการรับรองจาก NASA',
    hero_tag: 'พิพิธภัณฑ์ดวงจันทร์สำหรับนักสำรวจทุกวัย',
    hero_title: 'ดวงจันทร์ยังจดจำ',
    hero_sub: 'นักบินอวกาศกลับบ้านแล้ว แต่เครื่องมือของพวกเขายังคงสำรวจต่อไป',
    hero_giant: 'APOLLO',
    hero_caption: 'ถูกทิ้งไว้ แต่ไม่ถูกลืม',
    hero_stat1: 'การติดตั้ง ALSEP 5 ชุด',
    hero_stat2: '1969–1977 · มรดกทางวิทยาศาสตร์ดวงจันทร์',
    btn_enter: 'เข้าชมนิทรรศการ', btn_map: 'สำรวจแผนที่ดวงจันทร์', btn_maps: 'ดูแผนที่',
    story_title: 'ทุกชิ้นมีเรื่องราวของมัน',
    story_sub: 'เลือกเครื่องมือ แล้วค้นหาคำถามที่มันถูกส่งไปตอบ งานที่มันทำ และสิ่งที่มันช่วยให้เราเรียนรู้',
    ex_eyebrow: 'คอลเลกชันดวงจันทร์', ex_title: 'พบกับเครื่องมือ',
    ex_sub: 'เครื่องจักรขนาดเล็ก กับคำถามที่ยิ่งใหญ่เท่าดวงจันทร์', ex_search: 'ค้นหาเครื่องมือ…',
    filter_all: 'ทั้งหมด', filter_inside: 'ภายในดวงจันทร์',
    filter_fields: 'สนามและอนุภาค', filter_support: 'ระบบสนับสนุนภารกิจ',
    inspect: 'เปิดดูนิทรรศการ', read_aloud: 'อ่านออกเสียง',
    what_it_did: 'สิ่งที่มันทำ', impact: 'สิ่งที่ช่วยให้เราเรียนรู้',
    missions: 'ภารกิจ', status: 'สถานะ', instruments: 'เครื่องมือ', apollo: 'อะพอลโล',
    imagined: 'เสียงจินตนาการ · เรื่องเล่าที่แต่งขึ้นเพื่อการเรียนรู้',
    photo_soon: 'ภาพจะเพิ่มในเร็วๆ นี้',
    gallery_hint: 'ใช้ลูกศร ปัด หรือเลือกภาพตัวอย่างด้านล่างเพื่อดูภาพเพิ่มเติม',
    research_pending: 'ข้อมูลผู้ผลิต: รอการค้นคว้าจากทีม',
    map_earth: 'สร้างบนโลก', map_moon: 'ทิ้งไว้บนดวงจันทร์',
    map_note: 'แผนที่ประกอบ · ภาพถ่ายดาวเทียมโดย Esri',
    moon_map_title: 'แผนที่ดวงจันทร์',
    moon_map_sub: 'จุดลงจอดอะพอลโล 5 จุดที่ติดตั้ง ALSEP เลือกภารกิจเพื่อหมุนดวงจันทร์ไปยังจุดนั้น',
    show_all: 'ดูทุกจุด',
    credits_eyebrow: 'ผู้คนและหลักฐาน', credits_title: 'การสำรวจคือเรื่องราวร่วมกัน',
    credits_sub: 'พบกับทีมงานและแหล่งข้อมูลเบื้องหลังคอลเลกชันดวงจันทร์',
    team_title: 'ทีม The Ninth Planet',
    team_1: 'ค้นคว้าและตรวจสอบข้อเท็จจริง', team_2: 'ออกแบบเรื่องราวและการเรียนรู้',
    team_3: 'การออกแบบ UI และภาพ', team_4: 'การพัฒนาและการเข้าถึง',
    team_note: 'ชื่อและบทบาทของทีมอยู่ระหว่างการยืนยัน',
    sources_title: 'ตามหาหลักฐาน', ack_title: 'กิตติกรรมประกาศ',
    ack_text: 'ภาพถ่ายเป็นภาพจากคลังของ NASA เผยแพร่ผ่าน Wikimedia Commons โมเดลดวงจันทร์ 3 มิติโดย RenderX บน Sketchfab ข้อเท็จจริงทางประวัติศาสตร์ตรวจสอบกับแหล่งของ NASA แล้ว เสียงบรรยายของเครื่องมือเป็นเรื่องแต่งที่ระบุไว้ชัดเจน',
    moon_credit: 'โมเดลดวงจันทร์ 3 มิติโดย RenderX บน Sketchfab',
    back_exhibit: 'กลับไปยังนิทรรศการ',
  },
};

// ---------- language ----------
let lang = localStorage.getItem('lang') || 'en';
const langListeners = [];
export const currentLang = () => lang;
export const tr = (key) => DICT[lang][key] ?? DICT.en[key] ?? key;
export const onLangChange = (fn) => langListeners.push(fn);

// ---------- content (loaded once) ----------
let contentPromise = null;
export const loadContent = () =>
  (contentPromise ??= fetch('data/content.json').then((r) => r.json()));

// ---------- read aloud ----------
export function readAloud(text) {
  if (!('speechSynthesis' in window) || !text) return;
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = lang === 'th' ? 'th-TH' : 'en-US';
  speechSynthesis.speak(u);
}
export function stopReading() {
  if ('speechSynthesis' in window) speechSynthesis.cancel();
}

// ---------- reveal on scroll ----------
const revealIO = 'IntersectionObserver' in window
  ? new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          revealIO.unobserve(e.target);
        }
      }
    }, { threshold: 0.12 })
  : null;

export function observeReveal(root = document) {
  root.querySelectorAll('.reveal:not(.in)').forEach((el) => {
    if (revealIO) revealIO.observe(el);
    else el.classList.add('in');
  });
}

// ---------- header & footer ----------
const PAGES = [
  ['index.html', 'nav_home'],
  ['exhibition.html', 'nav_exhibition'],
  ['moon-map.html', 'nav_map'],
  ['credits.html', 'nav_credits'],
];
const PLANET_SVG = `<svg width="30" height="30" viewBox="0 0 40 40" aria-hidden="true">
  <circle cx="20" cy="20" r="9" fill="#cfd8e6"/>
  <ellipse cx="20" cy="20" rx="18" ry="6" fill="none" stroke="#a6f0f7" stroke-width="1.5" transform="rotate(-20 20 20)"/>
  <circle cx="33" cy="12" r="2.2" fill="#a6f0f7"/></svg>`;

function renderChrome() {
  const here = location.pathname.split('/').pop() || 'index.html';
  const header = document.getElementById('app-header');
  if (header) {
    header.className = 'site';
    header.innerHTML = `
      <nav class="topnav">
        <a class="brand" href="index.html">${PLANET_SVG}<span>THE NINTH PLANET</span></a>
        <div class="links">${PAGES.map(([href, key]) =>
          `<a href="${href}" class="${href === here ? 'active' : ''}" data-i18n="${key}"></a>`).join('')}
        </div>
        <div class="tools">
          <div class="lang-switch">
            <button class="lang-btn" data-lang="en">EN</button>
            <button class="lang-btn" data-lang="th">ไทย</button>
          </div>
          <button id="settings-btn" class="icon-btn" aria-label="Settings" aria-expanded="false">⚙</button>
        </div>
      </nav>
      <div id="settings-panel" class="settings" hidden>
        <p class="settings-title" data-i18n="settings"></p>
        <label class="row"><span data-i18n="reduce_motion"></span>
          <input type="checkbox" id="motion-toggle" /></label>
        <div class="row"><span data-i18n="text_size"></span>
          <div class="size-switch">
            <button data-size="normal" data-i18n="size_normal"></button>
            <button data-size="large" data-i18n="size_large"></button>
            <button data-size="xl" data-i18n="size_xl"></button>
          </div>
        </div>
      </div>`;
  }
  const footer = document.getElementById('app-footer');
  if (footer) {
    footer.innerHTML = `
      <p><strong>THE NINTH PLANET</strong> · <span data-i18n="footer_tag"></span></p>
      <p class="small" data-i18n="footer_disc"></p>`;
  }
}

function applyLang() {
  document.documentElement.lang = lang;
  document.body.classList.toggle('thai', lang === 'th');
  document.querySelectorAll('[data-i18n]').forEach((el) => { el.textContent = tr(el.dataset.i18n); });
  document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    el.placeholder = tr(el.dataset.i18nPlaceholder);
  });
  document.querySelectorAll('.lang-btn').forEach((b) => b.classList.toggle('active', b.dataset.lang === lang));
  langListeners.forEach((fn) => fn(lang));
}

// ---------- settings & clicks ----------
function applyMotion(reduced) {
  document.documentElement.dataset.motion = reduced ? 'reduced' : 'full';
  localStorage.setItem('motion', reduced ? 'reduced' : 'full');
}
function applySize(size) {
  document.documentElement.dataset.size = size;
  localStorage.setItem('size', size);
}

document.addEventListener('click', (e) => {
  const t = e.target;
  const settingsBtn = t.closest('#settings-btn');
  if (settingsBtn) {
    const panel = document.getElementById('settings-panel');
    panel.hidden = !panel.hidden;
    settingsBtn.setAttribute('aria-expanded', String(!panel.hidden));
    return;
  }
  const langBtn = t.closest('.lang-btn');
  if (langBtn) {
    lang = langBtn.dataset.lang;
    localStorage.setItem('lang', lang);
    applyLang();
    return;
  }
  const sizeBtn = t.closest('[data-size]');
  if (sizeBtn) return applySize(sizeBtn.dataset.size);
  const closeBtn = t.closest('[data-close]');
  if (closeBtn) closeBtn.closest('dialog')?.close();
});
document.addEventListener('change', (e) => {
  if (e.target.id === 'motion-toggle') applyMotion(e.target.checked);
});

// ---------- star field ----------
// Stars have depth: near stars flow faster when you scroll, far stars drift slowly.
// Each star twinkles and pulses on its own rhythm; some get a little cross sparkle.
// Occasionally a shooting star streaks across.
let stage, sctx, W = 0, H = 0, dpr = 1, stars = [], glowCanvas = null;
let targetY = 0, smoothY = 0, shooter = null, nextShooter = 0;
const TINTS = ['255,255,255', '166,240,247', '255,214,140'];

function makeGlowCanvas() {
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const g = c.getContext('2d');
  const grd = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  grd.addColorStop(0, 'rgba(255,255,255,1)');
  grd.addColorStop(0.2, 'rgba(255,255,255,0.55)');
  grd.addColorStop(0.5, 'rgba(255,255,255,0.12)');
  grd.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = grd;
  g.fillRect(0, 0, 64, 64);
  return c;
}

function resizeStars() {
  dpr = Math.min(window.devicePixelRatio || 1, 2);
  W = window.innerWidth;
  H = window.innerHeight;
  stage.width = W * dpr;
  stage.height = H * dpr;
  sctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  const n = Math.min(480, Math.round((W * H) / 2600));
  stars = Array.from({ length: n }, () => {
    const z = Math.random();
    const r = Math.random();
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      z,
      size: (0.45 + Math.random() * 0.9) * (0.45 + z * 0.9),
      tint: r < 0.72 ? TINTS[0] : r < 0.9 ? TINTS[1] : TINTS[2],
      speed: 0.6 + Math.random() * 2.4,
      phase: Math.random() * Math.PI * 2,
      sparkle: Math.random() < 0.035,
    };
  });
}

const wrap = (v, m) => ((v % m) + m) % m;

function drawShooter(now) {
  if (!shooter && now > nextShooter) {
    shooter = { x: W * (0.35 + Math.random() * 0.65), y: H * Math.random() * 0.4, start: now, dur: 950 };
    nextShooter = now + 7000 + Math.random() * 9000;
  }
  if (!shooter) return;
  const p = (now - shooter.start) / shooter.dur;
  if (p >= 1) { shooter = null; return; }
  const x = shooter.x - p * 380;
  const y = shooter.y + p * 190;
  const g = sctx.createLinearGradient(x, y, x + 150, y - 75);
  g.addColorStop(0, 'rgba(255,255,255,0)');
  g.addColorStop(1, `rgba(166,240,247,${0.9 * (1 - p)})`);
  sctx.strokeStyle = g;
  sctx.lineWidth = 1.6;
  sctx.beginPath();
  sctx.moveTo(x, y);
  sctx.lineTo(x + 150, y - 75);
  sctx.stroke();
}

function frame(now) {
  const reduced = document.documentElement.dataset.motion === 'reduced';
  targetY = window.scrollY;
  smoothY = reduced ? targetY : smoothY + (targetY - smoothY) * 0.085; // soft, flowing inertia

  sctx.clearRect(0, 0, W, H);
  sctx.globalCompositeOperation = 'lighter';
  const t = now / 1000;

  for (const s of stars) {
    const flow = reduced ? 0 : smoothY * (0.12 + s.z * 0.5);
    const x = s.x;
    const y = wrap(s.y - flow, H);
    const tw = reduced ? 0.6 : 0.5 + 0.5 * Math.sin(t * s.speed + s.phase);
    const size = s.size * (0.82 + 0.3 * tw);
    const alpha = (0.2 + 0.8 * tw) * (0.4 + 0.6 * s.z);

    sctx.globalAlpha = alpha * 0.5;
    sctx.drawImage(glowCanvas, x - size * 5, y - size * 5, size * 10, size * 10);

    sctx.globalAlpha = Math.min(1, alpha * 1.1);
    sctx.fillStyle = `rgb(${s.tint})`;
    sctx.beginPath();
    sctx.arc(x, y, size, 0, Math.PI * 2);
    sctx.fill();

    if (s.sparkle && tw > 0.6) {
      sctx.globalAlpha = alpha * 0.7;
      sctx.strokeStyle = `rgb(${s.tint})`;
      sctx.lineWidth = 0.7;
      const L = size * 7;
      sctx.beginPath();
      sctx.moveTo(x - L, y); sctx.lineTo(x + L, y);
      sctx.moveTo(x, y - L); sctx.lineTo(x, y + L);
      sctx.stroke();
    }
  }

  sctx.globalCompositeOperation = 'source-over';
  sctx.globalAlpha = 1;
  if (!reduced) drawShooter(now);
  requestAnimationFrame(frame);
}

function initStars() {
  stage = document.createElement('canvas');
  stage.id = 'space';
  stage.setAttribute('aria-hidden', 'true');
  document.body.prepend(stage);
  sctx = stage.getContext('2d');
  glowCanvas = makeGlowCanvas();
  nextShooter = performance.now() + 4000;
  resizeStars();
  window.addEventListener('resize', resizeStars);
  requestAnimationFrame(frame);
}

// ---------- boot ----------
document.documentElement.classList.add('js');
renderChrome();
const storedMotion = localStorage.getItem('motion')
  || (window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'reduced' : 'full');
document.documentElement.dataset.motion = storedMotion;
document.documentElement.dataset.size = localStorage.getItem('size') || 'normal';
const motionBox = document.getElementById('motion-toggle');
if (motionBox) motionBox.checked = storedMotion === 'reduced';
applyLang();
initStars();
observeReveal();
