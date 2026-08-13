const galleryStage = document.querySelector(".gallery-track");
const previousButton = document.querySelector(".gallery-arrow-left");
const nextButton = document.querySelector(".gallery-arrow-right");

if (galleryStage) {
  const galleryTiles = Array.from(galleryStage.querySelectorAll(".gallery-tile"));

  if (galleryTiles.length) {
    let activeIndex = 0;
    let isAnimating = false;
    const visibleRange = 4;

    const wrapIndex = (index) => ((index % galleryTiles.length) + galleryTiles.length) % galleryTiles.length;

    const circularOffset = (index) => {
      const total = galleryTiles.length;
      let offset = index - activeIndex;

      if (offset > total / 2) offset -= total;
      if (offset < -total / 2) offset += total;

      return offset;
    };

    const updateGallery = () => {
      galleryTiles.forEach((tile, index) => {
        const offset = circularOffset(index);
        const distance = Math.abs(offset);
        const visible = distance <= visibleRange;
        const direction = offset < 0 ? -1 : 1;
        const curve = Math.min(distance / visibleRange, 1);
        const x = offset * 18;
        const lift = Math.sin(curve * Math.PI * 0.5) * 4.4;
        const scale = 1.1 - curve * 0.32;
        const opacity = visible ? 1 - curve * 0.72 : 0;

        tile.classList.toggle("is-centered", offset === 0);
        tile.style.setProperty("--gallery-x", `${x}vw`);
        tile.style.setProperty("--gallery-lift", `${lift.toFixed(2)}rem`);
        tile.style.setProperty("--gallery-scale", scale.toFixed(3));
        tile.style.setProperty("--gallery-opacity", opacity.toFixed(3));
        tile.style.setProperty("--gallery-tilt", `${direction * curve * -2.2}deg`);
        tile.style.zIndex = String(100 - distance);
        tile.style.pointerEvents = visible ? "auto" : "none";
      });
    };

    const moveGallery = (step) => {
      if (isAnimating) return;
      isAnimating = true;
      activeIndex = wrapIndex(activeIndex + step);
      updateGallery();
      window.setTimeout(() => {
        isAnimating = false;
      }, 260);
    };

    previousButton?.addEventListener("click", () => moveGallery(-1));
    nextButton?.addEventListener("click", () => moveGallery(1));

    galleryTiles.forEach((tile) => {
      const image = tile.querySelector("img");

      image?.setAttribute("draggable", "false");
      image?.addEventListener("dragstart", (event) => event.preventDefault());
      image?.addEventListener("contextmenu", (event) => event.preventDefault());
    });

    window.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") moveGallery(-1);
      if (event.key === "ArrowRight") moveGallery(1);
    });

    window.addEventListener("resize", updateGallery);

    updateGallery();
    galleryStage.classList.add("is-ready");
  }
}
