import { loadPrograms } from './data.js';
import { setupModal } from './modal.js';

document.addEventListener("DOMContentLoaded", () => {
  loadPrograms();
  setupModal();
});