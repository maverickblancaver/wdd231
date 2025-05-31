document.addEventListener('DOMContentLoaded', () => {
  // Set current year and last modified
  document.getElementById('currentyear').textContent = new Date().getFullYear();
  document.getElementById('lastModified').textContent = `Last Modified: ${document.lastModified}`;

  // Set timestamp
  document.getElementById('timestamp').value = new Date().toISOString();

  // Modal logic
  const modalLinks = document.querySelectorAll('[data-modal]');
  const modals = document.querySelectorAll('.modal');
  const closeBtns = document.querySelectorAll('.close');

  modalLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      document.getElementById(link.dataset.modal).style.display = 'block';
    });
  });

  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      btn.closest('.modal').style.display = 'none';
    });
  });

  window.addEventListener('click', e => {
    modals.forEach(modal => {
      if (e.target === modal) modal.style.display = 'none';
    });
  });
});
