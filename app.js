// Select DOM elements
const menu = document.querySelector("#mobile-menu");
const menuLinks = document.querySelector(".navbar__menu");
const navbarContainer = document.querySelector(".navbar__container");
const body = document.body;
const overlay = document.createElement("div");
const gallery = document.getElementById("gallery");
const speedControl = document.getElementById("speed-control");
const newsletterForm = document.getElementById("newsletter-form");
const openModal = document.getElementById("openModal");
const popup = document.getElementById("popup");
const closeModal = document.getElementById("closeModal");
const concertsSection = document.querySelector(".concerts");

// Create and append overlay
overlay.classList.add("overlay");
document.body.appendChild(overlay);

// ----- MOBILE MENU TOGGLE -----

// Function to toggle the mobile menu state
function toggleMenuState() {
  menu.classList.toggle("is-active");
  menuLinks.classList.toggle("active");
  navbarContainer.classList.toggle("active");
  body.classList.toggle("active");
  overlay.style.display = menu.classList.contains("is-active")
    ? "block"
    : "none";
}

// Event listener for mobile menu toggle
menu.addEventListener("click", toggleMenuState);

// Close menu when overlay is clicked
overlay.addEventListener("click", toggleMenuState);

// ----- GALLERY SCROLL CONTROL -----

// Default scroll speed setup and hover functionality for gallery
if (gallery) {
  gallery.style.animationDuration = "20s"; // Default scroll speed
  gallery.addEventListener(
    "mouseover",
    () => (gallery.style.animationPlayState = "paused")
  );
  gallery.addEventListener(
    "mouseout",
    () => (gallery.style.animationPlayState = "running")
  );
}

// Function to change scroll speed dynamically
function changeScrollSpeed(newSpeed) {
  if (gallery) {
    gallery.style.animationDuration = `${newSpeed}s`;
  }
}

// Event listener for scroll speed control with throttle
if (speedControl) {
  let throttleTimeout;
  speedControl.addEventListener("input", function () {
    clearTimeout(throttleTimeout);
    throttleTimeout = setTimeout(() => {
      const speed = Math.max(5, Math.min(60, this.value)); // Enforce range [5, 60]
      changeScrollSpeed(speed);
    }, 200);
  });
}

// ----- NEWSLETTER FORM SUBMISSION -----

// Event listener for newsletter form submission
newsletterForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent form submission
  document.getElementById("thank-you-message").style.display = "block"; // Show thank you message
  document.getElementById("email").style.display = "none"; // Hide email input
  document.querySelector('button[type="submit"]').style.display = "none"; // Hide subscribe button
});

// ----- CONCERTS SECTION ANIMATION -----

// Event listener to show concerts section after page load
document.addEventListener("DOMContentLoaded", function () {
  // Select the section to observe
  // const concertsSection = document.querySelector('.concerts');

  if (!concertsSection) {
    console.error("Concerts section not found!");
    return;
  }

  // IntersectionObserver to handle both fade-in and fade-out
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Fade in when the section is visible
          concertsSection.classList.add("show");
        } else {
          // Fade out when the section is not visible
          concertsSection.classList.remove("show");
        }
      });
    },
    { threshold: 0.7 } // Trigger when 50% of the section is visible
  );

  observer.observe(concertsSection);
});
