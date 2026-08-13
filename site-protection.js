document.addEventListener("contextmenu", (event) => {
  if (event.target.closest("img, video, .gallery-track, .project-media, .portrait-wash")) {
    event.preventDefault();
  }
});

document.addEventListener("dragstart", (event) => {
  if (event.target.closest("img, video")) {
    event.preventDefault();
  }
});

document.querySelectorAll("img, video").forEach((element) => {
  element.setAttribute("draggable", "false");
});
