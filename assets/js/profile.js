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

  let previous;
  //dashboard
  function switchButton(clickedIndex) {
    if (
      previous !== null &&
      clickedIndex !== previous &&
      previous !== undefined
    ) {
      dashIcons[previous].classList.remove("active");
    }

    dashIcons[clickedIndex].classList.add("active");
    previous = clickedIndex;
  }

  var app = $.spapp({
    defaultView: "#profile",
    templateDir: "./profilePages/",
  });

  app.route({
    view: "profile",
    load: "profile.html",
    onCreate: function () {
      loadProfile("../assets/json/profile.json");
    },
    onReady: function () {
      switchButton(0);
    },
  });
  app.route({
    view: "dashboard",
    load: "dashboard.html",
    onCreate: function () {
      loadDashboard("../assets/json/dashboard.json");
    },
    onReady: function () {
      switchButton(1);
    },
  });
  app.route({
    view: "settings",
    load: "settings.html",
    onCreate: function () {
      loadSettings("../assets/json/profile.json");
    },
    onReady: function () {
      switchButton(2);
    },
  });
  app.route({
    view: "projects",
    load: "projects.html",
    onCreate: function () {
      loadProjects("../assets/json/projects.json");
    },
    onReady: function () {
      switchButton(3);
    },
  });
  app.route({
    view: "friends",
    load: "friends.html",
    onCreate: function () {
      loadFriends("../assets/json/friends.json");
    },
    onReady: function () {
      switchButton(4);
    },
  });
  app.route({
    view: "tables",
    load: "tables.html",
    onCreate: function () {
      ItemService.loadTable("tbl_packages");
      ItemService.loadTable("tbl_cars");
      ItemService.loadTable("tbl_hotels");
      ArticleService.loadTable("tbl_articles");
    },
    onReady: function () {
      switchButton(5);
      document.getElementById("add-package").addEventListener("click", () => {
        ItemService.addItemModal("package");
      });
      document.getElementById("add-car").addEventListener("click", () => {
        ItemService.addItemModal("car");
      });
      document.getElementById("add-hotel").addEventListener("click", () => {
        ItemService.addItemModal("hotel");
      });
      document.getElementById("add-article").addEventListener("click", () => {
        ArticleService.addArticleModal();
      });
    },
  });
  app.route({
    view: "files",
    load: "files.html",
    onCreate: function () {},
    onReady: function () {
      switchButton(6);
    },
  });

  app.run();

  function loadProfile(src) {
    fetch(src)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const content = `
            <div class="avatar-box txt-c p-20">
              <img class="rad-half mb-10" src="${data.imgSrc}" alt="Profile Img" />
              <h3 class="m-0">${data.name}</h3>
              <p class="c-grey mt-10">Level ${data.level}</p>
              <div class="level rad-6 bg-eee p-relative">
                <span style="width: ${data.level}%"></span>
              </div>
              <div class="rating mt-10 mb-10">
                <i class="fa-solid fa-star c-orange fs-13"></i>
                <i class="fa-solid fa-star c-orange fs-13"></i>
                <i class="fa-solid fa-star c-orange fs-13"></i>
                <i class="fa-solid fa-star c-orange fs-13"></i>
                <i class="fa-solid fa-star c-orange fs-13"></i>
              </div>
              <p class="c-grey m-0 fs-13">${data.ratings} Rating</p>
            </div>
            <div class="info-box w-full txt-c-mobile">
              <!-- Start Information Row -->
              <div class="box p-20 d-flex align-center">
                <h4 class="c-grey fs-15 m-0 w-full">General Information</h4>
                <div class="fs-14">
                  <span class="c-grey">Full Name</span>
                  <span>${data.name}</span>
                </div>
                <div class="fs-14">
                  <span class="c-grey">Gender:</span>
                  <span>${data.gender}</span>
                </div>
                <div class="fs-14">
                  <span class="c-grey">Nationality:</span>
                  <span>${data.nationality}</span>
                </div>
              </div>
              <!-- End Information Row -->
              <!-- Start Information Row -->
              <div class="box p-20 d-flex align-center">
                <h4 class="c-grey w-full fs-15 m-0">Personal Information</h4>
                <div class="fs-14 d-flex align-center center-mobile">
                  <span class="c-grey">Email:</span>
                  <span class="email">&nbsp;${data.email}</span>
                </div>
                <div class="fs-14">
                  <span class="c-grey">Phone:</span>
                  <span>${data.phone}</span>
                </div>
                <div class="fs-14">
                  <span class="c-grey">Date Of Birth:</span>
                  <span>${data.DOB}</span>
                </div>
                <div class="fs-14"></div>
              </div>
              <!-- End Information Row -->
              <!-- Start Information Row -->
              <div class="box p-20 d-flex align-center">
                <h4 class="c-grey w-full fs-15 m-0">Job Information</h4>
                <div class="fs-14">
                  <span class="c-grey">Title:</span>
                  <span>${data.jobTitle}</span>
                </div>
                <div class="fs-14">
                  <span class="c-grey">Country:</span>
                  <span>${data.country}</span>
                </div>
                <div class="fs-14">
                  <span class="c-grey">Years Of Experience:</span>
                  <span>${data.YOE}</span>
                </div>
                <div class="fs-14"></div>
              </div>
              <!-- End Information Row -->
            </div>
          `;
        const skills = data.skills.split(" ");
        let skillsList = "";
        for (let i = 0; i < skills.length; i += 3) {
          skillsList += "<li>";
          for (let j = 0; j < 3 && i + j < skills.length; j++) {
            skillsList += `<span>${skills[i + j]}</span>`;
          }
          skillsList += "</li>";
        }

        const activitiesList = data.activities
          .map(
            (activity) => `
            <div class="activity d-flex align-center txt-c-mobile">
              <img src="${activity.imgSrc}" alt="" />
              <div class="info">
                <span class="d-block mb-10">${activity.name}</span>
                <span class="c-grey">${activity.desc}</span>
              </div>
              <div class="date">
                <span class="d-block mb-10">${activity.time}</span>
                <span class="c-grey">${activity.date}</span>
              </div>
            </div>
          `
          )
          .join("");
        document.querySelector(".other-data .skills-card ul").innerHTML +=
          skillsList;
        document.querySelector(".other-data .activities").innerHTML +=
          activitiesList;
        document.querySelector(".screen .overview").innerHTML = content;
      })
      .catch((error) => {
        console.error("Error fetching Profile data:", error);
      });
  }

  function loadDashboard(src) {
    fetch(src)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const welcomWidget = `
          <div class="intro p-20 d-flex space-between bg-third pl-10-f pr-10-f">
            <div>
              <h2 class="m-0">Welcom</h2>
              <p class="c-grey mt-5 txt-c-f">${data.name}</p>
            </div>
            <img src="../assets/images/profile/welcome.png" alt="" />
          </div>
          <img src="${data.imgSrc}" alt="Profile image" class="avatar" />
          <div class="body txt-c d-flex p-20 mt-20 mb-20 bg-fourth pl-10-f pr-10-f">
            <div class="fs-13-f">
              ${data.name} ${data.surname}
              <span class="d-block c-grey fs-14 mt-10 fs-10-f">${data.jobTitle}</span>
            </div>
            <div class="fs-13-f">
              ${data.projects}
              <span class="d-block c-grey fs-14 fs-10-f mt-10">Projects</span>
            </div>
            <div class="fs-13-f">
              KM ${data.earned}
              <span class="d-block c-grey fs-14 fs-10-f mt-10">Earned</span>
            </div>
          </div>
          <a
            href="#profile"
            id="profile-btn"
            class="d-block fs-15 rad-6 bg-main-color c-white btn-position w-fit btn-shape"
          >
            Profile
          </a>
        `;
        let targetsWidget = "",
          ticketsWidget = "",
          progressWidget = "",
          remindersWidget = "",
          tableRows = "";

        data.targets.forEach((target) => {
          const achieved = Number(target.achieved.replace(/,/g, "")),
            goal = Number(target.goal.replace(/,/g, "")),
            percentageAchieved = ((achieved / goal) * 100).toFixed(0);

          targetsWidget += `
            <div class="target-row mb-20 mb-25-f d-flex align-center">
              <div class="icon center-flex">
                <i class="fa-solid ${target.icon} fa-lg"></i>
              </div>
              <div class="details">
                <span class="fs-14 c-grey">${target.name}</span>
                <span class="d-block p-relative mb-10 fw-bold">${target.goal}</span>
                <div class="progress rad-10 p-relative">
                  <span style="width: ${percentageAchieved}%" class="rad-10">
                    <span class="rad-6 fs-13 c-white fw-bold">${percentageAchieved}%</span></span
                  >
                </div>
              </div>
            </div>
          `;
        });

        data.tickets.forEach((ticket) => {
          ticketsWidget += `
            <div class="box border-ccc p-20 p-10-f pr-10-f fs-13 c-grey">
              <i class="fa-solid ${ticket.icon} fa-2x mb-10"></i>
              <span class="d-block c-main-font fw-bold fs-25 mb-5">${ticket.achieved}</span>
              ${ticket.name}
            </div>
          `;
        });

        data.progrProjs.forEach((progrProj) => {
          progressWidget += `
          <li class="mt-25 d-flex align-center ${progrProj.status}">${progrProj.part}</li>
          `;
        });

        data.reminders.forEach((reminder) => {
          remindersWidget += `
            <li class="d-flex align-center mt-15">
              <span class="key mr-15 d-block rad-half"></span>
              <div class="pl-15">
                <p class="fs-14 fw-bold mt-0 mb-5">${reminder.title}</p>
                <span class="fs-13 c-grey">${reminder.date} - ${reminder.time}</span>
              </div>
            </li>
          `;
        });

        data.tableRows.forEach((row) => {
          tableRows += `
              <tr>
                <td>${row.name}</td>
                <td>${row.finish}</td>
                <td>${row.client}</td>
                <td>${row.price}</td>
                <td class="team">
                  ${row.team
                    .map((image) => `<img src="${image}" alt="person image" />`)
                    .join("")}
                </td>
                <td>
                  <span class="label btn-shape ${row.background} c-white">${
            row.status
          }</span>
                </td>
              </tr>
            `;
        });
        document.querySelector(".screen.wrapper .welcome").innerHTML =
          welcomWidget;
        document.querySelector(".screen.wrapper .targets").innerHTML +=
          targetsWidget;
        document.querySelector(
          ".screen.wrapper .tickets .tickets-wrapper"
        ).innerHTML = ticketsWidget;
        document.querySelector(".screen.wrapper .last-project ul").innerHTML =
          progressWidget;
        document.querySelector(".screen.wrapper .reminders ul").innerHTML =
          remindersWidget;
        document.querySelector(
          ".screen.wrapper .table-holder .table-container table tbody"
        ).innerHTML = tableRows;

        document.getElementById("profile-btn").addEventListener("click", () => {
          switchButton(0);
        });
      })
      .catch((error) => {
        console.error("Error fetching Dashboard data:", error);
      });
  }

  function loadSettings(src) {
    fetch(src)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        document.querySelector(".settings-page .email").value = data.email;
      })
      .catch((error) => {
        console.error("Error fetching Settings data:", error);
      });
  }

  function loadProjects(src) {
    fetch(src)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        let content = "";
        data.forEach((project) => {
          content += `
            <div class="project bg-fourth p-20 rad-6 p-relative">
              <span class="date fs-13 c-grey">${project.date}</span>
              <h4 class="m-0">${project.name}</h4>
              <p class="c-grey mt-10 mb-10 fs-14">${project.description}</p>
              <div class="team">`;

          project.team.forEach((teamMember) => {
            content += `<a href="#"><img src="${teamMember}" alt="" /></a>`;
          });

          content += `
              </div>
              <div class="do d-flex">`;

          project.tasks.forEach((task) => {
            content += `<span class="fs-13 rad-6 bg-eee">${task}</span>`;
          });

          content += `
              </div>
              <div class="info between-flex">
                <div class="prog bg-eee">
                  <span class="bg-red" style="width: ${project.progress}%"></span>
                </div>
                <div class="fs-14 c-grey">
                  <i class="fa-solid fa-dollar-sign"></i>
                  ${project.price}
                </div>
              </div>
            </div>`;
        });

        document.querySelector(".screen.projects-page").innerHTML = content;
      })
      .catch((error) => {
        console.error("Error fetching projects data:", error);
      });
  }

  function loadFriends(src) {
    fetch(src)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        let content = "";

        data.forEach((friend) => {
          content += `
          <div class="friend bg-fourth rad-6 p-20 p-relative">
          <div class="contact">
            <i class="fa-solid fa-phone"></i>
            <i class="fa-regular fa-envelope"></i>
          </div>
          <div class="txt-c">
            <img
              class="rad-half mt-10 mb-10 w-100 h-100"
              src="${friend.imgSrc}"
              alt=""
            />
            <h4 class="m-0">${friend.name}</h4>
            <p class="c-grey fs-13 mt-5 mb-0">${friend.jobTitle}</p>
          </div>
          <div class="icons fs-14 p-relative">
            <div class="mb-10">
              <i class="fa-regular fa-face-smile fa-fw"></i>
              <span>${friend.friends} Friends</span>
            </div>
            <div class="mb-10">
              <i class="fa-solid fa-code-commit fa-fw"></i>
              <span>${friend.projects} Projects</span>
            </div>
            <div>
              <i class="fa-regular fa-newspaper fa-fw"></i>
              <span>${friend.articles} Articles</span>
            </div>
          </div>
          <div class="info between-flex fs-13">
            <span class="c-grey">Joined ${friend.joined}</span>
            <div class="d-flex gap-5">
              <a class="bg-blue c-white btn-shape" href="profile.html">Profile</a>
              <a class="bg-red c-white btn-shape" href="">Remove</a>
            </div>
          </div>
        </div>
      `;
        });
        document.querySelector(".screen.friends-page").innerHTML = content;
      })
      .catch((error) => {
        console.error("Error fetching Friends data:", error);
      });
  }
});

// const text =
//     "https://raw.234234234234githubusercontent.com/IbrahimMoatazMohamed/IT-207-Introduction-to-Web-Programming/main/assets/images/articles/articles-3.jpg https://raw.githubusercontent.com/IbrahimMoatazMohamed/IT-207-Introduction-to-Web-Programming/main/assets/images/articles/articles-3.jpg https://raw.githubusercontent.com/IbrahimMoatazMohamed/IT-207-Introduction-to-Web-Programming/main/assets/images/articles/articles-3.jpg https://raw.githubusercontent.com/IbrahimMoatazMohamed/IT-207-Introduction-to-Web-Programming/main/assets/images/articles/articles-3.jpg https://raw.githubusercontent.com/IbrahimMoatazMohamed/IT-207-Introduction-to-Web-Programming/main/assets/images/articles/articles-3.jpg https://raw.githubusercontent.com/IbrahimMoatazMohamed/IT-207-Introduction-to-Web-Programming/main/assets/images/articles/articles-3.jpg https://raw.githubusercontent.com/IbrahimMoatazMohamed/IT-207-Introduction-to-Web-Programming/main/assets/images/articles/articles-3.jpg https://raw.githubusercontent.com/IbrahimMoatazMohamed/IT-207-Introduction-to-Web-Programming/main/assets/images/articles/articles-3.jpg https://raw.githubusercontent.com/IbrahimMoatazMohamed/IT-207-Introduction-to-Web-Programming/main/assets/images/articles/articles-3.jpg https://raw.githubusercontent.com/IbrahimMoatazMohamed/IT-207-Introduction-to-Web-Programming/main/assets/images/articles/articles-3.jpg https://raw.githubusercontent.com/IbrahimMoatazMohamed/IT-207-Introduction-to-Web-Programming/main/assets/images/articles/articles-3.jpg https://raw.githubusercontent.com/IbrahimMoatazMohamed/IT-207-Introduction-to-Web-Programming/main/assets/images/articles/articles-3.jpg https://raw.githubusercontent.com/IbrahimMoatazMohamed/IT-207-Introduction-to-Web-Programming/main/assets/images/articles/articles-3.jpg https://raw.githubusercontent.com/IbrahimMoatazMohamed/IT-207-Introduction-to-Web-Programming/main/assets/images/articles/articles-3.jpg https://raw.githubusercontent.com/IbrahimMoatazMohamed/IT-207-Introduction-to-Web-Programming/main/assets/images/articles/articles-3.jpg https://raw.githubusercontent.com/IbrahimMoatazMohamed/IT-207-Introduction-to-Web-Programming/main/assets/images/articles/articles-3.jpg";

//   const linksArray = text.trim().split("https");
//   linksArray.shift();
//   console.log(linksArray[0]);
// const text =
// "https://raw.234234234234githubusercontent.com/IbrahimMoatazMohamed/IT-207-Introduction-to-Web-Programming/main/assets/images/articles/articles-3.jpg https://raw.githubusercontent.com/IbrahimMoatazMohamed/IT-207-Introduction-to-Web-Programming/main/assets/images/articles/articles-3.jpg https://raw.githubusercontent.com/IbrahimMoatazMohamed/IT-207-Introduction-to-Web-Programming/main/assets/images/articles/articles-3.jpg https://raw.githubusercontent.com/IbrahimMoatazMohamed/IT-207-Introduction-to-Web-Programming/main/assets/images/articles/articles-3.jpg https://raw.githubusercontent.com/IbrahimMoatazMohamed/IT-207-Introduction-to-Web-Programming/main/assets/images/articles/articles-3.jpg https://raw.githubusercontent.com/IbrahimMoatazMohamed/IT-207-Introduction-to-Web-Programming/main/assets/images/articles/articles-3.jpg https://raw.githubusercontent.com/IbrahimMoatazMohamed/IT-207-Introduction-to-Web-Programming/main/assets/images/articles/articles-3.jpg https://raw.githubusercontent.com/IbrahimMoatazMohamed/IT-207-Introduction-to-Web-Programming/main/assets/images/articles/articles-3.jpg https://raw.githubusercontent.com/IbrahimMoatazMohamed/IT-207-Introduction-to-Web-Programming/main/assets/images/articles/articles-3.jpg https://raw.githubusercontent.com/IbrahimMoatazMohamed/IT-207-Introduction-to-Web-Programming/main/assets/images/articles/articles-3.jpg https://raw.githubusercontent.com/IbrahimMoatazMohamed/IT-207-Introduction-to-Web-Programming/main/assets/images/articles/articles-3.jpg https://raw.githubusercontent.com/IbrahimMoatazMohamed/IT-207-Introduction-to-Web-Programming/main/assets/images/articles/articles-3.jpg https://raw.githubusercontent.com/IbrahimMoatazMohamed/IT-207-Introduction-to-Web-Programming/main/assets/images/articles/articles-3.jpg https://raw.githubusercontent.com/IbrahimMoatazMohamed/IT-207-Introduction-to-Web-Programming/main/assets/images/articles/articles-3.jpg https://raw.githubusercontent.com/IbrahimMoatazMohamed/IT-207-Introduction-to-Web-Programming/main/assets/images/articles/articles-3.jpg https://raw.githubusercontent.com/IbrahimMoatazMohamed/IT-207-Introduction-to-Web-Programming/main/assets/images/articles/articles-3.jpg"
//   .trim()
//   .split("https")[1];
// console.log(text);
