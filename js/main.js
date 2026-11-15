// js/main.js — shared pieces used on every page:
// header and footer, Thai/English switch, settings, star field, reveal animation, read-aloud.

export const DICT = {
  en: {
    nav_home: 'Home', nav_exhibition: 'Exhibition', nav_map: 'Moon map', nav_credits: 'Credits',
    settings: 'Settings', reduce_motion: 'Reduce motion', text_size: 'Text size',
    size_normal: 'A', size_large: 'A+', size_xl: 'A++',
    footer_tag: 'An independent Space Apps project',
    footer_disc: 'NASA Space Apps Challenge 2026 concept · No NASA endorsement implied.',
    hero_tag: "A museum on the Moon",
    hero_title: "Traces of history on the Moon.",
    hero_sub: "When the astronauts went home, their instruments kept exploring.",
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
    what_it_did: "Its role",
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
    mm_eyebrow: 'Apollo Lunar Surface Experiments Package',
    mm_title: 'The experiments left on the Moon',
    mm_intro: 'Five Apollo landing sites where ALSEP instruments were set up. Choose a site or an instrument to explore.',
    mm_disclaimer: 'Site markers show real Apollo landing sites on a 3D model of the Moon. Positions of individual instruments within one site are not shown.',
    mm_sites_head: 'Landing sites',
    mm_site_instruments: 'Instruments at this site',
    mm_dossier: 'MISSION DOSSIER',
    mm_dossier_hint: 'From the exhibition research notes',
    mm_filter_fields: 'Magnetic & gravity',
    filter_particles: 'Atmosphere, dust & solar wind',
    kind_photo: 'Photo',
    kind_illus: 'Concept illustration',
    kind_diagram: 'Diagram',
    mm_none: 'No instruments match this filter.',
    mm_findings_title: 'What the data told us',
    assets_title: 'Assets and fonts',
    assets_illus: 'Concept illustrations: AI-generated, from the Ninth Planet asset pack. They are not NASA photographs or measured reconstructions.',
    assets_fonts: 'Fonts: Space Grotesk, Noto Sans Thai and IBM Plex Mono, all under the SIL Open Font License. Licence texts are in the fonts folder.',
    assets_source: 'Source notes: see docs/sources.md.',
    earth_alt: 'Concept illustration of Earth. It is not a map.',
    credits_eyebrow: 'The people & the paper trail', credits_title: 'Exploration is a shared story.',
    credits_sub: 'Meet the team and explore the sources behind the lunar collection.',
    team_title: 'The Ninth Planet team',
    team_1: "UI & visual design, and development",
    team_3: "Accessibility & polishing",
    team_note: 'Team names and roles to be confirmed.',
    sources_title: 'Follow the evidence.', ack_title: 'Acknowledgments',
    ack_text: "Photographs are NASA photographs, from the team album and NASA archives shared through Wikimedia Commons. Concept illustrations are AI-generated. The 3D Moon uses a texture derived from a model by RenderX on Sketchfab. Historical facts were checked against NASA sources and the team document. Instrument narration is fictionalized and labeled as an imagined voice.",
    moon_credit: '3D Moon model by RenderX on Sketchfab',
    impact: "Data it returned",
    team_2: "Research & fact-checking",
    btn_origin: "Where it began",
    mm_dates: "Dates",
    mm_missionphotos: "Photos from this mission",
    mm_missionsum: "About this mission",
    menu: "Menu",
    photo_close: "Close photo",
    credits_tools: "Tools and credits",
    credits_ai: "AI tools",
    credits_members: "The team",
    mm_landing: "Landing site",
    mm_power: "Power",
    back_exhibit: 'Return to the exhibition',
  },
  th: {
    nav_home: 'หน้าแรก', nav_exhibition: 'นิทรรศการ', nav_map: 'แผนที่ดวงจันทร์', nav_credits: 'ผู้จัดทำ',
    settings: 'ตั้งค่า', reduce_motion: 'ลดการเคลื่อนไหว', text_size: 'ขนาดตัวอักษร',
    size_normal: 'A', size_large: 'A+', size_xl: 'A++',
    footer_tag: 'โครงการอิสระจากงาน Space Apps',
    footer_disc: 'แนวคิดจากการแข่งขัน NASA Space Apps Challenge 2026 · ไม่ได้รับการรับรองจาก NASA',
    hero_tag: "พิพิธภัณฑ์บนดวงจันทร์",
    hero_title: "ร่องรอยประวัติศาสตร์บนดวงจันทร์",
    hero_sub: "เมื่อนักบินอวกาศกลับบ้านแล้ว เครื่องมือของพวกเขายังคงสำรวจต่อไป",
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
    what_it_did: "หน้าที่ของมัน",
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
    mm_eyebrow: 'ชุดทดลองพื้นผิวดวงจันทร์ของอะพอลโล (ALSEP)',
    mm_title: 'ห้องทดลองที่ยังอยู่บนดวงจันทร์',
    mm_intro: 'จุดลงจอดอะพอลโล 5 จุดที่ติดตั้งเครื่องมือ ALSEP เลือกจุดหรือเครื่องมือเพื่อสำรวจรายละเอียด',
    mm_disclaimer: 'หมุดบนภาพดวงจันทร์ 3 มิติแสดงจุดลงจอดอะพอลโลจริง ตำแหน่งเครื่องมือภายในจุดเดียวกันไม่ได้แสดงไว้',
    mm_sites_head: 'จุดลงจอด',
    mm_site_instruments: 'เครื่องมือที่จุดนี้',
    mm_dossier: 'MISSION DOSSIER',
    mm_dossier_hint: 'ข้อมูลจากเอกสารประกอบนิทรรศการ',
    mm_filter_fields: 'แม่เหล็กและแรงโน้มถ่วง',
    filter_particles: 'บรรยากาศ ฝุ่น และลมสุริยะ',
    kind_photo: 'ภาพถ่าย',
    kind_illus: 'ภาพแนวคิด',
    kind_diagram: 'แผนภาพ',
    mm_none: 'ไม่มีเครื่องมือที่ตรงกับตัวกรองนี้',
    mm_findings_title: 'สิ่งที่ข้อมูลจากดวงจันทร์เล่าให้ฟัง',
    assets_title: 'ทรัพยากรภาพและฟอนต์',
    assets_illus: 'ภาพแนวคิด: สร้างด้วย AI จากชุดทรัพยากรของ The Ninth Planet ไม่ใช่ภาพถ่ายจาก NASA และไม่ใช่การสร้างใหม่ที่วัดได้',
    assets_fonts: 'ฟอนต์: Space Grotesk, Noto Sans Thai และ IBM Plex Mono ทั้งหมดอยู่ภายใต้ SIL Open Font License ไฟล์ลิขสิทธิ์อยู่ในโฟลเดอร์ fonts',
    assets_source: 'หมายเหตุแหล่งที่มา: ดูที่ docs/sources.md',
    earth_alt: 'ภาพแนวคิดโลก ไม่ใช่แผนที่',
    credits_eyebrow: 'ผู้คนและหลักฐาน', credits_title: 'การสำรวจคือเรื่องราวร่วมกัน',
    credits_sub: 'พบกับทีมงานและแหล่งข้อมูลเบื้องหลังคอลเลกชันดวงจันทร์',
    team_title: 'ทีม The Ninth Planet',
    team_1: "ออกแบบ UI และภาพ รวมถึงการพัฒนา",
    team_3: "การเข้าถึงและการขัดเกลางาน",
    team_note: 'ชื่อและบทบาทของทีมอยู่ระหว่างการยืนยัน',
    sources_title: 'ตามหาหลักฐาน', ack_title: 'กิตติกรรมประกาศ',
    ack_text: "ภาพถ่ายเป็นภาพของ NASA จากอัลบั้มของทีมและคลังภาพของ NASA ที่เผยแพร่ผ่าน Wikimedia Commons ภาพแนวคิดสร้างด้วย AI พื้นผิวดวงจันทร์ 3 มิติดัดแปลงจากโมเดลโดย RenderX บน Sketchfab ข้อเท็จจริงตรวจสอบกับแหล่งของ NASA และเอกสารของทีมแล้ว เสียงบรรยายของเครื่องมือเป็นเรื่องแต่งที่ระบุไว้ชัดเจน",
    moon_credit: 'โมเดลดวงจันทร์ 3 มิติโดย RenderX บน Sketchfab',
    impact: "ข้อมูลที่ได้จากอุปกรณ์",
    team_2: "ค้นคว้าและตรวจสอบข้อเท็จจริง",
    btn_origin: "จุดเริ่มต้นของโครงการ",
    mm_dates: "วันที่",
    mm_missionphotos: "ภาพจากภารกิจนี้",
    mm_missionsum: "เกี่ยวกับภารกิจนี้",
    menu: "เมนู",
    photo_close: "ปิดภาพ",
    credits_tools: "เครื่องมือและเครดิต",
    credits_ai: "เครื่องมือ AI",
    credits_members: "สมาชิกทีม",
    mm_landing: "จุดลงจอด",
    mm_power: "แหล่งพลังงาน",
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
const PLANET_SVG = `<img src="assets/ui/logo-mark.svg" alt="" width="48" height="32">`;

function renderChrome() {
  const here = location.pathname.split('/').pop() || 'index.html';
  const header = document.getElementById('app-header');
  if (header) {
    header.className = 'site';
    header.innerHTML = `
      <nav class="topnav">
        <a class="brand" href="index.html">${PLANET_SVG}<span>THE NINTH PLANET</span></a>
        <div class="links" id="site-links">${PAGES.map(([href, key]) =>
          `<a href="${href}" class="${href === here ? 'active' : ''}" data-i18n="${key}"></a>`).join('')}
        </div>
        <div class="tools">
          <div class="lang-switch">
            <button class="lang-btn" data-lang="en">EN</button>
            <button class="lang-btn" data-lang="th">ไทย</button>
          </div>
          <button id="menu-btn" class="icon-btn menu-btn" aria-label="Menu" aria-expanded="false" aria-controls="site-links"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#F2F3EF" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg></button>
          <button id="settings-btn" class="icon-btn" aria-label="Settings" aria-expanded="false"><img src="assets/ui/settings.svg" alt="" width="20" height="20"></button>
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
    footer.className = 'site-footer';
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
  const menuBtn = t.closest('#menu-btn');
  if (menuBtn) {
    const open = document.getElementById('site-links').classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
    return;
  }
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
  const sizeBtn = t.closest('.size-switch [data-size]');   // only the text-size buttons, not <html data-size>
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

// ---------- floating astronauts (two, from the asset pack) ----------
// Decorative only: pointer-events off, empty alt text, placed in the side margins,
// and hidden on narrow screens so they never sit over reading text.
function initAstronauts() {
  const spots = [
    { img: 'assets/scene/astronaut-front.png', top: 55, left: 0.5, width: 120, speed: 0.22, rot: -0.02, delay: 0 },
    { img: 'assets/scene/astronaut-back.png', top: 28, right: 0.5, width: 110, speed: -0.18, rot: 0.02, delay: 3 },
  ];
  const layer = document.createElement('div');
  layer.className = 'astro-layer';
  layer.setAttribute('aria-hidden', 'true');
  layer.innerHTML = spots.map((s) => `
    <div class="astro" style="top:${s.top}%;${s.left !== undefined ? `left:${s.left}%` : `right:${s.right}%`};width:${s.width}px">
      <div class="bob" style="animation-delay:-${s.delay}s"><img src="${s.img}" alt="" loading="lazy"></div>
    </div>`).join('');
  const hero = document.querySelector('.hero');
  (hero || document.body).prepend(layer);

  const els = [...layer.querySelectorAll('.astro')];
  const onScroll = () => {
    const reduced = document.documentElement.dataset.motion === 'reduced';
    els.forEach((el, i) => {
      if (reduced) { el.style.transform = ''; return; }
      const y = window.scrollY, s = spots[i];
      el.style.transform = `translate3d(0, ${-y * s.speed}px, 0) rotate(${y * s.rot}deg)`;
    });
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// ---------- click and tap sparkle burst ----------
// Every tap or click throws a small burst of glittering stars from that point.
let burstCanvas = null, bctx = null, bparts = [], bRunning = false, bLast = 0;
const BURST_TINTS = ['255,255,255', '166,240,247', '255,214,140'];

function resizeBurst() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  burstCanvas.width = window.innerWidth * dpr;
  burstCanvas.height = window.innerHeight * dpr;
  bctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function initBurst() {
  burstCanvas = document.createElement('canvas');
  burstCanvas.id = 'burst';
  burstCanvas.setAttribute('aria-hidden', 'true');
  document.body.appendChild(burstCanvas);
  bctx = burstCanvas.getContext('2d');
  resizeBurst();
  window.addEventListener('resize', resizeBurst);
  document.addEventListener('pointerdown', (e) => spawnBurst(e.clientX, e.clientY), { passive: true });
}

function spawnBurst(x, y) {
  if (document.documentElement.dataset.motion === 'reduced') return;
  for (let i = 0; i < 16; i++) {
    const a = (i / 16) * Math.PI * 2 + Math.random() * 0.4;
    const speed = 90 + Math.random() * 170;
    bparts.push({
      x, y,
      vx: Math.cos(a) * speed,
      vy: Math.sin(a) * speed,
      life: 0,
      max: 0.6 + Math.random() * 0.5,
      size: 1.6 + Math.random() * 2.4,
      tint: BURST_TINTS[Math.floor(Math.random() * BURST_TINTS.length)],
    });
  }
  // a brighter centre flash
  bparts.push({ x, y, vx: 0, vy: 0, life: 0, max: 0.35, size: 9, tint: '255,255,255', flash: true });
  if (!bRunning) {
    bRunning = true;
    bLast = performance.now();
    requestAnimationFrame(burstFrame);
  }
}

function drawSparkle(x, y, r, alpha, tint) {
  bctx.globalAlpha = alpha;
  bctx.fillStyle = `rgb(${tint})`;
  bctx.beginPath();
  bctx.arc(x, y, r * 0.55, 0, Math.PI * 2);
  bctx.fill();
  // four thin points, like a star
  bctx.strokeStyle = `rgb(${tint})`;
  bctx.lineWidth = 0.8;
  bctx.beginPath();
  bctx.moveTo(x - r * 2.2, y); bctx.lineTo(x + r * 2.2, y);
  bctx.moveTo(x, y - r * 2.2); bctx.lineTo(x, y + r * 2.2);
  bctx.stroke();
}

function burstFrame(now) {
  const dt = Math.min(0.05, (now - bLast) / 1000);
  bLast = now;
  bctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  bctx.globalCompositeOperation = 'lighter';
  const drag = Math.exp(-dt * 2.6);
  bparts = bparts.filter((p) => {
    p.life += dt;
    if (p.life > p.max) return false;
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    p.vx *= drag;
    p.vy = p.vy * drag + 30 * dt;          // a little drift downward
    const k = 1 - p.life / p.max;
    if (p.flash) {
      drawSparkle(p.x, p.y, p.size * (1 + p.life * 3), k * 0.9, p.tint);
    } else {
      drawSparkle(p.x, p.y, p.size * (0.5 + 0.5 * k), k, p.tint);
    }
    return true;
  });
  bctx.globalAlpha = 1;
  bctx.globalCompositeOperation = 'source-over';
  if (bparts.length) {
    requestAnimationFrame(burstFrame);
  } else {
    bRunning = false;
    bctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  }
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
initAstronauts();
initBurst();
observeReveal();
