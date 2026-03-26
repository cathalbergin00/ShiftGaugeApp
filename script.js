const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const lightboxCaption = document.getElementById("lightbox-caption");

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
