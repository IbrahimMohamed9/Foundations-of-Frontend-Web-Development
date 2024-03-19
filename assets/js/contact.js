document.addEventListener("DOMContentLoaded", () => {
  const textarea = document.getElementById("message"),
    fields = document.querySelectorAll(".form-control"),
    label = document.getElementById("txtar-la");
  if (textarea) {
    textarea.addEventListener("focus", () => {
      label.classList.add("active", "delay");
      textarea.classList.add("active");
    });

    textarea.addEventListener("blur", () => {
      if (textarea.value == "") {
        label.classList.remove("active");
        textarea.classList.remove("active");
        setTimeout(() => {
          label.classList.remove("delay");
        }, 500);
      }
    });
  }

  fields.forEach((field) => {
    inputs = field.children;
    inputs[0].addEventListener("focus", (input) => {
      input.target.classList.add("active", "delay");
    });
    inputs[0].addEventListener("blur", (input) => {
      if (input.target.value == "") {
        input.target.classList.remove("active");
        setTimeout(() => {
          input.target.classList.remove("delay");
        }, 500);
      }
    });
  });
});
