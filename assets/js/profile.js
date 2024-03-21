document.addEventListener("DOMContentLoaded", () => {
  const body = document.body,
    barIcon = document.querySelector(".sidebar .sidebar-control"),
    sidebarArrow = document.querySelector(
      ".sidebar .sidebar-control .sidebar-icon"
    ),
    sidebarSpans = document.querySelectorAll(" .sidebar ul li a i + span"),
    dashIcons = document.querySelectorAll(" .sidebar ul li a.dash-icon");

  barIcon.addEventListener("click", function () {
    if (body.classList.contains("sidebar-250")) {
      body.classList.remove("sidebar-250");
      body.classList.add("sidebar-58");
      sidebarSpans.forEach((span) => {
        span.classList.add("d-none");
      });
      sidebarArrow.classList.remove("fa-chevron-left");
      sidebarArrow.classList.add("fa-chevron-right");
    } else {
      body.classList.remove("sidebar-58");
      body.classList.add("sidebar-250");
      sidebarSpans.forEach((span) => {
        span.classList.remove("d-none");
      });
      sidebarArrow.classList.remove("fa-chevron-right");
      sidebarArrow.classList.add("fa-chevron-left");
    }
  });

  dashIcons.forEach((icon, index) => {
    icon.addEventListener("click", () => switchBotton(icon, index));
  });

  var previous = 0;

  function switchBotton(clickedIcon, clickedIndex) {
    if (previous !== null && clickedIndex != previous) {
      dashIcons[previous].classList.remove("active");
    }

    clickedIcon.classList.add("active");
    previous = clickedIndex;
  }
});
