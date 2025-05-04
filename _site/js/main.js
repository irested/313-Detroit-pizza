document.addEventListener("DOMContentLoaded", () => {
  let lastScrollY = window.scrollY;
  const navbar = document.getElementById("navbar");
  const navbarSticky = document.getElementById("navbar-sticky");
  const burgerMenuButton = document.querySelector("[data-collapse-toggle]");
  const scrollThreshold = 75;

  // Navbar scroll behavior
  if (navbar) {
    window.addEventListener("scroll", () => {
      const currentScrollY = window.scrollY;

      // Add sticky class when scrolling past threshold
      if (currentScrollY > scrollThreshold) {
        navbar.classList.add("bg-bgColor", "fixed", "z-20", "shadow-md");

        // Hide navbar on scroll down, show on scroll up
        if (currentScrollY > lastScrollY + 10) {
          navbar.classList.add("-translate-y-full");
          // Close burger menu if open
          navbarSticky?.classList.add("hidden");
        } else if (currentScrollY < lastScrollY - 10) {
          navbar.classList.remove("-translate-y-full");
        }
      } else {
        // Remove all classes at top
        navbar.classList.remove(
          "bg-bgColor",
          "fixed",
          "z-20",
          "shadow-md",
          "-translate-y-full"
        );
      }

      lastScrollY = currentScrollY;
    });
  }

  // Burger menu toggle
  burgerMenuButton?.addEventListener("click", () => {
    navbarSticky?.classList.toggle("hidden");
  });
});

function handleNavigationClick(event, lat, lon) {
  event.preventDefault();

  // Check if mobile device
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  if (isMobile) {
    // Try native apps on mobile
    const urls = {
      geo: `geo:${lat},${lon}`,
      google: `https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}`,
      waze: `https://waze.com/ul?ll=${lat},${lon}&navigate=yes`,
    };

    window.location.href = urls.geo;

    setTimeout(() => {
      window.location.href = urls.google;
    }, 500);
  } else {
    // Open Google Maps in new tab for desktop
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}`,
      "_blank",
      "noopener,noreferrer"
    );
  }
}
