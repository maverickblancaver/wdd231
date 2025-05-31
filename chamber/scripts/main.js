async function loadSpotlights() {
  try {
    const response = await fetch('data/members.json');
    if (!response.ok) throw new Error('Failed to load spotlight data');
    const members = await response.json();

    const qualified = members.filter(m => m.membership === 2 || m.membership === 3);
    const shuffled = qualified.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 3);

    const container = document.getElementById('spotlight-cards');
    container.innerHTML = '';

    selected.forEach(member => {
      const card = document.createElement('article');
      card.classList.add('spotlight-card');
      card.tabIndex = 0;
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

async function loadWeather() {
  const weatherDiv = document.getElementById('weather-display');
  const lat = 10.3157;
  const lon = 123.8854;
  const apiKey = 'YOUR_VALID_API_KEY_HERE';

  try {
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&units=metric&appid=${apiKey}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Weather data not available');
    const data = await response.json();

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

function setupHamburgerToggle() {
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navMenu = document.getElementById('primary-navigation');

  hamburgerBtn.addEventListener('click', () => {
    const expanded = hamburgerBtn.getAttribute('aria-expanded') === 'true';
    hamburgerBtn.setAttribute('aria-expanded', !expanded);
    navMenu.classList.toggle('show');
  });
}

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
