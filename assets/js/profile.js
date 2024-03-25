document.addEventListener("DOMContentLoaded", () => {
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
  var previous = 0;
  function switchBotton(clickedIndex) {
    if (previous !== null && clickedIndex != previous) {
      dashIcons[previous].classList.remove("active");
    }

    dashIcons[clickedIndex].classList.add("active");
    previous = clickedIndex;

    // need to fix the problem
    // need to fix the problem
    // need to fix the problem
    // need to fix the problem
    // need to fix the problem
    if (clickedIndex == 1) {
      setTimeout(() => {
        const profiltBtn = document.getElementById("profile-btn");
        profiltBtn.addEventListener("click", () => {
          switchBotton(0);
        });
      }, 300);
    }
    // need to fix the problem
    // need to fix the problem
    // need to fix the problem
    // need to fix the problem
    // need to fix the problem
  }
});
