/* ============================================================
   config.js — Centralized site configuration
   ------------------------------------------------------------
   This is where you paste in your ad code (Adsterra / AdSense)
   and tweak global settings. The ads.js module reads AD_CONFIG
   and injects it into the glassmorphism "Sponsored" slots on
   every page automatically.
   ============================================================ */

/* ------------------------------------------------------------
   1. AD CONFIGURATION
   Paste your ad snippet(s) below. The slave needs the raw
   HTML/JS that your ad network provides (the <script> or
   <ins ...></ins> markup). Ads.js will inject it safely into
   the designated ''Sponsored'' slots across every page.
   ------------------------------------------------------------ */
const AD_CONFIG = {
  /* Set to true once the ad snippet below is active.
     While false, a clean placeholder panel is shown instead
     (so you can preview the layout before going live). */
  ENABLED: true,

  /* Global ad-network scripts loaded once, on every page.
     Adsterra-style networks typically provide:
       1) an <script> that defines `atOptions`
       2) a second <script src="...invoke.js"> that renders it
     We store them here and inject them the first time ads render.
     IMPORTANT: the `atOptions` block must run BEFORE the invoke
     script, so we keep them as an ordered combined snippet. */
  GLOBAL_SCRIPTS: [
    `<script>
  atOptions = {
    'key' : 'b645f8ed0a1c14ccd1c01da0386f072e',
    'format' : 'iframe',
    'height' : 250,
    'width' : 300,
    'params' : {}
  };
</script>
<script src="https://www.highrevenueformat.com/b645f8ed0a1c14ccd1c01da0386f072e/invoke.js"></script>`,
  ],

  /* The ad markup injected into each ''Sponsored'' slot.
     For Adsterra's atOptions+invoke pattern, the network renders
     the ad automatically once the global script runs. Each slot
     only needs a container anchor — a <div> with an id — that the
     network's script fills, OR you can inject the invoke script
     again per slot. To keep it reliable, we inject the global
     snippet in each slot. */
  AD_SNIPPETS: {
    top: [
      `<script>
  atOptions = {
    'key' : 'b645f8ed0a1c14ccd1c01da0386f072e',
    'format' : 'iframe',
    'height' : 250,
    'width' : 300,
    'params' : {}
  };
</script>
<script src="https://www.highrevenueformat.com/b645f8ed0a1c14ccd1c01da0386f072e/invoke.js"></script>`,
    ],
    mid: [
      `<script>
  atOptions = {
    'key' : 'b645f8ed0a1c14ccd1c01da0386f072e',
    'format' : 'iframe',
    'height' : 250,
    'width' : 300,
    'params' : {}
  };
</script>
<script src="https://www.highrevenueformat.com/b645f8ed0a1c14ccd1c01da0386f072e/invoke.js"></script>`,
    ],
    bottom: [
      `<script>
  atOptions = {
    'key' : 'b645f8ed0a1c14ccd1c01da0386f072e',
    'format' : 'iframe',
    'height' : 250,
    'width' : 300,
    'params' : {}
  };
</script>
<script src="https://www.highrevenueformat.com/b645f8ed0a1c14ccd1c01da0386f072e/invoke.js"></script>`,
    ],
  },
};

/* ------------------------------------------------------------
   2. ACCENT COLOR THEMES
   Each theme sets CSS custom properties used across the UI for
   glowing accents (buttons, badges, search focus, etc.).
   ------------------------------------------------------------ */
const ACCENT_THEMES = {
  blue: {
    name: "Blue",
    css: {
      "--accent": "#3b82f6",
      "--accent-soft": "rgba(59,130,246,0.15)",
      "--accent-glow": "rgba(59,130,246,0.12)",
      "--accent-text": "#93c5fd",
    },
  },
  emerald: {
    name: "Emerald",
    css: {
      "--accent": "#10b981",
      "--accent-soft": "rgba(16,185,129,0.15)",
      "--accent-glow": "rgba(16,185,129,0.12)",
      "--accent-text": "#6ee7b7",
    },
  },
  purple: {
    name: "Purple",
    css: {
      "--accent": "#a855f7",
      "--accent-soft": "rgba(168,85,247,0.15)",
      "--accent-glow": "rgba(168,85,247,0.15)",
      "--accent-text": "#d8b4fe",
    },
  },
  rose: {
    name: "Rose",
    css: {
      "--accent": "#f43f5e",
      "--accent-soft": "rgba(244,63,94,0.15)",
      "--accent-glow": "rgba(244,63,94,0.15)",
      "--accent-text": "#fda4af",
    },
  },
  amber: {
    name: "Amber",
    css: {
      "--accent": "#f59e0b",
      "--accent-soft": "rgba(245,158,11,0.15)",
      "--accent-glow": "rgba(245,158,11,0.15)",
      "--accent-text": "#fcd34d",
    },
  },
};

/* ------------------------------------------------------------
   3. ACHIEVEMENT BADGES (Gamification)
   Each badge defines a trigger type. Types:
     - "sessions" : number of Pomodoro sessions completed
     - "quizzes"  : number of quizzes answered correctly
     - "bookmarks": number of items bookmarked
     - "visited"  : number of pages visited
   ------------------------------------------------------------ */
const BADGES = [
  { id: "first-visit", name: "First Step", desc: "Visit StudentHub for the first time.", icon: "👋", type: "visited", goal: 1 },
  { id: "explorer", name: "Explorer", desc: "Visit 3 different pages.", icon: "🧭", type: "visited", goal: 3 },
  { id: "globe", name: "Globetrotter", desc: "Visit all 4 main pages.", icon: "🌍", type: "visited", goal: 4 },
  { id: "bookmark-1", name: "Bookmarker", desc: "Save your first item.", icon: "🔖", type: "bookmarks", goal: 1 },
  { id: "bookmark-5", name: "Library Builder", desc: "Save 5 items.", icon: "📚", type: "bookmarks", goal: 5 },
  { id: "quiz-1", name: "Curious Mind", desc: "Answer your first quiz correctly.", icon: "🧠", type: "quizzes", goal: 1 },
  { id: "quiz-3", name: "Quiz Whiz", desc: "Answer 3 quizzes correctly.", icon: "🏆", type: "quizzes", goal: 3 },
  { id: "pomo-1", name: "Focus", desc: "Complete your first Pomodoro session.", icon: "⏱️", type: "sessions", goal: 1 },
  { id: "pomo-5", name: "Deep Mover", desc: "Complete 5 Pomodoro sessions.", icon: "🔥", type: "sessions", goal: 5 },
  { id: "pomo-25", name: "Marathoner", desc: "Complete 25 Pomodoro sessions.", icon: "🏅", type: "sessions", goal: 25 },
];

/* ------------------------------------------------------------
   4. MICRO-QUIZZES
   A rotating set of daily coding trivia. Each question maps to
   a "sheet" category tag so that answering correctly also
   rewards badges.
   ------------------------------------------------------------ */
const QUIZZES = [
  {
    id: "quiz-html-1",
    category: "html",
    question: "Which HTML element is used to define a section with a heading?",
    options: ["<div>", "<section>", "<span>", "<p>"],
    answer: 1,
  },
  {
    id: "quiz-html-2",
    category: "html",
    question: "Which attribute specifies alternative text for an image?",
    options: ["title", "src", "alt", "href"],
    answer: 2,
  },
  {
    id: "quiz-css-1",
    category: "css",
    question: "Which CSS property is used to center flex items vertically?",
    options: ["justify-content", "align-items", "text-align", "vertical-align"],
    answer: 1,
  },
  {
    id: "quiz-css-2",
    category: "css",
    question: "What does CSS stand for?",
    options: [
      "Cascading Style Sheets",
      "Computer Style System",
      "Creative Style Sheets",
      "Colorful Style Sheets",
    ],
    answer: 0,
  },
  {
    id: "quiz-js-1",
    category: "javascript",
    question: "Which method converts a JSON string into a JavaScript object?",
    options: ["JSON.stringify()", "JSON.parse()", "JSON.convert()", "JSON.parseObject()"],
    answer: 1,
  },
  {
    id: "quiz-js-2",
    category: "javascript",
    question: "Which keyword declares a block-scoped variable that can be reassigned?",
    options: ["var", "const", "let", "static"],
    answer: 2,
  },
  {
    id: "quiz-py-1",
    category: "python",
    question: "What does the 'len()' function return?",
    options: ["Length of a string/list", "Last element", "Type of an object", "Memory size"],
    answer: 0,
  },
  {
    id: "quiz-py-2",
    category: "python",
    question: "Which is a mutable data type in Python?",
    options: ["tuple", "string", "list", "int"],
    answer: 2,
  },
  {
    id: "quiz-git-1",
    category: "git",
    question: "Which command creates a new branch and switches to it?",
    options: ["git branch -new", "git checkout -b", "git switch new", "git create"],
    answer: 1,
  },
  {
    id: "quiz-git-2",
    category: "git",
    question: "Which command stages all changes?",
    options: ["git commit -a", "git add .", "git push", "git status"],
    answer: 1,
  },
];

/* ------------------------------------------------------------
   5. APP SETTINGS
   ------------------------------------------------------------ */
const APP_SETTINGS = {
  STORAGE_PREFIX: "studenthub-",
  DEFAULT_ACCENT: "blue",
  DEFAULT_BOOKMARKS: [],
};
