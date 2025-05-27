const map = L.map('map').setView([28.4089, 77.3178], 16); // Faridabad, Sector 15

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

const locations = [
  { coords: [28.4089, 77.3178], file: 'Wecome.mp3', label: 'Welcome to Sector 15 Market' },
  { coords: [28.4080, 77.3172], file: 'dp_saini.mp3', label: 'DP Saini Florist & Bakers' },
  { coords: [28.4077, 77.3171], file: 'darkbrown.mp3', label: 'Darkbrown Café' },
  { coords: [28.4085, 77.3180], file: 'haldirams.mp3', label: 'Haldiram’s' },
  { coords: [28.4083, 77.3175], file: 'parking.mp3', label: 'Sector 15 Parking Lot' },
  { coords: [28.4076, 77.3184], file: 'edusurf.mp3', label: 'EduSurf Coaching Center' }
];

locations.forEach(loc => {
  const marker = L.marker(loc.coords).addTo(map)
    .bindPopup(loc.label);
  marker.on('click', () => {
    const audio = new Audio(`audio/${loc.file}`);
    audio.play();
  });
});

// Sample marker (later you'll add GeoJSON or hover/voice triggers)
L.marker([28.39518, 77.32309])
  .addTo(map)
  .bindPopup('Welcome to Sector 15 Market!');

// Polygon around Sector 15 Market
const polygonCoords = [
  [28.39548, 77.32449],  // SW
  [28.39533, 77.32167],  // SE
  [28.39495, 77.32171],  // NE
  [28.39497, 77.32450]   // NW
];

L.polygon(polygonCoords, {
  color: "#ff6600",
  weight: 2
}).addTo(map)
  .bindPopup("Sector 15 Market Boundary");

fetch('shops.geojson')
  .then(res => res.json())
  .then(data => {
    L.geoJSON(data, {
      onEachFeature: function (feature, layer) {
        layer.bindPopup(`<strong>${feature.properties.name}</strong><br>${feature.properties.type}`);
        // Optional: preload and play audio
        // let audio = new Audio(feature.properties.audio);
        // layer.on('mouseover', () => audio.play());
      }
    }).addTo(map);
  });