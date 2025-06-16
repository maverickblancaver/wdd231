export async function loadPrograms() {
  try {
    const response = await fetch('data/programs.json');
    const data = await response.json();
    const container = document.getElementById('programs');
    data.forEach(program => {
      const div = document.createElement('div');
      div.className = 'card';
      div.innerHTML = `<h3>${program.name}</h3><p>${program.description}</p><p>${program.duration}</p><p>${program.level}</p>`;
      container.appendChild(div);
    });
  } catch (error) {
    console.error("Error loading programs:", error);
  }
}