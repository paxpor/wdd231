const timestampField = document.querySelector("#timestamp");

if (timestampField) {
  timestampField.value = new Date().toISOString();
}

const modals = [
  "np",
  "bronze",
  "silver",
  "gold"
];

modals.forEach(level => {
  const modal = document.querySelector(`#${level}-modal`);
  const openBtn = document.querySelector(`#${level}-open`);
  const closeBtn = document.querySelector(`#${level}-close`);

  if (modal && openBtn && closeBtn) {
    openBtn.addEventListener("click", () => {
      modal.showModal();
    });

    closeBtn.addEventListener("click", () => {
      modal.close();
    });
  }
});