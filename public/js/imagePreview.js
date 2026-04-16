image.addEventListener("change", function (event) {
  const file = event.target.files[0];

  if (!file) {
    preview.style.display = "none";
    preview.src = "";
    return;
  }

  preview.src = URL.createObjectURL(file);
  preview.style.display = "block";
});
