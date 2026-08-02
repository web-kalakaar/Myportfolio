/* ═══════════════════════════════════════════════════════════════
   DATA.JS
   Single source of truth for all dynamic content.
   Edit these arrays only — script.js reads from them and builds
   the DOM automatically. No HTML needs to be touched to add,
   remove, or reorder a project/service.
═══════════════════════════════════════════════════════════════ */

/* ── SERVICES ──────────────────────────────────────────────── */
const SERVICES = [
  {
    num: "01",
    icon: "fas fa-globe",
    title: "Front-End Website Development",
    desc: "Crafting modern, responsive, and interactive front-end websites with clean code, smooth animations, and pixel-perfect designs that elevate your online presence.",
  },
  {
    num: "02",
    icon: "fas fa-globe",
    title: "Full-Stack Website Development",
    desc: "Building full-stack web applications with HTML, CSS, JavaScript, Python, and MySQL — from elegant landing pages to feature-rich portals — crafted for performance, scalability, and long-term reliability.",
  },
  {
    num: "03",
    icon: "fas fa-database",
    title: "Database Design",
    desc: "Designing efficient MySQL databases with optimized queries and scalable structures for data-driven applications.",
  },
  {
    num: "04",
    icon: "fas fa-mobile-alt",
    title: "Responsive Development",
    desc: "Designing responsive digital experiences that look and perform flawlessly on every screen size and device.",
  },
  {
    num: "05",
    icon: "fas fa-rocket",
    title: "Deployment & SEO",
    desc: "From seamless deployments to long-term growth, I ensure every website launches with optimized performance, technical SEO best practices, and a solid foundation for speed, visibility, and lasting impact.",
  },
];

/* ── PROJECTS ──────────────────────────────────────────────── */
const PROJECTS = [
  {
    tag: "Educational Platform",
    title: "School Website — Version 1",
    desc: "A modern educational website featuring a professional homepage, academic sections, admissions, faculty details, and responsive layouts designed to enhance a school's digital presence.",
    img: "projectsimages/school-wk-1.webp",
    skills: ["HTML", "CSS", "JavaScript"],
    live: "https://web-kalakaar.github.io/school-wk-1/",
    gh: "https://github.com/web-kalakaar/school-wk-1",
  },
  {
    tag: "Educational Platform",
    title: "Coaching Institute Website",
    desc: "A professional coaching institute website designed to highlight courses, faculty, achievements, and admissions through an engaging and user-friendly interface.",
    img: "projectsimages/coaching-website.webp",
    skills: ["HTML", "CSS", "JavaScript"],
    live: "https://web-kalakaar.github.io/coaching-website/",
    gh: "https://github.com/web-kalakaar/coaching-website",
  },
  {
    tag: "Educational Platform",
    title: "School Website — Version 2",
    desc: "A refined school website with enhanced layouts, modern UI components, responsive pages, and improved visual storytelling for educational institutions.",
    img: "projectsimages/school-wk-2.webp",
    skills: ["HTML", "CSS", "JavaScript"],
    live: "https://web-kalakaar.github.io/school-wk-2/",
    gh: "https://github.com/web-kalakaar/school-wk-2",
  },
  {
    tag: "Real Estate",
    title: "PS Blue Brick Builders Estate",
    desc: "A premium real estate website showcasing residential properties, modern architecture, project highlights, and inquiry features with an elegant visual experience.",
    img: "projectsimages/psbluebrickestate.webp",
    skills: ["HTML", "CSS", "JavaScript"],
    live: "https://web-kalakaar.github.io/psbluebrickbuildersestate/",
    gh: "https://github.com/web-kalakaar/psbluebrickbuildersestate",
  },
  {
    tag: "E-Commerce",
    title: "Pet Shop Website",
    desc: "An engaging pet store website featuring product showcases, service highlights, pet categories, and a clean shopping-inspired interface for pet lovers.",
    img: "projectsimages/petshop.webp",
    skills: ["HTML", "CSS", "JavaScript"],
    live: "https://web-kalakaar.github.io/petshop/",
    gh: "https://github.com/web-kalakaar/petshop",
  },
  {
    tag: "Training Institute",
    title: "Dash Skill Edutrain",
    desc: "A modern institute website developed to showcase vocational training programs, certifications, career opportunities, and student-focused learning experiences.",
    img: "projectsimages/dashskill.webp",
    skills: ["HTML", "CSS", "JavaScript"],
    live: "https://dashskilledutrain.vercel.app",
    gh: "https://github.com/web-kalakaar/dashskilledutrain",
  },
];
