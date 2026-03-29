// ── AOS INIT ──────────────────────────────────────────
AOS.init({ duration: 700, once: true, offset: 80, easing: "ease-out-cubic" });

// ── PRELOADER ──────────────────────────────────────────
window.addEventListener("load", () => {
  setTimeout(() => {
    const pre = document.getElementById("preloader");
    pre.classList.add("hidden");
    setTimeout(() => pre.remove(), 600);
  }, 1800);
});

// ── CUSTOM CURSOR ──────────────────────────────────────
const cursor = document.getElementById("cursor");
const ring = document.getElementById("cursor-ring");
let rx = 0,
  ry = 0,
  mx = 0,
  my = 0;

document.addEventListener("mousemove", (e) => {
  mx = e.clientX;
  my = e.clientY;
  cursor.style.left = mx + "px";
  cursor.style.top = my + "px";
});

function animateRing() {
  rx += (mx - rx) * 0.29;
  ry += (my - ry) * 0.29;
  ring.style.left = rx + "px";
  ring.style.top = ry + "px";
  requestAnimationFrame(animateRing);
}
animateRing();

document
  .querySelectorAll(
    "a, button, .skill-card, .project-card, .service-card, .glass-card",
  )
  .forEach((el) => {
    el.addEventListener("mouseenter", () =>
      document.body.classList.add("cursor-hover"),
    );
    el.addEventListener("mouseleave", () =>
      document.body.classList.remove("cursor-hover"),
    );
  });

// ── SCROLL PROGRESS ────────────────────────────────────
window.addEventListener("scroll", () => {
  const pct =
    (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
  document.getElementById("scroll-progress").style.width = pct + "%";
});

// ── NAVBAR ─────────────────────────────────────────────
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 60);
  document
    .getElementById("back-top")
    .classList.toggle("visible", window.scrollY > 400);
});

// ── HAMBURGER ──────────────────────────────────────────
const ham = document.getElementById("hamburger");
const mob = document.getElementById("mobileMenu");
ham.addEventListener("click", () => {
  ham.classList.toggle("open");
  mob.classList.toggle("open");
});
function closeMobile() {
  ham.classList.remove("open");
  mob.classList.remove("open");
}

// ── TYPING ANIMATION ───────────────────────────────────
const words = ["HTML5", "CSS3", "JavaScript", "Python", "Flask", "MySQL"];
let wi = 0,
  ci = 0,
  deleting = false;
const typedEl = document.getElementById("typed-text");
function type() {
  const word = words[wi];
  if (!deleting) {
    typedEl.textContent = word.slice(0, ++ci);
    if (ci === word.length) {
      deleting = true;
      setTimeout(type, 1400);
      return;
    }
  } else {
    typedEl.textContent = word.slice(0, --ci);
    if (ci === 0) {
      deleting = false;
      wi = (wi + 1) % words.length;
    }
  }
  setTimeout(type, deleting ? 60 : 100);
}
setTimeout(type, 1800);

// ── SKILL BAR ANIMATION ────────────────────────────────
const skillObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll(".skill-bar-fill").forEach((bar) => {
          bar.style.width = bar.dataset.width + "%";
        });
      }
    });
  },
  { threshold: 0.3 },
);
document.querySelectorAll("#skills").forEach((s) => skillObs.observe(s));

// ── COUNTER ANIMATION ──────────────────────────────────
function animateCounter(el, target) {
  let current = 0;
  const step = Math.ceil(target / 40);
  const interval = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = current + (target > 5 ? "+" : "+");
    if (current >= target) clearInterval(interval);
  }, 40);
}
const counterObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll(".n[data-target]").forEach((el) => {
          animateCounter(el, parseInt(el.dataset.target));
        });
        counterObs.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.4 },
);
document.querySelectorAll("#about").forEach((s) => counterObs.observe(s));

// ── FORM SUBMIT ────────────────────────────────────────
function submitForm() {
  const fname = document.getElementById("fname").value.trim();
  const email = document.getElementById("femail").value.trim();
  const msg = document.getElementById("fmessage").value.trim();
  if (!fname || !email || !msg) {
    alert("Please fill in all required fields.");
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }
  const btn = document.querySelector(".contact-form .btn-primary");
  btn.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Sending...';
  btn.disabled = true;
  setTimeout(() => {
    btn.innerHTML = '<i class="fa fa-check"></i> Sent!';
    document.getElementById("form-success").style.display = "block";
    // reset after 4s
    setTimeout(() => {
      btn.innerHTML = '<i class="fa fa-paper-plane"></i> Send Message';
      btn.disabled = false;
      document.getElementById("form-success").style.display = "none";
      ["fname", "lname", "femail", "fsubject", "fmessage"].forEach(
        (id) => (document.getElementById(id).value = ""),
      );
    }, 4000);
  }, 1500);
}

// ── SMOOTH SCROLL ──────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const target = document.querySelector(a.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});
