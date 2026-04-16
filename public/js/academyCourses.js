const container = document.getElementById("submenu-container");
const addBtn = document.getElementById("add-submenu");

if (addBtn && container) {
  addBtn.addEventListener("click", () => {
    const div = document.createElement("div");
    div.className = "submenu-row";

    div.innerHTML = `
      <div class="submenu-fields">
        <input type="text" name="academy_course_lang[]" placeholder="Lang (am/en/ru)" />
        <input type="text" name="academy_course_title[]" placeholder="Course title" />
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
