/* ============================================================
   ads.js — Automated ad injection
   ------------------------------------------------------------
   Reads AD_CONFIG (from config.js) and injects ad code into
   designated "Sponsored" glassmorphism slots across all pages
   without breaking the layout.

   Slots are marked with:
     <div data-ad-slot="top"></div>
     <div data-ad-slot="mid"></div>
     <div data-ad-slot="bottom"></div>

   Each slot is wrapped in a professional, gated glassmorphism
   container with a small "Sponsored" badge.
   ============================================================ */

(function () {
  "use strict";

  /* ----------------------------------------------------------
     Literal HTML-safe injection of ad scripts.
     We insert script tags via a temporary container and let the
     browser execute them. Text nodes are set via textContent.
     ---------------------------------------------------------- */
  function injectAdSnippet(wrapElement, snippet) {
    if (!snippet) return;
    const tmp = document.createElement("div");
    // Setting via innerHTML is intentional here — the ad code is
    // provided by the site owner (trusted), not end users.
    tmp.innerHTML = snippet;
    // Move executed scripts/elements into the wrap
    while (tmp.firstChild) {
      wrapElement.appendChild(tmp.firstChild);
    }
  }

  /* ----------------------------------------------------------
     Build the full "Sponsored" slot (glass card + badge + ad)
     ---------------------------------------------------------- */
  function buildSlot(slotKey, snippet) {
    const slotEl = document.querySelector('[data-ad-slot="' + slotKey + '"]');
    if (!slotEl) return;

    // Guard: don't double-fill
    if (slotEl.querySelector(".ad-injected")) return;

    const card = document.createElement("div");
    card.className =
      "ad-injected glass-card glass-card-static relative my-6 p-0 overflow-hidden";

    // Top inset glow bar
    const glow = document.createElement("div");
    glow.className = "absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent";
    card.appendChild(glow);

    // Sponsored badge + label
    const head = document.createElement("div");
    head.className =
      "flex items-center justify-between px-4 py-2 border-b border-slate-800/60 bg-slate-900/50";

    const badge = document.createElement("span");
    badge.className =
      "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest " +
      "bg-slate-800 text-slate-400 border border-slate-700";
    badge.textContent = "Sponsored";
    head.appendChild(badge);

    const label = document.createElement("span");
    label.className = "text-[10px] text-slate-500 uppercase tracking-widest";
    label.textContent = "Advertisement";
    head.appendChild(label);
    card.appendChild(head);

    // Ad body
    const body = document.createElement("div");
    body.className = "flex items-center justify-center min-h-[120px] p-4 bg-slate-900/30";

    if (AD_CONFIG && AD_CONFIG.ENABLED && snippet) {
      const adHolder = document.createElement("div");
      adHolder.className = "flex flex-col items-center justify-center w-full";
      injectAdSnippet(adHolder, snippet);
      body.appendChild(adHolder);
    } else {
      // Clean placeholder while ads are disabled / no snippet
      body.innerHTML =
        '<div class="text-center py-6">' +
        '<span class="block text-2xl mb-2">📢</span>' +
        '<span class="text-sm text-slate-400">Ad space — add your snippet in <code class="text-blue-300">assets/js/config.js</code></span>' +
        "</div>";
    }
    card.appendChild(body);

    slotEl.appendChild(card);
  }

  /* ----------------------------------------------------------
     Load global scripts once (per page).
     ---------------------------------------------------------- */
  function loadGlobalScripts() {
    if (!AD_CONFIG || !AD_CONFIG.GLOBAL_SCRIPTS) return;
    if (window.__adsGlobalsLoaded) return;

    AD_CONFIG.GLOBAL_SCRIPTS.forEach(function (snippet) {
      const tmp = document.createElement("div");
      tmp.innerHTML = snippet;
      while (tmp.firstChild) {
        document.body.appendChild(tmp.firstChild);
      }
    });
    window.__adsGlobalsLoaded = true;
  }

  /* ----------------------------------------------------------
     Init — inject into all slots present on the page.
     ---------------------------------------------------------- */
  function initAds() {
    const present = document.querySelectorAll("[data-ad-slot]");
    if (!present.length) return;

    if (AD_CONFIG && AD_CONFIG.ENABLED) {
      loadGlobalScripts();
    }

    ["top", "mid", "bottom"].forEach(function (key) {
      const snippet = (AD_CONFIG && AD_CONFIG.AD_SNIPPETS && AD_CONFIG.AD_SNIPPETS[key])
        ? (Array.isArray(AD_CONFIG.AD_SNIPPETS[key])
            ? AD_CONFIG.AD_SNIPPETS[key].join("\n")
            : AD_CONFIG.AD_SNIPPETS[key])
        : "";
      buildSlot(key, snippet);
    });
  }

  /* Choose to inject via slot elements already in markup, OR auto
     create a top slot if none exist. We only inject into existing
     [data-ad-slot] elements to keep layout control. */

  function ready(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn);
    } else {
      fn();
    }
  }

  ready(initAds);
})();
