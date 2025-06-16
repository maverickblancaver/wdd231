document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('discover-cards');
  const visitMsg = document.getElementById('visit-message');

  fetch('data/discover.json')
    .then(res => res.json())
    .then(data => {
      data.items.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.style.gridArea = `card${index + 1}`;
        card.innerHTML = `
          <h2>${item.name}</h2>
          <figure>
            <img src="${item.image}" alt="${item.name}" loading="lazy" width="400" height="250">
          </figure>
          <address>${item.address}</address>
          <p>${item.description}</p>
          <button aria-label="Learn more about ${item.name}">Learn More</button>
        `;
        container.appendChild(card);
      });
    });

  // LocalStorage visit logic
  const today = Date.now();
  const lastVisit = localStorage.getItem('lastVisit');
  let message = '';

  if (!lastVisit) {
    message = "Welcome! Let us know if you have any questions.";
  } else {
    const days = Math.floor((today - lastVisit) / (1000 * 60 * 60 * 24));
    message = days === 0
      ? "Back so soon! Awesome!"
      : `You last visited ${days} day${days > 1 ? 's' : ''} ago.`;
  }

  localStorage.setItem('lastVisit', today);
  visitMsg.textContent = message;

  // Footer data
  document.getElementById("currentyear").textContent = new Date().getFullYear();
  document.getElementById("lastModified").textContent = `Last Modified: ${document.lastModified}`;
});
