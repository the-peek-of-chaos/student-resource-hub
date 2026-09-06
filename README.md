# StudentHub — Student Resource & Mini-Tool Hub

A professional, secure, multi-page student resource and mini-tool hub website.
Built with Tailwind CSS (CDN), vanilla JavaScript, and designed for instant
deployment on GitHub Pages or Vercel.

---

## 🗂 Project Structure

```
student-hub/
├── index.html            # Home / Landing page
├── cheat-sheets.html     # Programming cheat sheets (copy-to-clipboard)
├── tools.html            # Interactive JavaScript mini-tools
├── contact.html          # Secure contact form
├── assets/
│   ├── css/
│   │   └── styles.css    # Custom styles (toasts, scrollbar, RTL helpers)
│   └── js/
│       ├── sanitize.js      # XSS-prevention / input sanitization utilities
│       ├── language.js      # English ↔ Arabic translation engine
│       ├── main.js          # Nav, language toggle, clipboard, toasts
│       ├── cheat-sheets.js  # Cheat sheet data + search/filter/copy
│       ├── tools.js         # Mini-tool rendering and logic
│       └── contact.js       # Contact form validation & sanitization
└── README.md
```

---

## ✨ Features

### 1. Multi-Page Structure
- **index.html** — Hero, stats, featured resources, CTA banner
- **cheat-sheets.html** — 8 cheat sheets (HTML, CSS, JS, Python, Git) with
  search, category filters, and copy-to-clipboard
- **tools.html** — 6 interactive tools: Text Counter, Case Converter,
  JSON Formatter, Password Generator, Color Converter, Lorem Ipsum Generator
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

### 4. Monetization & Analytics Placeholders
- `<!-- ADSTERRA_BANNER_SLOT -->` and `<!-- ADSENSE_TOP_SLOT -->` comments in
  strategic layout locations
- Google Analytics `gtag.js` placeholder script in every `<head>`

---

## 🧩 Adding Content

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