const container = document.getElementById("item-container");
const addBtn = document.getElementById("add-item");

if (addBtn && container) {
  addBtn.addEventListener("click", () => {
    const div = document.createElement("div");
    div.className = "submenu-row";

    div.innerHTML = `
      <div class="submenu-fields">
        <input type="text" name="item_name[]" placeholder="Item name" />
      </div>

      <div class="submenu-actions">
        <button type="button" class="remove-btn">✖</button>
      </div>
    `;

    container.appendChild(div);
  });

  container.addEventListener("click", (e) => {
    const btn = e.target.closest(".remove-btn");
    if (!btn) return;

    const row = btn.closest(".submenu-row");
    if (row) row.remove();
  });
}
