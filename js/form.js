emailjs.init({
  publicKey: "LfvcbtBQfzG3ORN9A",
});
/* ── FORM SUBMIT ────────────────────────────── */
window.submitForm = function () {
  const fname = document.getElementById("fname").value.trim();
  const lname = document.getElementById("lname").value.trim();
  const email = document.getElementById("femail").value.trim();
  const msg = document.getElementById("fmessage").value;
  const phone = document.getElementById("fphone").value.trim();
  const subject = document.getElementById("fsubject").value.trim();
  const submittedAt = new Date().toLocaleString();

  if (!fname || !email || !msg || !phone || !subject) {
    alert("Please fill in all required fields.");
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }
  if (!/^[6-9]\d{9}$/.test(phone)) {
    alert("Please enter a valid 10-digit phone number.");
    return;
  }
  const btn = document.querySelector(".contact-form .btn-primary");
  btn.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Sending...';
  btn.disabled = true;

  const Params = {
    from_fname: fname,
    from_lname: lname,
    from_email: email,
    from_phone: phone,
    from_subject: subject,
    from_message: msg,
    from_submittedAt: submittedAt,
  };
  console.table(Params);

  emailjs
    .send("service_2z6wdhc", "template_9s63ebc", Params)
    .then((result) => {
      setTimeout(() => {
        btn.innerHTML = '<i class="fa fa-check"></i> Sent!';
        document.getElementById("popup-overlay").classList.add("active");
        setTimeout(() => {
          btn.innerHTML = '<i class="fa fa-paper-plane"></i> Send Message';
          btn.disabled = false;
          [
            "fname",
            "lname",
            "femail",
            "fsubject",
            "fmessage",
            "fphone",
          ].forEach((id) => (document.getElementById(id).value = ""));
        }, 4000);
      }, 1500);
    })
    .catch((error) => {
      console.error("EmailJS Error:", error);

      alert("Failed to send message. Please try again.");

      btn.innerHTML = '<i class="fa fa-paper-plane"></i> Send Message';

      btn.disabled = false;
    });
};

document
  .getElementById("popup-close")
  .addEventListener("click", () =>
    document.getElementById("popup-overlay").classList.remove("active"),
  );

document.getElementById("popup-overlay").addEventListener("click", (e) => {
  if (e.target.id === "popup-overlay")
    document.getElementById("popup-overlay").classList.remove("active");
});
