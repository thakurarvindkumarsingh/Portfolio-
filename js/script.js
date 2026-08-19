// Initialize AOS (Animate On Scroll)
AOS.init({
  duration: 800,
  easing: 'ease-in-out',
  once: false,
  mirror: true
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

// Close Mobile Menu on item click
navItems.forEach((item) => {
  item.addEventListener("click", () => {
    navLinks.classList.remove("active");
    hamburger.innerHTML = '<i class="fa-solid fa-bars"></i>';
  });
});

// Close Mobile Menu on outside click
document.addEventListener("click", (e) => {
  if (!e.target.closest(".hamburger") && !e.target.closest(".nav-links")) {
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

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Add scroll reveal animation
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.project-card, .skill-card, .timeline-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'all 0.6s ease';
  observer.observe(el);
});