/* ============================================================
   cheat-sheets.js
   Multi-level learning tracks for HTML, CSS, Python and
   JavaScript, plus cheat sheet grid with copy-to-clipboard
   and lightweight syntax highlighting.
   ============================================================ */

(function () {
  "use strict";

  /* ----------------------------------------------------------
     Multi-Level Learning Tracks
     Each track has three levels:
       - beginner: fundamentals summary
       - applied: practical examples (code)
       - project: mini-project guide (goal, steps, tips, code)
     ---------------------------------------------------------- */
  const tracks = [
    {
      id: "html",
      nameKey: "html_track_title",
      descKey: "html_track_desc",
      color: "orange",
      badge: "#f97316",
      levels: {
        beginner: {
          titleKey: "b_html",
          summary: "Become comfortable reading and writing HTML documents.",
          code: `<!-- Beginner Fundamentals -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My First Page</title>
</head>
<body>
  <h1>Welcome</h1>
  <p>This is a paragraph.</p>
  <ul>
    <li>Item one</li>
    <li>Item two</li>
  </ul>
  <a href="https://example.com">A link</a>
  <img src="photo.jpg" alt="A photo">
</body>
</html>`,
        },
        applied: {
          titleKey: "a_html",
          summary: "Build semantic, accessible, real-world markup.",
          code: `<!-- Applied: Semantic layout + accessible form -->
<header class="site-header">
  <nav aria-label="Main navigation">
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/about">About</a></li>
    </ul>
  </nav>
</header>

<main>
  <article>
    <h2>Article title</h2>
    <p>Content goes here.</p>
    <figure>
      <img src="diagram.png" alt="Flow diagram">
      <figcaption>Figure 1: Process flow</figcaption>
    </figure>
  </article>

  <section aria-label="Contact form">
    <form action="/submit" method="post">
      <label for="email">Email</label>
      <input id="email" type="email" name="email" required>

      <label for="message">Message</label>
      <textarea id="message" name="message" rows="4" required></textarea>

      <button type="submit">Send</button>
    </form>
  </section>
</main>`,
        },
        project: {
          titleKey: "p_html",
          goalKey: "project_1_goal",
          goal: "Build a complete multi-section landing page for a product or club, with a semantic structure and a working contact form.",
          steps: [
            "Create the HTML skeleton with <!DOCTYPE html> and <head>.",
            "Add a <header> with a navigation bar linking to sections.",
            "Build <section> blocks for Hero, Features, About and Contact.",
            "Use semantic tags: <main>, <article>, <figure>, <nav>.",
            "Add an accessible <form> with <label> for every input.",
            "Validate the page with the W3C validator.",
          ],
          tips: [
            "Never skip the <title> and meta description for SEO.",
            "Use alt text on all images for accessibility.",
            "Group related content with <section> and <article>.",
          ],
          code: `<!-- Mini-Project: Landing page skeleton -->
<body>
  <header>
    <nav>
      <ul>
        <li><a href="#hero">Hero</a></li>
        <li><a href="#features">Features</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  </header>

  <main>
    <section id="hero">
      <h1>Landing Page</h1>
      <p>Short tagline here.</p>
      <a href="#contact" class="btn">Get Started</a>
    </section>

    <section id="features">
      <h2>Features</h2>
      <article>
        <h3>Feature one</h3>
        <p>Description...</p>
      </article>
    </section>

    <section id="contact">
      <h2>Contact us</h2>
      <form action="/submit" method="post">
        <label for="name">Name</label>
        <input id="name" name="name" type="text" required>
        <label for="email">Email</label>
        <input id="email" name="email" type="email" required>
        <button type="submit">Send</button>
      </form>
    </section>
  </main>
</body>`,
        },
      },
    },
    {
      id: "css",
      nameKey: "css_track_title",
      descKey: "css_track_desc",
      color: "blue",
      badge: "#3b82f6",
      levels: {
        beginner: {
          titleKey: "b_css",
          summary: "Understand how CSS styles HTML using selectors and the cascade.",
          code: `/* Beginner Fundamentals */
/* Selectors */
body {
  font-family: Arial, sans-serif;
  color: #333;
}

/* Class selector */
.card {
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
}

/* ID selector */
#header {
  background: #4f46e5;
  color: white;
}

/* Box model */
.box {
  margin: 10px;
  padding: 20px;
  border: 2px solid #000;
  width: 200px;
}`,
        },
        applied: {
          titleKey: "a_css",
          summary: "Master Flexbox and Grid for responsive modern layouts.",
          code: `/* Applied: Flexbox + Grid + responsive */
/* Flexbox card layout */
.row {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.card {
  flex: 1 1 250px;
  display: flex;
  flex-direction: column;
}

/* Grid dashboard */
.dashboard {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
}

/* Responsive breakpoint */
@media (max-width: 640px) {
  .row { flex-direction: column; }
  .dashboard { grid-template-columns: 1fr; }
}

/* Centering */
.center {
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease;
}`,
        },
        project: {
          titleKey: "p_css",
          goalKey: "project_2_goal",
          goal: "Style a dark-themed dashboard using glassmorphism cards, a responsive bento grid, and smooth micro-interactions.",
          steps: [
            "Set a dark base with a gradient body background.",
            "Create a responsive grid using display: grid with auto-fit.",
            "Style cards with backdrop-filter blur and translucent bg.",
            "Add hover states: scale(1.01) and ambient box-shadows.",
            "Use CSS variables for the color palette.",
            "Test on mobile, tablet and desktop breakpoints.",
          ],
          tips: [
            "Use CSS custom properties for colors and spacing.",
            "Include prefers-reduced-motion to disable animations.",
            "Add fallbacks for browsers without backdrop-filter.",
          ],
          code: `/* Mini-Project: Glass dashboard */
:root {
  --bg: #0f172a;
  --card: rgba(255,255,255,0.05);
  --border: rgba(255,255,255,0.1);
  --blue: #3b82f6;
  --emerald: #10b981;
}

body {
  background: var(--bg);
  color: #e2e8f0;
  font-family: system-ui, sans-serif;
}

.dashboard {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  padding: 2rem;
}

.card {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 1rem;
  backdrop-filter: blur(12px);
  padding: 1.5rem;
  transition: transform 0.3s, box-shadow 0.3s;
}

.card:hover {
  transform: scale(1.01);
  box-shadow: 0 0 30px rgba(59,130,246,0.15);
}

@media (prefers-reduced-motion: reduce) {
  .card { transition: none; }
} `,
        },
      },
    },
    {
      id: "python",
      nameKey: "python_track_title",
      descKey: "python_track_desc",
      color: "emerald",
      badge: "#10b981",
      levels: {
        beginner: {
          titleKey: "b_python",
          summary: "Get comfortable with variables, types, conditionals and loops.",
          code: `# Beginner Fundamentals
# Variables and types
name = "Ada"
age = 36
height = 1.75
is_student = True

# Conditionals
if age >= 18:
    print("Adult")
else:
    print("Minor")

# Loops
for i in range(5):
    print(i)

# Lists
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit)

# Functions
def greet(person):
    return "Hello, " + person

print(greet(name))`,
        },
        applied: {
          titleKey: "a_python",
          summary: "Work with comprehensions, file I/O, and error handling.",
          code: `# Applied: Comprehensions + File I/O + Errors
# List comprehension
squares = [x ** 2 for x in range(10)]

# Dict comprehension
scores = {name: 95 for name in ["Ada", "Grace"]}

# File I/O
with open("data.txt", "w") as f:
    f.write("hello")

with open("data.txt", "r") as f:
    content = f.read()

# Error handling
try:
    num = int(input("Enter a number: "))
except ValueError:
    print("That's not a number!")
else:
    print("You entered:", num)
finally:
    print("Done.")

# Enumerate / zip
for idx, fruit in enumerate(fruits):
    print(idx, fruit)`,
        },
        project: {
          titleKey: "p_python",
          goalKey: "project_3_goal",
          goal: "Build a command-line Grade Tracker that lets students add courses and grades, then saves them to a CSV file.",
          steps: [
            "Define a Course dataclass with name, grade and credits.",
            "Implement add_course() and a main() loop with a menu.",
            "Calculate weighted GPA using grade → points mapping.",
            "Write the course list to a CSV file on exit.",
            "Load existing data from the CSV on startup.",
            "Wrap CSV/input operations in try/except.",
          ],
          tips: [
            "Use the csv module for reliable file handling.",
            "Keep grade→point mapping in a dictionary.",
            "Validate user input before processing.",
          ],
          code: `# Mini-Project: Grade Tracker CLI
import csv
from dataclasses import dataclass

POINTS = {
    "A": 4.0, "A-": 3.7,
    "B+": 3.3, "B": 3.0, "B-": 2.7,
    "C+": 2.3, "C": 2.0, "C-": 1.7,
    "D": 1.0, "F": 0.0,
}

@dataclass
class Course:
    name: str
    grade: str
    credits: int

def gpa(courses):
    total = sum(c.credits * POINTS[c.grade] for c in courses)
    units = sum(c.credits for c in courses)
    return total / units if units else 0.0

def save(courses, path="grades.csv"):
    with open(path, "w", newline="") as f:
        writer = csv.writer(f)
        writer.writerow(["name", "grade", "credits"])
        for c in courses:
            writer.writerow([c.name, c.grade, c.credits])

def load(path="grades.csv"):
    courses = []
    try:
        with open(path, newline="") as f:
            for row in csv.DictReader(f):
                courses.append(Course(row["name"], row["grade"], int(row["credits"])))
    except FileNotFoundError:
        pass
    return courses

def main():
    courses = load()
    while True:
        print("\\n1. Add course  2. Show GPA  3. Save & exit")
        choice = input("Choose: ")
        if choice == "1":
            name = input("Course name: ")
            grade = input("Grade (A, B+, ...): ").upper()
            credits = int(input("Credits: "))
            courses.append(Course(name, grade, credits))
        elif choice == "2":
            print("GPA:", round(gpa(courses), 2))
        elif choice == "3":
            save(courses)
            break

if __name__ == "__main__":
    main()`,
        },
      },
    },
    {
      id: "js",
      nameKey: "js_track_title",
      descKey: "js_track_desc",
      color: "yellow",
      badge: "#eab308",
      levels: {
        beginner: {
          titleKey: "b_js",
          summary: "Learn core JavaScript: variables, functions, arrays, objects.",
          code: `// Beginner Fundamentals
// Variables
let score = 0;
const MAX = 100;

// Functions
function add(a, b) {
  return a + b;
}
const multiply = (a, b) => a * b;

// Arrays
const items = ["pen", "book"];
items.push("notebook");
const nums = items.map((item) => item.length);

// Objects
const student = {
  name: "Ada",
  grade: 95,
  isPassing: function () {
    return this.grade >= 60;
  },
};

// Template literals
console.log(\`Hello, \${student.name}!\`);`,
        },
        applied: {
          titleKey: "a_js",
          summary: "Interact with the DOM, handle events, and use async fetch.",
          code: `// Applied: DOM + Events + Async
// Select an element
const btn = document.querySelector("#submit");

// Add an event listener
btn.addEventListener("click", (event) => {
  event.preventDefault();
  const name = document.querySelector("#name").value;
  console.log("Hello", name);
});

// Create and append elements
const li = document.createElement("li");
li.textContent = "New item";
document.querySelector("ul").appendChild(li);

// Async fetch
async function loadUser() {
  try {
    const res = await fetch("/api/user");
    if (!res.ok) throw new Error(res.status);
    const data = await res.json();
    render(data);
  } catch (err) {
    console.error(err);
  }
}

// Array methods chains
const adults = students
  .filter((s) => s.age >= 18)
  .map((s) => s.name)
  .sort();`,
        },
        project: {
          titleKey: "p_js",
          goalKey: "project_4_goal",
          goal: "Build an interactive to-do list app that stores tasks in localStorage and supports add, complete, and delete.",
          steps: [
            "Set up the HTML with an input, add button and <ul>.",
            "Render tasks from the stored array on load.",
            "Handle form submit to add a new task.",
            "Toggle complete on click and update storage.",
            "Add delete buttons that remove a task.",
            "Persist state to localStorage after every change.",
          ],
          tips: [
            "Store tasks as an array of objects, not strings.",
            "Re-render the whole list after each mutation for simplicity.",
            "Guard window.localStorage with try/catch.",
          ],
          code: `// Mini-Project: To-Do App
const tasks = loadTasks();
const form = document.querySelector("#task-form");
const input = document.querySelector("#task-input");
const list = document.querySelector("#task-list");

function loadTasks() {
  try {
    return JSON.parse(localStorage.getItem("tasks")) || [];
  } catch {
    return [];
  }
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function render() {
  list.innerHTML = "";
  tasks.forEach((task, idx) => {
    const li = document.createElement("li");
    li.textContent = task.text;
    if (task.done) li.classList.add("done");
    li.addEventListener("click", () => {
      tasks[idx].done = !tasks[idx].done;
      saveTasks();
      render();
    });
    const del = document.createElement("button");
    del.textContent = "✕";
    del.addEventListener("click", (e) => {
      e.stopPropagation();
      tasks.splice(idx, 1);
      saveTasks();
      render();
    });
    li.appendChild(del);
    list.appendChild(li);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (text) {
    tasks.push({ text, done: false });
    saveTasks();
    render();
    input.value = "";
  }
});

render();`,
        },
      },
    },
  ];

  /* ----------------------------------------------------------
     Cheat sheet data (existing single-sheet references)
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
<h1>Heading 1</h1>
<p>Paragraph</p>
<a href="url" target="_blank">Link</a>
<img src="img.jpg" alt="description" />
<ul><li>Unordered list</li></ul>
<div>Block container</div>
<span>Inline container</span>
<input type="text" placeholder="Enter text" />
<button>Click</button>`,
    },
    {
      id: "css-selectors",
      category: "css",
      titleKey: "sheet_css_title",
      descKey: "sheet_css_desc",
      code: `/* CSS Selectors */
.class          {}  /* class */
#id             {}  /* id */
element         {}  /* element name */
[attr="value"]  {}  /* exact value */
:hover          {}  /* on hover */
::before        {}  /* pseudo-element */

/* Box Model */
margin, padding, border
width, height, max-width

/* Display & Position */
display: block | inline | flex | grid
position: static | relative | absolute | fixed | sticky
z-index

/* Flexbox */
display: flex;
flex-direction: row | column;
justify-content: start | center | end | space-between;
align-items: start | center | stretch;
gap: 1rem;

/* Grid */
display: grid;
grid-template-columns: repeat(3, 1fr);
gap: 1rem;`,
    },
    {
      id: "js-variables",
      category: "javascript",
      titleKey: "sheet_js_title",
      descKey: "sheet_js_desc",
      code: `// JavaScript Basics
let name = "John";
const PI = 3.14159;

// Functions
function add(a, b) { return a + b; }
const multiply = (a, b) => a * b;

// Template Literals
const greeting = \`Hello, \${name}!\`;

// Arrays
const arr = [1, 2, 3];
arr.push(4);
arr.map(x => x * 2);
arr.filter(x => x > 1);
arr.reduce((t, x) => t + x, 0);

// Objects
const user = { name: "A", age: 20 };
const { name, age } = user;

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
name = "John"
age = 20

# Lists & Dicts
arr = [1, 2, 3]
arr.append(4)
[x * 2 for x in arr]

d = {"name": "A", "age": 20}
d.get("name")

# Functions
def add(a, b):
    return a + b

multiply = lambda a, b: a * b

# Loops
for item in arr:
    print(item)

# Exception Handling
try:
    result = 10 / 0
except ZeroDivisionError:
    print("Cannot divide by zero")`,
    },
    {
      id: "git-setup",
      category: "git",
      titleKey: "sheet_git_title",
      descKey: "sheet_git_desc",
      code: `# Git Commands
git config --global user.name "Your Name"
git config --global user.email "you@example.com"

git init
git clone <url>
git remote add origin <url>

git status
git add .
git commit -m "message"
git push origin main
git pull origin main

git branch
git checkout -b feature-x
git checkout main
git merge feature-x

git log --oneline
git diff
git reset HEAD <file>
git revert <commit>`,
    },
    {
      id: "html-forms",
      category: "html",
      titleKey: "sheet_forms_title",
      descKey: "sheet_forms_desc",
      code: `<!-- HTML Forms Reference -->
<form action="/submit" method="post">
  <input type="text" name="username" required />
  <input type="email" name="email" required />
  <input type="password" name="password" minlength="8" required />
  <input type="number" name="age" min="0" max="120" />

  <label>
    <input type="checkbox" name="subscribe" checked />
    Subscribe
  </label>

  <select name="country">
    <option value="">Select...</option>
    <option value="us">United States</option>
  </select>

  <textarea name="message" rows="4"></textarea>
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
  flex-direction: row;       /* row | column */
  justify-content: center;   /* start | center | space-between */
  align-items: center;       /* stretch | start | center */
  flex-wrap: wrap;
  gap: 1rem;
}

.item {
  flex: 1 1 0;    /* grow shrink basis */
  align-self: center;
  order: 1;
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
      code: `// JSON Working Cheat Sheet
{
  "name": "John Doe",
  "age": 30,
  "isStudent": true,
  "courses": ["Math", "CS"]
}

// Parse / Stringify
const obj = JSON.parse(jsonString);
const str = JSON.stringify(obj);

// Pretty print
const pretty = JSON.stringify(obj, null, 2);

// Safe parse
function safeParse(str) {
  try {
    return JSON.parse(str);
  } catch (e) {
    return null;
  }
}`,
    },
  ];

  let currentCategory = "all";

  /* ----------------------------------------------------------
     Lightweight syntax highlighting for code strings.
     Wraps keywords, strings, comments, numbers and HTML tags
     in span classes defined in styles.css.
     @param {string} code - raw code text
     @returns {string} - HTML with highlight spans (safe)
     ---------------------------------------------------------- */
  function highlight(code) {
    const html = encodeHTML(code);
    return html
      .replace(
        /(&lt;!--.*?--&gt;)/gs,
        '<span class="code-line-comment">$1</span>'
      )
      .replace(
        /(#.*$)/gm,
        '<span class="code-line-comment">$1</span>'
      )
      .replace(
        /(&#x2F;\/.*$)/gm,
        '<span class="code-line-comment">$1</span>'
      )
      .replace(
        /(&quot;.*?&quot;|&#x27;.*?&#x27;)/g,
        '<span class="code-line-string">$1</span>'
      )
      .replace(
        /(\b(function|if|else|for|while|return|const|let|var|class|def|import|from|try|except|finally|break|continue|async|await|new|typeof|in|of)\b)/g,
        '<span class="code-line-keyword">$1</span>'
      )
      .replace(
        /(&lt;[\/]?[a-zA-Z][a-zA-Z0-9]*)/g,
        '<span class="code-line-tag">$1</span>'
      )
      .replace(
        /(\b\d+(\.\d+)?\b)/g,
        '<span class="code-line-number">$1</span>'
      );
  }

  /* ----------------------------------------------------------
     Build a code block with a "Copy Code" button.
     @param {string} code - raw code
     @param {string} langKey - translation key for copy label
     @returns {HTMLElement}
     ---------------------------------------------------------- */
  function buildCodeBlock(code, copyLabel) {
    const wrap = document.createElement("div");
    wrap.className = "relative rounded-xl overflow-hidden border border-slate-800 bg-slate-900/80";

    // Header bar with copy button and dots
    const bar = document.createElement("div");
    bar.className = "flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800";
    const dots = document.createElement("div");
    dots.className = "flex gap-1.5";
    ["bg-red-500/70", "bg-yellow-500/70", "bg-emerald-500/70"].forEach(function (c) {
      const d = document.createElement("span");
      d.className = "w-3 h-3 rounded-full " + c;
      dots.appendChild(d);
    });
    bar.appendChild(dots);

    const copyBtn = document.createElement("button");
    copyBtn.type = "button";
    copyBtn.className = "px-3 py-1 rounded-md bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700 hover:text-white transition border border-slate-700";
    copyBtn.textContent = "⧉ " + copyLabel;
    copyBtn.setAttribute("aria-label", "Copy code");
    bar.appendChild(copyBtn);
    wrap.appendChild(bar);

    const pre = document.createElement("pre");
    pre.className = "cheat-code text-xs text-slate-300 whitespace-pre-wrap overflow-x-auto leading-relaxed p-4";
    pre.innerHTML = highlight(code);
    wrap.appendChild(pre);

    copyBtn.addEventListener("click", function () {
      if (globalThis.copyToClipboard) {
        globalThis.copyToClipboard(code, copyBtn);
        copyBtn.classList.add("copy-btn-copied");
        copyBtn.textContent = "✓ " + (Lang.get() === "ar" ? "تم" : "Copied!");
        setTimeout(function () {
          copyBtn.classList.remove("copy-btn-copied");
          copyBtn.textContent = "⧉ " + copyLabel;
        }, 1500);
      }
    });

    return wrap;
  }

  /* ----------------------------------------------------------
     Render learning tracks (multi-level courses) into container.
     @param {string} lang
     ---------------------------------------------------------- */
  function renderTracks(lang) {
    const container = document.querySelector("[data-tracks-container]");
    if (!container) return;
    lang = lang || Lang.get();

    container.innerHTML = "";

    // Section heading
    const heading = document.createElement("div");
    heading.className = "mb-6";
    const h = document.createElement("h2");
    h.className = "text-2xl md:text-3xl font-bold text-white";
    h.setAttribute("data-i18n", "tracks_title");
    h.textContent = Lang.t("tracks_title", lang);
    heading.appendChild(h);
    const sub = document.createElement("p");
    sub.className = "text-slate-400 mt-1 max-w-2xl";
    sub.textContent = Lang.t("tracks_subtitle", lang);
    heading.appendChild(sub);
    container.appendChild(heading);

    tracks.forEach(function (track) {
      const card = document.createElement("div");
      card.className = "glass-card p-6";
      card.setAttribute("data-search-card", "");
      card.setAttribute(
        "data-search-tags",
        (track.id + " track course lessons " + Lang.t(track.nameKey, lang)).toLowerCase()
      );
      card.setAttribute("data-search-title", Lang.t(track.nameKey, lang));

      // Header row
      const header = document.createElement("div");
      header.className = "flex items-center justify-between mb-4";

      const titleWrap = document.createElement("div");
      const name = document.createElement("h3");
      name.className = "text-xl font-bold text-white";
      name.textContent = Lang.t(track.nameKey, lang);
      titleWrap.appendChild(name);
      const desc = document.createElement("p");
      desc.className = "text-sm text-slate-400 mt-0.5";
      desc.textContent = Lang.t(track.descKey, lang);
      titleWrap.appendChild(desc);
      header.appendChild(titleWrap);

      const expandBtn = document.createElement("button");
      expandBtn.type = "button";
      expandBtn.className = "px-4 py-2 rounded-lg text-sm font-semibold transition border ";
      expandBtn.textContent = Lang.t("track_expand", lang) + " ▾";

      const bookmarkBtn = document.createElement("button");
      bookmarkBtn.type = "button";
      bookmarkBtn.className = "px-3 py-2 rounded-lg text-sm transition border border-slate-700 text-slate-400";
      bookmarkBtn.setAttribute("data-bookmark", "track-" + track.id);
      bookmarkBtn.setAttribute("data-bookmark-title", Lang.t(track.nameKey, lang));
      bookmarkBtn.textContent = "🔖";
      bookmarkBtn.setAttribute("aria-label", "Bookmark track");

      const headerActions = document.createElement("div");
      headerActions.className = "flex items-center gap-2 shrink-0";
      headerActions.appendChild(expandBtn);
      headerActions.appendChild(bookmarkBtn);
      header.appendChild(headerActions);
      card.appendChild(header);

      // Collapsible body
      const body = document.createElement("div");
      body.className = "hidden mt-2 space-y-6";
      card.appendChild(body);

      // Three levels
      const order = ["beginner", "applied", "project"];
      const levelStyles = {
        beginner: "border-blue-500/30 bg-blue-500/5",
        applied: "border-emerald-500/30 bg-emerald-500/5",
        project: "border-amber-500/30 bg-amber-500/5",
      };
      const levelTitles = {
        beginner: "track_beginner",
        applied: "track_applied",
        project: "track_project",
      };
      const levelBadges = {
        beginner: "bg-blue-500/15 text-blue-300",
        applied: "bg-emerald-500/15 text-emerald-300",
        project: "bg-amber-500/15 text-amber-300",
      };

      order.forEach(function (levelKey) {
        const level = track.levels[levelKey];
        const section = document.createElement("div");
        section.className = "glass-card-static p-5 " + levelStyles[levelKey];

        const levelHeader = document.createElement("div");
        levelHeader.className = "flex items-center gap-3 mb-3";
        const badge = document.createElement("span");
        badge.className = "px-3 py-1 rounded-full text-xs font-semibold " + levelBadges[levelKey];
        badge.textContent = Lang.t(levelTitles[levelKey], lang);
        levelHeader.appendChild(badge);
        section.appendChild(levelHeader);

        const descP = document.createElement("p");
        descP.className = "text-sm text-slate-300 mb-4";
        descP.textContent = Lang.t(level.titleKey, lang);
        section.appendChild(descP);

        if (levelKey === "project") {
          // Project guide: goal, steps, tips
          const goal = document.createElement("div");
          goal.className = "mb-4";
          const goalLabel = document.createElement("p");
          goalLabel.className = "text-xs font-bold text-amber-300 uppercase tracking-wide mb-1";
          goalLabel.textContent = Lang.t("project_goal", lang) + ": " + Lang.t(level.goalKey, lang);
          goal.appendChild(goalLabel);
          const goalText = document.createElement("p");
          goalText.className = "text-sm text-slate-400";
          goalText.textContent = level.goal;
          goal.appendChild(goalText);
          section.appendChild(goal);

          const stepsBox = document.createElement("div");
          stepsBox.className = "mb-4";
          const stepsLabel = document.createElement("p");
          stepsLabel.className = "text-xs font-bold text-amber-300 uppercase tracking-wide mb-2";
          stepsLabel.textContent = Lang.t("project_steps", lang);
          stepsBox.appendChild(stepsLabel);
          const ul = document.createElement("ol");
          ul.className = "list-decimal list-inside space-y-1 text-sm text-slate-400";
          level.steps.forEach(function (step) {
            const li = document.createElement("li");
            li.textContent = step;
            ul.appendChild(li);
          });
          stepsBox.appendChild(ul);
          section.appendChild(stepsBox);

          const tipsBox = document.createElement("div");
          tipsBox.className = "mb-4";
          const tipsLabel = document.createElement("p");
          tipsLabel.className = "text-xs font-bold text-amber-300 uppercase tracking-wide mb-2";
          tipsLabel.textContent = Lang.t("project_tips", lang);
          tipsBox.appendChild(tipsLabel);
          const tipUl = document.createElement("ul");
          tipUl.className = "list-disc list-inside space-y-1 text-sm text-emerald-300";
          level.tips.forEach(function (tip) {
            const li = document.createElement("li");
            li.textContent = tip;
            tipUl.appendChild(li);
          });
          tipsBox.appendChild(tipUl);
          section.appendChild(tipsBox);
        }

        section.appendChild(buildCodeBlock(level.code, Lang.t("cs_copy", lang)));
        body.appendChild(section);
      });

      // Toggle expand/collapse
      expandBtn.addEventListener("click", function () {
        const isHidden = body.classList.contains("hidden");
        body.classList.toggle("hidden");
        expandBtn.textContent = isHidden
          ? Lang.t("track_collapse", lang) + " ▴"
          : Lang.t("track_expand", lang) + " ▾";
        // Re-style button when expanded
        if (isHidden) {
          expandBtn.classList.add("bg-blue-500/20", "text-blue-300", "border-blue-500/30");
        } else {
          expandBtn.classList.remove("bg-blue-500/20", "text-blue-300", "border-blue-500/30");
        }
      });

      // Feedback / reaction section
      const feedbackSection = document.createElement("div");
      feedbackSection.className = "mt-6 pt-4 border-t border-slate-800";
      feedbackSection.setAttribute("data-feedback-section", "track-" + track.id);
      const fbLabel = document.createElement("p");
      fbLabel.className = "text-xs font-semibold text-slate-500 mb-2";
      fbLabel.textContent = Lang.t("track_feedback", lang);
      feedbackSection.appendChild(fbLabel);
      const fbRow = document.createElement("div");
      fbRow.className = "flex items-center gap-2";
      ["👍", "👎"].forEach(function (r) {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "px-3 py-1.5 rounded-lg text-sm transition border border-slate-700";
        btn.setAttribute("data-reaction", r);
        btn.textContent = r;
        fbRow.appendChild(btn);
      });
      feedbackSection.appendChild(fbRow);
      card.appendChild(feedbackSection);

      container.appendChild(card);
    });

    // Re-sync bookmark icons / feedback highlights for dynamically-rendered content
    if (window.Interactions && typeof window.Interactions.refreshUI === "function") {
      window.Interactions.refreshUI();
    }
  }

  globalThis.renderTracks = renderTracks;

  /* ----------------------------------------------------------
     Render cheat sheet cards into container.
     @param {string} lang
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

    if (resultsEl) {
      resultsEl.innerHTML = "<strong class='text-blue-400'>" + filtered.length + "</strong> " + Lang.t("cs_results", lang);
    }

    container.innerHTML = "";

    if (filtered.length === 0) {
      const empty = document.createElement("div");
      empty.className = "col-span-full text-center py-12 text-slate-400";
      empty.textContent = lang === "ar" ? "لا توجد نتائج" : "No results found.";
      container.appendChild(empty);
      return;
    }

    filtered.forEach(function (sheet) {
      const card = document.createElement("article");
      card.className = "glass-card overflow-hidden flex flex-col";
      card.setAttribute("data-search-card", "");
      card.setAttribute(
        "data-search-tags",
        (sheet.category + " cheat sheet " + Lang.t(sheet.titleKey, lang) + " " + Lang.t(sheet.descKey, lang)).toLowerCase()
      );
      card.setAttribute("data-search-title", Lang.t(sheet.titleKey, lang));

      // Header
      const header = document.createElement("div");
      header.className = "flex items-center justify-between p-5 border-b border-slate-800/60";
      const titleWrap = document.createElement("div");
      const category = document.createElement("span");
      category.className = "inline-block px-2.5 py-0.5 rounded-full text-xs font-medium mb-1.5 " +
        (sheet.category === "html" ? "bg-orange-500/15 text-orange-300" :
         sheet.category === "css" ? "bg-blue-500/15 text-blue-300" :
         sheet.category === "javascript" ? "bg-yellow-500/15 text-yellow-300" :
         sheet.category === "python" ? "bg-emerald-500/15 text-emerald-300" :
         "bg-rose-500/15 text-rose-300");
      category.textContent = Lang.t("cs_category_" + sheet.category, lang);
      titleWrap.appendChild(category);
      const title = document.createElement("h3");
      title.className = "text-base font-semibold text-white";
      title.textContent = Lang.t(sheet.titleKey, lang);
      titleWrap.appendChild(title);
      header.appendChild(titleWrap);
      card.appendChild(header);

      // Code block
      card.appendChild(buildCodeBlock(sheet.code, Lang.t("cs_copy", lang)));

      container.appendChild(card);
    });
  }

  globalThis.renderCheatSheets = renderCheatSheets;

  /* ----------------------------------------------------------
     Init: wire search, category filters and initial render
     ---------------------------------------------------------- */
  ready(function () {
    const tracksContainer = document.querySelector("[data-tracks-container]");

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
          b.classList.remove("bg-blue-500", "text-white");
          b.classList.add("glass-card-static", "text-slate-300");
        });
        btn.classList.add("bg-blue-500", "text-white");
        btn.classList.remove("glass-card-static", "text-slate-300");
        currentCategory = btn.getAttribute("data-category");
        renderCheatSheets(Lang.get());
      });
    });

    if (typeof Lang !== "undefined" && Lang.get) {
      renderTracks(Lang.get());
      renderCheatSheets(Lang.get());
    }
  });

  /* ----------------------------------------------------------
     Re-render tracks when language changes (if container present)
     ---------------------------------------------------------- */
  window.addEventListener("languagechanged", function (evt) {
    if (document.querySelector("[data-tracks-container]")) {
      renderTracks(evt.detail.lang);
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
