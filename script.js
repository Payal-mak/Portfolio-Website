// Modal functions
window.openModal = function(modalId) {
  document.getElementById(modalId).classList.add("show");
  document.body.style.overflow = "hidden";
};

window.closeModal = function(modalId) {
  document.getElementById(modalId).classList.remove("show");
  document.body.style.overflow = "auto";
};

// Resume panel functions
window.openResumePanel = function() {
  const resumePanel = document.getElementById("resume-panel");
  if (resumePanel) {
    resumePanel.classList.add("show");
    document.body.style.overflow = "hidden";
  }
};

window.closeResumePanel = function() {
  const resumePanel = document.getElementById("resume-panel");
  if (resumePanel) {
    resumePanel.classList.remove("show");
    document.body.style.overflow = "auto";
  }
};

// Form submission
window.handleSubmit = function(event) {
  event.preventDefault();
  const form = event.target;

  // Simulate form submission
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  submitBtn.textContent = "Sending...";
  submitBtn.disabled = true;

  setTimeout(() => {
    alert("Thank you for your message! I'll get back to you soon.");
    form.reset();
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  }, 2000);
};

// Typing animation function
window.typeWriter = function(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = "";

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  setTimeout(() => {
    type();
  }, 1000);
};

// Theme toggle functionality
function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);

  // Update button icon based on theme
  const themeBtn = document.querySelector("#theme-toggle-btn i");
  if (themeBtn) {
    themeBtn.classList.remove("fa-sun", "fa-terminal", "fa-moon");
    if (theme === "dark") {
      themeBtn.classList.add("fa-moon");
    } else if (theme === "hacker") {
      themeBtn.classList.add("fa-terminal");
    } else {
      themeBtn.classList.add("fa-sun");
    }
  }
}

// Initialize AOS and other functionality
document.addEventListener("DOMContentLoaded", () => {
  // AOS initialization
  AOS.init({
    duration: 1000,
    once: true,
    offset: 100,
  });

  // Load saved theme or default to light
  const savedTheme = localStorage.getItem("theme") || "light";
  setTheme(savedTheme);

  // Theme toggle button
  const themeToggleBtn = document.querySelector("#theme-toggle-btn");
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const currentTheme = document.documentElement.getAttribute("data-theme");
      let newTheme;
      if (currentTheme === "light") {
        newTheme = "dark";
      } else if (currentTheme === "dark") {
        newTheme = "hacker";
      } else {
        newTheme = "light";
      }
      setTheme(newTheme);
    });
  }

  // Mobile menu toggle
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const mobileMenu = document.querySelector(".mobile-menu");

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("active");
    });
  }

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
      // Close mobile menu if open
      if (mobileMenu) {
        mobileMenu.classList.remove("active");
      }
    });
  });

  // Add scroll effect to navbar
  window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar");
    if (navbar) {
      if (window.scrollY > 100) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    }
  });

  // Typing animation for hero text
  const heroTitle = document.querySelector(".hero-title");
  if (heroTitle) {
    const originalText = heroTitle.textContent;
    window.typeWriter(heroTitle, originalText, 80);
  }

  // Add active class to nav links based on scroll position
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (window.pageYOffset >= sectionTop - 200 && window.pageYOffset < sectionTop + sectionHeight - 200) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });

  // Close resume panel when clicking outside
  const resumePanel = document.getElementById("resume-panel");
  if (resumePanel) {
    resumePanel.addEventListener("click", (e) => {
      if (e.target === resumePanel) {
        window.closeResumePanel();
      }
    });
  }
});

// Close modal when clicking outside
document.querySelectorAll(".modal").forEach((modal) => {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      window.closeModal(modal.id);
    }
  });
});

// Scroll reveal animation
function scrollReveal() {
  const elements = document.querySelectorAll(".scroll-reveal");

  elements.forEach((element) => {
    const elementPosition = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (elementPosition < windowHeight - 100) {
      element.classList.add("revealed");
    }
  });
}

window.addEventListener("scroll", scrollReveal);
window.addEventListener("load", scrollReveal);