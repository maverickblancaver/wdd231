// Load and display 2-3 random Gold (3) / Silver (2) members in spotlight
async function loadSpotlights() {
  try {
    const response = await fetch('data/members.json');
    if (!response.ok) throw new Error('Failed to load spotlight data');
    const members = await response.json();

    // Filter Gold (3) and Silver (2) members only
    const qualified = members.filter(m => m.membership === 2 || m.membership === 3);
    
    // Shuffle and take up to 3 members
    const shuffled = qualified.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 3);

    const container = document.getElementById('spotlight-cards');
    container.innerHTML = '';

    selected.forEach(member => {
      const card = document.createElement('article');
      card.classList.add('spotlight-card');
      card.tabIndex = 0; // focusable for accessibility
      card.innerHTML = `
        <img src="${member.imageurl}" alt="${member.name} logo" loading="lazy" />
        <h3>${member.name}</h3>
        <p>${member.description}</p>
        <a href="${member.websiteurl}" target="_blank" rel="noopener">Visit Website</a>
      `;
      container.appendChild(card);
    });
  } catch (error) {
    console.error(error);
    document.getElementById('spotlight-cards').innerHTML = '<p>Failed to load member spotlights.</p>';
  }
}

// 3-Day Weather forecast for Cebu City using OpenWeatherMap One Call API
async function loadWeather() {
  const weatherDiv = document.getElementById('weather-display');
  const lat = 10.3157; // Cebu City latitude
  const lon = 123.8854; // Cebu City longitude
  const apiKey = 'YOUR_OPENWEATHER_API_KEY'; // replace with your API key

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&units=metric&appid=${apiKey}`
    );
    if (!response.ok) throw new Error('Weather data not available');
    const data = await response.json();

    // Show 3-day forecast
    const forecast = data.daily.slice(0, 3);

    weatherDiv.innerHTML = '';

    forecast.forEach(day => {
      const date = new Date(day.dt * 1000);
      const options = { weekday: 'short', month: 'short', day: 'numeric' };
      const dateStr = date.toLocaleDateString(undefined, options);

      const icon = day.weather[0].icon;
      const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

      const weatherCard = document.createElement('div');
      weatherCard.classList.add('weather-day');
      weatherCard.innerHTML = `
        <h3>${dateStr}</h3>
        <img src="${iconUrl}" alt="${day.weather[0].description}" />
        <p>Day: ${day.temp.day.toFixed(1)}°C</p>
        <p>Night: ${day.temp.night.toFixed(1)}°C</p>
        <p>${day.weather[0].main}</p>
      `;
      weatherDiv.appendChild(weatherCard);
    });
  } catch (error) {
    console.error(error);
    weatherDiv.innerHTML = '<p>Failed to load weather forecast.</p>';
  }
}

// Hamburger menu toggle with ARIA update
function setupMenuToggle() {
  const hamburger = document.getElementById('hamburgerBtn');
  const nav = document.getElementById('primary-navigation');

  hamburger.addEventListener('click', () => {
    const expanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', !expanded);
    nav.classList.toggle('show');
  });
}

// Update footer date info
function updateFooterDates() {
  const yearSpan = document.getElementById('currentyear');
  const lastModifiedP = document.getElementById('lastModified');
  yearSpan.textContent = new Date().getFullYear();
  lastModifiedP.textContent = `Last Modified: ${document.lastModified}`;
}

// Initialize page
function init() {
  loadSpotlights();
  loadWeather();
  setupMenuToggle();
  updateFooterDates();
}

window.addEventListener('DOMContentLoaded', init);
