const memberContainer = document.querySelector('#memberContainer');
const gridBtn = document.querySelector('#gridView');
const listBtn = document.querySelector('#listView');

async function getMemberData() {
  try {
    const response = await fetch('data/members.json');
    if (!response.ok) throw new Error('Failed to fetch member data.');
    const data = await response.json();
    displayMembers(data);
  } catch (error) {
    console.error('Error loading member data:', error);
    memberContainer.innerHTML = '<p>Error loading member data.</p>';
  }
}

function displayMembers(members) {
  memberContainer.innerHTML = '';
  members.forEach(member => {
    const card = document.createElement('section');
    card.classList.add('member-card');

    card.innerHTML = `
      <img src="images/${member.image}" alt="${member.name} logo" loading="lazy">
      <h3>${member.name}</h3>
      <p>${member.address}</p>
      <p>${member.phone}</p>
      <a href="${member.website}" target="_blank" rel="noopener">Visit Website</a>
      <p class="membership ${getLevelClass(member.membership)}">${getLevelName(member.membership)}</p>
    `;

    memberContainer.appendChild(card);
  });
}

function getLevelName(level) {
  return level === 3 ? 'Gold Member' : level === 2 ? 'Silver Member' : 'Member';
}

function getLevelClass(level) {
  return level === 3 ? 'gold' : level === 2 ? 'silver' : 'regular';
}

gridBtn.addEventListener('click', () => {
  memberContainer.classList.add('grid');
  memberContainer.classList.remove('list');
});

listBtn.addEventListener('click', () => {
  memberContainer.classList.add('list');
  memberContainer.classList.remove('grid');
});

document.querySelector('#currentyear').textContent = new Date().getFullYear();
document.querySelector('#lastModified').textContent = `Last Modified: ${document.lastModified}`;

getMemberData();
