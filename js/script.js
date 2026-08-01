/* ═══════════════════════════════════════════════════════════════
   SCRIPT.JS
   Main site behaviour. Organized into independent modules —
   each wrapped so one failing section can't break the rest.
   Order: Builders → Preloader → Cursor → Scroll → Nav →
          Typing → Reveal → Counters → Card Tilt → Smooth
          Scroll → Magnetic Buttons.
═══════════════════════════════════════════════════════════════ */

const REDUCE_MOTION = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const lerp = (a, b, t) => a + (b - a) * t;

/* ═══════════════════════════════════════════
   1. BUILD PROJECTS
═══════════════════════════════════════════ */
(() => {
  const grid = document.getElementById("projectsGrid");
  if (!grid || typeof PROJECTS === "undefined") return;

  PROJECTS.forEach((p, i) => {
    const card = document.createElement("div");
    card.className = "project-card reveal";
    card.style.transitionDelay = `${i * 0.08}s`;

    card.innerHTML = `
      <div class="proj-preview">
        <img src="${p.img}" alt="${p.title}" loading="lazy">
        <div class="proj-num">${String(i + 1).padStart(2, "0")}</div>
      </div>
      <div class="proj-body">
        <span class="proj-tag">${p.tag}</span>
        <h3 class="proj-title">${p.title}</h3>
        <p class="proj-desc">${p.desc}</p>
        <div class="skills-used-container">
          ${p.skills.map((s) => `<span class="skills-used">${s}</span>`).join("")}
        </div>
        <div class="proj-btns">
          <a href="${p.live}" target="_blank" rel="noopener" class="proj-btn live">
            <i class="fa fa-external-link-alt"></i> Live Demo
          </a>
          <a href="${p.gh}" target="_blank" rel="noopener" class="proj-btn gh">
            <i class="fab fa-github"></i> GitHub
          </a>
        </div>
      </div>`;

    grid.appendChild(card);
  });
})();

/* ═══════════════════════════════════════════
   2. BUILD SERVICES
═══════════════════════════════════════════ */
(() => {
  const grid = document.getElementById("servicesGrid");
  if (!grid || typeof SERVICES === "undefined") return;

  SERVICES.forEach((sv, i) => {
    const card = document.createElement("div");
    card.className = `service-card reveal ${sv.num}`;
    card.style.transitionDelay = `${i * 0.08}s`;
    card.style.gridArea = `sv${sv.num}`;
    card.innerHTML = `
      <div class="svc-num">${sv.num}</div>
      <h3 class="svc-title">${sv.title}</h3>
      <p class="svc-desc">${sv.desc}</p>`;
    grid.appendChild(card);
  });
})();

/* ═══════════════════════════════════════════
   3. PRELOADER
═══════════════════════════════════════════ */
(() => {
  const logoEl = document.getElementById("preLogoEl");
  if (!logoEl) return;

  const TEXT = "Web Kalakaar";
  [...TEXT].forEach((ch, i) => {
    const span = document.createElement("span");
    span.className = "char";
    span.textContent = ch === " " ? "\u00A0" : ch;
    span.style.animationDelay = `${i * 0.055}s`;
    logoEl.appendChild(span);
  });

  window.addEventListener("DOMContentLoaded", () => {
    const pctEl = document.getElementById("pre-pct");
    let n = 0;

    const tick = setInterval(() => {
      n = Math.min(n + Math.floor(Math.random() * 9) + 3, 100);
      pctEl.textContent = `${n}%`;

      if (n >= 100) {
        clearInterval(tick);
        setTimeout(() => {
          const pre = document.getElementById("preloader");
          pre.classList.add("hidden");
          setTimeout(() => pre.remove(), 500);
        }, 500);
      }
    }, 35);
  });
})();

/* ═══════════════════════════════════════════
   4. CUSTOM CURSOR (fine pointers only)
═══════════════════════════════════════════ */
(() => {
  if (!window.matchMedia("(pointer: fine)").matches || REDUCE_MOTION) return;

  const cur  = document.getElementById("cursor");
  const ring = document.getElementById("cursor-ring");
  if (!cur || !ring) return;

  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener("mousemove", (e) => {
    mx = e.clientX;
    my = e.clientY;
    cur.style.left = `${mx}px`;
    cur.style.top = `${my}px`;
  });

  (function animRing() {
    rx = lerp(rx, mx, 0.22);
    ry = lerp(ry, my, 0.22);
    ring.style.left = `${rx}px`;
    ring.style.top = `${ry}px`;
    requestAnimationFrame(animRing);
  })();

  document
    .querySelectorAll("a,button,.skill-card,.project-card,.service-card,.stat,.social-btn")
    .forEach((el) => {
      el.addEventListener("mouseenter", () => document.body.classList.add("chover"));
      el.addEventListener("mouseleave", () => document.body.classList.remove("chover"));
    });
})();

/* ═══════════════════════════════════════════
   5. SCROLL PROGRESS / NAVBAR / BACK-TO-TOP
   (rAF-throttled so it never fires more than
   once per frame — smoother than raw scroll)
═══════════════════════════════════════════ */
(() => {
  const navbar   = document.getElementById("navbar");
  const backTop  = document.getElementById("back-top");
  const progress = document.getElementById("scroll-progress");
  if (!navbar || !backTop || !progress) return;

  let ticking = false;

  function updateOnScroll() {
    const max = document.body.scrollHeight - window.innerHeight;
    const pct = max > 0 ? (window.scrollY / max) * 100 : 0;

    progress.style.width = `${pct}%`;
    navbar.classList.toggle("scrolled", window.scrollY > 60);
    backTop.classList.toggle("vis", window.scrollY > 400);
    ticking = false;
  }

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        requestAnimationFrame(updateOnScroll);
        ticking = true;
      }
    },
    { passive: true }
  );
})();

/* ═══════════════════════════════════════════
   6. HAMBURGER / MOBILE MENU
═══════════════════════════════════════════ */
(() => {
  const ham = document.getElementById("ham");
  const mobMenu = document.getElementById("mobMenu");
  if (!ham || !mobMenu) return;

  ham.addEventListener("click", () => {
    ham.classList.toggle("open");
    mobMenu.classList.toggle("open");
  });

  window.closeMob = () => {
    ham.classList.remove("open");
    mobMenu.classList.remove("open");
  };
})();

/* ═══════════════════════════════════════════
   7. TYPING ANIMATION
═══════════════════════════════════════════ */
(() => {
  const typedEl = document.getElementById("typed-text");
  if (!typedEl) return;

  const WORDS = ["HTML5", "CSS3", "JavaScript"];
  let wordIndex = 0, charIndex = 0, deleting = false;

  function type() {
    const word = WORDS[wordIndex];

    if (!deleting) {
      typedEl.textContent = word.slice(0, ++charIndex);
      if (charIndex === word.length) {
        deleting = true;
        setTimeout(type, 1400);
        return;
      }
    } else {
      typedEl.textContent = word.slice(0, --charIndex);
      if (charIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % WORDS.length;
      }
    }
    setTimeout(type, deleting ? 60 : 100);
  }

  setTimeout(type, 1900);
})();

/* ═══════════════════════════════════════════
   8. SCROLL REVEAL
═══════════════════════════════════════════ */
(() => {
  const targets = document.querySelectorAll(".reveal,.reveal-left,.reveal-right");
  if (!targets.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("vis");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
  );

  targets.forEach((el) => observer.observe(el));
})();

/* ═══════════════════════════════════════════
   9. COUNTER ANIMATION (About stats)
═══════════════════════════════════════════ */
(() => {
  const about = document.getElementById("about");
  if (!about) return;

  function countUp(el, target, duration = 1500) {
    const start = performance.now();

    function update(now) {
      const progress = Math.min((now - start) / duration, 1);
      el.textContent = `${Math.floor(progress * target)}+`;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = `${target}+`;
      }
    }
    requestAnimationFrame(update);
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target
          .querySelectorAll(".n[data-target]")
          .forEach((el) => countUp(el, parseInt(el.dataset.target, 10)));
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.4 }
  );

  observer.observe(about);
})();

/* ═══════════════════════════════════════════
   10. 3D CARD TILT + FOLLOWING GLOW
   (skipped entirely under reduced-motion)
═══════════════════════════════════════════ */
(() => {
  if (REDUCE_MOTION) return;

  document.querySelectorAll(".project-card, .service-card").forEach((card) => {
    let mouseX = 0, mouseY = 0, currentX = 0, currentY = 0, raf;
    card.style.transformStyle = "preserve-3d";

    function animate() {
      currentX = lerp(currentX, mouseX, 0.15);
      currentY = lerp(currentY, mouseY, 0.15);

      const rotateY = currentX * 14;
      const rotateX = -currentY * 14;

      card.style.transform = `
        perspective(1200px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        translateY(-10px)
        scale(1.03)`;

      card.style.boxShadow = `
        ${-currentX * 35}px ${-currentY * 35}px 50px rgba(250,204,21,.18),
        0 20px 45px rgba(0,0,0,.28)`;

      raf = requestAnimationFrame(animate);
    }

    card.addEventListener("mouseenter", () => {
      cancelAnimationFrame(raf);
      animate();
    });

    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      mouseX = (e.clientX - rect.left) / rect.width - 0.5;
      mouseY = (e.clientY - rect.top) / rect.height - 0.5;
    });

    card.addEventListener("mouseleave", () => {
      cancelAnimationFrame(raf);
      card.style.transition =
        "transform .6s cubic-bezier(.22,1,.36,1), box-shadow .6s ease, background .6s ease";
      card.style.transform = "perspective(1200px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)";
      card.style.boxShadow = "";
      card.style.background = "";
      mouseX = mouseY = currentX = currentY = 0;
    });
  });
})();

/* ═══════════════════════════════════════════
   11. SMOOTH ANCHOR SCROLL
═══════════════════════════════════════════ */
(() => {
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const target = document.querySelector(a.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
})();

/* ═══════════════════════════════════════════
   12. MAGNETIC BUTTONS
═══════════════════════════════════════════ */
(() => {
  if (REDUCE_MOTION) return;

  document.querySelectorAll(".btn-primary,.btn-secondary,.nav-cta").forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
      const r = btn.getBoundingClientRect();
      const dx = (e.clientX - r.left - r.width / 2) * 0.4;
      const dy = (e.clientY - r.top - r.height / 2) * 0.4;
      btn.style.transform = `translate(${dx}px,${dy}px) translateY(-3px)`;
    });
    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "";
    });
  });
})();
