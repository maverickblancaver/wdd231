export function setupModal() {
  const modal = document.getElementById("modal");
  const openBtn = document.getElementById("openModal");
  const closeBtn = document.getElementById("closeModal");

  openBtn.addEventListener("click", () => modal.classList.remove("hidden"));
  closeBtn.addEventListener("click", () => modal.classList.add("hidden"));
}