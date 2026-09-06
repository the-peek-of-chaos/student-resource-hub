/* ============================================================
   tools.js
   Interactive mini-tools functionality.
   Renders tool cards and drives each tool's logic.
   ============================================================ */

(function () {
  "use strict";

  /* ----------------------------------------------------------
     Tool definitions — each includes an id, title/desc keys,
     template ID (optional), and a driver function.
     ---------------------------------------------------------- */
  const tools = [
    {
      id: "text-counter",
      titleKey: "tool_textcounter_title",
      descKey: "tool_textcounter_desc",
      icon: "📊",
      // Text Counter
      init: function (container) {
        container.innerHTML = `
          <div class="space-y-4" dir="auto">
            <textarea data-tc-input placeholder="Type or paste your text here..."
              class="w-full h-32 p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm" aria-label="Text input"></textarea>
            <div class="flex flex-wrap gap-2">
              <span class="px-3 py-1 rounded-md bg-indigo-50 text-indigo-700 text-sm font-medium"><span data-tc-words>0</span> <span data-i18n="tool_words"></span></span>
              <span class="px-3 py-1 rounded-md bg-emerald-50 text-emerald-700 text-sm font-medium"><span data-tc-chars>0</span> <span data-i18n="tool_chars"></span></span>
              <span class="px-3 py-1 rounded-md bg-amber-50 text-amber-700 text-sm font-medium"><span data-tc-sent>0</span> <span data-i18n="tool_sentences"></span></span>
              <span class="px-3 py-1 rounded-md bg-rose-50 text-rose-700 text-sm font-medium"><span data-tc-par>0</span> <span data-i18n="tool_paragraphs"></span></span>
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
            <textarea data-cc-input placeholder="Enter text to convert..." class="w-full h-24 p-3 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none" aria-label="Text to convert"></textarea>
            <div class="flex flex-wrap gap-2">
              <button data-cc-mode="upper" class="cc-btn px-3 py-1.5 rounded-md bg-slate-100 hover:bg-indigo-100 text-slate-700 text-sm font-medium transition">UPPERCASE</button>
              <button data-cc-mode="lower" class="cc-btn px-3 py-1.5 rounded-md bg-slate-100 hover:bg-indigo-100 text-slate-700 text-sm font-medium transition">lowercase</button>
              <button data-cc-mode="title" class="cc-btn px-3 py-1.5 rounded-md bg-slate-100 hover:bg-indigo-100 text-slate-700 text-sm font-medium transition">Title Case</button>
              <button data-cc-mode="sentence" class="cc-btn px-3 py-1.5 rounded-md bg-slate-100 hover:bg-indigo-100 text-slate-700 text-sm font-medium transition">Sentence case</button>
            </div>
            <div class="flex items-center gap-2">
              <textarea data-cc-output readonly placeholder="Result..." class="flex-1 h-20 p-3 border bg-slate-50 border-slate-200 rounded-lg text-sm" aria-label="Output"></textarea>
              <button data-cc-copy class="copy-btn shrink-0 px-3 py-2 rounded-md bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition">Copy</button>
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
            btns.forEach(function (x) { x.classList.remove("bg-indigo-600", "text-white"); x.classList.add("bg-slate-100"); });
            b.classList.add("bg-indigo-600"); b.classList.add("text-white");
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
            <textarea data-jf-input placeholder='Paste JSON here, e.g. {"name":"value"}' class="w-full h-28 p-3 font-mono text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none" aria-label="JSON input"></textarea>
            <div class="flex gap-2">
              <button data-jf-format class="px-4 py-2 rounded-md bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition">Format / Validate</button>
              <button data-jf-clear class="px-4 py-2 rounded-md bg-slate-200 text-slate-700 text-sm font-medium hover:bg-slate-300 transition">Clear</button>
            </div>
            <pre data-jf-output class="hidden p-3 bg-slate-900 text-emerald-300 text-xs rounded-lg overflow-auto max-h-48 whitespace-pre-wrap" dir="ltr"></pre>
            <p data-jf-error class="hidden text-red-600 text-sm font-medium"></p>
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
              <label class="text-sm text-slate-700" for="pg-length">Length:</label>
              <input type="range" id="pg-length" data-pg-length min="8" max="64" value="16" class="flex-1">
              <span data-pg-length-label class="text-sm font-semibold text-indigo-600 w-8 text-center">16</span>
            </div>
            <div class="flex flex-wrap gap-4 text-sm text-slate-700">
              <label class="flex items-center gap-2"><input type="checkbox" data-pg-lower checked> a-z</label>
              <label class="flex items-center gap-2"><input type="checkbox" data-pg-upper checked> A-Z</label>
              <label class="flex items-center gap-2"><input type="checkbox" data-pg-num checked> 0-9</label>
              <label class="flex items-center gap-2"><input type="checkbox" data-pg-sym> !@#$</label>
            </div>
            <div class="flex items-center gap-2">
              <input type="text" data-pg-output readonly class="flex-1 p-2.5 border border-slate-300 rounded-lg font-mono text-sm bg-slate-50" aria-label="Generated password">
              <button data-pg-generate class="px-4 py-2 rounded-md bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition">Generate</button>
              <button data-pg-copy class="px-3 py-2 rounded-md bg-slate-200 text-slate-700 text-sm font-medium hover:bg-slate-300 transition">Copy</button>
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
          // Ensure at least one char from each selected set
          sets.forEach(function (set) { result += set.charAt(Math.floor(Math.random() * set.length)); });
          for (let i = result.length; i < len; i++) {
            result += all.charAt(Math.floor(Math.random() * all.length));
          }
          // Shuffle
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
              <input type="color" data-clr-picker value="#4f46e5" class="w-12 h-12 rounded cursor-pointer border border-slate-300" aria-label="Color picker">
              <input type="text" data-clr-hex value="#4f46e5" class="flex-1 p-2.5 border border-slate-300 rounded-lg font-mono text-sm" aria-label="HEX value">
            </div>
            <div class="flex items-center gap-2">
              <input type="text" data-clr-rgb readonly value="rgb(79, 70, 229)" class="flex-1 p-2.5 border border-slate-200 rounded-lg font-mono text-sm bg-slate-50" aria-label="RGB value">
              <button data-clr-copy class="px-3 py-2 rounded-md bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition">Copy RGB</button>
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
              <label class="text-sm text-slate-700">Paragraphs:</label>
              <input type="number" data-li-count value="3" min="1" max="10" class="w-20 p-2 border border-slate-300 rounded-lg text-sm">
              <button data-li-gen class="px-4 py-2 rounded-md bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition">Generate</button>
            </div>
            <textarea data-li-output readonly class="w-full h-40 p-3 border border-slate-200 rounded-lg text-sm bg-slate-50" aria-label="Generated lorem ipsum"></textarea>
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
     Filters by category/search query.
     @param {string} [lang] - current language ('en'|'ar')
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
      empty.className = "col-span-full text-center py-12 text-slate-500";
      empty.textContent = lang === "ar" ? "لا توجد أدوات مطابقة" : "No matching tools found.";
      container.appendChild(empty);
      return;
    }

    filtered.forEach(function (tool, index) {
      const card = document.createElement("div");
      card.className =
        "bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-lg transition-shadow duration-300 flex flex-col";

      const iconWrap = document.createElement("div");
      iconWrap.className = "w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center text-2xl mb-4";
      iconWrap.textContent = tool.icon;
      card.appendChild(iconWrap);

      const title = document.createElement("h3");
      title.className = "text-lg font-semibold text-slate-900 mb-1";
      title.textContent = Lang.t(tool.titleKey, lang);
      card.appendChild(title);

      const desc = document.createElement("p");
      desc.className = "text-sm text-slate-500 mb-4";
      desc.textContent = Lang.t(tool.descKey, lang);
      card.appendChild(desc);

      const body = document.createElement("div");
      body.className = "flex-1";
      card.appendChild(body);

      container.appendChild(card);
      // Initialize tool's interactive content
      tool.init(body);
      // Localize any data-i18n labels injected inside the tool
      if (Lang && Lang.localize) Lang.localize(body, lang);
    });
  }

  globalThis.renderTools = renderTools;

  /* ----------------------------------------------------------
     Wire up the tools page search & init
     ---------------------------------------------------------- */
  ready(function () {
    const searchInput = document.querySelector("[data-tools-search]");
    if (searchInput) {
      searchInput.addEventListener("input", function () {
        globalThis._toolSearch = sanitizeInput(searchInput.value);
        renderTools(Lang.get());
      });
    }

    // Initial render — wait for Lang to be ready
    if (typeof Lang !== "undefined" && Lang.get) {
      renderTools(Lang.get());
    }
  });

  /* ----------------------------------------------------------
     DOM ready helper (local copy)
     ---------------------------------------------------------- */
  function ready(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn);
    } else {
      fn();
    }
  }
})();
