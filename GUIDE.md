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
│   ├── textures/moon.jpg The Moon's surface (from the RenderX model, see credits)
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

Check the first load. The Moon should appear almost at once, because its texture is small.

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
| Moon is a plain grey ball | The texture did not load. Check it is at `assets/textures/moon.jpg` (exact name, lowercase). Then reload with Ctrl+F5. |
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
- The 3D Moon is a smooth sphere wearing `assets/textures/moon.jpg`. The old 15 MB model is no longer needed, and was removed from the project to make pages load faster. Keep your original upload as a backup if you like.
- Pin positions on the 3D Moon need a check in a real browser, because the test environment for this version could not draw the 3D Moon.

---

## 15. Version 4: faster Moon, drag to turn, and the maps dialog

- **Why it was slow:** the 15 MB model had 272,000 vertices. The browser had to read and process all of it on the page, and it froze the screen while doing so. That is why the close button could not be clicked while the Moon was loading. The Moon is now a smooth sphere with the texture only.
- **Why the dialog reopened slowly:** each time Show maps was pressed, a new 3D context was created. The one Moon viewer is now created once, reused, and paused when closed.
- **Drag to turn:** drag the Moon in the Show maps dialog or on the Moon map page. It keeps a little momentum, then settles.
- **Earth panel:** when a maker has not been researched yet, the panel shows the Earth illustration with a note, instead of an empty black box.
- **Pin positions:** unchanged. They were checked against the new sphere, and the known dark maria still land on dark ground.

---

## 16. Version 5: landing page layering, Moon glow, scroll fade, dossier objects

- **APOLLO** is behind the Moon's horizon, with a slight tilt so the letters read as curved. The headline and tagline sit over the top of the wordmark.
- **Glow**: a soft cyan halo surrounds the Moon. It is added in `js/moon3d.js` (`addHalo`).
- **Scroll fade**: scroll down and the Moon darkens and fades; scroll up and it rises again. The settings are in `js/hero.js` (`updateFade`).
- **Dossier**: instruments stand on the centre of the plinth's top surface. Each picture's visible base is measured and stored as `feet` in `data/content.json`, so new pictures can be placed the same way.
- **Horizon position**: change `HORIZON_Y` in `js/hero.js` to move the Moon's horizon up or down across APOLLO.

---

## 17. Version 6: iPad and phone layouts, the team's document, team and credits

- **Mobile and iPad:** on screens up to 900 px the astronauts are hidden, dialogs fill the screen, and the moon map stacks into one column. On screens up to 760 px a menu button opens the navigation. Buttons are at least 44 px tall.
- **Fonts:** the Thai fallback is now Thonburi / Sukhumvit Set (built into iOS). The gradient headline no longer uses a filter, because Safari hides text that has both. The variable-font descriptor that iOS rejects was removed. Icons now have explicit sizes, which stops them from drawing as a dot on iPad.
- **Labels from the review:** the home headline and tagline were rewritten, and a "Where it began" button was added. The status reads "Operations ended" (หมดภารกิจการทำงาน). "What it did" became "Its role" (หน้าที่ของมัน). "What it helped us learn" became "Data it returned" (ข้อมูลที่ได้จากอุปกรณ์). Instrument headings show the English full name and abbreviation, with the Thai name underneath.
- **Team document:** the origin section on the home page, a mission block on the moon map (dates, landing site, power, summary), and the five findings are all in `data/content.json`. The Thai text is the team's, with light spacing fixes. The English is a translation to check.
- **Photos:** the 17 extra photos are in `assets/photos/` and appear in each mission's photo strip. The origin section uses the Saturn V launch.
- **Team and credits:** three members are listed with their names in Thai and English. The credits page includes the tools and AI used: Claude and ChatGPT (GPT), Canva, VS Code, GitHub, Vercel, Three.js, Leaflet and Esri imagery, and the fonts.

---

## 18. Version 7: landing page layers and corrected exhibit images

**Landing page, back to front**
1. Page background (dark blue), then the star field (fixed, behind everything).
2. APOLLO wordmark (sits behind the Moon's horizon).
3. The rotating 3D Moon (`js/moon3d.js`, `js/hero.js`). Markers on the far side are hidden so they cannot show past the edge.
4. The shadow gradient (`assets/scene/shadow-gradient.png`). This is the team's image converted into a black overlay whose opacity follows its darkness: white at the top is clear, and black at the bottom is opaque.
5. The scroll fade on the Moon, and the page below the hero sinks from dark blue to black as you scroll (`#scroll-dark`).
6. Headline, tagline and buttons on top.

**Why the landing page looked broken:** the SVG sizing fix from version 6 had given the APOLLO wordmark a square size, so it stretched to about 750 px tall and pushed the text out of view. Every SVG now takes its size from its own shape.

**Exhibit images, checked against the edit guide**
- Each gallery now uses only the photos whose contents match their instrument. Two photos had been swapped (for example, the LSM gallery showed the SWS photo).
- The wrong concept illustrations for **SWS, LSG, SIDE and CCIG** were removed. Those instruments show "Photo coming soon" until real photos are added.
- To add the real photos, save them into `assets/img/` and add them to that instrument's `"images"` list in `data/content.json`. The edit guide's screenshots show the real pictures, but they are screenshots, so I could not use them as image files.
