/* ═══════════════════════════════════════════════════════════════
   SKILLS.JS
   Renders the skills marquee + the "view all skills" modal grid,
   and wires up the category filter chips.
═══════════════════════════════════════════════════════════════ */
(() => {
  "use strict";

  /* ── DATA ──────────────────────────────────────────────────
     category: frontend | backend | database | tools
     level:    0–100 (reserved for a future progress-ring UI)
  ── ─────────────────────────────────────────────────────────*/
  const SKILLS = [
    { name: "HTML5",      icon: "fab fa-html5",     category: "frontend", level: 95 },
    { name: "CSS3",       icon: "fab fa-css3-alt",  category: "frontend", level: 92 },
    { name: "JavaScript", icon: "fab fa-js",        category: "frontend", level: 88 },

    { name: "Python",     icon: "fab fa-python",    category: "backend",  level: 85 },
    { name: "Flask",      icon: "fa fa-flask",      category: "backend",  level: 78 },
    { name: "Django",     icon: "fa fa-layer-group",category: "backend",  level: 65 },

    { name: "MySQL",      icon: "fa fa-database",   category: "database", level: 82 },

    { name: "Git",        icon: "fab fa-git-alt",   category: "tools",    level: 88 },
    { name: "GitHub",     icon: "fab fa-github",    category: "tools",    level: 90 },
    { name: "VS Code",    icon: "fa fa-code",       category: "tools",    level: 95 },
  ];

  const CATEGORY_LABEL = {
    frontend: "Frontend",
    backend: "Backend",
    database: "Database",
    tools: "Tools & Design",
  };

  /* ── DOM REFS ──────────────────────────────────────────────── */
  const track1     = document.getElementById("marqueeTrack1");
  const track2     = document.getElementById("marqueeTrack2");
  const modal      = document.getElementById("skillsModal");
  const modalGrid  = document.getElementById("skillsModalGrid");
  const filterRow  = document.getElementById("skillsFilterRow");
  const openBtn    = document.getElementById("viewAllSkillsBtn");
  const closeBtn   = document.getElementById("closeSkillsModal");

  if (!track1 || !track2 || !modal) return; // section not on this page

  /* ── TEMPLATES ─────────────────────────────────────────────── */
  const pillTemplate = (skill) => `
    <div class="skill-pill">
      <div class="skill-pill-icon"><i class="${skill.icon}"></i></div>
      <div class="skill-pill-text">
        <span class="skill-pill-name">${skill.name}</span>
        <span class="skill-pill-cat">${CATEGORY_LABEL[skill.category]}</span>
      </div>
    </div>`;

  const tileTemplate = (skill, i) => `
    <div class="skill-tile" data-category="${skill.category}" style="animation-delay:${i * 0.04}s">
      <div class="skill-tile-icon"><i class="${skill.icon}"></i></div>
      <div class="skill-tile-name">${skill.name}</div>
    </div>`;

  /* ── BUILD: MARQUEE ────────────────────────────────────────── */
  function buildMarquee() {
    const half = Math.ceil(SKILLS.length / 2);
    const row1 = SKILLS.slice(0, half).map(pillTemplate).join("");
    const row2 = SKILLS.slice(half).map(pillTemplate).join("");

    // duplicate content so the -50% translate loop is seamless
    track1.innerHTML = row1 + row1;
    track2.innerHTML = row2 + row2;
  }

  /* ── BUILD: MODAL GRID ─────────────────────────────────────── */
  function buildModalGrid() {
    modalGrid.innerHTML = SKILLS.map(tileTemplate).join("");
  }

  /* ── MODAL OPEN / CLOSE ────────────────────────────────────── */
  function openModal() {
    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  openBtn?.addEventListener("click", openModal);
  closeBtn?.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) closeModal();
  });

  /* ── FILTER CHIPS ──────────────────────────────────────────── */
  filterRow?.addEventListener("click", (e) => {
    const chip = e.target.closest(".filter-chip");
    if (!chip) return;

    filterRow.querySelectorAll(".filter-chip").forEach((c) => c.classList.remove("active"));
    chip.classList.add("active");

    const filter = chip.dataset.filter;
    modalGrid.querySelectorAll(".skill-tile").forEach((tile) => {
      const match = filter === "all" || tile.dataset.category === filter;
      tile.classList.toggle("hidden", !match);
    });
  });

  /* ── MARQUEE: PAUSE ON HOVER (nicer, more controllable feel) ─ */
  [track1, track2].forEach((track) => {
    const row = track.parentElement;
    row.addEventListener("mouseenter", () => (track.style.animationPlayState = "paused"));
    row.addEventListener("mouseleave", () => (track.style.animationPlayState = "running"));
  });

  /* ── INIT ──────────────────────────────────────────────────── */
  buildMarquee();
  buildModalGrid();
})();
