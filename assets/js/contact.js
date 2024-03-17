const textarea = document.getElementById("message");
const inputs = document.querySelectorAll(".form-control input");
const label = document.getElementById("txtar-la");
if (textarea) {
  textarea.addEventListener("focus", () => {
    label.classList.add("active");
    textarea.classList.add("active");
  });

  textarea.addEventListener("blur", () => {
    if (textarea.value == "") {
      label.classList.remove("active");
      textarea.classList.remove("active");
    }
  });
}
inputs.forEach((input) => {
  input.addEventListener("focus", () => {
    input.classList.add("active");
    console.log(inputs);
  });

  input.addEventListener("blur", () => {
    if (input.value === "") {
      input.classList.remove("active");
      console.log(inputs);
    }
  });
});
