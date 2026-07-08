/* ── BUILD PROJECTS ────────────────────────── */
const projGrid = document.getElementById("projectsGrid");
PROJECTS.forEach((p, i) => {
  const c = document.createElement("div");
  c.className = "project-card reveal";
  c.style.transitionDelay = i * 0.08 + "s";

  c.innerHTML = `
        <div class="proj-preview">
            <img src="${p.img}" alt="Project Preview">
            <div class="proj-num">${String(i + 1).padStart(2, "0")}</div>
        </div>

        <div class="proj-body">
            <span class="proj-tag">${p.tag}</span>

            <h3 class="proj-title">${p.title}</h3>

            <p class="proj-desc">${p.desc}</p>

            <div class="skills-used-container"></div>

            <div class="proj-btns">
                <a href="${p.live}" target="_blank" class="proj-btn live">
                    <i class="fa fa-external-link-alt"></i> Live Demo
                </a>

                <a href="${p.gh}" target="_blank" class="proj-btn gh">
                    <i class="fab fa-github"></i> GitHub
                </a>
            </div>
        </div>
    `;

  const skillUsedContainer = c.querySelector(".skills-used-container");

  p.skills.forEach((skill) => {
    const s = document.createElement("span");
    s.className = "skills-used";
    s.textContent = skill;

    skillUsedContainer.appendChild(s);
  });

  projGrid.appendChild(c);
});
/* ── BUILD SERVICES ────────────────────────── */
const servicesGrid = document.getElementById("servicesGrid");

SERVICES.forEach((sv, i) => {
  const c = document.createElement("div");
  c.className = `service-card reveal ${sv.num} `;
  c.style.transitionDelay = i * 0.08 + "s";
  c.style.gridArea = `sv${sv.num}`;
  c.innerHTML = `
      <div class="svc-num">${sv.num}</div>
      <h3 class="svc-title">${sv.title}</h3>
      <p class="svc-desc">${sv.desc}</p>
    `;
  servicesGrid.appendChild(c);
});

/* ── PRELOADER ──────────────────────────────── */
const preText = "Web Kalakaar";
const preLogoEl = document.getElementById("preLogoEl");
[...preText].forEach((ch, i) => {
  const span = document.createElement("span");
  span.className = "char";
  span.textContent = ch === " " ? "\u00A0" : ch;
  span.style.animationDelay = i * 0.055 + "s";
  preLogoEl.appendChild(span);
});

window.addEventListener("DOMContentLoaded", () => {
  const pctEl = document.getElementById("pre-pct");
  let n = 0;
  const iv = setInterval(() => {
    n = Math.min(n + Math.floor(Math.random() * 9) + 3, 100);
    pctEl.textContent = n + "%";
    if (n >= 100) {
      clearInterval(iv);
      setTimeout(() => {
        const pre = document.getElementById("preloader");
        pre.classList.add("hidden");
        setTimeout(() => pre.remove(), 500);
      }, 500);
    }
  }, 35);
});

/* ── CUSTOM CURSOR ──────────────────────────── */
if (window.matchMedia("(pointer: fine)").matches) {
  const cur = document.getElementById("cursor");
  const ring = document.getElementById("cursor-ring");
  let rx = 0,
    ry = 0,
    mx = 0,
    my = 0;

  document.addEventListener("mousemove", (e) => {
    mx = e.clientX;
    my = e.clientY;
    cur.style.left = mx + "px";
    cur.style.top = my + "px";
  });
  (function animRing() {
    rx += (mx - rx) * 0.22;
    ry += (my - ry) * 0.22;
    ring.style.left = rx + "px";
    ring.style.top = ry + "px";
    requestAnimationFrame(animRing);
  })();

  document
    .querySelectorAll(
      "a,button,.skill-card,.project-card,.service-card,.stat,.social-btn",
    )
    .forEach((el) => {
      el.addEventListener("mouseenter", () =>
        document.body.classList.add("chover"),
      );
      el.addEventListener("mouseleave", () =>
        document.body.classList.remove("chover"),
      );
    });
}
/* ── SCROLL EVENTS ──────────────────────────── */
const navbar = document.getElementById("navbar");
const backTop = document.getElementById("back-top");
const progress = document.getElementById("scroll-progress");

window.addEventListener(
  "scroll",
  () => {
    const pct =
      (window.scrollY / (document.body.scrollHeight - window.innerHeight)) *
      100;
    progress.style.width = pct + "%";
    navbar.classList.toggle("scrolled", window.scrollY > 60);
    backTop.classList.toggle("vis", window.scrollY > 400);
  },
  { passive: true },
);

/* ── HAMBURGER ──────────────────────────────── */
const ham = document.getElementById("ham");
const mobMenu = document.getElementById("mobMenu");
ham.addEventListener("click", () => {
  ham.classList.toggle("open");
  mobMenu.classList.toggle("open");
});
window.closeMob = () => {
  ham.classList.remove("open");
  mobMenu.classList.remove("open");
};

/* ── TYPING ANIMATION ───────────────────────── */
const words = [
  "HTML5",
  "CSS3",
  "JavaScript",
  "Python",
  "Flask",
  "Django",
  "MySQL",
];
let wi = 0,
  ci = 0,
  del = false;
const typedEl = document.getElementById("typed-text");
function type() {
  const w = words[wi];
  if (!del) {
    typedEl.textContent = w.slice(0, ++ci);
    if (ci === w.length) {
      del = true;
      setTimeout(type, 1400);
      return;
    }
  } else {
    typedEl.textContent = w.slice(0, --ci);
    if (ci === 0) {
      del = false;
      wi = (wi + 1) % words.length;
    }
  }
  setTimeout(type, del ? 60 : 100);
}
setTimeout(type, 1900);

/* ── SCROLL REVEAL ──────────────────────────── */
const revObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("vis");
        revObs.unobserve(e.target); // stop watching
      }
    });
  },
  { threshold: 0.15, rootMargin: "0px 0px -50px 0px" },
);
document
  .querySelectorAll(".reveal,.reveal-left,.reveal-right")
  .forEach((el) => revObs.observe(el));

/* ── COUNTER ANIMATION ──────────────────────── */
function countUp(el, target, duration = 1500) {
  const start = performance.now();

  function update(now) {
    const progress = Math.min((now - start) / duration, 1);

    const value = Math.floor(progress * target);

    el.textContent = value + "+";

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = target + "+";
    }
  }

  requestAnimationFrame(update);
}
const cntObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target
        .querySelectorAll(".n[data-target]")
        .forEach((el) => countUp(el, parseInt(el.dataset.target)));
      cntObs.unobserve(e.target);
    });
  },
  { threshold: 0.4 },
);
document.querySelectorAll("#about").forEach((s) => cntObs.observe(s));
/* ── PREMIUM 3D CARD TILT + FOLLOWING GLOW ───────────────────────── */

document.querySelectorAll(".project-card, .service-card").forEach((card) => {
  let mouseX = 0,
    mouseY = 0,
    currentX = 0,
    currentY = 0;

  let raf;

  card.style.transformStyle = "preserve-3d";
  // card.style.transition =
  //   "transform .45s cubic-bezier(.22,1,.36,1), box-shadow .45s ease";

  function animate() {
    currentX += (mouseX - currentX) * 0.15;
    currentY += (mouseY - currentY) * 0.15;

    const rotateY = currentX * 14;
    const rotateX = -currentY * 14;

    card.style.transform = `
      perspective(1200px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      translateY(-10px)
      scale(1.03)
    `;

    card.style.boxShadow = `
      ${-currentX * 35}px ${-currentY * 35}px 50px rgba(250,204,21,.18),
      0 20px 45px rgba(0,0,0,.28)
    `;

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

    card.style.transform =
      "perspective(1200px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)";

    card.style.boxShadow = "";

    card.style.background = "";

    mouseX = mouseY = currentX = currentY = 0;
  });
});

/* ── SMOOTH SCROLL ──────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const t = document.querySelector(a.getAttribute("href"));
    if (t) {
      e.preventDefault();
      t.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

/* ── MAGNETIC BUTTONS ───────────────────────── */
document
  .querySelectorAll(".btn-primary,.btn-secondary,.nav-cta")
  .forEach((btn) => {
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
