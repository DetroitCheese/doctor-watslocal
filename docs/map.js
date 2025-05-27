
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png'
});

// Define and center on Sector 15 polygon
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

L.polygon(polygonCoords, {
  color: '#ff6600',
  weight: 2
}).addTo(map).bindPopup("Sector 15 Market Boundary");

let currentAudio = null;
let isMuted = false;

fetch('shops.geojson')
  .then(response => response.json())
  .then(data => {
    data.features.forEach(feature => {
      const [lng, lat] = feature.geometry.coordinates;
      const { name, audio } = feature.properties;

      const marker = L.marker([lat, lng]).addTo(map)
        .bindPopup(name);

      // Play audio on hover or click (for mobile fallback)
      const playAudio = () => {
        if (isMuted) return;
        if (currentAudio) currentAudio.pause();

        const audioFile = new Audio(audio);
        currentAudio = audioFile;
        audioFile.play();

        const nowPlaying = document.getElementById('now-playing');
        nowPlaying.innerText = `Now Playing: ${name}`;
        nowPlaying.classList.remove('hidden', 'opacity-0');
        nowPlaying.classList.add('opacity-100');

        setTimeout(() => {
          nowPlaying.classList.remove('opacity-100');
          nowPlaying.classList.add('opacity-0');
        }, 5000);
      };

      marker.on('mouseover', playAudio);
      marker.on('click', playAudio); // fallback for mobile/touch users
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
