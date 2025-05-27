
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png'
});

// Basic map init centered on polygon centroid of Sector 15
const polygonCoords = [
  [28.39548, 77.32449], // SW
  [28.39533, 77.32167], // SE
  [28.39495, 77.32171], // NE
  [28.39497, 77.32450]  // NW
];

const centroid = polygonCoords.reduce(
  (acc, [lat, lng]) => [acc[0] + lat / polygonCoords.length, acc[1] + lng / polygonCoords.length],
  [0, 0]
);

const map = L.map('map').setView(centroid, 17);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Optional polygon boundary
L.polygon(polygonCoords, {
  color: '#ff6600',
  weight: 2
}).addTo(map).bindPopup("Sector 15 Market Boundary");

const locations = [
  { coords: [28.39580, 77.32119], file: 'Wecome.mp3', label: 'Welcome to Sector 15 Market' },
  { coords: [28.39518, 77.32177], file: 'dp_saini.mp3', label: 'DP Saini Florist & Bakers' },
  { coords: [28.39519, 77.32250], file: 'darkbrown.mp3', label: 'Darkbrown Café' },
  { coords: [28.39512, 77.32442], file: 'haldirams.mp3', label: "Haldiram's" },
  { coords: [28.39580, 77.31951], file: 'parking.mp3', label: 'Sector 15 Parking Lot' },
  { coords: [28.39564, 77.31922], file: 'edusurf.mp3', label: 'EduSurf Coaching Center' }
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
    nowPlaying.classList.remove('hidden', 'opacity-0');
    nowPlaying.classList.add('opacity-100');

    setTimeout(() => {
      nowPlaying.classList.remove('opacity-100');
      nowPlaying.classList.add('opacity-0');
    }, 5000);
  });
});

document.getElementById('mute-toggle').addEventListener('click', () => {
  isMuted = !isMuted;
  const icon = document.getElementById('mute-icon');
  if (icon) icon.textContent = isMuted ? '🔇' : '🔊';

  if (currentAudio) {
    currentAudio.pause();
    currentAudio = null;
  }
});
