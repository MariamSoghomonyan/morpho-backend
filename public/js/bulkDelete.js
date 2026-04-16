document.addEventListener("DOMContentLoaded", function () {
  const selectAll = document.getElementById("select-all");
  const bulkForm = document.getElementById("bulk-delete-form");
  const deleteBtn = document.getElementById("delete-btn");
  const hiddenInput = document.getElementById("selected-ids");

  const checkboxes = document.querySelectorAll(".row-checkbox");

  function updateUI() {
    const allCheckboxes = document.querySelectorAll(".row-checkbox");
    const checked = document.querySelectorAll(".row-checkbox:checked");
    const count = checked.length;

    if (count > 0) {
      deleteBtn.style.display = "inline-block";

      deleteBtn.textContent =
        count === 1
          ? `Delete ${count} selected item`
          : `Delete ${count} selected items`;

      const ids = Array.from(checked).map((cb) => cb.value);
      hiddenInput.value = ids.join(",");

      selectAll.checked = allCheckboxes.length === count;
    } else {
      deleteBtn.style.display = "none";
      selectAll.checked = false;
    }
  }

  selectAll.addEventListener("change", function () {
    const allCheckboxes = document.querySelectorAll(".row-checkbox");

    allCheckboxes.forEach((cb) => {
      cb.checked = this.checked;
    });

    updateUI();
  });

  checkboxes.forEach((cb) => {
    cb.addEventListener("change", updateUI);
  });

  bulkForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const checked = document.querySelectorAll(".row-checkbox:checked");

    if (checked.length === 0) return;

    if (bulkForm.dataset.submitted === "true") return;
    bulkForm.dataset.submitted = "true";

    const confirmed = confirm("Are you sure you want to remove selected data?");

    if (!confirmed) {
      bulkForm.dataset.submitted = "false";
      return;
    }

    bulkForm.submit();
  });
});
