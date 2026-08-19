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

let navOverlay = null;
let navCloseBtn = null;

// Utility: create overlay that sits behind the menu but above page content
function ensureOverlay() {
  if (navOverlay) return navOverlay;
  navOverlay = document.createElement('div');
  navOverlay.className = 'nav-overlay';
  navOverlay.addEventListener('click', closeMenu);
  document.body.appendChild(navOverlay);
  return navOverlay;
}

function ensureCloseBtn() {
  if (navCloseBtn) return navCloseBtn;
  navCloseBtn = document.createElement('button');
  navCloseBtn.className = 'nav-close';
  navCloseBtn.setAttribute('aria-label', 'Close Menu');
  navCloseBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
  navCloseBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    closeMenu();
  });
  navLinks.appendChild(navCloseBtn);
  return navCloseBtn;
}

function openMenu() {
  navLinks.classList.add('active');
  hamburger.innerHTML = '<i class="fa-solid fa-xmark"></i>';
  // prevent background scroll
  document.body.style.overflow = 'hidden';
  // show overlay
  const overlay = ensureOverlay();
  // small timeout to allow CSS transition
  requestAnimationFrame(() => {
    overlay.classList.add('visible');
  });
  ensureCloseBtn();
}

function closeMenu() {
  navLinks.classList.remove('active');
  hamburger.innerHTML = '<i class="fa-solid fa-bars"></i>';
  document.body.style.overflow = '';
  if (navOverlay) {
    navOverlay.classList.remove('visible');
    // remove overlay after transition
    setTimeout(() => {
      if (navOverlay) {
        navOverlay.remove();
        navOverlay = null;
      }
    }, 250);
  }
  if (navCloseBtn) {
    navCloseBtn.remove();
    navCloseBtn = null;
  }
}

// Mobile Menu Toggle
hamburger.addEventListener("click", (e) => {
  e.stopPropagation();
  const isOpen = navLinks.classList.contains('active');
  if (isOpen) closeMenu(); else openMenu();
});

// Close Mobile Menu on Click of nav item
navItems.forEach((item) => {
  item.addEventListener("click", () => {
    closeMenu();
  });
});

// Close when clicking outside the menu/hamburger
document.addEventListener("click", (e) => {
  const clickedInsideMenu = !!e.target.closest('.nav-links');
  const clickedHamburger = !!e.target.closest('.hamburger');
  if (!clickedInsideMenu && !clickedHamburger) {
    closeMenu();
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
