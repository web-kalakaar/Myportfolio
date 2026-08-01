/* ═══════════════════════════════════════════════════════════════
   FORM.JS
   Contact form validation + EmailJS submission + inline errors.
═══════════════════════════════════════════════════════════════ */
(() => {
  "use strict";

  emailjs.init({ publicKey: "LfvcbtBQfzG3ORN9A" });

  const EMAILJS_SERVICE_ID = "service_2z6wdhc";
  const EMAILJS_TEMPLATE_ID = "template_9s63ebc";

  const REQUIRED_FIELD_IDS = [
    "fname",
    "femail",
    "fphone",
    "fsubject",
    "fmessage",
  ];
  const ALL_FIELD_IDS = [
    "fname",
    "lname",
    "femail",
    "fsubject",
    "fmessage",
    "fphone",
  ];

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const PHONE_RE = /^\+?[1-9]\d{7,14}$/;

  const $ = (id) => document.getElementById(id);
  const btn = document.querySelector(".contact-form .btn-primary");
  if (!btn) return;

  const popupOverlay = $("popup-overlay");
  const errorSummary = $("form-error-summary");

  /* ── FIELD ERROR HELPERS ───────────────────────────────────── */
  function setFieldError(id, message) {
    const input = $(id);
    const errEl = $(`err-${id}`);
    if (!input || !errEl) return;

    input.closest(".form-group")?.classList.toggle("has-error", !!message);
    errEl.textContent = message || "";
    errEl.classList.toggle("show", !!message);
  }

  function clearAllErrors() {
    ALL_FIELD_IDS.forEach((id) => setFieldError(id, ""));
    errorSummary.classList.remove("show");
    errorSummary.textContent = "";
  }

  // Clear a field's error the moment the user starts fixing it
  ALL_FIELD_IDS.forEach((id) => {
    $(id)?.addEventListener("input", () => setFieldError(id, ""));
  });

  /* ── VALIDATION ────────────────────────────────────────────── */
  function readFormValues() {
    return {
      fname: $("fname").value.trim(),
      lname: $("lname").value.trim(),
      email: $("femail").value.trim(),
      phone: $("fphone").value.trim(),
      subject: $("fsubject").value.trim(),
      message: $("fmessage").value.trim(),
    };
  }

  // Returns true if valid; sets inline errors and returns false otherwise
  function validate({ fname, email, phone, subject, message }) {
    let firstInvalid = null;
    const fail = (id, msg) => {
      setFieldError(id, msg);
      if (!firstInvalid) firstInvalid = id;
    };

    if (!fname) fail("fname", "First name is required.");
    if (!subject) fail("fsubject", "Please add a subject.");
    if (!message) fail("fmessage", "Tell me a bit about the project.");

    if (!email) {
      fail("femail", "Email is required.");
    } else if (!EMAIL_RE.test(email)) {
      fail("femail", "That doesn't look like a valid email.");
    }

    if (!phone) {
      fail("fphone", "Phone number is required.");
    } else if (!PHONE_RE.test(phone)) {
      fail(
        "fphone",
        "Enter a valid number with country code, e.g. +91 9876543210.",
      );
    }

    if (firstInvalid) {
      errorSummary.textContent = "Please fix the highlighted fields below.";
      errorSummary.classList.add("show");
      $(firstInvalid).focus();
      return false;
    }
    return true;
  }

  /* ── UI STATE HELPERS ──────────────────────────────────────── */
  function setButtonState(state) {
    const states = {
      idle: {
        html: '<i class="fa fa-paper-plane"></i> Send Message',
        disabled: false,
      },
      sending: {
        html: '<i class="fa fa-spinner fa-spin"></i> Sending...',
        disabled: true,
      },
      sent: { html: '<i class="fa fa-check"></i> Sent!', disabled: true },
    };
    const s = states[state];
    btn.innerHTML = s.html;
    btn.disabled = s.disabled;
  }

  function resetFormFields() {
    ALL_FIELD_IDS.forEach((id) => ($(id).value = ""));
    clearAllErrors();
  }

  /* ── SUBMIT HANDLER ────────────────────────────────────────── */
  window.submitForm = function submitForm() {
    clearAllErrors();
    const values = readFormValues();
    if (!validate(values)) return;

    setButtonState("sending");

    const templateParams = {
      from_fname: values.fname,
      from_lname: values.lname,
      from_email: values.email,
      from_phone: values.phone,
      from_subject: values.subject,
      from_message: values.message,
      from_submittedAt: new Date().toLocaleString(),
    };

    emailjs
      .send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
      .then(() => {
        setTimeout(() => {
          setButtonState("sent");
          popupOverlay?.classList.add("active");

          setTimeout(() => {
            setButtonState("idle");
            resetFormFields();
          }, 4000);
        }, 1500);
      })
      .catch((err) => {
        console.error("EmailJS Error:", err);
        errorSummary.textContent =
          "Something went wrong sending your message. Please try again or email me directly.";
        errorSummary.classList.add("show");
        setButtonState("idle");
      });
  };

  /* ── POPUP CLOSE ───────────────────────────────────────────── */
  $("popup-close")?.addEventListener("click", () =>
    popupOverlay?.classList.remove("active"),
  );
  popupOverlay?.addEventListener("click", (e) => {
    if (e.target.id === "popup-overlay")
      popupOverlay.classList.remove("active");
  });
})();
