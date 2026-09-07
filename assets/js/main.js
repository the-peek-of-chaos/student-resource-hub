/* ============================================================
   main.js
   Core site-wide functionality:
   - Language toggle button wiring
   - Mobile navigation menu
   - Active page highlighting
   - Copy-to-clipboard helper + toast notifications
   - Footer newsletter (placeholder)
   ============================================================ */

(function () {
  "use strict";

  /* ----------------------------------------------------------
     DOM ready helper
     ---------------------------------------------------------- */
  function ready(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn);
    } else {
      fn();
    }
  }

  ready(function () {
    initLanguageToggle();
    initMobileNav();
    initActiveLink();
    initNewsletter();
    initValueListeners();
    initScrollReveal();
    initGlobalSearch();
    initNavbarScroll();
  });

  /* ----------------------------------------------------------
     Language Toggle Button
     ---------------------------------------------------------- */
  function initLanguageToggle() {
    const buttons = document.querySelectorAll("[data-lang-toggle]");
    if (!buttons.length) return;

    const updateLabel = function () {
      buttons.forEach(function (btn) {
        btn.textContent = Lang.t("lang_toggle");
        btn.setAttribute("aria-label", Lang.t("lang_toggle_aria"));
      });
    };

    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        Lang.toggle();
        updateLabel();
      });
    });

    // Update label when language changes (e.g., programmatically)
    window.addEventListener("languagechanged", updateLabel);
    updateLabel();
  }

  /* ----------------------------------------------------------
     Mobile Navigation Toggle
     ---------------------------------------------------------- */
  function initMobileNav() {
    const btn = document.querySelector("[data-nav-toggle]");
    const menu = document.querySelector("[data-nav-menu]");
    if (!btn || !menu) return;

    btn.addEventListener("click", function () {
      const isHidden = menu.classList.contains("hidden");
      if (isHidden) {
        menu.classList.remove("hidden");
        btn.setAttribute("aria-expanded", "true");
      } else {
        menu.classList.add("hidden");
        btn.setAttribute("aria-expanded", "false");
      }
    });

    // Close menu when a link is clicked (mobile)
    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        menu.classList.add("hidden");
        btn.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ----------------------------------------------------------
     Active Link Highlighting
     Uses body[data-page] and nav links data-page attribute
     ---------------------------------------------------------- */
  function initActiveLink() {
    const body = document.body;
    const currentPage = body.getAttribute("data-page");
    if (!currentPage) return;

    document.querySelectorAll('a[data-page]').forEach(function (link) {
      if (link.getAttribute("data-page") === currentPage) {
        link.classList.add("text-blue-500", "font-semibold");
      }
    });
  }

  /* ----------------------------------------------------------
     Navbar scroll effect — add shadow/background on scroll
     ---------------------------------------------------------- */
  function initNavbarScroll() {
    const header = document.querySelector("[data-navbar]");
    if (!header) return;

    const onScroll = function () {
      if (window.scrollY > 10) {
        header.classList.add("shadow-lg", "shadow-black/30", "border-slate-800");
      } else {
        header.classList.remove("shadow-lg", "shadow-black/30", "border-slate-800");
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ----------------------------------------------------------
     Scroll Reveal — reveal[data-reveal] elements fade in
     ---------------------------------------------------------- */
  function initScrollReveal() {
    const items = document.querySelectorAll("[data-reveal]");
    if (!items.length) return;
    if (!("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("visible"); });
      return;
    }
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    items.forEach(function (el) { observer.observe(el); });
  }

  /* ----------------------------------------------------------
     Instant Fuzzy Global Search
     Searches across lesson descriptions, tools, and cheat
     sheets and highlights matching cards without reload.
     ---------------------------------------------------------- */
  function initGlobalSearch() {
    const input = document.querySelector("[data-global-search]");
    if (!input) return;

    // Collect all searchable cards. Each promotable card should
    // carry data-search-tags attributes with space-separated terms.
    const resultsEl = document.querySelector("[data-global-results]");

    const performSearch = function () {
      const term = (sanitizeInput(input.value) || "").trim().toLowerCase();
      let count = 0;

      document.querySelectorAll("[data-search-card]").forEach(function (card) {
        const tags = (card.getAttribute("data-search-tags") || "").toLowerCase();
        const title = (card.getAttribute("data-search-title") || "").toLowerCase();
        const match = !term || tags.indexOf(term) !== -1 || title.indexOf(term) !== -1;
        // Also fuzzy-match: all chars of term present in order in tags
        let fuzzy = true;
        if (term) {
          fuzzy = fuzzyMatch(title + " " + tags, term);
        }
        const show = !term || match || fuzzy;
        card.classList.toggle("hidden", !show);
        if (show) count++;
      });

      if (resultsEl) {
        const word = Lang.get() === "ar" ? "نتيجة" : (count === 1 ? "result" : "results");
        resultsEl.textContent = count + " " + word;
      }
    };

    input.addEventListener("input", performSearch);
    performSearch();
  }

  /* ----------------------------------------------------------
     Simple fuzzy matcher — all chars of needle appear in order
     @param {string} hay
     @param {string} needle
     @returns {boolean}
     ---------------------------------------------------------- */
  function fuzzyMatch(hay, needle) {
    let i = 0;
    for (let j = 0; j < hay.length && i < needle.length; j++) {
      if (hay.charAt(j) === needle.charAt(i)) i++;
    }
    return i === needle.length;
  }

  /* ----------------------------------------------------------
     Copy to Clipboard
     Used by cheat sheets and tool results.
     @param {string} text - Text to copy
     @param {HTMLElement} triggerEl - Button that triggered it (optional)
     @returns {Promise<boolean>} success
     ---------------------------------------------------------- */
  function copyToClipboard(text, triggerEl) {
    if (!navigator.clipboard) {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      let ok = false;
      try {
        ok = document.execCommand("copy");
      } catch (e) {
        ok = false;
      }
      document.body.removeChild(textarea);
      if (ok) {
        showToast("Copied to clipboard!");
        if (triggerEl) flashButton(triggerEl);
      }
      return Promise.resolve(ok);
    }

    return navigator.clipboard.writeText(text).then(
      function () {
        showToast("Copied to clipboard!");
        if (triggerEl) flashButton(triggerEl);
        return true;
      },
      function () {
        showToast("Copy failed. Please try again.", "error");
        return false;
      }
    );
  }

  globalThis.copyToClipboard = copyToClipboard;

  /* ----------------------------------------------------------
     Flash "Copied!" feedback on a button
     @param {HTMLElement} btn
     ---------------------------------------------------------- */
  function flashButton(btn) {
    const original = btn.textContent;
    btn.classList.add("bg-emerald-600");
    btn.textContent = "✓ " + (Lang.get() === "ar" ? "تم" : "Copied!");
    setTimeout(function () {
      btn.textContent = original;
      btn.classList.remove("bg-emerald-600");
    }, 1500);
  }

  /* ----------------------------------------------------------
     Toast Notification System
     Shows a small non-intrusive notification at the bottom.
     @param {string} message - Toast text
     @param {string} type - 'success' | 'error' | 'info'
     ---------------------------------------------------------- */
  function showToast(message, type) {
    type = type || "success";

    let container = document.querySelector("[data-toast-container]");
    if (!container) {
      container = document.createElement("div");
      container.setAttribute("data-toast-container", "");
      container.className =
        "fixed bottom-5 left-1/2 -translate-x-1/2 z-50 space-y-2 w-full max-w-xs px-4";
      document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.setAttribute("role", "status");
    toast.className =
      "toast-enter flex items-center justify-between gap-3 px-4 py-3 rounded-lg shadow-lg text-sm font-medium border ";

    if (type === "error") {
      toast.classList.add("bg-red-900/90", "border-red-500/30", "text-red-100");
    } else if (type === "info") {
      toast.classList.add("bg-slate-800/95", "border-slate-700", "text-slate-100");
    } else {
      toast.classList.add("bg-emerald-600/95", "border-emerald-400/40", "text-white");
    }

    const span = document.createElement("span");
    span.textContent = message;
    toast.appendChild(span);

    const closeBtn = document.createElement("button");
    closeBtn.setAttribute("aria-label", "Close notification");
    closeBtn.className = "text-white/80 hover:text-white text-lg leading-none flex-shrink-0";
    closeBtn.textContent = "×";
    closeBtn.addEventListener("click", function () {
      toast.remove();
    });
    toast.appendChild(closeBtn);

    container.appendChild(toast);

    // Auto-dismiss after 3.5 seconds
    setTimeout(function () {
      toast.classList.add("toast-exit");
      setTimeout(function () {
        toast.remove();
      }, 300);
    }, 3500);
  }

  globalThis.showToast = showToast;

  /* ----------------------------------------------------------
     Footer Newsletter (placeholder)
     Sanitizes email, validates format, shows toast feedback.
     ---------------------------------------------------------- */
  function initNewsletter() {
    const form = document.querySelector("[data-newsletter]");
    if (!form) return;
    const emailInput = form.querySelector('input[type="email"]');

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const raw = emailInput ? emailInput.value : "";
      const email = sanitizeInput(raw).trim();

      if (!isValidEmail(email)) {
        showToast(Lang.t("contact_email_required"), "error");
        return;
      }

      // Placeholder — integrate with a backend/email service here.
      showToast(Lang.t("footer_subscribe"), "info");
      if (emailInput) emailInput.value = "";
    });
  }

  /* ----------------------------------------------------------
     Re-translate any dynamic lists on language change.
     Useful on cheat-sheets & tools pages.
     ---------------------------------------------------------- */
  function initValueListeners() {
    window.addEventListener("languagechanged", function (evt) {
      if (globalThis.renderCheatSheets) globalThis.renderCheatSheets(evt.detail.lang);
      if (globalThis.renderTools) globalThis.renderTools(evt.detail.lang);
    });
  }
})();
