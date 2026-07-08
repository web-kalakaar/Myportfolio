/* ═══════════════════════════════════════════
   SKILLS DATA
   category: frontend | backend | database | tools
   level: 0–100, used for the modal ring fill
═══════════════════════════════════════════ */
const SKILLS = [
  { name: "HTML5",        icon: "fab fa-html5",        category: "frontend", level: 95 },
  { name: "CSS3",         icon: "fab fa-css3-alt",      category: "frontend", level: 92 },
  { name: "JavaScript",   icon: "fab fa-js",            category: "frontend", level: 88 },
 
  { name: "Python",       icon: "fab fa-python",        category: "backend",  level: 85 },
  { name: "Flask",        icon: "fa fa-flask",          category: "backend",  level: 78 },
  { name: "Django",       icon: "fa fa-layer-group",    category: "backend",  level: 65 },
 
  { name: "MySQL",        icon: "fa fa-database",       category: "database", level: 82 },
 
  { name: "Git",          icon: "fab fa-git-alt",       category: "tools",    level: 88 },
  { name: "GitHub",       icon: "fab fa-github",        category: "tools",    level: 90 },
  { name: "VS Code",      icon: "fa fa-code",           category: "tools",    level: 95 },
 ];

const CATEGORY_LABEL = {
  frontend: "Frontend",
  backend: "Backend",
  database: "Database",
  tools: "Tools & Design",
};

/* ── BUILD MARQUEE ──────────────────────────── */
function buildPill(skill) {
  return `
    <div class="skill-pill">
      <div class="skill-pill-icon"><i class="${skill.icon}"></i></div>
      <div class="skill-pill-text">
        <span class="skill-pill-name">${skill.name}</span>
        <span class="skill-pill-cat">${CATEGORY_LABEL[skill.category]}</span>
      </div>
    </div>
  `;
}

function buildMarquee() {
  const half = Math.ceil(SKILLS.length / 2);
  const row1Skills = SKILLS.slice(0, half);
  const row2Skills = SKILLS.slice(half);

  const track1 = document.getElementById("marqueeTrack1");
  const track2 = document.getElementById("marqueeTrack2");

  // duplicate each row's content so the -50% translate loops seamlessly
  const row1Html = row1Skills.map(buildPill).join("");
  const row2Html = row2Skills.map(buildPill).join("");

  track1.innerHTML = row1Html + row1Html;
  track2.innerHTML = row2Html + row2Html;
}

/* ── BUILD MODAL GRID ───────────────────────── */
function buildTile(skill, i) {
  return `
    <div class="skill-tile" data-category="${skill.category}" style="animation-delay:${i * 0.04}s">
      <div class="skill-tile-icon"><i class="${skill.icon}"></i></div>
      <div class="skill-tile-name">${skill.name}</div>
    </div>
  `;
}

function buildModalGrid() {
  const grid = document.getElementById("skillsModalGrid");
  grid.innerHTML = SKILLS.map(buildTile).join("");
}

/* ── MODAL OPEN / CLOSE ─────────────────────── */
const modal = document.getElementById("skillsModal");
const openBtn = document.getElementById("viewAllSkillsBtn");
const closeBtn = document.getElementById("closeSkillsModal");

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

openBtn.addEventListener("click", openModal);
closeBtn.addEventListener("click", closeModal);
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("active")) closeModal();
});

/* ── FILTERS ─────────────────────────────────── */
document.getElementById("skillsFilterRow").addEventListener("click", (e) => {
  const chip = e.target.closest(".filter-chip");
  if (!chip) return;

  document
    .querySelectorAll(".filter-chip")
    .forEach((c) => c.classList.remove("active"));
  chip.classList.add("active");

  const filter = chip.dataset.filter;
  document.querySelectorAll(".skill-tile").forEach((tile) => {
    const match = filter === "all" || tile.dataset.category === filter;
    tile.classList.toggle("hidden", !match);
  });
});

/* ── INIT ────────────────────────────────────── */
buildMarquee();
buildModalGrid();