# The Ninth Planet: Beginner's Guide (version 2)

This guide takes you from "I have a folder of files" to "my website is live on the internet." Each step says what you are doing and why.

---

## 0. What you have

```
ninth-planet/
├── index.html          Home page (rotating 3D Moon, featured stories)
├── exhibition.html     Instrument grid, photo gallery, maps
├── moon-map.html       The Moon with all five Apollo landing sites
├── credits.html        Team, sources, credits, acknowledgments
├── css/style.css       Looks: colours, shadows, vignette, hover effects
├── js/
│   ├── main.js         Header, footer, Thai/English, settings, star field
│   ├── moon3d.js       Loads the 3D Moon, draws the glowing markers
│   ├── hero.js         Home page script
│   └── exhibit.js      Exhibition script: gallery, story, maps
├── data/content.json   ALL the instrument text (Thai and English) and photo list
├── assets/
│   ├── models/moon.glb The 3D Moon (by RenderX, see credits)
│   └── img/            Instrument photos (see assets/img/README.txt)
└── GUIDE.md            This file
```

The site is *static*: plain HTML, CSS and JavaScript. No server or database is needed, which makes it free and simple to host on Vercel.

---

## 1. Install the tools (one time)

1. **VS Code**: https://code.visualstudio.com
2. **Live Server extension**: in VS Code, click the Extensions icon, search *Live Server*, click **Install**.
3. **Git**: https://git-scm.com (default options are fine).
4. **GitHub account**: https://github.com
5. **Vercel account**: https://vercel.com → **Sign Up → Continue with GitHub**.
6. **Supabase** (optional, later): https://supabase.com

---

## 2. Open the project in VS Code

1. Copy the whole `ninth-planet` folder to a place you can find, for example `Documents/`.
2. In VS Code: **File → Open Folder** → choose `ninth-planet`.
3. If asked "Do you trust the authors?", click **Yes**.

---

## 3. Preview it on your computer

1. Open `index.html`.
2. Right-click in the file → **Open with Live Server** (or click **Go Live** at the bottom-right).
3. Your browser opens at something like `http://127.0.0.1:5500/index.html`.

> **Why not double-click?** The site loads `data/content.json` and the 3D Moon. Browsers block those when you open the file directly. Live Server avoids this.

Check the first load. The Moon may take a few seconds because `moon.glb` is about 15 MB. A plain grey sphere shows while it loads.

---

## 4. Photos

- The photos are already in `assets/img/` and linked in `data/content.json`.
- **LEAM** still needs its photo (the Wikimedia Commons link you gave). Follow the steps in `assets/img/README.txt`.
- To add photos to an instrument, see the same README.
- Keep photos below about 500 KB. Use https://squoosh.app to shrink them if needed.
- Check each licence on its Wikimedia Commons page and keep the credit line on the credits page.

---

## 5. Change the words

All instrument text is in `data/content.json`. Each field has an `en` and a `th` version:

```json
"short": { "en": "What makes the Moon shake?", "th": "อะไรทำให้ดวงจันทร์สั่น?" }
```

- Change only the words between the quote marks.
- Keep `en` and `th` together.
- Do not delete commas, braces `{ }` or brackets `[ ]`.
- Check the file at https://jsonlint.com. If it says "Valid," you are fine.

**Before you publish:** check every date and mission number against a NASA source, and have a Thai reader check the Thai text.

---

## 6. Put the project on GitHub

**Option A (buttons in VS Code, easiest):**
1. Click the **Source Control** icon (branch symbol) on the left.
2. Click **Initialize Repository**, then **Publish to GitHub**.
3. Choose private or public, sign in when asked. Done.

**Option B (commands, in **Terminal → New Terminal**):**

```bash
git init
git add .
git commit -m "Version 2 of The Ninth Planet"
git branch -M main
```

Create an empty repository named `ninth-planet` on github.com (no README), then run the two commands GitHub shows you, which look like:

```bash
git remote add origin https://github.com/<your-name>/ninth-planet.git
git push -u origin main
```

> **Note:** the Moon file is 15 MB. GitHub accepts files up to 100 MB, so it is fine.

---

## 7. Put the website on the internet with Vercel

1. Go to https://vercel.com/dashboard → **Add New… → Project**.
2. Find `ninth-planet` and click **Import**. If it is missing, click *Adjust GitHub App Permissions* and allow access.
3. Settings: **Framework Preset: Other**. Leave Build Command and Output Directory empty.
4. Click **Deploy**, wait about a minute, then open your link (`ninth-planet.vercel.app`).

---

## 8. Update the website later

1. Edit and save in VS Code (Ctrl+S / Cmd+S).
2. In **Source Control**, write a short message, click **Commit**, then **Sync Changes**.
3. Vercel redeploys automatically within about a minute.

---

## 9. Add another instrument

1. In `data/content.json`, copy an existing instrument block, paste it at the end of `"instruments"`, and add a comma after the previous block.
2. Change `id`, `abbr`, `name`, `short`, `question`, `story`, `what`, `impact`, `missions`, `category`, `credit`.
3. Add its photos to `"images"` (each has a `src` and a `caption`). Leave `[]` if there are no photos yet.
4. `category` controls the filter buttons: `inside`, `fields`, `particles`, `support`.

---

## 10. Supabase (optional, for later)

You do not need Supabase to launch. It is useful for a visitor feedback box.

1. supabase.com → **New project**. Save the database password.
2. **SQL Editor** → run:

```sql
create table visitor_feedback (
  id bigint generated always as identity primary key,
  created_at timestamptz default now(),
  page text,
  lang text,
  message text
);
alter table visitor_feedback enable row level security;
create policy "anyone can send feedback" on visitor_feedback
  for insert to anon with check (true);
```

3. **Project Settings → API**: copy the Project URL and the **anon public** key. The anon key is safe in website code. **Never** put the `service_role` key in the website.

---

## 11. Test before you submit

On your computer and your phone:

- [ ] Home: the Moon turns slowly and its red-gold markers pulse. Stars twinkle.
- [ ] Scroll: the stars flow up and down with you, closer ones moving faster.
- [ ] Hover a card, a button or a menu link: it glows and grows a little, then returns when you move away.
- [ ] EN / ไทย: all labels change and Thai text fits.
- [ ] Settings ⚙: **Reduce motion** stops the Moon, stars and hover movement. Text size changes.
- [ ] Exhibition: filters and search work. Open an instrument, use the arrows, the thumbnails and (on a phone) swipe.
- [ ] **Read aloud** works (depends on the device voices).
- [ ] **Show maps**: Earth map shows Ann Arbor. Moon shows a pin at the landing site.
- [ ] Moon map: choosing a mission turns the Moon to that site.
- [ ] The phone layout is readable.
- [ ] Your Vercel link opens in a private browser window.

---

## 12. Troubleshooting

| Problem | What to try |
|---|---|
| Moon is a plain grey ball | `moon.glb` did not load. Check it is at `assets/models/moon.glb` (exact name, lowercase). Then reload with Ctrl+F5. |
| Moon loads but markers sit in the wrong place | The model may be turned differently. Tell the team and we can add a rotation offset in `js/moon3d.js`. |
| Photos missing | Check the file name in `content.json` matches the file in `assets/img/` exactly, including `.jpg`. |
| Text shows a code name (e.g. `hero_title`) | That key is missing in `DICT` in `js/main.js`. Check both `en` and `th`. |
| Nothing moves / blank page | Open the browser console (F12). Copy the first red message to Claude. |
| Changes not on Vercel | Check Source Control has no uncommitted changes, then check Vercel → Deployments. |
| `content.json` error | Paste it into jsonlint.com. Usually a missing comma or an extra quote. |

---

## 13. Honesty and credit checklist (for the judges)

- [ ] Each fact is checked against a NASA source. Add links to the credits page.
- [ ] Photos are credited (already on the page). Check each licence.
- [ ] The Moon model credit to RenderX is on the credits page. Check Sketchfab's licence terms for this model and keep any attribution it asks for.
- [ ] Imagined voices are labelled (they are).
- [ ] Thai text was checked by a Thai reader.
- [ ] Team names are filled in.
- [ ] Footer says it is not endorsed by NASA (it does).

Good luck with the challenge.

---

## 14. Version 3: asset pack, moon map and astronauts

**What changed**

- **Moon map** (`moon-map.html`, `js/moonmap.js`): rebuilt as an explorer. The 3D Moon shows the five real Apollo landing sites. Their labels follow the Moon as it turns. Pick a site to see its instruments as chips, then pick a chip to open the dossier with its illustration on the museum plinth. Power (SNAP-27) and findings panels sit below.
- **Astronauts**: two floating astronauts from the asset pack, in the side margins, hidden on phones.
- **Placeholders replaced** with the asset pack: the logo, favicon, icons, the steel APOLLO wordmark, and local fonts (Space Grotesk, Noto Sans Thai, IBM Plex Mono). Google Fonts are no longer loaded.
- **Missing instruments added**: LSPE, LSG, SIDE and CCIG (text from the Canva page you sent).
- **Galleries**: each instrument now has its real NASA photos first, then the concept illustration. Every gallery image is labelled "Photo" or "Concept illustration".

**Where the files are**

| Folder | What it holds |
| --- | --- |
| `assets/instruments/` | Equipment illustrations (transparent PNG) |
| `assets/scene/` | Astronauts, plinth, Moon and Earth illustrations |
| `assets/ui/` | Logo, favicon, icons, steel APOLLO wordmark |
| `fonts/` | Font files and their licence texts (keep these) |
| `styles/fonts.css` | Loads the local fonts |
| `docs/sources.md` | Source list from the asset pack |
| `data/assets.json` | Manifest with sizes and bilingual names |

**Adding an illustration to an instrument:** add an entry to its `"images"` list in `data/content.json` with `"kind": "illustration"`, the path, and a bilingual caption.

**Things to know**

- The asset pack's illustrations are AI-generated concept images, not NASA photographs. The site labels them that way.
- The illustration PNGs are large (about 2 MB each). If pages feel slow, convert them to WebP with alpha, and update the paths.
- The 3D Moon still uses `moon.glb`, which is not in the asset pack. Keep the file in `assets/models/`.
- Pin positions on the 3D Moon need a check in a real browser, because the test environment for this version could not draw the 3D Moon.
