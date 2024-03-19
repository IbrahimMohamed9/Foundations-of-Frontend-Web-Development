document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
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
    ),
    dashPages = document.querySelectorAll(".content .screen"),
    dashIcons = document.querySelectorAll(
      ".page .sidebar ul li span.dash-icon"
    ),
    profileH1 = document.getElementById("p-h1");
  dashIcons.forEach((icon, index) => {
    icon.addEventListener("click", () => switchPage(icon, index));
  });

  var previous = 0;

  function switchPage(clickedIcon, clickedIndex) {
    if (previous !== null && clickedIndex != previous) {
      dashIcons[previous].classList.remove("active");
      dashPages[previous].classList.add("d-none");
    }

    clickedIcon.classList.add("active");
    dashPages[clickedIndex].classList.remove("d-none");
    previous = clickedIndex;
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
});
