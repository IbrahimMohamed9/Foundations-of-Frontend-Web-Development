document.addEventListener("DOMContentLoaded", () => {
  var previous = 0;

  const body = document.body,
    barIcon = document.querySelector(".sidebar .sidebar-control"),
    sidebarArrow = document.querySelector(
      ".sidebar .sidebar-control .sidebar-icon"
    ),
    dashIcons = document.querySelectorAll(".sidebar ul li a.dash-icon"),
    sidebar = document.querySelector(".content > .sidebar"),
    globalModal = document.querySelector(".modal.animation");

  if (window.matchMedia("(max-width: 500px)").matches) {
    body.classList.remove("sidebar-250");
    body.classList.add("sidebar-58");
    sidebarArrow.classList.remove("fa-chevron-left");
    sidebarArrow.classList.add("fa-chevron-right");
  }

  globalModal.addEventListener("click", () => {
    disappearModal();
    closeNav();
  });
  barIcon.addEventListener("click", () => {
    if (body.classList.contains("sidebar-250")) {
      if (window.matchMedia("(max-width: 500px)").matches) {
        disappearModal();
      }
      closeNav();
    } else {
      openNav();
      if (window.matchMedia("(max-width: 500px)").matches) {
        appearModal();
      }
    }
  });

  function closeNav() {
    body.classList.remove("sidebar-250");
    body.classList.add("sidebar-58");
    sidebarArrow.classList.remove("fa-chevron-left");
    sidebarArrow.classList.add("fa-chevron-right");
  }
  function openNav() {
    body.classList.remove("sidebar-58");
    body.classList.add("sidebar-250");
    sidebarArrow.classList.remove("fa-chevron-right");
    sidebarArrow.classList.add("fa-chevron-left");
  }
  function appearModal() {
    sidebar.style.zIndex = 6000;
    globalModal.classList.add("d-block");
    setTimeout(() => {
      globalModal.classList.add("active");
      body.classList.add("fix-2");
    }, 2);
  }
  function disappearModal() {
    globalModal.classList.remove("active");
    body.classList.remove("fix-2");

    setTimeout(() => {
      globalModal.classList.remove("d-block");
      sidebar.style.zIndex = 60;
    }, 300);
  }

  //dashboard
  dashIcons.forEach((icon, index) => {
    icon.addEventListener("click", () => switchBotton(index));
  });

  function switchBotton(clickedIndex) {
    if (previous !== null && clickedIndex != previous) {
      dashIcons[previous].classList.remove("active");
    }

    dashIcons[clickedIndex].classList.add("active");
    previous = clickedIndex;

    if (clickedIndex == 1) {
      const profileBtn = document.getElementById("profile-btn");
      if (profileBtn) {
        profileBtn.addEventListener("click", () => {
          // document.getElementById("profile-btn").addEventListener("click", () => {
          switchBotton(0);
        });
      }
    }
  }

  window.onhashchange = () => {
    switch (true) {
      case window.location.hash === "#profile":
        switchBotton(0);
        break;
      case window.location.hash === "#dashboard":
        switchBotton(1);
        break;
      case window.location.hash === "#settings":
        switchBotton(2);
        break;
      case window.location.hash === "#projects":
        switchBotton(3);
        break;
      case window.location.hash === "#friends":
        switchBotton(4);
        break;
      case window.location.hash === "#files":
        switchBotton(5);
        break;
      default:
        console.log("New Section added");
        alert("New Section added");
    }
  };

  window.onload = () => {
    window.dispatchEvent(new Event("hashchange"));
  };
});
