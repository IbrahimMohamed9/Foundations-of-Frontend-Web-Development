document.addEventListener("DOMContentLoaded", function () {
  const barIcon = document.querySelector(".dash .main-header .bar .bar-icon");
  const body = document.body;
  const hideMobileSpans = document.querySelectorAll(
    ".page .sidebar ul li span i + span.hide-mobile"
  );

  barIcon.addEventListener("click", function () {
    if (body.classList.contains("sidebar-250")) {
      body.classList.remove("sidebar-250");
      body.classList.add("sidebar-58");
      hideMobileSpans.forEach((span) => {
        span.style.display = "none";
      });
    } else {
      body.classList.remove("sidebar-58");
      body.classList.add("sidebar-250");
      hideMobileSpans.forEach((span) => {
        span.style.display = "";
      });
    }
  });

  const sidebarElements = document.querySelectorAll(".page .sidebar.p-20");
  sidebarElements.forEach((element) => {
    element.classList.remove("p-20");
    element.classList.add("p-10");
  });
});

const profilePage = document.querySelector(".content .profile-page");
const projectsPage = document.querySelector(".content .projects-page");
const settingsPage = document.querySelector(".content .settings-page");
const friendsPage = document.querySelector(".content .friends-page");
const filesPage = document.querySelector(".content .files-page");
const dashboardPage = document.querySelector(".content .wrapper");

const profileIcon = document.getElementById("profile");
const settingsIcon = document.getElementById("settings");
const projectsIcon = document.getElementById("projects");
const friendsIcon = document.getElementById("friends");
const filesIcon = document.getElementById("files");
const dashboardIcon = document.getElementById("dashboard");

const profileH1 = document.getElementById("p-h1");

function switchPage(clickedIcon, targetPage, h1Content) {
  targetPage.classList.remove("d-none");
  clickedIcon.classList.add("active");
  profileH1.innerHTML = h1Content;

  const pages = [
    profilePage,
    projectsPage,
    settingsPage,
    friendsPage,
    filesPage,
    dashboardPage,
  ];

  const icons = [
    profileIcon,
    settingsIcon,
    projectsIcon,
    friendsIcon,
    filesIcon,
    dashboardIcon,
  ];

  for (const page of pages) {
    if (page !== targetPage) {
      page.classList.add("d-none");
    }
  }

  for (const icon of icons) {
    if (icon !== clickedIcon) {
      icon.classList.remove("active");
    }
  }
}

profileIcon.addEventListener("click", () =>
  switchPage(profileIcon, profilePage, "Profile")
);
settingsIcon.addEventListener("click", () =>
  switchPage(settingsIcon, settingsPage, "Settings")
);
projectsIcon.addEventListener("click", () =>
  switchPage(projectsIcon, projectsPage, "Projects")
);
friendsIcon.addEventListener("click", () =>
  switchPage(friendsIcon, friendsPage, "Friends")
);
filesIcon.addEventListener("click", () =>
  switchPage(filesIcon, filesPage, "Files")
);
dashboardIcon.addEventListener("click", () =>
  switchPage(dashboardIcon, dashboardPage, "Dashboard")
);
