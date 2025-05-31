// Load and display 2-3 random Gold/Silver members in spotlight
async function loadSpotlights() {
  try {
    const response = await fetch('data/members.json');
    if (!response.ok) throw new Error('Failed to load spotlight data');
    const members = await response.json();

    // Filter Gold (3) and Silver (2) members
    const qualified = members.filter(m => m.membership === 2 || m.membership === 3);
    
    // Shuffle and take up to 3 members
    const shuffled = qualified.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 3);

    const container = document.getElementById('spotlight-cards');
    container.innerHTML = '';

    selected.forEach(member => {
      const card = document.createElement('article');
      card.classList.add('spotlight-card');
      card.tabIndex = 0; // Make focusable for accessibility
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

  try {
    const apiKey = '6b47bb1c9bf97ffeee2c4483bfd186958';
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&units=metric&appid=${apiKey}`;

    const response = await fetch(url);
    if (!response.ok) throw new Error('Weather data not available');
    const data = await response.json();

    // Get next 3 days forecast (excluding today)
    const dailyForecasts = data.daily.slice(1, 4);

    weatherDiv.innerHTML = '';

    dailyForecasts.forEach(day => {
      const date = new Date(day.dt * 1000);
      const options = { weekday: 'short', month: 'short', day: 'numeric' };
      const dayName = date.toLocaleDateString(undefined, options);

      const iconCode = day.weather[0].icon;
      const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
      const description = day.weather[0].description;
      const tempMax = Math.round(day.temp.max);
      const tempMin = Math.round(day.temp.min);

      const dayDiv = document.createElement('div');
      dayDiv.classList.add('weather-day');
      dayDiv.innerHTML = `
        <h3>${dayName}</h3>
        <img src="${iconUrl}" alt="${description}" />
        <p><strong>${tempMax}°C</strong> / ${tempMin}°C</p>
        <p>${description}</p>
      `;

      weatherDiv.appendChild(dayDiv);
    });
  } catch (error) {
    console.warn(error);
    weatherDiv.innerHTML = '<p>Weather data is currently unavailable.</p>';
  }
}

// Hamburger toggle functionality
function setupHamburgerToggle() {
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navMenu = document.getElementById('primary-navigation');

  hamburgerBtn.addEventListener('click', () => {
    const expanded = hamburgerBtn.getAttribute('aria-expanded') === 'true' || false;
    hamburgerBtn.setAttribute('aria-expanded', !expanded);
    navMenu.classList.toggle('show');
  });
}

// Set current year and last modified date
function setFooterDates() {
  document.getElementById('currentyear').textContent = new Date().getFullYear();
  document.getElementById('lastModified').textContent = `Last Modified: ${document.lastModified}`;
}

document.addEventListener('DOMContentLoaded', () => {
  loadSpotlights();
  loadWeather();
  setupHamburgerToggle();
  setFooterDates();
});
