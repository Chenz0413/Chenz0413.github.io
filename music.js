const musicToggle = document.querySelector(".music-toggle");

if (musicToggle) {
  const audio = new Audio("assets/audio/after-the-rain.mp3");
  const playStateKey = "zac-site:rainy-jazz-playing";
  const timeStateKey = "zac-site:rainy-jazz-time";
  const isGalleryPage = window.location.pathname.toLowerCase().endsWith("gallery.html");

  audio.loop = true;
  audio.volume = 0.28;

  const savedTime = Number.parseFloat(localStorage.getItem(timeStateKey) || "0");
  if (Number.isFinite(savedTime) && savedTime > 0) {
    audio.currentTime = savedTime;
  }

  const setButtonState = (isPlaying) => {
    musicToggle.classList.toggle("is-playing", isPlaying);
    musicToggle.setAttribute(
      "aria-label",
      isPlaying ? "Pause rainy jazz background music" : "Play rainy jazz background music",
    );
  };

  const saveTime = () => {
    if (Number.isFinite(audio.currentTime)) {
      localStorage.setItem(timeStateKey, audio.currentTime.toString());
    }
  };

  const startMusic = async () => {
    try {
      await audio.play();
      localStorage.setItem(playStateKey, "true");
      setButtonState(true);
    } catch {
      setButtonState(false);
    }
  };

  const stopMusic = () => {
    audio.pause();
    saveTime();
    localStorage.setItem(playStateKey, "false");
    setButtonState(false);
  };

  musicToggle.addEventListener("click", () => {
    if (audio.paused) {
      startMusic();
    } else {
      stopMusic();
    }
  });

  audio.addEventListener("timeupdate", saveTime);
  audio.addEventListener("play", () => setButtonState(true));
  audio.addEventListener("pause", () => setButtonState(false));
  window.addEventListener("beforeunload", saveTime);

  if (isGalleryPage) {
    localStorage.setItem(playStateKey, "true");
  }

  if (localStorage.getItem(playStateKey) === "true") {
    startMusic();
  } else {
    setButtonState(false);
  }
}
