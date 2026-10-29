
document.addEventListener("DOMContentLoaded", function () {
    // Mobile navigation
    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", function () {
            navLinks.classList.toggle("open");

            const isOpen = navLinks.classList.contains("open");
            menuToggle.setAttribute("aria-expanded", String(isOpen));
        });

        navLinks.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                navLinks.classList.remove("open");
                menuToggle.setAttribute("aria-expanded", "false");
            });
        });
    }

    // Dark / light theme
    const themeToggle = document.getElementById("theme-toggle");

    if (themeToggle) {
        const savedTheme = localStorage.getItem("portfolio-theme");

        if (savedTheme === "dark") {
            document.body.classList.add("dark-theme");
        }

        themeToggle.addEventListener("click", function () {
            document.body.classList.toggle("dark-theme");

            const theme = document.body.classList.contains("dark-theme")
                ? "dark"
                : "light";

            localStorage.setItem("portfolio-theme", theme);
        });
    }

    // Automatically update the footer year
    document.querySelectorAll(".year").forEach(function (element) {
        element.textContent = new Date().getFullYear();
    });

    // Close mobile menu with Escape
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && navLinks && menuToggle) {
            navLinks.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
        }
    });
});
