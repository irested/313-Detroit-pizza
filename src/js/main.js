document.addEventListener("DOMContentLoaded", () => {
  let lastScrollY = window.scrollY;
  const navbar = document.getElementById("navbar");
  const navbarSticky = document.getElementById("navbar-sticky");
  const burgerMenuButton = document.querySelector("[data-collapse-toggle]");
  const hero = document.querySelector("#hero");
  const scrollThreshold = 75;
  const navbarHeight = navbar?.offsetHeight || 0;

  // Navbar scroll behavior
  if (navbar) {
    window.addEventListener("scroll", () => {
      const currentScrollY = window.scrollY;

      // Add sticky class when scrolling past threshold
      if (currentScrollY > scrollThreshold) {
        navbar.classList.add("bg-bgColor", "fixed", "z-20", "shadow-md");
        if (hero) hero.style.marginTop = `${navbarHeight}px`;

        // Hide navbar on scroll down, show on scroll up
        if (currentScrollY > lastScrollY + 10) {
          navbar.classList.add("-translate-y-full");
          // Close burger menu if open
          navbarSticky?.classList.add("hidden");
          burgerMenuButton?.classList.remove("active"); // Add this line to remove active state
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
        if (hero) hero.style.marginTop = "0px";
      }

      lastScrollY = currentScrollY;
    });
  }

  // Burger menu toggle
  burgerMenuButton?.addEventListener("click", () => {
    burgerMenuButton.classList.toggle("active");
    navbarSticky?.classList.toggle("hidden");
  });
});

function handleNavigationClick(event, lat, lon) {
  event.preventDefault();

  // Check if mobile device
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  if (isMobile) {
    // Create URLs for different navigation apps
    const wazeUrl = `https://waze.com/ul?ll=${lat},${lon}&navigate=yes`;
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`;

    // Try to open in Waze first (since it works better)
    window.location.href = wazeUrl;

    // Fallback to Google Maps after a delay if Waze didn't open
    setTimeout(() => {
      window.location.href = googleMapsUrl;
    }, 2000);
  } else {
    // Desktop: open Google Maps in new tab with search query
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`,
      "_blank",
      "noopener,noreferrer"
    );
  }
}
