/* ============================================================
   interactions.js — Site-wide interactive features
   ------------------------------------------------------------
   - Dynamic accent color picker
   - Gamification & badge system (localStorage)
   - Bookmarks / saved items (localStorage)
   - Micro-quizzes widget
   - Lesson feedback reactions
   - Live code playground widget
   - PWA registration
   - Persistent "control dock" floating widget that hosts the
     accent picker, bookmarks, and badges.
   ============================================================ */

(function () {
  "use strict";

  const PREFIX = "studenthub-";

  /* ----------------------------------------------------------
     In-memory store for user progress & state
     ---------------------------------------------------------- */
  const store = {
    load(key, fallback) {
      try {
        const raw = localStorage.getItem(PREFIX + key);
        return raw !== null ? JSON.parse(raw) : fallback;
      } catch (e) {
        return fallback;
      }
    },
    save(key, value) {
      try {
        localStorage.setItem(PREFIX + key, JSON.stringify(value));
      } catch (e) {}
    },
  };

  const state = {
    accent: store.load("accent", "blue"),
    visited: store.load("visited", []),
    bookmarks: store.load("bookmarks", []),
    quizzesCorrect: store.load("quizzesCorrect", 0),
    sessions: store.load("sessions", 0),
    badgeCache: store.load("badges", []),
    reactions: store.load("reactions", {}),
  };

  /* ----------------------------------------------------------
     ACCENT COLOR PICKER
     Applies --accent CSS variables from config.ACCENT_THEMES.
     ---------------------------------------------------------- */
  function applyAccent(themeKey) {
    const theme = (typeof window.ACCENT_THEMES !== "undefined" && window.ACCENT_THEMES[themeKey]) ||
      ACCENT_THEMES[themeKey] ||
      ACCENT_THEMES.blue;
    const root = document.documentElement;
    Object.keys(theme.css).forEach(function (prop) {
      root.style.setProperty(prop, theme.css[prop]);
    });
    root.style.setProperty("--accent-theme", themeKey);
    document.querySelectorAll("[data-accent-swatch]").forEach(function (el) {
      el.classList.toggle("ring-2", el.getAttribute("data-accent-swatch") === themeKey);
      el.classList.toggle("ring-white/60", el.getAttribute("data-accent-swatch") === themeKey);
    });
    state.accent = themeKey;
    store.save("accent", themeKey);
    document.dispatchEvent(new CustomEvent("accentchanged", { detail: themeKey }));
  }

  function buildAccentPicker() {
    const keys = Object.keys(ACCENT_THEMES);
    const container = document.createElement("div");
    container.className = "flex flex-wrap gap-3";
    keys.forEach(function (key) {
      const theme = ACCENT_THEMES[key];
      const swatch = document.createElement("button");
      swatch.type = "button";
      swatch.setAttribute("data-accent-swatch", key);
      swatch.className =
        "w-9 h-9 rounded-full transition transform hover:scale-110 border border-slate-700/60";
      swatch.style.backgroundColor = theme.css["--accent"];
      swatch.setAttribute("aria-label", theme.name + " accent");
      swatch.title = theme.name;
      swatch.addEventListener("click", function () {
        applyAccent(key);
      });
      container.appendChild(swatch);
    });
    return container;
  }

  /* ----------------------------------------------------------
     BADGES / GAMIFICATION
     ---------------------------------------------------------- */
  function trackBadges(type, amount) {
    // Update counters
    if (type === "visited") {
      addVisited(amount);
    } else if (type === "bookmarks") {
      // handled by bookmark functions
    } else if (type === "sessions") {
      state.sessions = Math.max(state.sessions, amount || 0);
      store.save("sessions", state.sessions);
    } else if (type === "quizzes") {
      state.quizzesCorrect = Math.max(state.quizzesCorrect, amount || 0);
      store.save("quizzesCorrect", state.quizzesCorrect);
    }

    const counts = {
      visited: state.visited.length,
      bookmarks: state.bookmarks.length,
      quizzes: state.quizzesCorrect,
      sessions: state.sessions,
    };

    let newBadge = null;
    (typeof window.BADGES !== "undefined" ? window.BADGES : BADGES).forEach(function (badge) {
      if (badge.type === type && counts[badge.type] >= badge.goal && state.badgeCache.indexOf(badge.id) === -1) {
        if (!newBadge) newBadge = badge;
      }
    });

    if (newBadge && state.badgeCache.indexOf(newBadge.id) === -1) {
      state.badgeCache.push(newBadge.id);
      store.save("badges", state.badgeCache);
      showBadgeUnlock(newBadge);
      return newBadge;
    }
    return null;
  }

  function showBadgeUnlock(badge) {
    const container = document.createElement("div");
    container.className =
      "fixed bottom-24 right-4 z-[60] glass-card p-4 max-w-xs animate-[toast-in_0.4s_ease]";
    container.innerHTML =
      '<div class="flex items-center gap-3">' +
      '<span class="text-3xl">' + badge.icon + "</span>" +
      '<div>' +
      '<p class="text-xs text-amber-300 font-bold uppercase tracking-wide mb-1">Badge Unlocked!</p>' +
      '<p class="text-sm text-white font-semibold">' + badge.name + "</p>" +
      '<p class="text-xs text-slate-400">' + badge.desc + "</p>" +
      "</div>" +
      "</div>";
    document.body.appendChild(container);
    setTimeout(function () {
      container.classList.add("toast-exit");
      setTimeout(function () { container.remove(); }, 300);
    }, 3500);
  }

  function renderBadgesInto(container) {
    if (!container) return;
    const badgeDefs = typeof window.BADGES !== "undefined" ? window.BADGES : BADGES;
    container.innerHTML = "";
    const counts = {
      visited: state.visited.length,
      bookmarks: state.bookmarks.length,
      quizzes: state.quizzesCorrect,
      sessions: state.sessions,
    };
    badgeDefs.forEach(function (badge) {
      const unlocked = state.badgeCache.indexOf(badge.id) !== -1;
      const progress = Math.min(100, Math.round((counts[badge.type] / badge.goal) * 100));
      const row = document.createElement("div");
      row.className = "flex items-center gap-3 glass-card-static p-2.5";
      const icon = document.createElement("span");
      icon.className = "text-2xl " + (unlocked ? "" : "opacity-40 grayscale");
      icon.textContent = unlocked ? badge.icon : "🔒";
      row.appendChild(icon);
      const info = document.createElement("div");
      info.className = "flex-1";
      const name = document.createElement("p");
      name.className = "text-sm font-semibold text-white";
      name.textContent = badge.name;
      info.appendChild(name);
      const desc = document.createElement("p");
      desc.className = "text-xs text-slate-400";
      desc.textContent = badge.desc;
      info.appendChild(desc);
      if (!unlocked) {
        const bar = document.createElement("div");
        bar.className = "mt-1.5 h-1.5 rounded-full bg-slate-700/60 overflow-hidden";
        const fill = document.createElement("div");
        fill.className = "h-full rounded-full";
        fill.style.width = progress + "%";
        fill.style.background = "var(--accent, #3b82f6)";
        bar.appendChild(fill);
        info.appendChild(bar);
      }
      row.appendChild(info);
      container.appendChild(row);
    });
  }

  function addVisited(pageId) {
    if (state.visited.indexOf(pageId) === -1) {
      state.visited.push(pageId);
      store.save("visited", state.visited);
    }
  }

  /* ----------------------------------------------------------
     BOOKMARKS
     data-bookmark attributes drive this. Add elements with
     data-bookmark="unique-id" data-bookmark-title="Name" and
     the toggle button gets wired automatically.
     ---------------------------------------------------------- */
  function toggleBookmark(id, title) {
    const idx = state.bookmarks.findIndex(function (b) { return b.id === id; });
    if (idx === -1) {
      state.bookmarks.push({ id: id, title: title, at: Date.now() });
    } else {
      state.bookmarks.splice(idx, 1);
    }
    store.save("bookmarks", state.bookmarks);
    document.querySelectorAll('[data-bookmark="' + id + '"]').forEach(function (el) {
      const saved = idx === -1;
      el.setAttribute("data-saved", saved ? "true" : "false");
      updateBookmarkIcon(el, saved);
    });
    trackBadges("bookmarks", state.bookmarks.length);
    if (idx === -1 && typeof showToast !== "undefined") {
      showToast("Saved to bookmarks!", "success");
    } else if (typeof showToast !== "undefined") {
      showToast("Removed from bookmarks.", "info");
    }
  }

  function updateBookmarkIcon(el, saved) {
    if (saved) {
      el.classList.add("text-amber-400", "border-amber-400/50", "bg-amber-500/10");
      el.classList.remove("text-slate-400", "border-slate-700");
      el.innerHTML = "🔖";
    } else {
      el.classList.remove("text-amber-400", "border-amber-400/50", "bg-amber-500/10");
      el.classList.add("text-slate-400", "border-slate-700");
      el.innerHTML = "🔖";
    }
  }

  function bookmarksInitialState() {
    document.querySelectorAll("[data-bookmark]").forEach(function (el) {
      const id = el.getAttribute("data-bookmark");
      const saved = state.bookmarks.some(function (b) { return b.id === id; });
      el.setAttribute("data-saved", saved ? "true" : "false");
      updateBookmarkIcon(el, saved);
    });
  }

  function wireBookmarks() {
    // Event delegation so dynamically-rendered bookmark buttons work
    document.addEventListener("click", function (e) {
      const el = e.target.closest ? e.target.closest("[data-bookmark]") : null;
      if (!el) return;
      e.preventDefault();
      const id = el.getAttribute("data-bookmark");
      const title = el.getAttribute("data-bookmark-title") || "Saved item";
      bookmarksInitialState();
      toggleBookmark(id, title);
    });
    bookmarksInitialState();
  }

  function renderBookmarksInto(container) {
    if (!container) return;
    container.innerHTML = "";
    if (state.bookmarks.length === 0) {
      container.innerHTML =
        '<p class="text-sm text-slate-400 text-center py-4">No bookmarks yet.<br>Click the 🔖 bookmark icon on any lesson or tool.</p>';
      return;
    }
    state.bookmarks.forEach(function (b) {
      const row = document.createElement("div");
      row.className = "flex items-center justify-between gap-2 glass-card-static px-3 py-2";
      const label = document.createElement("span");
      label.className = "text-sm text-slate-200 truncate";
      label.textContent = b.title;
      row.appendChild(label);
      const del = document.createElement("button");
      del.type = "button";
      del.className = "text-slate-400 hover:text-red-400 transition shrink-0";
      del.textContent = "✕";
      del.setAttribute("aria-label", "Remove bookmark");
      del.addEventListener("click", function () {
        toggleBookmark(b.id, b.title);
        renderBookmarksInto(container);
      });
      row.appendChild(del);
      container.appendChild(row);
    });
  }

  /* ----------------------------------------------------------
     MICRO-QUIZZES
     Shows one question at a time from config.QUIZZES.
     ---------------------------------------------------------- */
  function initQuiz(widget) {
    if (!widget) return;
    const all = typeof window.QUIZZES !== "undefined" ? window.QUIZZES : QUIZZES;
    const index = Math.floor(Math.random() * all.length);
    const q = all[index];

    widget.innerHTML = "";
    const heading = document.createElement("h3");
    heading.className = "text-lg font-bold text-white mb-1";
    heading.textContent = "Daily Coding Quiz";
    widget.appendChild(heading);

    const cat = document.createElement("span");
    cat.className =
      "inline-block px-2.5 py-0.5 rounded-full text-xs font-medium mb-3 " +
      (q.category === "html" ? "bg-orange-500/15 text-orange-300" :
       q.category === "css" ? "bg-blue-500/15 text-blue-300" :
       q.category === "javascript" ? "bg-yellow-500/15 text-yellow-300" :
       q.category === "python" ? "bg-emerald-500/15 text-emerald-300" :
       "bg-rose-500/15 text-rose-300");
    cat.textContent = q.category.toUpperCase();
    widget.appendChild(cat);

    const question = document.createElement("p");
    question.className = "text-sm text-slate-200 mb-4";
    question.textContent = q.question;
    widget.appendChild(question);

    const optionsWrap = document.createElement("div");
    optionsWrap.className = "space-y-2";
    q.options.forEach(function (opt, i) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className =
        "w-full text-left px-3.5 py-2.5 rounded-lg glass-card-static text-sm text-slate-300 hover:border-accent/50 transition";
      btn.textContent = opt;
      btn.addEventListener("click", function () {
        if (i === q.answer) {
          btn.classList.add("bg-emerald-500/20", "border-emerald-500/50", "text-emerald-300");
          state.quizzesCorrect++;
          store.save("quizzesCorrect", state.quizzesCorrect);
          const badge = trackBadges("quizzes", state.quizzesCorrect);
          feedback.innerHTML =
            '<span class="text-emerald-300">✓ Correct!</span> ' + (badge ? " Badge unlocked!" : "");
          feedback.className = "mt-3 text-sm font-semibold text-emerald-300";
          widget.querySelectorAll("button").forEach(function (b) { b.disabled = true; });
        } else {
          btn.classList.add("bg-red-500/20", "border-red-500/50", "text-red-300");
          feedback.innerHTML =
            '<span class="text-red-300">✗ Not quite.</span> The correct answer was <span class="text-emerald-300">' + q.options[q.answer] + "</span>";
          feedback.className = "mt-3 text-sm text-slate-300";
        }
      });
      optionsWrap.appendChild(btn);
    });
    widget.appendChild(optionsWrap);
    const feedback = document.createElement("div");
    feedback.className = "mt-3 text-sm";
    widget.appendChild(feedback);
  }

  /* ----------------------------------------------------------
     LESSON FEEDBACK (reactions)
     Elements with data-feedback-section store per-section
     reaction counts in localStorage.
     ---------------------------------------------------------- */
  function initFeedback() {
    // Event delegation so dynamically-rendered feedback sections work
    document.addEventListener("click", function (e) {
      const btn = e.target.closest ? e.target.closest("[data-reaction]") : null;
      if (!btn) return;
      const section = btn.closest("[data-feedback-section]");
      if (!section) return;
      const key = section.getAttribute("data-feedback-section");
      const r = btn.getAttribute("data-reaction");
      const saved = state.reactions[key] || {};
      if (saved[r]) {
        delete saved[r];
      } else {
        Object.keys(saved).forEach(function (k) { delete saved[k]; });
        saved[r] = true;
      }
      state.reactions[key] = saved;
      store.save("reactions", state.reactions);
      renderFeedback(section, key, saved);
    });
    refreshFeedback();
  }

  function refreshFeedback() {
    document.querySelectorAll("[data-feedback-section]").forEach(function (section) {
      const key = section.getAttribute("data-feedback-section");
      renderFeedback(section, key, state.reactions[key] || {});
    });
  }

  function renderFeedback(section, key, saved) {
    section.querySelectorAll("[data-reaction]").forEach(function (btn) {
      const r = btn.getAttribute("data-reaction");
      if (saved[r]) {
        btn.classList.add("bg-accent/20", "border-accent/60", "text-white");
      } else {
        btn.classList.remove("bg-accent/20", "border-accent/60");
      }
    });
  }

  /* ----------------------------------------------------------
     LIVE CODE PLAYGROUND
     A mini HTML/CSS/JS editor with live preview via iframe.
     Elements: [data-playground] wires up the editor.
     ---------------------------------------------------------- */
  function initPlayground(widget) {
    if (!widget) return;

    widget.innerHTML = "";
    const head = document.createElement("div");
    head.className = "flex items-center justify-between mb-3";
    const title = document.createElement("h3");
    title.className = "text-lg font-bold text-white";
    title.textContent = "Live Code Playground";
    head.appendChild(title);
    const runBtn = document.createElement("button");
    runBtn.type = "button";
    runBtn.className =
      "px-4 py-1.5 rounded-lg text-sm font-semibold transition";
    runBtn.style.background = "var(--accent, #3b82f6)";
    runBtn.style.color = "#fff";
    runBtn.textContent = "▶ Run";
    head.appendChild(runBtn);
    widget.appendChild(head);

    // Tab row (html/css/js)
    const tabs = document.createElement("div");
    tabs.className = "flex gap-1 mb-2";
    const panels = {};
    ["html", "css", "js"].forEach(function (lang) {
      const tab = document.createElement("button");
      tab.type = "button";
      tab.className =
        "px-3 py-1 rounded-md text-xs font-semibold transition " +
        (lang === "html" ? "bg-slate-700 text-white" : "text-slate-400 hover:text-white");
      tab.textContent = lang.toUpperCase();
      tabs.appendChild(tab);
      tab.addEventListener("click", function () {
        tabButtonActive(tabs, tab);
        panels[lang].classList.remove("hidden");
        Object.keys(panels).forEach(function (k) {
          if (k !== lang) panels[k].classList.add("hidden");
        });
      });
    });
    widget.appendChild(tabs);

    function tabButtonActive(container, activeTab) {
      container.querySelectorAll("button").forEach(function (b) {
        b.classList.remove("bg-slate-700", "text-white");
        b.classList.add("text-slate-400");
      });
      activeTab.classList.add("bg-slate-700", "text-white");
      activeTab.classList.remove("text-slate-400");
    }

    const editorWrap = document.createElement("div");
    editorWrap.className = "rounded-lg overflow-hidden border border-slate-800";
    const values = {
      html:
`<h1>Hello!</h1>
<p>Edit the HTML, CSS or JS below.</p>
<button id="btn">Click me</button>`,
      css:
`h1 { color: #3b82f6; }
button { padding: 8px 16px; border: none; border-radius: 6px; }`,
      js:
`document.getElementById('btn').addEventListener('click', () => {
  alert('You clicked!');
});`,
    };

    Object.keys(values).forEach(function (lang) {
      const textarea = document.createElement("textarea");
      textarea.value = values[lang];
      textarea.spellcheck = false;
      textarea.className =
        "w-full h-32 p-3 bg-slate-900 text-slate-100 font-mono text-xs resize-y focus:outline-none " +
        (lang === "html" ? "" : "hidden");
      textarea.setAttribute("aria-label", lang + " code");
      panels[lang] = textarea;
      editorWrap.appendChild(textarea);
    });
    widget.appendChild(editorWrap);

    // Preview iframe
    const preview = document.createElement("iframe");
    preview.className = "w-full h-48 mt-3 rounded-lg border border-slate-800 bg-white";
    preview.title = "Live preview";
    widget.appendChild(preview);

    function run() {
      const doc = preview.contentDocument || preview.contentWindow.document;
      const content =
        "<style>" + panels.css.value + "</style>\n" +
        panels.html.value + "\n" +
        "<script>" + panels.js.value + "<\/script>";
      doc.open();
      doc.write(content);
      doc.close();
    }

    runBtn.addEventListener("click", run);
    // Auto-run on load
    run();
  }

  /* ----------------------------------------------------------
     CONTROL DOCK — floating panel with accent + bookmarks + badges
     ---------------------------------------------------------- */
  function buildControlDock() {
    if (document.querySelector("[data-control-dock]")) return;

    const dockBtn = document.createElement("button");
    dockBtn.type = "button";
    dockBtn.setAttribute("data-control-toggle", "");
    dockBtn.className =
      "fixed right-4 bottom-4 z-[70] w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition transform hover:scale-110";
    dockBtn.style.background = "var(--accent, #3b82f6)";
    dockBtn.style.color = "#fff";
    dockBtn.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">' +
      '<path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>' +
      '<path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>' +
      "</svg>";
    dockBtn.setAttribute("aria-label", "Open controls");
    document.body.appendChild(dockBtn);

    const panel = document.createElement("div");
    panel.setAttribute("data-control-panel", "");
    panel.className =
      "fixed right-4 bottom-20 z-[70] w-80 max-w-[calc(100vw-2rem)] glass-card p-4 hidden max-h-[70vh] overflow-y-auto";
    panel.innerHTML =
      '<div class="flex items-center justify-between mb-3">' +
      '<h3 class="text-base font-bold text-white">Controls</h3>' +
      '<button type="button" data-control-close class="text-slate-400 hover:text-white transition">✕</button>' +
      "</div>" +
      '<div class="mb-4">' +
      '<p class="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Accent Color</p>' +
      '<div data-accent-container></div>' +
      "</div>" +
      '<div class="mb-4">' +
      '<p class="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Bookmarks</p>' +
      '<div data-bookmarks-container></div>' +
      "</div>" +
      '<div>' +
      '<p class="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Badges</p>' +
      '<div data-badges-container></div>' +
      "</div>";
    document.body.appendChild(panel);

    panel.querySelector("[data-accent-container]").appendChild(buildAccentPicker());
    renderBookmarksInto(panel.querySelector("[data-bookmarks-container]"));
    renderBadgesInto(panel.querySelector("[data-badges-container]"));

    dockBtn.addEventListener("click", function () {
      panel.classList.toggle("hidden");
    });
    panel.querySelector("[data-control-close]").addEventListener("click", function () {
      panel.classList.add("hidden");
    });

    // Refresh badge progress when panel opens
    const badgesContainer = panel.querySelector("[data-badges-container]");
    dockBtn.addEventListener("click", function () {
      renderBadgesInto(badgesContainer);
      renderBookmarksInto(panel.querySelector("[data-bookmarks-container]"));
    });
  }

  /* ----------------------------------------------------------
     PWA REGISTRATION
     ---------------------------------------------------------- */
  function initPWA() {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("./sw.js").catch(function (err) {
        // silent — PWA support is progressive
      });
    }
  }

  /* ----------------------------------------------------------
     Public API / Init
     ---------------------------------------------------------- */
  function init() {
    // Record this page visit
    const page = document.body.getAttribute("data-page") || "home";
    addVisited(page);

    // Apply saved accent
    applyAccent(state.accent);

    // Build persistent control dock
    buildControlDock();

    // Wire bookmarks
    wireBookmarks();

    // Lesson feedback sections
    initFeedback();

    // Init the first [data-playground] if present
    const playground = document.querySelector("[data-playground]");
    if (playground) initPlayground(playground);

    // Init quiz widget if present
    const quiz = document.querySelector("[data-quiz-widget]");
    if (quiz) initQuiz(quiz);

    // Track badge on first visit / multi-page
    trackBadges("visited", page);

    // PWA
    initPWA();
  }

  function ready(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn);
    } else {
      fn();
    }
  }

  // Expose a small public API
  window.Interactions = {
    init: init,
    applyAccent: applyAccent,
    toggleBookmark: toggleBookmark,
    track: trackBadges,
    refreshUI: function () {
      bookmarksInitialState();
      refreshFeedback();
    },
    getBadges: function () { return state.badgeCache.slice(); },
    getStats: function () {
      return {
        visited: state.visited.length,
        bookmarks: state.bookmarks.length,
        quizzes: state.quizzesCorrect,
        sessions: state.sessions,
      };
    },
  };

  ready(init);
})();
