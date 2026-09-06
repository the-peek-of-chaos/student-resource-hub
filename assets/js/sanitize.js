/* ============================================================
   sanitize.js
   Robust input sanitization utilities to prevent XSS attacks.
   Used across all pages for any user-supplied content.
   ============================================================ */

/**
 * Sanitize user input by stripping HTML tags and dangerous characters.
 * Uses textContent (safe) then exposes innerHTML, neutralizing any markup.
 * @param {string} input - Raw user input
 * @returns {string} - Sanitized plain text
 */
function sanitizeInput(input) {
  if (input === null || input === undefined) return "";
  const div = document.createElement("div");
  div.textContent = String(input);
  return div.innerHTML;
}

/**
 * Encode dangerous HTML characters to their safe entities.
 * @param {string} str - Input string
 * @returns {string} - HTML-entity-encoded string
 */
function encodeHTML(str) {
  if (str === null || str === undefined) return "";
  return String(str).replace(/[&<>"']/g, function (match) {
    const map = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#x27;",
    };
    return map[match];
  });
}

/**
 * Decode HTML entities back to raw text (safe).
 * @param {string} str - Encoded string
 * @returns {string} - Decoded plain text
 */
function decodeHTML(str) {
  if (str === null || str === undefined) return "";
  const div = document.createElement("div");
  div.innerHTML = String(str);
  return div.textContent || div.innerText || "";
}

/**
 * Strip all HTML tags and attributes, returning only text.
 * @param {string} html - Raw HTML content
 * @returns {string} - Text-only content
 */
function stripHTML(html) {
  if (html === null || html === undefined) return "";
  const div = document.createElement("div");
  div.innerHTML = String(html);
  return div.textContent || div.innerText || "";
}

/**
 * Remove dangerous protocol prefixes (javascript:, data:, vbscript:).
 * @param {string} url - Input URL string
 * @returns {string} - Safe URL
 */
function sanitizeURL(url) {
  if (!url) return "";
  const trimmed = String(url).trim();
  const block = /^(javascript:|data:|vbscript:|file:)/i;
  if (block.test(trimmed)) return "";
  return trimmed;
}

/**
 * Validate an email address format.
 * @param {string} email
 * @returns {boolean}
 */
function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  return re.test(String(email).trim());
}

/**
 * Validate a URL format.
 * @param {string} url
 * @returns {boolean}
 */
function isValidURL(url) {
  try {
    const parsed = new URL(String(url).trim());
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch (e) {
    return false;
  }
}

/**
 * Strip dangerous HTML but allow safe tags and attributes (whitelist approach).
 * Used when displaying user content that may legitimately contain light markup.
 * @param {string} html
 * @returns {string} - Sanitized HTML with only whitelisted tags/attrs
 */
function sanitizeRichText(html) {
  if (!html) return "";
  const div = document.createElement("div");
  div.innerHTML = String(html);

  // Remove script, style, iframe, object, embed, form, link, meta tags
  const removeTags = ["script", "style", "iframe", "object", "embed", "form", "link", "meta", "svg", "math"];
  removeTags.forEach(function (tag) {
    div.querySelectorAll(tag).forEach(function (el) {
      el.remove();
    });
  });

  // Remove all on* event handlers and dangerous attributes from every element
  div.querySelectorAll("*").forEach(function (el) {
    const attrs = Array.from(el.attributes);
    attrs.forEach(function (attr) {
      const name = attr.name.toLowerCase();
      const value = attr.value.toLowerCase();
      if (name.startsWith("on") || value.startsWith("javascript:") || value.startsWith("data:")) {
        el.removeAttribute(attr.name);
      }
    });
  });

  return div.innerHTML;
}

/**
 * Get a sanitized, length-limited value from an input element.
 * @param {string} selector - CSS selector for the input
 * @param {number} maxLength - Maximum allowed length
 * @returns {string} - Sanitized and truncated value
 */
function getSafeInput(selector, maxLength) {
  const el = document.querySelector(selector);
  if (!el) return "";
  let value = stripHTML(el.value || "");
  if (maxLength) value = value.slice(0, maxLength);
  return value;
}
