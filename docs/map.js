console.log("✅ Latest map.js loaded (hover version)");

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png'
});

const map = L.map('map');

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Polygon around Sector 15 Market
const polygonCoords = [
  [28.39548, 77.32449], // SW
  [28.39533, 77.32167], // SE
  [28.39495, 77.31711], // NE
  [28.39497, 77.32450]  // NW
];

// Calculate centroid
const centroid = polygonCoords.reduce(
  (acc, [lat, lng]) => [acc[0] + lat / polygonCoords.length, acc[1] + lng / polygonCoords.length],
  [0, 0]
);

// Center map on polygon centroid
const map = L.map('map').setView(centroid, 17);

// Base tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Optional: draw the polygon visually
L.polygon(polygonCoords, {
  color: '#ff6600',
  weight: 2
}).addTo(map).bindPopup("Sector 15 Market Boundary");

map.fitBounds(polygon.getBounds());  // <-- This recenters automatically

const locations = [
  { coords: [28.39525, 77.32330], file: 'Wecome.mp3', label: 'Welcome to Sector 15 Market' },
  { coords: [28.39510, 77.32280], file: 'dp_saini.mp3', label: 'DP Saini Florist & Bakers' },
  { coords: [28.39500, 77.32240], file: 'darkbrown.mp3', label: 'Darkbrown Café' },
  { coords: [28.39520, 77.32310], file: 'haldirams.mp3', label: 'Haldiram\'s' },
  { coords: [28.39515, 77.32260], file: 'parking.mp3', label: 'Sector 15 Parking Lot' },
  { coords: [28.39505, 77.32295], file: 'edusurf.mp3', label: 'EduSurf Coaching Center' }
];

let currentAudio = null;
let isMuted = false;

locations.forEach(loc => {
  const marker = L.marker(loc.coords).addTo(map)
    .bindPopup(loc.label);

  marker.on('mouseover', () => {
    if (isMuted) return;
    if (currentAudio) currentAudio.pause();

    const audio = new Audio(`audio/${loc.file}`);
    currentAudio = audio;
    audio.play();

    const nowPlaying = document.getElementById('now-playing');
    nowPlaying.innerText = `Now Playing: ${loc.label}`;
    nowPlaying.classList.remove('hidden');
    nowPlaying.classList.add('opacity-100');
    nowPlaying.classList.remove('opacity-0');

    // Auto-hide after 5s
    setTimeout(() => {
      nowPlaying.classList.remove('opacity-100');
      nowPlaying.classList.add('opacity-0');
    }, 5000);
  });
});

// Mute toggle
document.getElementById('mute-toggle').addEventListener('click', () => {
  isMuted = !isMuted;
  const icon = document.getElementById('mute-icon');
  if (icon) icon.textContent = isMuted ? '🔇' : '🔊';

  if (currentAudio) {
    currentAudio.pause();
    currentAudio = null;
  }
});