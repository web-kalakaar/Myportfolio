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

/* ── BUILD PROJECTS ────────────────────────── */
const projGrid = document.getElementById("projectsGrid");
PROJECTS.forEach((p, i) => {
  const c = document.createElement("div");
  c.className = "project-card reveal";
  c.style.transitionDelay = i * 0.2 + "s";

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

window.addEventListener("load", () => {
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
if (window.matchMedia('(pointer: fine)').matches) {
 
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
const words = ["HTML5", "CSS3", "JavaScript", "Python", "Flask", "MySQL"];
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
      if (e.isIntersecting) e.target.classList.add("vis");
    });
  },
  { threshold: 0.1 },
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

/* ── 3D CARD TILT ───────────────────────────── */
document.querySelectorAll(".project-card,.service-card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `perspective(900px) rotateY(${x * 9}deg) rotateX(${-y * 9}deg) translateY(-8px)`;
    card.style.boxShadow = `${-x * 20}px ${-y * 20}px 40px rgba(250,204,21,0.08), var(--shadow)`;
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
    card.style.boxShadow = "";
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
