const textarea = document.getElementById("message");
const label = document.getElementById("txtar-la");

textarea.addEventListener("focus", () => {
  label.classList.add("active");
});

textarea.addEventListener("blur", () => {
  if (!textarea.value.trim()) {
    label.classList.remove("active");
  }
});

textarea.addEventListener("input", () => {
  if (textarea.validity.valid) {
    label.classList.add("active");
  } else {
    label.classList.remove("active");
  }
});
