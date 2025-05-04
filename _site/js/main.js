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

  // Create URLs for different navigation apps
  const urls = {
    geo: `geo:${lat},${lon}`,
    google: `https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}`,
    waze: `https://waze.com/ul?ll=${lat},${lon}&navigate=yes`,
    apple: `maps://maps.apple.com/?daddr=${lat},${lon}`,
  };

  // Try opening with native geo: protocol first
  window.location.href = urls.geo;

  // Fallback options after a short delay
  setTimeout(() => {
    // Check if user is on mobile
    if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
      // If on mobile, let the OS handle the deep linking
      window.location.href = urls.google;
    } else {
      // If on desktop, open in new tab
      window.open(urls.google, "_blank");
    }
  }, 500);
}
