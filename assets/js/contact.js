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
      if (textarea.value.trim() == "") {
        label.classList.remove("active");
        textarea.classList.remove("active");
        textarea.value = textarea.value.trim();
        setTimeout(() => {
          label.classList.remove("delay");
        }, 500);
      }
    });
  }

  fields.forEach((field) => {
    inputs = field.children;
    fieldAnimation(inputs[0]);
  });

  function fieldAnimation(field) {
    field.addEventListener("focus", (input) => {
      input.target.classList.add("active", "delay");
    });
    field.addEventListener("blur", (input) => {
      if (input.target.value.trim() == "") {
        input.target.classList.remove("active");
        input.target.value = input.target.value.trim();
        setTimeout(() => {
          input.target.classList.remove("delay");
        }, 500);
      }
    });
  }
});
