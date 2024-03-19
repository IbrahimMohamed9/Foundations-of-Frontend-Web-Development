document.addEventListener("DOMContentLoaded", () => {
  const signComponents = Array.from(
    document.querySelectorAll(".sign-component")
  );
  container = signComponents.shift();
  signComponents.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      switch (index) {
        case 0:
          container.style.transform = "rotateY(0deg)";
          break;
        case 1:
          container.style.transform = "rotateY(-180deg)";
          break;
        case 2:
          container.classList.remove("right-panel-active");
          break;
        case 3:
          container.classList.add("right-panel-active");
          break;
        default:
          console.log("You add new sign-btn without event");
          break;
      }
    });
  });
});
