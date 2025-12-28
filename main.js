/* ===== MOBILE MENU TOGGLE ===== */
const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn?.querySelector("i");

if (menuBtn && navLinks && menuBtnIcon) {
  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("open");

    const isOpen = navLinks.classList.contains("open");
    menuBtnIcon.className = isOpen
      ? "ri-close-line"
      : "ri-menu-3-line";
  });

  // Close menu after clicking any link
  navLinks.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuBtnIcon.className = "ri-menu-3-line";
  });
}

/* ===== READ MORE TOGGLE ===== */
function toggleReadMore() {
  const moreText = document.querySelector(".more-text");
  const btn = document.querySelector(".read-more-btn");

  if (!moreText || !btn) return;

  moreText.classList.toggle("show");
  btn.textContent = moreText.classList.contains("show")
    ? "Read Less"
    : "Read More";
}

/* ===== SCROLL REVEAL ===== */
const scrollRevealOption = {
  distance: "50px",
  origin: "bottom",
  duration: 1000,
  easing: "ease-in-out",
  reset: false,
};

// Header
ScrollReveal().reveal(".header__container h1", scrollRevealOption);
ScrollReveal().reveal(".header__container p", {
  ...scrollRevealOption,
  delay: 200,
});
ScrollReveal().reveal(".header__btns", {
  ...scrollRevealOption,
  delay: 400,
});

// About section
ScrollReveal().reveal(".about__image img", {
  ...scrollRevealOption,
  origin: "right",
});

ScrollReveal().reveal(".about__content h2", {
  ...scrollRevealOption,
  delay: 200,
});

ScrollReveal().reveal(".about__content p", {
  ...scrollRevealOption,
  delay: 400,
  interval: 150,
});
