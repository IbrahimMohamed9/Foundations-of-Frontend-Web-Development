const textarea = document.getElementById("message");
const fields = document.querySelectorAll(".form-control");
const label = document.getElementById("txtar-la");
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
  // console.log(inputs[0]);
  inputs[0].addEventListener("focus", (event) => {
    event.target.classList.add("active", "delay");
  });
  inputs[0].addEventListener("blur", (event) => {
    if (event.target.value == "") {
      event.target.classList.remove("active");
      setTimeout(() => {
        event.target.classList.remove("delay");
      }, 500);
    }
  });
});
