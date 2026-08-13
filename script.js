const mapSpotsLayer = document.querySelector(".map-spots");
const spotsKey = "zac-homepage:map-spots";
const spotsVersionKey = "zac-homepage:map-spots-version";
const currentSpotsVersion = "2026-08-12-location-set-v1";

const defaultSpots = [
  {
    id: "ningbo",
    x: 80.0,
    y: 43.9,
    name: "Ningbo, China",
    time: "Where everything began",
    logo: "Web_image/Map/Ningbo.jpg",
  },
  {
    id: "kanazawa",
    x: 82.5,
    y: 41.3,
    name: "Kanazawa, Japan",
    time: "2018 / Kanazawa Institute of Technology",
    logo: "Web_image/Map/kanasawa.png",
  },
  {
    id: "singapore",
    x: 73.8,
    y: 60.2,
    name: "Singapore",
    time: "2021 / Transcelestial",
    logo: "Web_image/Map/images.png",
  },
  {
    id: "terre-haute",
    x: 24.4,
    y: 39.6,
    name: "Terre Haute, IN",
    time: "2017-2022 / Rose-Hulman",
    logo: "Web_image/Map/rose-hulman.svg",
  },
  {
    id: "tucson",
    x: 18.9,
    y: 44.1,
    name: "Tucson, AZ",
    time: "2023-2027 / University of Arizona",
    logo: "Web_image/Map/university-of-arizona.svg",
  },
  {
    id: "bay-area",
    x: 14.1,
    y: 40.4,
    name: "Bay Area, CA",
    time: "2022-2023, 2025 / Leia Inc, Apple",
    logo: "Web_image/Map/Leia.png",
    secondaryLogo: "Web_image/Map/apple.svg",
  },
];

const loadSpots = () => {
  if (localStorage.getItem(spotsVersionKey) !== currentSpotsVersion) {
    localStorage.setItem(spotsKey, JSON.stringify(defaultSpots));
    localStorage.setItem(spotsVersionKey, currentSpotsVersion);
    return defaultSpots;
  }

  try {
    return JSON.parse(localStorage.getItem(spotsKey)) || defaultSpots;
  } catch {
    return defaultSpots;
  }
};

let mapSpots = loadSpots();

const renderSpots = () => {
  if (!mapSpotsLayer) return;

  mapSpotsLayer.innerHTML = "";
  mapSpots.forEach((spot) => {
    const button = document.createElement("button");
    button.className = "map-spot";
    button.type = "button";
    button.dataset.id = spot.id;
    button.style.left = `${spot.x}%`;
    button.style.top = `${spot.y}%`;
    button.setAttribute("aria-label", spot.name || "Map spot");
    const secondaryLogo = spot.secondaryLogo
      ? `<img class="place-logo place-logo-secondary" src="${spot.secondaryLogo}" alt="" />`
      : "";
    button.innerHTML = `
      <span class="marker-dot"></span>
      <span class="ua-card" aria-hidden="true">
        <span class="place-logos">
          <img class="place-logo" src="${spot.logo || ""}" alt="" />
          ${secondaryLogo}
        </span>
        <span class="ua-label">${spot.name || "Map spot"}</span>
        <span class="spot-time">${spot.time || ""}</span>
      </span>
    `;
    mapSpotsLayer.appendChild(button);
  });
};

renderSpots();
