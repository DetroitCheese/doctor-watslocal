
# 🗺️ Doctor Watslocal — Sector 15 Market, Faridabad

**Doctor Watslocal** is a voice-guided interactive map of Faridabad's core sectors — starting with Sector 15 Market.

- 📍 All points of interest (eateries, coaching centers, parking lots, etc.) are charted manually via live local capture  
- 🔊 Hovering or tapping on a shop plays a spatial voice note describing the location  
- 🟧 The polygon outlines the actual sector boundary, centered around real GPS coordinates  
- 🌐 Hosted on GitHub Pages for lightweight deployment (zero backend, fully static)

---

## 🎯 Purpose & Vision

Most review platforms today (Google, Amazon, Zomato) are:
- Text-heavy  
- Lacking context  
- Hard to scan quickly  
- Dominated by fake/sterile reviews

This project proposes an alternative:

> **Voice-to-voice and voice-to-map reviews**, embedded directly into the geospatial interface.

Future versions will allow:
- 📥 Locals to record their own voice snippets for shops and landmarks  
- 🧭 Sector-level filters or personal mapping overlays  
- 🗣️ Emotionally resonant voice-based recommendations instead of thumbs or star ratings

---

## 📦 Current Stack

- [Leaflet.js](https://leafletjs.com/) for map rendering  
- Raw `shops.geojson` for data storage  
- Voice files manually recorded and mapped  
- Tailwind (CDN-only) for minimal UI styling  
- Fully deployable via GitHub Pages (no frameworks, no build step)

---

## 🚧 Roadmap

- [ ] Voice recording UI for users to submit reviews  
- [ ] Map-based pin placement tool  
- [ ] Sector toggling: 12, 14, 15, 16, 17  
- [ ] Optional sentiment tags and smart filters  

---

## 📍 Try it Live

[**detroitcheese.github.io/doctor-watslocal/**](https://detroitcheese.github.io/doctor-watslocal/)
