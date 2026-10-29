// Shared JavaScript for the multi-page portfolio.
(function () {
  const root = document.documentElement;
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = document.getElementById("themeIcon");
  const themeMeta = document.querySelector('meta[name="theme-color"]');
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  const year = document.getElementById("currentYear");

  function applyTheme(theme) {
    root.dataset.theme = theme;
    const dark = theme === "dark";
    if (themeIcon) themeIcon.textContent = dark ? "☀️" : "🌙";
    if (themeToggle) {
      themeToggle.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
      themeToggle.title = dark ? "Switch to light mode" : "Switch to dark mode";
    }
    if (themeMeta) themeMeta.setAttribute("content", dark ? "#0b1220" : "#f8fafc");
    try { localStorage.setItem("tilahun-portfolio-theme", theme); } catch (_) {}
  }

  try {
    const saved = localStorage.getItem("tilahun-portfolio-theme");
    if (saved === "dark" || saved === "light") root.dataset.theme = saved;
  } catch (_) {}
  applyTheme(root.dataset.theme || "light");
  if (themeToggle) themeToggle.addEventListener("click", function () {
    applyTheme(root.dataset.theme === "dark" ? "light" : "dark");
  });

  function closeMenu() {
    if (!navLinks || !menuToggle) return;
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
    menuToggle.textContent = "☰";
  }
  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
      const open = navLinks.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(open));
      menuToggle.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");
      menuToggle.textContent = open ? "✕" : "☰";
    });
    navLinks.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));
  }
  document.addEventListener("keydown", event => { if (event.key === "Escape") closeMenu(); });
  if (year) year.textContent = new Date().getFullYear();

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const revealElements = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reduceMotion) {
    root.classList.add("js-motion");
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add("visible"); obs.unobserve(entry.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -35px 0px" });
    revealElements.forEach(el => observer.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add("visible"));
  }
})();
