// DOM Elements
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const themeToggle = document.getElementById("themeToggle");
const themeIcon = themeToggle.querySelector("i");
const navItems = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section");

// Mobile Menu Toggle
hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  const isOpen = navLinks.classList.contains("active");
  hamburger.innerHTML = isOpen 
    ? '<i class="fa-solid fa-xmark"></i>' 
    : '<i class="fa-solid fa-bars"></i>';
});

// Close Mobile Menu on item click
navItems.forEach((item) => {
  item.addEventListener("click", () => {
    navLinks.classList.remove("active");
    hamburger.innerHTML = '<i class="fa-solid fa-bars"></i>';
  });
});

// Close Mobile Menu on outside click
document.addEventListener("click", (e) => {
  if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
    navLinks.classList.remove("active");
    hamburger.innerHTML = '<i class="fa-solid fa-bars"></i>';
  }
});

// Theme Toggle System
function setTheme(isDark) {
  if (isDark) {
    document.body.classList.add("dark-mode");
    themeIcon.classList.replace("fa-moon", "fa-sun");
    localStorage.setItem("theme", "dark");
  } else {
    document.body.classList.remove("dark-mode");
    themeIcon.classList.replace("fa-sun", "fa-moon");
    localStorage.setItem("theme", "light");
  }
}

// Initial Theme Check (Saved preference or OS mode)
const savedTheme = localStorage.getItem("theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
  setTheme(true);
} else {
  setTheme(false);
}

themeToggle.addEventListener("click", () => {
  const isCurrentlyDark = document.body.classList.contains("dark-mode");
  setTheme(!isCurrentlyDark);
});

// Active Link Highlight on Scroll
window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navItems.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});
