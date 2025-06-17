document.addEventListener("DOMContentLoaded", () => {
  // Nav toggle
  const toggle = document.getElementById("menu-toggle");
  const nav = document.getElementById("main-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("show");
    });
  }

  // Year in footer
  const year = document.getElementById("year");
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // Load spotlight data
  const container = document.getElementById("spotlight-container");
  if (container) {
    fetch("data/data.json")
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch data.json");
        return res.json();
      })
      .then(data => {
        data.forEach(client => {
          const card = document.createElement("div");
          card.className = "spotlight-card";
          card.innerHTML = `
            <img src="${client.image}" alt="${client.name}" loading="lazy">
            <h3>${client.name}</h3>
            <p>\"${client.testimonial}\"</p>
          `;
          container.appendChild(card);
        });
      })
      .catch(err => {
        console.error(err);
        container.innerHTML = "<p>Error loading client spotlights.</p>";
      });
  }
});