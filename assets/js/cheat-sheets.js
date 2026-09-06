/* ============================================================
   cheat-sheets.js
   Cheat sheets data + rendering with search & category filter
   and copy-to-clipboard functionality.
   ============================================================ */

(function () {
  "use strict";

  /* ----------------------------------------------------------
     Cheat sheet data.
     Each entry: id, category, titleKey, code (with comment key).
     ---------------------------------------------------------- */
  const sheets = [
    {
      id: "html-basics",
      category: "html",
      titleKey: "sheet_html_title",
      descKey: "sheet_html_desc",
      code: `<!-- HTML Document Structure -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Page Title</title>
</head>
<body>
  <header>...</header>
  <main>...</main>
  <footer>...</footer>
</body>
</html>

<!-- Common Elements -->
<h1>Heading 1</h1>      <!-- up to <h6> -->
<p>Paragraph</p>
<a href="url" target="_blank">Link</a>
<img src="img.jpg" alt="description" />
<ul><li>Unordered list</li></ul>
<ol><li>Ordered list</li></ol>
<div>Block container</div>
<span>Inline container</span>
<input type="text" placeholder="Enter text" />
<button>Click</button>
<form action="/submit" method="post"></form>`,
    },
    {
      id: "css-selectors",
      category: "css",
      titleKey: "sheet_css_title",
      descKey: "sheet_css_desc",
      code: `/* CSS Selectors */
*               {}  /* all elements */
element         {}  /* element name */
.class          {}  /* class */
#id             {}  /* id */
[attr]          {}  /* has attribute */
[attr="value"]  {}  /* exact value */
:first-child    {}  /* first child */
:nth-child(2n)  {}  /* every other */
:hover          {}  /* on hover */
::before        {}  /* pseudo-element */
::after         {}  /* pseudo-element */

/* Box Model */
margin, padding
border, outline
width, height
max-width, min-height

/* Display & Position */
display: block | inline | flex | grid
position: static | relative | absolute | fixed | sticky
top, right, bottom, left
z-index

/* Flexbox */
display: flex;
flex-direction: row | column;
justify-content: start | center | end | space-between;
align-items: start | center | end | stretch;
gap: 1rem;

/* Grid */
display: grid;
grid-template-columns: repeat(3, 1fr);
grid-template-rows: auto;
gap: 1rem;
grid-column: span 2;`,
    },
    {
      id: "js-variables",
      category: "javascript",
      titleKey: "sheet_js_title",
      descKey: "sheet_js_desc",
      code: `// JavaScript Basics

// Variables
let name = "John";       // mutable
const PI = 3.14159;      // constant
var old = "avoid";       // legacy

// Data Types
typeof "text"      // string
typeof 42          // number
typeof true        // boolean
typeof {}          // object
typeof []          // object (array)
typeof null        // object (quirk)

// Functions
function add(a, b) {
  return a + b;
}
const multiply = (a, b) => a * b;

// Template Literals
const greeting = \`Hello, \${name}!\`;

// Arrays
const arr = [1, 2, 3];
arr.push(4);            // add to end
arr.pop();              // remove end
arr.map(x => x * 2);    // transform
arr.filter(x => x > 1); // keep matching
arr.reduce((t, x) => t + x, 0); // sum

// Objects
const user = { name: "A", age: 20 };
user.age = 21;
const { name, age } = user;  // destructure

// Async
async function fetchData() {
  const res = await fetch(url);
  const data = await res.json();
  return data;
}`,
    },
    {
      id: "python-basics",
      category: "python",
      titleKey: "sheet_python_title",
      descKey: "sheet_python_desc",
      code: `# Python Basics

# Variables
name = "John"
age = 20
pi = 3.14159

# Data Types
type("text")     # str
type(42)         # int
type(3.14)       # float
type(True)       # bool
type([1,2,3])    # list
type(("a","b"))  # tuple
type({"k": "v"}) # dict

# Lists & Dicts
arr = [1, 2, 3]
arr.append(4)          # add
arr.pop()              # remove end
[x * 2 for x in arr]   # list comprehension
d = {"name": "A", "age": 20}
d["age"] = 21
d.get("name")

# Functions
def add(a, b):
    return a + b

# Lambda
multiply = lambda a, b: a * b

# If / Loops
if age >= 18:
    print("Adult")
else:
    print("Minor")

for item in arr:
    print(item)

# Exception Handling
try:
    result = 10 / 0
except ZeroDivisionError:
    print("Cannot divide by zero")
finally:
    print("Done")`,
    },
    {
      id: "git-setup",
      category: "git",
      titleKey: "sheet_git_title",
      descKey: "sheet_git_desc",
      code: `# Git Commands

# Setup
git config --global user.name "Your Name"
git config --global user.email "you@example.com"

# Start a repo
git init
git clone <url>
git remote add origin <url>

# Daily workflow
git status                    # check changes
git add <file>                # stage file
git add .                     # stage all
git commit -m "message"       # commit
git push origin main          # upload
git pull origin main          # download

# Branching
git branch                    # list branches
git checkout -b feature-x     # create + switch
git checkout main             # switch branch
git merge feature-x           # merge into current

# Viewing history
git log --oneline             # compact log
git diff                      # uncommitted changes

# Undoing
git reset HEAD <file>         # unstage
git checkout -- <file>        # discard changes
git revert <commit>           # safe undo
git reset --hard HEAD         # DANGEROUS: discard all`,
    },
    {
      id: "html-forms",
      category: "html",
      titleKey: "sheet_forms_title",
      descKey: "sheet_forms_desc",
      code: `<!-- HTML Forms Reference -->

<form action="/submit" method="post">
  <!-- Text input -->
  <input type="text" name="username"
         placeholder="Username" required />

  <!-- Email (built-in validation) -->
  <input type="email" name="email"
         placeholder="you@example.com" required />

  <!-- Password -->
  <input type="password" name="password"
         minlength="8" required />

  <!-- Number -->
  <input type="number" name="age"
         min="0" max="120" step="1" />

  <!-- Checkbox -->
  <label>
    <input type="checkbox" name="subscribe" checked />
    Subscribe to newsletter
  </label>

  <!-- Radio group -->
  <input type="radio" name="plan" value="free" checked />
  <input type="radio" name="plan" value="pro" />

  <!-- Select dropdown -->
  <select name="country">
    <option value="">Select...</option>
    <option value="us">United States</option>
    <option value="uk">United Kingdom</option>
  </select>

  <!-- Textarea -->
  <textarea name="message" rows="4"
            placeholder="Your message"></textarea>

  <!-- File upload -->
  <input type="file" name="avatar" accept="image/*" />

  <!-- Hidden field -->
  <input type="hidden" name="token" value="abc123" />

  <!-- Submit button -->
  <button type="submit">Submit</button>
</form>`,
    },
    {
      id: "flexbox-guide",
      category: "css",
      titleKey: "sheet_flex_title",
      descKey: "sheet_flex_desc",
      code: `/* Flexbox Cheat Sheet */

.container {
  display: flex;
}

/* Main Axis (row by default) */
flex-direction: row;        /* left → right */
flex-direction: row-reverse;
flex-direction: column;     /* top → bottom */
flex-direction: column-reverse;

/* Alignment on main axis */
justify-content: flex-start;    /* default */
justify-content: flex-end;
justify-content: center;
justify-content: space-between; /* equal gaps */
justify-content: space-around;
justify-content: space-evenly;

/* Alignment on cross axis */
align-items: stretch;       /* default */
align-items: flex-start;
align-items: flex-end;
align-items: center;
align-items: baseline;

/* Wrap and gaps */
flex-wrap: nowrap | wrap | wrap-reverse;
gap: 1rem;          /* row & column gap */
row-gap: 1rem;
column-gap: 1rem;

/* Child items */
.item {
  flex-grow: 1;    /* grow to fill space */
  flex-shrink: 1;  /* shrink if needed */
  flex-basis: 0;   /* initial size */
  flex: 1 1 0;     /* shorthand */
  align-self: center; /* override align-items */
  order: 1;        /* reorder items */
}

/* Centering a box */
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}`,
    },
    {
      id: "json-cheat",
      category: "javascript",
      titleKey: "sheet_json_title",
      descKey: "sheet_json_desc",
      code: `// JSON Working with Cheat Sheet

// JSON Data Format
{
  "name": "John Doe",
  "age": 30,
  "isStudent": true,
  "courses": ["Math", "CS"],
  "scores": {
    "math": 95,
    "science": 88
  },
  "graduated": null
}

// Valid JSON Rules
// - Double quotes ONLY (no single quotes)
// - No trailing commas
// - Keys must be quoted
// - No comments
// - Top level: object {} or array []

// JavaScript: Parse JSON string
const jsonString = '{"name":"John","age":30}';
const obj = JSON.parse(jsonString);
console.log(obj.name);  // John

// JavaScript: Stringify object
const str = JSON.stringify(obj);
// {"name":"John","age":30}

// Format / pretty print
const pretty = JSON.stringify(obj, null, 2);

// Safe parse (avoid throwing)
function safeParse(str) {
  try {
    return JSON.parse(str);
  } catch (e) {
    return null;
  }
}

// Serialize with indentation
const data = { user: { id: 1, name: "A" } };
JSON.stringify(data, null, "\\t");`,
    },
  ];

  let currentCategory = "all";

  /* ----------------------------------------------------------
     Render cheat sheet cards into container.
     @param {string} lang - current language
     ---------------------------------------------------------- */
  function renderCheatSheets(lang) {
    const container = document.querySelector("[data-sheets-container]");
    if (!container) return;
    lang = lang || Lang.get();

    const searchTerm = (globalThis._sheetSearch || "").trim().toLowerCase();
    const resultsEl = document.querySelector("[data-results-count]");

    const filtered = sheets.filter(function (sheet) {
      const matchesCategory = currentCategory === "all" || sheet.category === currentCategory;
      if (!matchesCategory) return false;
      if (!searchTerm) return true;
      const title = (Lang.t(sheet.titleKey, lang) || "").toLowerCase();
      const desc = (Lang.t(sheet.descKey, lang) || "").toLowerCase();
      return title.indexOf(searchTerm) !== -1 || desc.indexOf(searchTerm) !== -1;
    });

    // Update visible results count
    if (resultsEl) {
      resultsEl.innerHTML = "<strong>" + filtered.length + "</strong> " + Lang.t("cs_results", lang);
    }

    container.innerHTML = "";

    if (filtered.length === 0) {
      const empty = document.createElement("div");
      empty.className = "col-span-full text-center py-12 text-slate-500";
      empty.textContent = lang === "ar" ? "لا توجد نتائج" : "No results found.";
      container.appendChild(empty);
      return;
    }

    filtered.forEach(function (sheet) {
      const card = document.createElement("article");
      card.className = "bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col";

      // Header
      const header = document.createElement("div");
      header.className = "flex items-center justify-between p-5 border-b border-slate-100";
      const titleWrap = document.createElement("div");
      const category = document.createElement("span");
      category.className = "inline-block px-2.5 py-0.5 rounded-full text-xs font-medium mb-1.5 " +
        (sheet.category === "html" ? "bg-orange-100 text-orange-700" :
         sheet.category === "css" ? "bg-blue-100 text-blue-700" :
         sheet.category === "javascript" ? "bg-yellow-100 text-yellow-700" :
         sheet.category === "python" ? "bg-emerald-100 text-emerald-700" :
         "bg-rose-100 text-rose-700");
      category.textContent = Lang.t("cs_category_" + sheet.category, lang);
      titleWrap.appendChild(category);
      const title = document.createElement("h3");
      title.className = "text-base font-semibold text-slate-900";
      title.textContent = Lang.t(sheet.titleKey, lang);
      titleWrap.appendChild(title);
      header.appendChild(titleWrap);

      const copyBtn = document.createElement("button");
      copyBtn.className = "copy-btn shrink-0 px-3 py-1.5 rounded-md bg-indigo-50 text-indigo-700 text-xs font-semibold hover:bg-indigo-100 transition border border-indigo-200";
      copyBtn.textContent = "⧉ " + Lang.t("cs_copy", lang);
      copyBtn.setAttribute("aria-label", "Copy code");
      header.appendChild(copyBtn);
      card.appendChild(header);

      // Code block
      const preWrap = document.createElement("div");
      preWrap.className = "relative bg-slate-900 p-4 flex-1";
      const pre = document.createElement("pre");
      pre.className = "cheat-code text-xs text-emerald-300 whitespace-pre-wrap overflow-x-auto leading-relaxed";
      pre.textContent = sheet.code;  // textContent = safe, no XSS
      preWrap.appendChild(pre);
      card.appendChild(preWrap);

      copyBtn.addEventListener("click", function () {
        if (globalThis.copyToClipboard) {
          globalThis.copyToClipboard(sheet.code, copyBtn);
        }
      });

      container.appendChild(card);
    });
  }

  globalThis.renderCheatSheets = renderCheatSheets;

  /* ----------------------------------------------------------
     Init: wire search, category filters and initial render
     ---------------------------------------------------------- */
  ready(function () {
    const searchInput = document.querySelector("[data-sheets-search]");
    if (searchInput) {
      searchInput.addEventListener("input", function () {
        globalThis._sheetSearch = sanitizeInput(searchInput.value);
        renderCheatSheets(Lang.get());
      });
    }

    const catButtons = document.querySelectorAll("[data-category]");
    catButtons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        catButtons.forEach(function (b) {
          b.classList.remove("bg-indigo-600", "text-white");
          b.classList.add("bg-white", "text-slate-600", "border-slate-300");
        });
        btn.classList.add("bg-indigo-600", "text-white");
        btn.classList.remove("bg-white", "text-slate-600", "border-slate-300");
        currentCategory = btn.getAttribute("data-category");
        renderCheatSheets(Lang.get());
      });
    });

    if (typeof Lang !== "undefined" && Lang.get) {
      renderCheatSheets(Lang.get());
    }
  });

  function ready(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn);
    } else {
      fn();
    }
  }
})();
