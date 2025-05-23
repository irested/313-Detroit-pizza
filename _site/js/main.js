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

  // Separate page navigation from section navigation
  const isHomePage = window.location.pathname === "/";
  const navManager = isHomePage ? initSectionNav() : initPageNav();

  handleSectionLinks();

  // Initial active state
  updateActiveLink(window.location.pathname);

  // Handle hash changes
  window.addEventListener("hashchange", () => {
    updateActiveLink(window.location.pathname);
  });

  // Initialize float animation
  initFloatAnimation();
  updateLocation();
});

function initFloatAnimation() {
  const floatingElements = document.querySelectorAll(".animate-float");

  floatingElements.forEach((element) => {
    if (element) {
      requestAnimationFrame(() => {
        element.classList.add("float-start");
      });
    }
  });
}

function updateLocation() {
  const today = new Date().getDay(); // 0-6, where 0 is Sunday
  const locationTable = document.getElementById("locationTable");
  const locationMap = document.getElementById("locationMap");
  const navigationButton = document.getElementById("navigationButton");

  if (!locationTable || !locationMap || !navigationButton) return;

  // Remove any existing active classes
  locationTable.querySelectorAll("tr").forEach((row) => {
    row.classList.remove("bg-orange", "text-white");
  });

  // Find today's row
  const todayRow = locationTable.querySelector(`tr[data-day="${today}"]`);

  if (todayRow) {
    // Highlight today's row
    todayRow.classList.add("bg-orange", "text-white");

    // Update map
    const mapUrl = todayRow.dataset.mapUrl;
    locationMap.src = mapUrl;

    // Update navigation button
    const lat = todayRow.dataset.lat;
    const lon = todayRow.dataset.lon;
    navigationButton.onclick = (event) =>
      handleNavigationClick(event, lat, lon);

    // Show map container
    document.getElementById("mapContainer").style.display = "block";
  } else {
    // Handle closed days
    document.getElementById("mapContainer").innerHTML = `
      <div class="flex items-center justify-center h-[400px] lg:h-[500px] text-gray-500 text-lg lg:text-xl">
        Pas de localisation aujourd'hui
      </div>
    `;
    navigationButton.style.display = "none";
  }
}

function initSectionNav() {
  const sections = document.querySelectorAll("section[id]");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          // Update URL hash
          window.history.replaceState(null, null, `#${sectionId}`);
          updateActiveLink(sectionId);
        }
      });
    },
    {
      threshold: 0.5,
      rootMargin: "-50% 0px -50% 0px",
    }
  );

  sections.forEach((section) => observer.observe(section));
}

function initPageNav() {
  const currentPath = window.location.pathname;
  updateActiveLink(currentPath);
  return { type: "page" };
}

function updateActiveLink(identifier) {
  const navLinks = document.querySelectorAll(".nav-link");
  const currentPath = window.location.pathname;
  const currentHash = window.location.hash;

  navLinks.forEach((link) => {
    link.classList.remove("text-vertAccent");

    // Handle menu page
    if (currentPath === "/menu/" && link.getAttribute("data-page") === "menu") {
      link.classList.add("text-vertAccent");
      return;
    }

    // Handle home page and sections
    if (currentPath === "/" || currentPath === "") {
      if (currentHash) {
        // If there's a hash, highlight section link
        const sectionId = currentHash.replace("#", "");
        if (link.getAttribute("data-section") === sectionId) {
          link.classList.add("text-vertAccent");
        }
      } else if (link.getAttribute("data-page") === "home") {
        // If no hash and we're on home, highlight home link
        link.classList.add("text-vertAccent");
      }
    }
  });
}

function handleNavigationClick(event, lat, lon) {
  event.preventDefault();

  // Check if mobile device and detect platform
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  const isIOS = /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;
  const isAndroid = /android/i.test(userAgent);

  if (isIOS || isAndroid) {
    if (isIOS) {
      // For iOS, use maps URL scheme that will show app chooser
      window.location.href = `maps://?q=${lat},${lon}&dirflg=d`;
    } else {
      // For Android, use geo URI scheme that will show app chooser
      window.location.href = `geo:${lat},${lon}?q=${lat},${lon}`;
    }
  } else {
    // Desktop: open in new tab
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}`,
      "_blank",
      "noopener,noreferrer"
    );
  }
}

// Add this function after your existing code
function handleSectionLinks() {
  const sectionLinks = document.querySelectorAll(".nav-link[data-section]");
  const homeLink = document.querySelector(".nav-link[data-page='home']");
  const menuLink = document.querySelector(".nav-link[data-page='menu']");
  const navbarSticky = document.getElementById("navbar-sticky");
  const burgerMenuButton = document.querySelector("[data-collapse-toggle]");

  // Function to close burger menu
  const closeBurgerMenu = () => {
    navbarSticky?.classList.add("hidden");
    burgerMenuButton?.classList.remove("active");
  };

  // Handle home link click
  if (homeLink) {
    homeLink.addEventListener("click", (e) => {
      if (window.location.pathname === "/") {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
        // Clear hash if any
        if (window.location.hash) {
          window.history.pushState(
            "",
            document.title,
            window.location.pathname
          );
        }
        updateActiveLink("/");
      }
      closeBurgerMenu();
    });
  }

  // Handle menu link click
  if (menuLink) {
    menuLink.addEventListener("click", () => {
      closeBurgerMenu();
    });
  }

  // Handle section links
  sectionLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      if (window.location.pathname !== "/") {
        return;
      }

      e.preventDefault();
      const sectionId = link.getAttribute("data-section");
      const section = document.getElementById(sectionId);

      if (section) {
        window.history.pushState({}, "", `#${sectionId}`);
        section.scrollIntoView({ behavior: "smooth" });
        updateActiveLink(sectionId);
      }
      closeBurgerMenu();
    });
  });
}
