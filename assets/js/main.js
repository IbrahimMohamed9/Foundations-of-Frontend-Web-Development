const body = document.body;

//logo animation
const logo = document.querySelector(".main-header .logoo");
const letters = Array.from(logo.children);
const letterQ = letters[4].children[0];
const leftDot = letters[3];
const rightDot = letters[5];
letters.splice(3, 3);

window.addEventListener("load", logoAnimation);
logo.addEventListener("mouseenter", logoAnimation);

function logoAnimation() {
  leftDot.style.animation =
    "logo-dots var(--dot-animation-duration) linear forwards";
  rightDot.style.animation =
    "logo-dots var(--dot-animation-duration) linear forwards";
  setTimeout(() => {
    letterQ.style.animation = "q-rotate-reverse 0.5s linear forwards";
  }, 1250);
  letterQ.style.animation = "q-rotate 0.5s linear 0.6s forwards";

  letters.forEach((letter) => {
    letter.style.animation = "move-letter 0.5s linear 0.25s forwards";
    setTimeout(() => {
      letter.style.animation = "move-letter-reverse 0.5s  linear forwards";
    }, 1900);
  });

  setTimeout(() => {
    rightDot.style.animation = "logo-right-dot-reverse 0.3s linear forwards";
  }, 1800);
  setTimeout(() => {
    leftDot.style.animation = "logo-left-dot-reverse 0.3s linear forwards";
  }, 1800);
}

//dots in main-title
const mainTitles = document.querySelectorAll(".main-title");

mainTitles.forEach((mainTitle) => {
  mainTitle.addEventListener("mouseenter", () => {
    mainTitleAnimation(mainTitle);
  });
});
function mainTitleAnimation(title) {
  title.classList.add("hovered");
  setTimeout(() => {
    title.classList.remove("hovered");
    title.classList.add("unhovered");
  }, 800);
}
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
    if (body.classList.contains("dark-theme")) {
      body.classList.remove("dark-theme");
    } else {
      body.classList.add("dark-theme");
    }
  });
} else {
  console.error("The element with ID 'switch' was not found.");
}
