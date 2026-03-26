const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const lightboxCaption = document.getElementById("lightbox-caption");
const ctaLinks = document.querySelectorAll(".track-cta[data-cta-location]");
const mobileNavToggle = document.querySelector(".mobile-nav-toggle");
const mobileNavPanel = document.getElementById("mobile-nav-panel");
const mobileNavBackdrop = document.getElementById("mobile-nav-backdrop");
const mobileNavLinks = document.querySelectorAll("[data-mobile-nav-link]");

let lastFocusElement = null;
const MOBILE_NAV_MAX_WIDTH = 900;

function getViewportBucket(width) {
  if (width <= 700) {
    return "phone";
  }

  if (width <= MOBILE_NAV_MAX_WIDTH) {
    return "small_tablet";
  }

  return "desktop";
}

function setMobileNavOpen(isOpen) {
  if (!mobileNavToggle || !mobileNavPanel || !mobileNavBackdrop) {
    return;
  }

  mobileNavToggle.setAttribute("aria-expanded", String(isOpen));
  mobileNavToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  mobileNavPanel.hidden = !isOpen;
  mobileNavBackdrop.hidden = !isOpen;
  document.body.classList.toggle("mobile-nav-open", isOpen);

  if (isOpen) {
    const firstLink = mobileNavPanel.querySelector("a");
    if (firstLink) {
      firstLink.focus();
    }
  } else if (lastFocusElement instanceof HTMLElement) {
    lastFocusElement.focus();
  }
}

if (mobileNavToggle && mobileNavPanel && mobileNavBackdrop) {
  mobileNavToggle.addEventListener("click", () => {
    lastFocusElement = document.activeElement;
    const isOpen = mobileNavToggle.getAttribute("aria-expanded") === "true";
    setMobileNavOpen(!isOpen);
  });

  mobileNavBackdrop.addEventListener("click", () => {
    setMobileNavOpen(false);
  });

  mobileNavLinks.forEach((link) => {
    link.addEventListener("click", () => {
      setMobileNavOpen(false);
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      const isOpen = mobileNavToggle.getAttribute("aria-expanded") === "true";
      if (isOpen) {
        setMobileNavOpen(false);
      }
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > MOBILE_NAV_MAX_WIDTH) {
      setMobileNavOpen(false);
    }
  });
}

function trackCtaClick(location) {
  const viewportWidth = window.innerWidth || 0;
  const payload = {
    event_category: "conversion",
    event_label: location,
    cta_location: location,
    viewport_width: viewportWidth,
    viewport_bucket: getViewportBucket(viewportWidth),
  };

  if (typeof window.gtag === "function") {
    window.gtag("event", "app_store_click", payload);
  }

  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({
      event: "app_store_click",
      ...payload,
    });
  }

  document.dispatchEvent(
    new CustomEvent("shiftgauge:cta_click", {
      detail: payload,
    }),
  );
}

ctaLinks.forEach((link) => {
  link.addEventListener("click", () => {
    const location = link.getAttribute("data-cta-location") || "unknown";
    trackCtaClick(location);
  });
});

if (lightbox && lightboxImage && lightboxCaption) {
  const triggers = document.querySelectorAll(".shot-button");

  triggers.forEach((button) => {
    button.addEventListener("click", () => {
      const full = button.getAttribute("data-full");
      const caption = button.getAttribute("data-caption") || "Screenshot preview";

      if (!full) {
        return;
      }

      lightboxImage.src = full;
      lightboxCaption.textContent = caption;
      lightbox.showModal();
    });
  });

  lightbox.addEventListener("click", (event) => {
    const rect = lightbox.getBoundingClientRect();
    const clickedBackdrop =
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom;

    if (clickedBackdrop) {
      lightbox.close();
    }
  });

  lightbox.addEventListener("close", () => {
    lightboxImage.src = "";
  });
}
