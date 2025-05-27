const map = L.map('map').setView([28.4089, 77.3178], 16); // Faridabad, Sector 15

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

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