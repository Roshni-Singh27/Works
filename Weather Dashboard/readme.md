# Skye — Weather Dashboard

A beautiful, single-file weather dashboard built with vanilla HTML, CSS, and JavaScript. Skye fetches real-time weather data from free, no-key-required APIs and renders it in a rich, animated dark-themed UI.

---

## Features

- **Live weather data** — current conditions, 24-hour hourly forecast, and 7-day forecast
- **City search** — look up any city by name using the Open-Meteo geocoding API
- **GPS location** — auto-detect the user's location via the browser Geolocation API
- **°C / °F toggle** — switch temperature units instantly without re-fetching
- **Dynamic sky hero** — gradient background that changes based on time of day (dawn, day, dusk, night) and weather conditions
- **Animated details** — twinkling stars, drifting clouds, floating weather icon, sun arc SVG
- **Weather cards:**
  - Wind speed, direction & gusts with a compass needle
  - Humidity with an animated radial gauge and dew point
  - UV Index with a color-gradient bar and safety advice
  - Sun & Moon — animated arc showing sun's position, sunrise/sunset times, day length, and moon phase
  - Atmosphere — pressure, visibility, cloud cover, and daily rainfall
  - Air Quality — simulated AQI score with PM2.5, PM10, NO₂, O₃ indicators
  - Precipitation chart — next 12-hour bar chart
  - Weather alerts — auto-generated based on UV index and WMO weather codes
  - 7-day forecast with temperature range bars

---

## APIs Used

| API | Purpose | Auth |
|---|---|---|
| [Open-Meteo Forecast](https://open-meteo.com/) | Current conditions, hourly & daily forecast | None |
| [Open-Meteo Geocoding](https://open-meteo.com/en/docs/geocoding-api) | City name → lat/lon | None |
| [Nominatim (OpenStreetMap)](https://nominatim.org/) | Reverse geocoding lat/lon → city name | None |

No API keys are required. All APIs are free and open.

---

## Getting Started

Because this is a pure client-side HTML file, no build step or server is needed.

1. Download `weather-dashboard.html`
2. Open it in any modern browser:
   ```
   open weather-dashboard.html
   ```
   Or serve it locally (recommended to avoid CORS issues in some browsers):
   ```
   npx serve .
   # then open http://localhost:3000/weather-dashboard.html
   ```
3. Allow location access when prompted, or type any city name in the search bar.

---

## Project Structure

Everything lives in a single HTML file with three logical sections:

```
weather-dashboard.html
├── <head>        — Google Fonts (Space Grotesk + Inter), CSS custom properties
├── <style>       — All styling (~700 lines), CSS variables for theming
├── <body>        — Markup: sky hero, topbar, search bar, main grid of cards
└── <script>      — All JS logic (~580 lines)
    ├── State         — unit, weatherData, lat/lon
    ├── Init          — geolocation request, star/precip generation
    ├── Search        — geocoding API call → update lat/lon
    ├── fetchWeather  — parallel fetch: forecast + reverse geocode
    ├── renderAll     — populates every card from API response
    └── Helpers       — unit conversion, compass, sky gradient, moon phase, WMO codes
```

---

## Default Location

When geolocation is unavailable or denied, the dashboard falls back to **Hyderabad, India** (17.385°N, 78.487°E).




## Browser Compatibility

Works in all modern browsers (Chrome, Firefox, Safari, Edge). Requires:
- `fetch` API
- CSS Grid & Custom Properties
- SVG animation support

Internet Explorer is not supported.

---

## License

This project uses only free, open APIs with no usage restrictions for personal or non-commercial use. Check the [Open-Meteo Terms](https://open-meteo.com/en/terms) and [Nominatim Usage Policy](https://operations.osmfoundation.org/policies/nominatim/) before deploying commercially.
