/* ============================================================
   tools.js
   Interactive student tools:
   - Pomodoro Focus Timer (SVG ring countdown)
   - GPA Calculator (add courses → semester + cumulative GPA)
   - Existing text/JSON/password/color/lorem utilities
   - View tab switching between Tools / Pomodoro / GPA
   ============================================================ */

(function () {
  "use strict";

  /* ----------------------------------------------------------
     Shared dark-input class for form elements inside widgets
     ---------------------------------------------------------- */
  const DARK_INPUT =
    "w-full px-3.5 py-2.5 rounded-lg bg-slate-900/70 border border-slate-700/60 text-sm text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition";

  /* ==========================================================
     POMODORO FOCUS TIMER
     ========================================================== */
  function initPomodoro() {
    const container = document.querySelector("[data-pomodoro-widget]");
    if (!container) return;

    const DEFAULT_FOCUS = 25 * 60; // 25 minutes
    const DEFAULT_SHORT = 5 * 60;  // 5 minutes
    const DEFAULT_LONG = 15 * 60;  // 15 minutes

    let seconds = DEFAULT_FOCUS;
    let running = false;
    let timerId = null;
    let mode = "focus"; // focus | short | long
    let sessions = 0;

    const RING_RADIUS = 120;
    const CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

    container.innerHTML = `
      <div class="text-center">
        <h3 class="text-2xl font-bold text-white mb-1" data-i18n="tool_pomodoro_title">Pomodoro Focus Timer</h3>
        <p class="text-slate-400 text-sm mb-6">25/5/15 — focus, short break, long break</p>

        <!-- Mode tabs -->
        <div class="flex justify-center gap-2 mb-6">
          <button data-pomo-mode="focus" class="px-4 py-1.5 rounded-full bg-emerald-500 text-white text-sm font-semibold transition">Focus</button>
          <button data-pomo-mode="short" class="px-4 py-1.5 rounded-full glass-card-static text-slate-300 text-sm font-medium transition">Short</button>
          <button data-pomo-mode="long" class="px-4 py-1.5 rounded-full glass-card-static text-slate-300 text-sm font-medium transition">Long</button>
        </div>

        <!-- Ring + time -->
        <div class="relative w-64 h-64 mx-auto mb-6">
          <svg class="w-64 h-64 -rotate-90" viewBox="0 0 280 280">
            <circle cx="140" cy="140" r="${RING_RADIUS}" fill="none" stroke="rgba(51,65,85,0.5)" stroke-width="12" />
            <circle data-pomo-ring cx="140" cy="140" r="${RING_RADIUS}" fill="none" stroke="#10b981" stroke-width="12"
              stroke-linecap="round" stroke-dasharray="${CIRCUMFERENCE}" stroke-dashoffset="0"
              class="pomo-ring" />
          </svg>
          <div class="absolute inset-0 flex flex-col items-center justify-center">
            <span data-pomo-time class="text-5xl font-bold text-white tabular-nums">25:00</span>
            <span data-pomo-mode-label class="text-sm text-emerald-400 mt-2">Focus</span>
          </div>
        </div>

        <!-- Controls -->
        <div class="flex justify-center gap-3 mb-6">
          <button data-pomo-start class="px-8 py-3 rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-sm font-bold hover:from-emerald-600 hover:to-emerald-700 transition shadow-lg shadow-emerald-500/20">Start</button>
          <button data-pomo-reset class="px-6 py-3 rounded-lg glass-card-static text-slate-300 text-sm font-semibold transition">Reset</button>
        </div>

        <!-- Sessions counter -->
        <p class="text-slate-400 text-sm" data-i18n="pomo_sessions"><span data-pomo-sessions>0</span> sessions completed</p>
      </div>
    `;

    const ring = container.querySelector("[data-pomo-ring]");
    const timeEl = container.querySelector("[data-pomo-time]");
    const modeLabel = container.querySelector("[data-pomo-mode-label]");
    const sessionsEl = container.querySelector("[data-pomo-sessions]");
    const startBtn = container.querySelector("[data-pomo-start]");
    const resetBtn = container.querySelector("[data-pomo-reset]");
    const modeBtns = container.querySelectorAll("[data-pomo-mode]");

    const modeConfig = {
      focus: { duration: DEFAULT_FOCUS, label: "pomo_focus", color: "#10b981" },
      short: { duration: DEFAULT_SHORT, label: "pomo_short_break", color: "#3b82f6" },
      long: { duration: DEFAULT_LONG, label: "pomo_long_break", color: "#f59e0b" },
    };

    function getDuration() {
      return modeConfig[mode].duration;
    }

    function formatTime(total) {
      const m = Math.floor(total / 60).toString().padStart(2, "0");
      const s = (total % 60).toString().padStart(2, "0");
      return m + ":" + s;
    }

    function setRing(ratio) {
      const offset = CIRCUMFERENCE * (1 - ratio);
      ring.style.strokeDashoffset = offset;
    }

    function updateDisplay() {
      const duration = getDuration();
      timeEl.textContent = formatTime(seconds);
      const ratio = seconds / duration;
      setRing(ratio);
      ring.style.stroke = modeConfig[mode].color;
      modeLabel.textContent = Lang.t(modeConfig[mode].label);
      modeLabel.classList.remove("text-emerald-400", "text-blue-400", "text-amber-400");
      modeLabel.classList.add(
        mode === "focus" ? "text-emerald-400" :
        mode === "short" ? "text-blue-400" : "text-amber-400"
      );
      ring.style.transition = "stroke-dashoffset 1s linear, stroke 0.3s";
    }

    function stop() {
      running = false;
      if (timerId) clearInterval(timerId);
      timerId = null;
      startBtn.textContent = Lang.t("pomo_start");
      startBtn.classList.remove("from-red-500", "to-red-600", "hover:from-red-600", "hover:to-red-700");
      startBtn.classList.add("from-emerald-500", "to-emerald-600", "hover:from-emerald-600", "hover:to-emerald-700");
    }

    function tick() {
      seconds--;
      if (seconds <= 0) {
        stop();
        sessions++;
        sessionsEl.textContent = sessions;
        if (globalThis.showToast) {
          globalThis.showToast(Lang.t("pomo_sessions"), "info");
        }
        // Report to the badge/gamification system (if enabled)
        if (window.Interactions && typeof window.Interactions.track === "function") {
          window.Interactions.track("sessions", sessions);
        }
        // Move to next mode: after focus → short break
        seconds = getDuration();
        updateDisplay();
        return;
      }
      updateDisplay();
    }

    function toggleStart() {
      if (running) {
        stop();
      } else {
        running = true;
        startBtn.textContent = Lang.t("pomo_pause");
        startBtn.classList.remove("from-emerald-500", "to-emerald-600", "hover:from-emerald-600", "hover:to-emerald-700");
        startBtn.classList.add("from-red-500", "to-red-600", "hover:from-red-600", "hover:to-red-700");
        timerId = setInterval(tick, 1000);
      }
    }

    function reset() {
      stop();
      seconds = getDuration();
      updateDisplay();
    }

    function setMode(newMode) {
      stop();
      mode = newMode;
      seconds = getDuration();
      // Update mode buttons styling
      modeBtns.forEach(function (btn) {
        btn.classList.remove("bg-emerald-500", "text-white", "bg-blue-500", "bg-amber-500");
        btn.classList.add("glass-card-static", "text-slate-300");
      });
      const active = container.querySelector('[data-pomo-mode="' + newMode + '"]');
      active.classList.remove("glass-card-static", "text-slate-300");
      if (newMode === "focus") active.classList.add("bg-emerald-500", "text-white");
      else if (newMode === "short") active.classList.add("bg-blue-500", "text-white");
      else active.classList.add("bg-amber-500", "text-white");
      updateDisplay();
    }

    startBtn.addEventListener("click", toggleStart);
    resetBtn.addEventListener("click", reset);
    modeBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        setMode(btn.getAttribute("data-pomo-mode"));
      });
    });

    updateDisplay();
  }

  /* ==========================================================
     GPA CALCULATOR
     ========================================================== */
  function initGPA() {
    const container = document.querySelector("[data-gpa-widget]");
    if (!container) return;

    const GRADE_POINTS = {
      "A": 4.0, "A-": 3.7, "B+": 3.3, "B": 3.0, "B-": 2.7,
      "C+": 2.3, "C": 2.0, "C-": 1.7, "D+": 1.3, "D": 1.0, "F": 0.0,
    };

    container.innerHTML = `
      <div>
        <h3 class="text-2xl font-bold text-white mb-1" data-i18n="tool_gpa_title">GPA Calculator</h3>
        <p class="text-slate-400 text-sm mb-6" data-i18n="gpa_hint">Select a grade and credit hours for each course.</p>

        <!-- Course list -->
        <div data-gpa-courses class="space-y-3 mb-6"></div>

        <!-- Add course -->
        <div class="flex flex-col sm:flex-row gap-3 mb-8 glass-card-static p-4">
          <input data-gpa-name type="text" placeholder="Course name (optional)"
            class="flex-1 px-3 py-2 rounded-lg bg-slate-900/70 border border-slate-700/60 text-sm text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition">
          <select data-gpa-grade class="px-3 py-2 rounded-lg bg-slate-900/70 border border-slate-700/60 text-sm text-slate-100 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition">
            ${Object.keys(GRADE_POINTS).map(function (g) {
              return '<option value="' + g + '">' + g + ' (' + GRADE_POINTS[g].toFixed(1) + ')</option>';
            }).join("")}
          </select>
          <input data-gpa-credits type="number" min="1" max="10" value="3" placeholder="Credits"
            class="w-24 px-3 py-2 rounded-lg bg-slate-900/70 border border-slate-700/60 text-sm text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition">
          <button data-gpa-add class="px-5 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-sm font-bold hover:from-emerald-600 hover:to-emerald-700 transition shadow-lg shadow-emerald-500/20">
            + Add Course
          </button>
        </div>

        <!-- Results -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div class="glass-card-static p-5 text-center">
            <p class="text-xs text-slate-400 uppercase tracking-wide mb-1" data-i18n="gpa_semester_gpa">Semester GPA</p>
            <p data-gpa-semester class="text-4xl font-extrabold text-emerald-400">0.00</p>
          </div>
          <div class="glass-card-static p-5 text-center">
            <p class="text-xs text-slate-400 uppercase tracking-wide mb-1" data-i18n="gpa_cumulative_gpa">Cumulative GPA</p>
            <p data-gpa-cumulative class="text-4xl font-extrabold text-blue-400">0.00</p>
          </div>
          <div class="glass-card-static p-5 text-center">
            <p class="text-xs text-slate-400 uppercase tracking-wide mb-1" data-i18n="gpa_total_credits">Total Credits</p>
            <p data-gpa-credits-total class="text-4xl font-extrabold text-blue-400">0</p>
          </div>
        </div>

        <button data-gpa-reset class="mt-6 px-6 py-2 rounded-lg glass-card-static text-slate-300 text-sm font-semibold transition hover:bg-slate-800/60">
          Reset
        </button>
      </div>
    `;

    const coursesBox = container.querySelector("[data-gpa-courses]");
    const nameInput = container.querySelector("[data-gpa-name]");
    const gradeSelect = container.querySelector("[data-gpa-grade]");
    const creditsInput = container.querySelector("[data-gpa-credits]");
    const addBtn = container.querySelector("[data-gpa-add]");
    const resetBtn = container.querySelector("[data-gpa-reset]");
    const semEl = container.querySelector("[data-gpa-semester]");
    const cumEl = container.querySelector("[data-gpa-cumulative]");
    const creditsTotalEl = container.querySelector("[data-gpa-credits-total]");

    // In-memory course list (persisted to localStorage)
    let courses = [];
    try {
      courses = JSON.parse(localStorage.getItem("student-hub-gpa")) || [];
    } catch (e) {
      courses = [];
    }

    function save() {
      try {
        localStorage.setItem("student-hub-gpa", JSON.stringify(courses));
      } catch (e) {}
    }

    function calculate() {
      let totalPoints = 0;
      let totalCredits = 0;
      courses.forEach(function (c) {
        const pts = GRADE_POINTS[c.grade] || 0;
        totalPoints += pts * c.credits;
        totalCredits += c.credits;
      });
      const gpa = totalCredits ? (totalPoints / totalCredits) : 0;
      semEl.textContent = gpa.toFixed(2);
      cumEl.textContent = gpa.toFixed(2);
      creditsTotalEl.textContent = totalCredits;
    }

    function renderCourseRows() {
      coursesBox.innerHTML = "";
      if (courses.length === 0) {
        const empty = document.createElement("p");
        empty.className = "text-slate-500 text-sm text-center py-4";
        empty.textContent = "No courses added yet.";
        coursesBox.appendChild(empty);
        return;
      }
      courses.forEach(function (course, idx) {
        const row = document.createElement("div");
        row.className = "flex items-center justify-between gap-3 glass-card-static px-4 py-3";
        row.classList.add("fade-in");
        const name = document.createElement("span");
        name.className = "text-sm text-slate-200 font-medium truncate";
        name.textContent = course.name || (idx + 1) + ". " + course.grade;
        row.appendChild(name);

        const right = document.createElement("div");
        right.className = "flex items-center gap-4 shrink-0";
        const gpaVal = document.createElement("span");
        gpaVal.className = "text-sm font-bold text-emerald-400";
        gpaVal.textContent = GRADE_POINTS[course.grade].toFixed(1);
        right.appendChild(gpaVal);
        const credits = document.createElement("span");
        credits.className = "text-xs text-slate-400";
        credits.textContent = course.credits + " cr";
        right.appendChild(credits);
        const del = document.createElement("button");
        del.type = "button";
        del.className = "text-slate-400 hover:text-red-400 transition px-1";
        del.textContent = "✕";
        del.setAttribute("aria-label", "Remove course");
        del.addEventListener("click", function () {
          courses.splice(idx, 1);
          save();
          renderCourseRows();
          calculate();
        });
        right.appendChild(del);
        row.appendChild(right);
        coursesBox.appendChild(row);
      });
    }

    function addCourse() {
      const grade = gradeSelect.value;
      const credits = parseInt(creditsInput.value, 10) || 3;
      const name = sanitizeInput(nameInput.value).trim();
      courses.push({ name: name, grade: grade, credits: Math.max(1, Math.min(10, credits)) });
      save();
      renderCourseRows();
      calculate();
      nameInput.value = "";
    }

    addBtn.addEventListener("click", addCourse);
    creditsInput.addEventListener("keydown", function (e) {
      if (e.key === "Enter") addCourse();
    });
    resetBtn.addEventListener("click", function () {
      courses = [];
      save();
      renderCourseRows();
      calculate();
    });

    renderCourseRows();
    calculate();
  }

  /* ==========================================================
     VIEW TAB SWITCHING
     ========================================================== */
  function initViewTabs() {
    const tabs = document.querySelectorAll("[data-tab]");
    if (!tabs.length) return;
    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        const target = tab.getAttribute("data-tab");
        tabs.forEach(function (t) {
          t.classList.remove("bg-emerald-500", "text-white");
          t.classList.add("glass-card-static", "text-slate-300");
        });
        tab.classList.add("bg-emerald-500", "text-white");
        tab.classList.remove("glass-card-static", "text-slate-300");

        ["tools", "pomodoro", "gpa"].forEach(function (p) {
          const panel = document.querySelector('[data-panel="' + p + '"]');
          if (panel) {
            panel.classList.toggle("hidden", p !== target);
          }
        });
      });
    });
  }

  /* ----------------------------------------------------------
     Existing utility tools (dark theme)
     ---------------------------------------------------------- */
  const tools = [
    {
      id: "text-counter",
      titleKey: "tool_textcounter_title",
      descKey: "tool_textcounter_desc",
      icon: "📊",
      init: function (container) {
        container.innerHTML = `
          <div class="space-y-4" dir="auto">
            <textarea data-tc-input placeholder="Type or paste your text here..."
              class="w-full h-32 ${DARK_INPUT} resize-none" aria-label="Text input"></textarea>
            <div class="flex flex-wrap gap-2">
              <span class="px-3 py-1 rounded-md bg-blue-500/15 text-blue-300 text-sm font-medium"><span data-tc-words>0</span> <span data-i18n="tool_words"></span></span>
              <span class="px-3 py-1 rounded-md bg-emerald-500/15 text-emerald-300 text-sm font-medium"><span data-tc-chars>0</span> <span data-i18n="tool_chars"></span></span>
              <span class="px-3 py-1 rounded-md bg-amber-500/15 text-amber-300 text-sm font-medium"><span data-tc-sent>0</span> <span data-i18n="tool_sentences"></span></span>
              <span class="px-3 py-1 rounded-md bg-rose-500/15 text-rose-300 text-sm font-medium"><span data-tc-par>0</span> <span data-i18n="tool_paragraphs"></span></span>
            </div>
          </div>`;

        const input = container.querySelector("[data-tc-input]");
        const wordsEl = container.querySelector("[data-tc-words]");
        const charsEl = container.querySelector("[data-tc-chars]");
        const sentEl = container.querySelector("[data-tc-sent]");
        const parEl = container.querySelector("[data-tc-par]");

        const update = function () {
          const text = sanitizeInput(input.value);
          const trimmed = text.trim();
          wordsEl.textContent = trimmed ? trimmed.split(/\s+/).length : 0;
          charsEl.textContent = text.length;
          sentEl.textContent = (trimmed.match(/[.!?]+(\s|$)/g) || []).length;
          parEl.textContent = trimmed ? trimmed.split(/\n\s*\n/).filter(Boolean).length || 1 : 0;
        };
        input.addEventListener("input", update);
      },
    },
    {
      id: "case-converter",
      titleKey: "tool_caseconv_title",
      descKey: "tool_caseconv_desc",
      icon: "🔠",
      init: function (container) {
        container.innerHTML = `
          <div class="space-y-3" dir="auto">
            <textarea data-cc-input placeholder="Enter text to convert..." class="w-full h-24 ${DARK_INPUT} resize-none" aria-label="Text to convert"></textarea>
            <div class="flex flex-wrap gap-2">
              <button data-cc-mode="upper" class="cc-btn px-3 py-1.5 rounded-md bg-slate-800 text-slate-300 hover:bg-blue-500/20 hover:text-blue-300 text-sm font-medium transition">UPPERCASE</button>
              <button data-cc-mode="lower" class="cc-btn px-3 py-1.5 rounded-md bg-slate-800 text-slate-300 hover:bg-blue-500/20 hover:text-blue-300 text-sm font-medium transition">lowercase</button>
              <button data-cc-mode="title" class="cc-btn px-3 py-1.5 rounded-md bg-slate-800 text-slate-300 hover:bg-blue-500/20 hover:text-blue-300 text-sm font-medium transition">Title Case</button>
              <button data-cc-mode="sentence" class="cc-btn px-3 py-1.5 rounded-md bg-slate-800 text-slate-300 hover:bg-blue-500/20 hover:text-blue-300 text-sm font-medium transition">Sentence case</button>
            </div>
            <div class="flex items-center gap-2">
              <textarea data-cc-output readonly placeholder="Result..." class="flex-1 h-20 px-3 py-2.5 rounded-lg bg-slate-900/70 border border-slate-700/60 text-sm text-emerald-300 placeholder-slate-500 resize-none" aria-label="Output"></textarea>
              <button data-cc-copy class="copy-btn shrink-0 px-3 py-2 rounded-md bg-blue-500 text-white text-sm font-medium hover:bg-blue-600 transition">Copy</button>
            </div>
          </div>`;

        const input = container.querySelector("[data-cc-input]");
        const output = container.querySelector("[data-cc-output]");
        const btns = container.querySelectorAll("[data-cc-mode]");
        const copyBtn = container.querySelector("[data-cc-copy]");

        const convert = function (mode) {
          const text = sanitizeInput(input.value);
          let result = text;
          if (mode === "upper") result = text.toUpperCase();
          else if (mode === "lower") result = text.toLowerCase();
          else if (mode === "title")
            result = text.replace(/\w\S*/g, function (w) {
              return w.charAt(0).toUpperCase() + w.substr(1).toLowerCase();
            });
          else if (mode === "sentence")
            result = text.replace(/(^\s*\w|[.!?]\s+\w)/g, function (c) {
              return c.toUpperCase();
            });
          output.value = result;
        };

        btns.forEach(function (b) {
          b.addEventListener("click", function () {
            convert(b.getAttribute("data-cc-mode"));
            btns.forEach(function (x) { x.classList.remove("bg-blue-500", "text-white"); x.classList.add("bg-slate-800", "text-slate-300"); });
            b.classList.add("bg-blue-500", "text-white");
            b.classList.remove("bg-slate-800", "text-slate-300", "hover:bg-blue-500/20");
          });
        });

        copyBtn.addEventListener("click", function () {
          if (output.value) copyToClipboard(output.value, copyBtn);
        });
      },
    },
    {
      id: "json-formatter",
      titleKey: "tool_json_title",
      descKey: "tool_json_desc",
      icon: "{}",
      init: function (container) {
        container.innerHTML = `
          <div class="space-y-3" dir="auto">
            <textarea data-jf-input placeholder='Paste JSON here, e.g. {"name":"value"}'
              class="w-full h-28 ${DARK_INPUT} font-mono text-xs resize-none" aria-label="JSON input"></textarea>
            <div class="flex gap-2">
              <button data-jf-format class="px-4 py-2 rounded-md bg-blue-500 text-white text-sm font-medium hover:bg-blue-600 transition">Format / Validate</button>
              <button data-jf-clear class="px-4 py-2 rounded-md bg-slate-800 text-slate-300 text-sm font-medium hover:bg-slate-700 transition">Clear</button>
            </div>
            <pre data-jf-output class="hidden p-3 bg-slate-900 text-emerald-300 text-xs rounded-lg overflow-auto max-h-48 whitespace-pre-wrap" dir="ltr"></pre>
            <p data-jf-error class="hidden text-red-400 text-sm font-medium"></p>
          </div>`;

        const input = container.querySelector("[data-jf-input]");
        const output = container.querySelector("[data-jf-output]");
        const error = container.querySelector("[data-jf-error]");
        const formatBtn = container.querySelector("[data-jf-format]");
        const clearBtn = container.querySelector("[data-jf-clear]");

        formatBtn.addEventListener("click", function () {
          const raw = sanitizeInput(input.value);
          if (!raw) {
            error.textContent = "Please paste some JSON.";
            error.classList.remove("hidden");
            output.classList.add("hidden");
            return;
          }
          try {
            const parsed = JSON.parse(raw);
            output.textContent = JSON.stringify(parsed, null, 2);
            output.classList.remove("hidden");
            error.classList.add("hidden");
            showToast("Valid JSON!", "success");
          } catch (e) {
            error.textContent = "Invalid JSON: " + sanitizeInput(e.message);
            error.classList.remove("hidden");
            output.classList.add("hidden");
          }
        });

        clearBtn.addEventListener("click", function () {
          input.value = "";
          output.classList.add("hidden");
          error.classList.add("hidden");
        });
      },
    },
    {
      id: "password-generator",
      titleKey: "tool_password_title",
      descKey: "tool_password_desc",
      icon: "🔐",
      init: function (container) {
        container.innerHTML = `
          <div class="space-y-4" dir="auto">
            <div class="flex items-center gap-3">
              <label class="text-sm text-slate-300" for="pg-length">Length:</label>
              <input type="range" id="pg-length" data-pg-length min="8" max="64" value="16" class="flex-1 accent-indigo-500">
              <span data-pg-length-label class="text-sm font-semibold text-blue-300 w-8 text-center">16</span>
            </div>
            <div class="flex flex-wrap gap-4 text-sm text-slate-300">
              <label class="flex items-center gap-2"><input type="checkbox" data-pg-lower checked class="accent-indigo-500"> a-z</label>
              <label class="flex items-center gap-2"><input type="checkbox" data-pg-upper checked class="accent-indigo-500"> A-Z</label>
              <label class="flex items-center gap-2"><input type="checkbox" data-pg-num checked class="accent-indigo-500"> 0-9</label>
              <label class="flex items-center gap-2"><input type="checkbox" data-pg-sym class="accent-indigo-500"> !@#$</label>
            </div>
            <div class="flex items-center gap-2">
              <input type="text" data-pg-output readonly class="flex-1 px-3 py-2.5 rounded-lg bg-slate-900/70 border border-slate-700/60 font-mono text-sm text-emerald-300" aria-label="Generated password">
              <button data-pg-generate class="px-4 py-2 rounded-md bg-blue-500 text-white text-sm font-medium hover:bg-blue-600 transition">Generate</button>
              <button data-pg-copy class="px-3 py-2 rounded-md bg-slate-800 text-slate-300 text-sm font-medium hover:bg-slate-700 transition">Copy</button>
            </div>
          </div>`;

        const lengthEl = container.querySelector("[data-pg-length]");
        const lenLabel = container.querySelector("[data-pg-length-label]");
        const output = container.querySelector("[data-pg-output]");
        const generateBtn = container.querySelector("[data-pg-generate]");
        const copyBtn = container.querySelector("[data-pg-copy]");

        const generate = function () {
          const len = parseInt(lengthEl.value, 10);
          const sets = [];
          if (container.querySelector("[data-pg-lower]").checked) sets.push("abcdefghijklmnopqrstuvwxyz");
          if (container.querySelector("[data-pg-upper]").checked) sets.push("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
          if (container.querySelector("[data-pg-num]").checked) sets.push("0123456789");
          if (container.querySelector("[data-pg-sym]").checked) sets.push("!@#$%^&*()_+-=[]{}|;:,.<>?");
          if (sets.length === 0) { output.value = ""; return; }
          const all = sets.join("");
          let result = "";
          sets.forEach(function (set) { result += set.charAt(Math.floor(Math.random() * set.length)); });
          for (let i = result.length; i < len; i++) {
            result += all.charAt(Math.floor(Math.random() * all.length));
          }
          result = result.split("").sort(function () { return 0.5 - Math.random(); }).join("");
          output.value = result;
        };

        lengthEl.addEventListener("input", function () {
          lenLabel.textContent = lengthEl.value;
        });
        generateBtn.addEventListener("click", generate);
        copyBtn.addEventListener("click", function () {
          if (output.value) copyToClipboard(output.value, copyBtn);
        });
        generate();
      },
    },
    {
      id: "color-converter",
      titleKey: "tool_color_title",
      descKey: "tool_color_desc",
      icon: "🎨",
      init: function (container) {
        container.innerHTML = `
          <div class="space-y-3" dir="auto">
            <div class="flex items-center gap-2">
              <input type="color" data-clr-picker value="#4f46e5" class="w-12 h-12 rounded cursor-pointer border border-slate-700 bg-slate-900" aria-label="Color picker">
              <input type="text" data-clr-hex value="#4f46e5" class="flex-1 ${DARK_INPUT} font-mono" aria-label="HEX value">
            </div>
            <div class="flex items-center gap-2">
              <input type="text" data-clr-rgb readonly value="rgb(79, 70, 229)" class="flex-1 px-3 py-2.5 rounded-lg bg-slate-900/70 border border-slate-700/60 font-mono text-sm text-emerald-300" aria-label="RGB value">
              <button data-clr-copy class="px-3 py-2 rounded-md bg-blue-500 text-white text-sm font-medium hover:bg-blue-600 transition">Copy RGB</button>
            </div>
          </div>`;

        const picker = container.querySelector("[data-clr-picker]");
        const hexInput = container.querySelector("[data-clr-hex]");
        const rgbInput = container.querySelector("[data-clr-rgb]");

        const hexToRgb = function (hex) {
          let h = hex.replace("#", "");
          if (h.length === 3) h = h.split("").map(function (c) { return c + c; }).join("");
          const num = parseInt(h, 16);
          return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
        };

        const updateFromHex = function (hex) {
          let h = hex.replace("#", "");
          if (!/^[0-9a-fA-F]{3}$/.test(h) && !/^[0-9a-fA-F]{6}$/.test(h)) return;
          if (h.length === 3) h = h.split("").map(function (c) { return c + c; }).join("");
          const rgb = hexToRgb("#" + h);
          rgbInput.value = "rgb(" + rgb.r + ", " + rgb.g + ", " + rgb.b + ")";
          picker.value = "#" + h.toLowerCase();
        };

        picker.addEventListener("input", function () {
          hexInput.value = picker.value;
          updateFromHex(picker.value);
        });

        hexInput.addEventListener("input", function () {
          let val = sanitizeInput(hexInput.value);
          if (!val.startsWith("#")) val = "#" + val;
          updateFromHex(val);
        });

        container.querySelector("[data-clr-copy]").addEventListener("click", function () {
          if (rgbInput.value) copyToClipboard(rgbInput.value, this);
        });
      },
    },
    {
      id: "lorem-ipsum",
      titleKey: "tool_lorem_title",
      descKey: "tool_lorem_desc",
      icon: "📝",
      init: function (container) {
        container.innerHTML = `
          <div class="space-y-3" dir="auto">
            <div class="flex items-center gap-2">
              <label class="text-sm text-slate-300">Paragraphs:</label>
              <input type="number" data-li-count value="3" min="1" max="10" class="w-20 px-3 py-2 rounded-lg bg-slate-900/70 border border-slate-700/60 text-sm text-slate-100 focus:ring-2 focus:ring-blue-500 focus:outline-none transition">
              <button data-li-gen class="px-4 py-2 rounded-md bg-blue-500 text-white text-sm font-medium hover:bg-blue-600 transition">Generate</button>
            </div>
            <textarea data-li-output readonly class="w-full h-40 ${DARK_INPUT} resize-none" aria-label="Generated lorem ipsum"></textarea>
          </div>`;

        const countEl = container.querySelector("[data-li-count]");
        const genBtn = container.querySelector("[data-li-gen]");
        const output = container.querySelector("[data-li-output]");

        const LOREM = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

        const generate = function () {
          let n = parseInt(countEl.value, 10) || 3;
          n = Math.max(1, Math.min(10, n));
          const paras = [];
          for (let i = 0; i < n; i++) paras.push(LOREM);
          output.value = paras.join("\n\n");
        };

        genBtn.addEventListener("click", generate);
        generate();
      },
    },
  ];

  let currentTools = tools;

  /* ----------------------------------------------------------
     Render tool cards into the tools grid
     Filters by search query.
     @param {string} [lang]
     ---------------------------------------------------------- */
  function renderTools(lang) {
    const container = document.querySelector("[data-tools-container]");
    if (!container) return;
    lang = lang || Lang.get();

    const searchTerm = (globalThis._toolSearch || "").trim().toLowerCase();

    const filtered = currentTools.filter(function (tool) {
      if (!searchTerm) return true;
      const title = (Lang.t(tool.titleKey, lang) || "").toLowerCase();
      const desc = (Lang.t(tool.descKey, lang) || "").toLowerCase();
      return title.indexOf(searchTerm) !== -1 || desc.indexOf(searchTerm) !== -1;
    });

    container.innerHTML = "";

    if (filtered.length === 0) {
      const empty = document.createElement("div");
      empty.className = "col-span-full text-center py-12 text-slate-400";
      empty.textContent = lang === "ar" ? "لا توجد أدوات مطابقة" : "No matching tools found.";
      container.appendChild(empty);
      return;
    }

    filtered.forEach(function (tool) {
      const card = document.createElement("div");
      card.className = "glass-card p-6 flex flex-col";
      card.setAttribute("data-search-card", "");
      card.setAttribute(
        "data-search-tags",
        (tool.id + " tool " + Lang.t(tool.titleKey, lang) + " " + Lang.t(tool.descKey, lang)).toLowerCase()
      );
      card.setAttribute("data-search-title", Lang.t(tool.titleKey, lang));

      const iconWrap = document.createElement("div");
      iconWrap.className = "w-12 h-12 rounded-xl bg-blue-500/15 text-slate-100 flex items-center justify-center text-2xl mb-4";
      iconWrap.textContent = tool.icon;
      card.appendChild(iconWrap);

      const title = document.createElement("h3");
      title.className = "text-lg font-semibold text-white mb-1";
      title.textContent = Lang.t(tool.titleKey, lang);
      card.appendChild(title);

      const desc = document.createElement("p");
      desc.className = "text-sm text-slate-400 mb-4";
      desc.textContent = Lang.t(tool.descKey, lang);
      card.appendChild(desc);

      const body = document.createElement("div");
      body.className = "flex-1";
      card.appendChild(body);

      container.appendChild(card);
      tool.init(body);
      if (Lang && Lang.localize) Lang.localize(body, lang);
    });
  }

  globalThis.renderTools = renderTools;

  /* ----------------------------------------------------------
     Wire up search, view tabs, widgets and init
     ---------------------------------------------------------- */
  ready(function () {
    initViewTabs();
    initPomodoro();
    initGPA();

    const searchInput = document.querySelector("[data-tools-search]");
    if (searchInput) {
      searchInput.addEventListener("input", function () {
        globalThis._toolSearch = sanitizeInput(searchInput.value);
        renderTools(Lang.get());
      });
    }

    if (typeof Lang !== "undefined" && Lang.get) {
      renderTools(Lang.get());
    }
  });

  /* ----------------------------------------------------------
     Re-render tools when language changes
     ---------------------------------------------------------- */
  window.addEventListener("languagechanged", function () {
    if (document.querySelector("[data-tools-container]")) {
      renderTools(Lang.get());
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
