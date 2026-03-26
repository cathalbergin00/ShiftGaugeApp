const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const lightboxCaption = document.getElementById("lightbox-caption");
const ctaLinks = document.querySelectorAll(".track-cta[data-cta-location]");

function trackCtaClick(location) {
  const payload = {
    event_category: "conversion",
    event_label: location,
    cta_location: location,
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
