# StudentHub — Student Resource & Mini-Tool Hub

A modern, dark-themed educational platform with multi-level coding tracks,
interactive study tools, and an instant fuzzy search. Built with Tailwind CSS
(CDN), vanilla JavaScript, and designed for instant deployment on GitHub Pages
or Vercel.

---

## 🗂 Project Structure

```
student-hub/
├── index.html            # Home / Landing page (bento grid + global search)
├── cheat-sheets.html     # Multi-level learning tracks + cheat sheets
├── tools.html            # Pomodoro timer, GPA calculator & utility tools
├── contact.html          # Secure contact form
├── assets/
│   ├── css/
│   │   └── styles.css    # Dark theme, glassmorphism, bento grids, animations
│   └── js/
│       ├── sanitize.js      # XSS-prevention / input sanitization utilities
│       ├── language.js      # English ↔ Arabic translation engine
│       ├── main.js          # Nav, global fuzzy search, scroll reveal, toasts
│       ├── cheat-sheets.js  # Learning tracks + cheat sheet data/render/copy
│       ├── tools.js         # Pomodoro, GPA + mini-tool rendering and logic
│       └── contact.js       # Contact form validation & sanitization
└── README.md
```

---

## ✨ Features

### 1. Modern Dark UI / UX
- **Bento Grid** dashboard layout for featured content and tools
- **Glassmorphism cards** (`backdrop-blur`, translucent slate backgrounds)
  with `hover:scale-[1.01]`, smooth `transition`, and glowing ambient shadows
- **Fade-in / scroll-reveal animations**, reduced-motion support, and clean
  responsive sticky navigation

### 2. Multi-Level Learning Tracks
- **HTML, CSS, Python, JavaScript** tracks, each with three tiers:
  - Beginner Fundamentals
  - Applied Practical Examples
  - Mini-Project Guide (goal, steps, pro tips, and reference code)
- **Syntax-highlighted code blocks** with a functional **Copy Code** button
  and green `Copied!` visual feedback

### 3. Interactive Student Tools (client-side)
- **Pomodoro Focus Timer** — SVG ring countdown with focus/short/long modes
- **GPA Calculator** — add courses (grade + credit hours), live semester and
  cumulative GPA, persisted to `localStorage`
- **Instant Fuzzy Search** — real-time filtering across lessons, tools, and
  cheat sheets that highlights matching cards without page reloads
- Plus existing utilities: Text Counter, Case Converter, JSON Formatter,
  Password Generator, Color Converter, Lorem Ipsum Generator

### 4. Pages
- **index.html** — Hero, stats, featured bento resources, quick links
- **cheat-sheets.html** — 4 multi-level tracks + 8 cheat sheets with search,
  category filters, and copy-to-clipboard
- **tools.html** — Tabbed panels for Pomodoro / GPA / utility tools
- **contact.html** — Fully validated & sanitized contact form with honeypot

### 2. Language Toggle (English ⇄ العربية)
- Sleek button in the navbar on every page
- Instant client-side translation via `data-i18n` attributes
- RTL/LTR direction switching, persisted in `localStorage`
- Default language: **English**

### 3. Security
- **Content Security Policy (CSP)** meta tags on every page
- Input sanitization (`sanitize.js`) applied to all user inputs
- HTML-entity encoding, dangerous URL/tag stripping, XSS protection
- Email/URL validation helpers
- Contact form honeypot anti-spam field
- No inline event handlers — all listeners attached via `addEventListener`
- Code blocks rendered via `textContent` / entity-encoded HTML (no XSS)

### 4. Monetization & Analytics Placeholders
- `<!-- ADSTERRA_BANNER_SLOT -->` and `<!-- ADSENSE_TOP_SLOT -->` comments in
  strategic layout locations
- Google Analytics `gtag.js` placeholder script in every `<head>`

---

## 🧩 Adding Content

### Adding a Learning Track
Edit `assets/js/cheat-sheets.js` — add a new object to the `tracks` array with
`id`, `nameKey`, `descKey`, and `levels` for `beginner`, `applied`, and
`project`. Each level includes a `titleKey`, optional `summary`, and `code`.
Then add the corresponding translation keys to `assets/js/language.js`.

### Adding a Cheat Sheet
Edit `assets/js/cheat-sheets.js`:

```js
{
  id: "my-sheet",
  category: "html",             // html | css | javascript | python | git
  titleKey: "sheet_mine_title",
  descKey: "sheet_mine_desc",
  code: `...code here...`,
}
```

Then add `sheet_mine_title` and `sheet_mine_desc` keys to both the `en` and
`ar` blocks in `assets/js/language.js`.

### Adding a Tool
Edit `assets/js/tools.js`, adding a new tool object with an `init(container)`
function that injects the tool's HTML and wires up its events.

### Adding a Searchable Card
Any element with `data-search-card`, `data-search-tags`, and `data-search-title`
is automatically picked up by the instant fuzzy search (`data-global-search`)
on every page.

---

## 🚀 Deployment

### GitHub Pages
1. Push this folder to a GitHub repository.
2. **Settings → Pages** → Deploy from `main` branch, root folder.
3. Done.

### Vercel
```bash
npm i -g vercel
vercel
```
Choose the project folder; static output will be detected automatically.

---

## ⚙️ Configuration Checklist

Before going live:

- [ ] Replace `GA_MEASUREMENT_ID` in the `<head>` of every HTML page.
- [ ] Add real ad network snippets where the placeholder comments sit.
- [ ] Point the contact form at a real backend / email service in
      `assets/js/contact.js`.
- [ ] Review/relax the CSP `connect-src` if you add third-party APIs.

---

## 📄 License

Free to use for any project.