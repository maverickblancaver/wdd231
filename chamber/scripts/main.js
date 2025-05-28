// Load spotlights data and display in the spotlights section
async function loadSpotlights() {
  try {
    const response = await fetch('data/members.json');
    if (!response.ok) throw new Error('Failed to load spotlight data');
    const spotlights = await response.json();

    const container = document.getElementById('spotlight-cards');
    container.innerHTML = '';

    spotlights.forEach(member => {
      const card = document.createElement('article');
      card.classList.add('spotlight-card');
      card.innerHTML = `
        <img src="${member.imageurl}" alt="${member.name} logo" />
        <h3>${member.name}</h3>
        <p>${member.description}</p>
        <a href="${member.websiteurl}" target="_blank" rel="noopener">Visit Website</a>
      `;
      container.appendChild(card);
    });
  } catch (error) {
    console.error(error);
    const container = document.getElementById('spotlight-cards');
    container.innerHTML = '<p>Failed to load member spotlights.</p>';
  }
}

// Fetch weather info from a free API (OpenWeatherMap example) 
// NOTE: Replace YOUR_API_KEY with your own key for live data
async function loadWeather() {
  const weatherDiv = document.getElementById('weather-display');
  const city = 'Cebu City';  

  try {// Replace with your city or detect dynamically
    // Use your own OpenWeatherMap API key here
    const apiKey = 'Cebu City';
    const url = `http://api.openweathermap.org/geo/1.0/zip?zip={zip code},{country code}&appid={API key}`;

    const response = await fetch(url);
    if (!response.ok) throw new Error('Weather data not available');
    const data = await response.json();

    weatherDiv.innerHTML = `
      <p><strong>${data.name}</strong></p>
      <p>Temperature: ${Math.round(data.main.temp)} °F</p>
      <p>Conditions: ${data.weather[0].description}</p>
      <p>Humidity: ${data.main.humidity}%</p>
    `;
  } catch (error) {
    console.warn(error);
    weatherDiv.innerHTML = '<p>Weather data is currently unavailable.</p>';
  }
}

// Initialize all functions on DOM content loaded
document.addEventListener('DOMContentLoaded', () => {
  loadSpotlights();
  loadWeather();
});
