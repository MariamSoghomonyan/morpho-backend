document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("items-container");
  const addBtn = document.getElementById("add-item");

  if (!container || !addBtn) return;

  let itemIndex = container.querySelectorAll(".submenu-row").length;

  addBtn.addEventListener("click", () => {
    const row = document.createElement("div");

    row.className = "submenu-row";
    row.dataset.index = itemIndex;

    row.innerHTML = `
      <div class="submenu-fields">
        <input 
          type="file" 
          name="item_image" 
          class="image-input" 
          accept="image/*" 
        />

        <img class="image-preview" style="width:80px; display:none;" />
      </div>

      <div class="submenu-actions">
        <button type="button" class="remove-btn">✖</button>
      </div>
    `;

    container.appendChild(row);
    itemIndex++;
  });

  container.addEventListener("click", (e) => {
    if (e.target.closest(".remove-btn")) {
      e.target.closest(".submenu-row")?.remove();
    }
  });

  container.addEventListener("change", (e) => {
    if (!e.target.classList.contains("image-input")) return;

    const file = e.target.files[0];
    const row = e.target.closest(".submenu-row");
    const img = row?.querySelector(".image-preview");

    if (file && img) {
      const reader = new FileReader();

      reader.onload = () => {
        img.src = reader.result;
        img.style.display = "block";
      };

      reader.readAsDataURL(file);
    }
  });
});
