const container = document.getElementById("steps-container");
const addBtn = document.getElementById("add-step");

if (addBtn && container) {
  addBtn.addEventListener("click", () => {
    const div = document.createElement("div");

    div.className = "submenu-row";

    div.innerHTML = `
      <div class="submenu-fields">
        <input type="text" name="step_number[]" placeholder="Number" />
        <input type="text" name="step_title[]" placeholder="Title" />
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

    btn.closest(".submenu-row").remove();
  });
}
