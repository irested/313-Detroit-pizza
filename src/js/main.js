document.addEventListener("DOMContentLoaded", () => {
  let lastScrollY = window.scrollY;
  const navbar = document.getElementById("navbar");
  const navbarSticky = document.getElementById("navbar-sticky");
  const burgerMenuButton = document.querySelector("[data-collapse-toggle]");
  const scrollThreshold = 75; // Number of pixels to trigger the sticky effect
  let isSticky = false;
  let isScrollingDown = false;

  // Navbar scroll behavior
  if (navbar) {
    window.addEventListener("scroll", () => {
      const currentScrollY = window.scrollY;

      // Add sticky class and background when scrolling past the threshold
      if (currentScrollY > scrollThreshold) {
        if (!isSticky) {
          navbar.classList.add("bg-bgColor", "fixed", "z-20", "shadow-md");
          isSticky = true;
        }

        // Slide out when scrolling down
        if (currentScrollY > lastScrollY && !isScrollingDown) {
          navbar.classList.add("-translate-y-full");
          isScrollingDown = true;

          // Close the burger menu if open
          if (navbarSticky && !navbarSticky.classList.contains("hidden")) {
            navbarSticky.classList.add("hidden");
          }
        }

        // Slide in when scrolling up
        if (currentScrollY < lastScrollY && isScrollingDown) {
          navbar.classList.remove("-translate-y-full");
          isScrollingDown = false;
        }
      } else {
        // Remove sticky class and background when at the top
        navbar.classList.remove(
          "bg-bgColor",
          "fixed",
          "z-20",
          "shadow-md",
          "-translate-y-full"
        );
        isSticky = false;

        // Close the burger menu if open
        if (navbarSticky && !navbarSticky.classList.contains("hidden")) {
          navbarSticky.classList.add("hidden");
        }
      }

      lastScrollY = currentScrollY;
    });
  }

  // Burger menu toggle functionality
  if (burgerMenuButton && navbarSticky) {
    burgerMenuButton.addEventListener("click", () => {
      navbarSticky.classList.toggle("hidden");
    });
  }
});
