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

  // Check if mobile device and detect platform
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  const isIOS = /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;
  const isAndroid = /android/i.test(userAgent);

  if (isIOS || isAndroid) {
    // Use geo: URI scheme which triggers system app chooser
    const geoUrl = `geo:${lat},${lon}?q=${lat},${lon}`;

    // Create fallback chain using Promise
    new Promise((resolve) => {
      // Try geo URI first
      window.location.href = geoUrl;
      setTimeout(resolve, 2000);
    }).then(() => {
      // If geo URI fails, try platform specific URIs
      if (isIOS) {
        window.location.href = `maps://?q=${lat},${lon}`;
      } else {
        window.location.href = `google.navigation:q=${lat},${lon}`;
      }
      // Final fallback to web Google Maps
      setTimeout(() => {
        window.location.href = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}&travelmode=driving`;
      }, 2000);
    });
  } else {
    // Desktop: open in new tab
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}`,
      "_blank",
      "noopener,noreferrer"
    );
  }
}
