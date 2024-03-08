//dots in main-title
const mainTitles = document.querySelectorAll(".main-title");

mainTitles.forEach((mainTitle) => {
  mainTitle.addEventListener("mouseenter", () => {
    mainTitle.style.setProperty(
      "--left-animation",
      "left-move-reverse var(--animation-duration) linear forwards"
    );
    mainTitle.style.setProperty(
      "--right-animation",
      "right-move-reverse var(--animation-duration) linear forwards"
    );
  });
  mainTitle.addEventListener("mouseleave", () => {
    mainTitle.style.removeProperty("--before-color");
  });
});

//change heart in hover header
const heartIcon = document.querySelector(".heart.fa-regular");

heartIcon.addEventListener("mouseenter", () => {
  heartIcon.classList.remove("fa-regular");
  heartIcon.classList.add("fa-solid");
});

heartIcon.addEventListener("mouseleave", () => {
  heartIcon.classList.remove("fa-solid");
  heartIcon.classList.add("fa-regular");
});

//dark theme
const icon = document.getElementById("switch");
if (icon) {
  icon.addEventListener("click", function () {
    const body = document.body;
    if (body.classList.contains("dark-theme")) {
      body.classList.remove("dark-theme");
    } else {
      body.classList.add("dark-theme");
    }
  });
} else {
  console.error("The element with ID 'switch' was not found.");
}
