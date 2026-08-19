// Initialize AOS (Animate On Scroll)
document.addEventListener("DOMContentLoaded", () => {
  AOS.init({
    duration: 700,
    easing: "ease-out-cubic",
    once: true,
    offset: 50
  });
});

// DOM Elements
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const themeToggle = document.getElementById("themeToggle");
const themeIcon = themeToggle.querySelector("i");
const navItems = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section");

// Mobile Menu Toggle
hamburger.addEventListener("click", (e) => {
  e.stopPropagation();
  navLinks.classList.toggle("active");
  const isOpen = navLinks.classList.contains("active");
  hamburger.innerHTML = isOpen 
    ? '<i class="fa-solid fa-xmark"></i>' 
    : '<i class="fa-solid fa-bars"></i>';
});

// Close Mobile Menu on Click
navItems.forEach((item) => {
  item.addEventListener("click", () => {
    navLinks.classList.remove("active");
    hamburger.innerHTML = '<i class="fa-solid fa-bars"></i>';
  });
});

document.addEventListener("click", (e) => {
  if (!e.target.closest(".hamburger") && !e.target.closest(".nav-links")) {
    navLinks.classList.remove("active");
    hamburger.innerHTML = '<i class="fa-solid fa-bars"></i>';
  }
});

// Theme Toggle Function
function setTheme(isLight) {
  if (isLight) {
    document.body.classList.add("light-mode");
    themeIcon.classList.replace("fa-moon", "fa-sun");
    localStorage.setItem("theme", "light");
  } else {
    document.body.classList.remove("light-mode");
    themeIcon.classList.replace("fa-sun", "fa-moon");
    localStorage.setItem("theme", "dark");
  }
}

// Default Dark Theme Setup
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "light") {
  setTheme(true);
} else {
  setTheme(false);
}

themeToggle.addEventListener("click", () => {
  const isLight = document.body.classList.contains("light-mode");
  setTheme(!isLight);
});

// Scrollspy for Active Navbar Link
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
