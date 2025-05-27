console.log("✅ map.js loaded");

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png'
});
const map = L.map('map').setView([28.4089, 77.3178], 16);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

const locations = [
  { coords: [28.4089, 77.3178], file: 'Wecome.mp3', label: 'Welcome to Sector 15 Market' },
  { coords: [28.4080, 77.3172], file: 'dp_saini.mp3', label: 'DP Saini Florist & Bakers' },
  { coords: [28.4077, 77.3171], file: 'darkbrown.mp3', label: 'Darkbrown Café' },
  { coords: [28.4085, 77.3180], file: 'haldirams.mp3', label: 'Haldiram\'s' },
  { coords: [28.4083, 77.3175], file: 'parking.mp3', label: 'Sector 15 Parking Lot' },
  { coords: [28.4076, 77.3184], file: 'edusurf.mp3', label: 'EduSurf Coaching Center' }
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
document.getElementById('mute-btn').addEventListener('click', () => {
  isMuted = !isMuted;
  const icon = document.getElementById('mute-icon');
  icon.textContent = isMuted ? '🔇' : '🔊';

  if (currentAudio) {
    currentAudio.pause();
    currentAudio = null;
  }
});