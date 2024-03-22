document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;

  //logo animation
  const logo = document.querySelector(".main-header .logoo"),
    letters = Array.from(logo.children),
    letterQ = letters[4].children[0],
    leftDot = letters[3],
    rightDot = letters[5];
  letters.splice(3, 3);

  window.addEventListener("load", logoAnimation);
  logo.addEventListener("mouseenter", logoAnimation);
  logo.addEventListener("click", logoAnimation);

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
      }, 1950);
    });

    setTimeout(() => {
      rightDot.style.animation = "logo-right-dot-reverse 0.3s linear forwards";
    }, 1950);
    setTimeout(() => {
      leftDot.style.animation = "logo-left-dot-reverse 0.3s linear forwards";
    }, 1950);
  }

  //dots in main-title
  const mainTitles = document.querySelectorAll(".main-title");

  mainTitles.forEach((mainTitle) => {
    mainTitle.addEventListener("mouseenter", () => {
      mainTitleAnimation(mainTitle);
    });
    mainTitle.addEventListener("click", () => {
      mainTitleAnimation(mainTitle);
    });
  });
  function mainTitleAnimation(title) {
    title.classList.remove("unhovered");
    title.classList.add("hovered");
    setTimeout(() => {
      title.classList.remove("hovered");
      title.classList.add("unhovered");
    }, 1500);
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

  function toggleTheme() {
    if (body.classList.contains("dark-theme")) {
      body.classList.remove("dark-theme");
      localStorage.setItem("theme", "light");
    } else {
      body.classList.add("dark-theme");
      localStorage.setItem("theme", "dark");
    }
  }

  icon.addEventListener("click", toggleTheme);

  function applyThemeFromLocalStorage() {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      body.classList.add("dark-theme");
      icon.checked = true;
    } else {
      body.classList.remove("dark-theme");
      icon.checked = false;
    }
  }
  applyThemeFromLocalStorage();

  // header
  const headerMenu = document.querySelector(
      ".main-header .container button.menu"
    ),
    headerWords = document.querySelector(".main-header ul.tile-wrds"),
    globalModal = document.getElementById("headerModal"),
    currentPage = document.getElementById("current-page");

  headerMenu.addEventListener("click", () => {
    if (headerWords.classList.contains("active")) {
      closeNav();
    } else {
      openNav();
    }
  });
  globalModal.addEventListener("click", () => {
    closeNav();
  });
  if (currentPage && window.matchMedia("(max-width:1000px)").matches) {
    currentPage.addEventListener("click", closeNav);
  }

  function appearModal() {
    globalModal.classList.add("d-block");
    setTimeout(() => {
      globalModal.classList.add("active");
      body.classList.add("fix");
    }, 2);
  }
  function disappearModal() {
    globalModal.classList.remove("active");
    body.classList.remove("fix");
    setTimeout(() => {
      globalModal.classList.remove("d-block");
    }, 300);
  }

  function closeNav() {
    headerMenu.classList.remove("active");
    headerWords.classList.remove("active");
    disappearModal();

    setTimeout(() => {
      headerWords.style.display = "none";
    }, 300);
  }
  function openNav() {
    headerMenu.classList.add("active");

    headerWords.style.display = "grid";
    setTimeout(() => {
      headerWords.classList.add("active");
      appearModal();
    }, 5);
  }

  // Go Up
  const goUpBox = document.querySelector(".go-up-box");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 200) {
      goUpBox.classList.add("active");
    } else {
      goUpBox.classList.remove("active");
    }
  });
  goUpBox.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
});
