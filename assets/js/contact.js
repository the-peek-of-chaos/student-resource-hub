/* ============================================================
   contact.js
   Secure contact form:
   - Client-side validation with inline error feedback
   - Input sanitization on every field
   - Honeypot spam protection
   - Simulated submission (placeholder for backend)
   ============================================================ */

(function () {
  "use strict";

  function ready(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn);
    } else {
      fn();
    }
  }

  ready(function () {
    const form = document.querySelector("[data-contact-form]");
    if (!form) return;

    const alertBox = document.querySelector("[data-contact-alert]");
    const fields = {
      name: document.getElementById("contact-name"),
      email: document.getElementById("contact-email"),
      subject: document.getElementById("contact-subject"),
      message: document.getElementById("contact-message"),
    };
    // Honeypot
    const honeypot = document.getElementById("website");

    /* ----------------------------------------------------------
       Clear validation error on a single field
       ---------------------------------------------------------- */
    function clearError(fieldKey) {
      const el = fields[fieldKey];
      if (!el) return;
      el.classList.remove("border-red-500", "ring-2", "ring-red-200");
      const fb = document.querySelector('[data-feedback="' + fieldKey + '"]');
      if (fb) {
        fb.classList.add("hidden");
        fb.textContent = "";
      }
    }

    /* ----------------------------------------------------------
       Show a validation error on a single field
       @param {string} fieldKey
       @param {string} message
       ---------------------------------------------------------- */
    function showError(fieldKey, message) {
      const el = fields[fieldKey];
      if (!el) return;
      el.classList.add("border-red-500", "ring-2", "ring-red-200");
      const fb = document.querySelector('[data-feedback="' + fieldKey + '"]');
      if (fb) {
        fb.textContent = message;
        fb.classList.remove("hidden");
      }
    }

    /* ----------------------------------------------------------
       Validate the entire form.
       Returns true when valid; false when invalid.
       ---------------------------------------------------------- */
    function validate() {
      let valid = true;

      // Each field is sanitized before validation
      const name = sanitizeInput(fields.name.value).trim();
      const email = sanitizeInput(fields.email.value).trim();
      const subject = sanitizeInput(fields.subject.value).trim();
      const message = sanitizeInput(fields.message.value).trim();

      // Name
      clearError("name");
      if (!name) {
        showError("name", Lang.t("contact_name_required"));
        valid = false;
      } else if (name.length < 2) {
        showError("name", Lang.t("contact_name_required"));
        valid = false;
      }

      // Email
      clearError("email");
      if (!email || !isValidEmail(email)) {
        showError("email", Lang.t("contact_email_required"));
        valid = false;
      }

      // Subject
      clearError("subject");
      if (!subject) {
        showError("subject", Lang.t("contact_subject_required"));
        valid = false;
      }

      // Message
      clearError("message");
      if (!message || message.length < 10) {
        showError("message", Lang.t("contact_message_required"));
        valid = false;
      }

      return valid;
    }

    /* ----------------------------------------------------------
       Show the top alert banner (success/error)
       @param {string} type - 'success' | 'error'
       @param {string} message
       ---------------------------------------------------------- */
    function showAlert(type, message) {
      if (!alertBox) return;
      alertBox.classList.remove("hidden", "bg-green-50", "text-green-800", "bg-red-50", "text-red-800");
      if (type === "success") {
        alertBox.classList.add("bg-green-50", "text-green-800", "border", "border-green-200");
      } else {
        alertBox.classList.add("bg-red-50", "text-red-800", "border", "border-red-200");
      }
      alertBox.textContent = message;
      alertBox.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    /* ----------------------------------------------------------
       Clear all validation errors (on reset/retry)
       ---------------------------------------------------------- */
    function clearAllErrors() {
      Object.keys(fields).forEach(function (key) {
        clearError(key);
      });
      if (alertBox) {
        alertBox.classList.add("hidden");
        alertBox.textContent = "";
      }
    }

    // Live validation: clear error as user types in a field
    Object.keys(fields).forEach(function (key) {
      fields[key].addEventListener("input", function () {
        clearError(key);
      });
    });

    /* ----------------------------------------------------------
       Submit handler
       ---------------------------------------------------------- */
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // Honeypot: if filled, silently reject (bot)
      if (honeypot && honeypot.value) {
        showAlert("error", Lang.t("contact_error"));
        return;
      }

      if (!validate()) {
        return;
      }

      // Build a sanitized payload (no dangerous content)
      const payload = {
        name: sanitizeInput(fields.name.value).trim(),
        email: sanitizeInput(fields.email.value).trim(),
        subject: sanitizeInput(fields.subject.value).trim(),
        message: sanitizeInput(fields.message.value).trim(),
      };

      // PLACEHOLDER — integrate with a real backend or email service.
      // Example: fetch('/api/contact', { method: 'POST', body: JSON.stringify(payload) })
      // Remember to keep the CSP connect-src aligned with your endpoint.

      // Simulate an async request
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = "...";

      setTimeout(function () {
        showAlert("success", Lang.t("contact_success"));
        form.reset();
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        // Re-translate the reset form's placeholders
        Lang.apply(Lang.get());
        clearAllErrors();
      }, 600);
    });
  });
})();
