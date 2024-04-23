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

  Utils.formAnimation();

  document.getElementById("sign_up").addEventListener("click", () => {
    Utils.submit("sign_up_form", "users/add_user.php", false, "sign_up", () => {
      Utils.resetFormAnimation();
    });
  });

  document.getElementById("sign_in").addEventListener("click", () => {
    UserService.signIn("sign_in_form");
  });
});
