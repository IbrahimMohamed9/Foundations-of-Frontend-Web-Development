const signUpButton = document.getElementById("signUp");
const signInButton = document.getElementById("signIn");
const container = document.getElementById("container");
const notSpan = document.getElementById("have-not");
const haveSpan = document.getElementById("have");

signUpButton.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});

signInButton.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});

notSpan.addEventListener("click", () => {
  container.style.transform = "rotateY(-180deg)";
});

haveSpan.addEventListener("click", () => {
  container.style.transform = "rotateY(0deg)";
});
