const barIcon = document.querySelector(".dash .main-header .bar .bar-icon");
if (barIcon) {
  barIcon.addEventListener("click", function () {
    if (body.classList.contains("sidebar-250")) {
      body.classList.remove("sidebar-250");
      body.classList.add("sidebar-58");
      hideMobileSpans.forEach((span) => {
        span.classList.add("d-none");
      });
    } else {
      body.classList.remove("sidebar-58");
      body.classList.add("sidebar-250");
      hideMobileSpans.forEach((span) => {
        span.classList.remove("d-none");
      });
    }
  });
}

const hideMobileSpans = document.querySelectorAll(
  ".page .sidebar ul li span i + span.hide-mobile"
);

const dashPages = document.querySelectorAll(".content .screen");
const dashIcons = document.querySelectorAll(
  ".page .sidebar ul li span.dash-icon"
);
const profileH1 = document.getElementById("p-h1");
dashIcons.forEach((icon, index) => {
  icon.addEventListener("click", () => switchPage(icon, index));
});
function switchPage(clickedIcon, clickedIndex) {
  dashIcons.forEach((icon) => {
    if (icon != clickedIcon) {
      icon.classList.remove("active");
    } else {
      icon.classList.add("active");
    }
  });
  let l = dashPages.length;
  for (let i = 0; i < l; i++) {
    if (i != clickedIndex) {
      dashPages[i].classList.add("d-none");
    } else {
      dashPages[i].classList.remove("d-none");
    }
  }
  switch (clickedIndex) {
    case 0:
      profileH1.innerHTML = "Profile";
      break;
    case 1:
      profileH1.innerHTML = "Dashbord";
      break;
    case 2:
      profileH1.innerHTML = "Settings";
      break;
    case 3:
      profileH1.innerHTML = "Projects";
      break;
    case 4:
      profileH1.innerHTML = "Friends";
      break;
    case 5:
      profileH1.innerHTML = "Files";
      break;
    default:
      profileH1.innerHTML = "Add title in switch";
  }
}
