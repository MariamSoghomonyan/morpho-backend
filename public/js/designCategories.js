document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("tabs-container");
  const addTabBtn = document.getElementById("add-tab");

  let tabIndex = container.querySelectorAll(".tab-block").length;

  addTabBtn.addEventListener("click", () => {
    const tab = document.createElement("div");

    tab.className = "submenu-row tab-block";
    tab.dataset.index = tabIndex;

    tab.innerHTML = `
      <div class="submenu-fields">
        <input type="text" name="tabs[${tabIndex}][label]" placeholder="Tab label" />
      </div>

      <div class="submenu-actions">
        <button type="button" class="remove-btn tab-remove">✖</button>
      </div>

      <div class="items-box"></div>

      <button type="button" class="submit submenu add-item">
        Add item
      </button>
    `;

    container.appendChild(tab);
    tabIndex++;
  });

  container.addEventListener("click", (e) => {
    const tab = e.target.closest(".tab-block");

    if (e.target.closest(".tab-remove")) {
      tab?.remove();
      return;
    }

    if (e.target.closest(".add-item")) {
      if (!tab) return;

      const box = tab.querySelector(".items-box");
      const tIndex = tab.dataset.index;
      const iIndex = box.children.length;

      const row = document.createElement("div");

      row.className = "submenu-row";

      row.innerHTML = `
        <div class="submenu-fields">
          <input type="text"
            name="tabs[${tIndex}][items][${iIndex}][title]"
            placeholder="Title" />

          <input type="text"
            name="tabs[${tIndex}][items][${iIndex}][descr]"
            placeholder="Description" />
        </div>

        <div class="submenu-actions">
          <button type="button" class="remove-btn">✖</button>
        </div>
      `;

      box.appendChild(row);
    }
    
    if (e.target.closest(".remove-btn") && !e.target.closest(".tab-remove")) {
      e.target.closest(".submenu-row")?.remove();
    }
  });
});
