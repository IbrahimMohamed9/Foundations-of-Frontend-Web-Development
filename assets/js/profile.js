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

  let user_id;
  if (Utils.get_from_localstorage("user"))
    user_id = Utils.get_from_localstorage("user").user_id;
  else user_id = "empty";

  UserService.mainImage(user_id);
  app.route({
    view: "profile",
    load: "profile.html",
    onCreate: () => {
      UserService.loadProfile(user_id);
    },
    onReady: () => {
      switchButton(0);
    },
  });
  app.route({
    view: "dashboard",
    load: "dashboard.html",
    onCreate: () => {
      UserService.loadDashboard(user_id);
      // loadDashboard("../assets/json/dashboard.json");
    },
    onReady: () => {
      switchButton(1);
      UserService.loadDashboardWidgets(user_id);
    },
  });
  app.route({
    view: "settings",
    load: "settings.html",
    onCreate: () => {
      UserService.loadSettings(user_id);
    },
    onReady: () => {
      switchButton(2);
    },
  });
  app.route({
    view: "projects",
    load: "projects.html",
    onCreate: () => {
      // loadProjects("../assets/json/projects.json");
      projectService.loadProjects();
    },
    onReady: () => {
      switchButton(3);
    },
  });
  app.route({
    view: "friends",
    load: "friends.html",
    onCreate: () => {
      UserService.addFriend(user_id);
      $("#requests").click((el) => {
        UserService.requestsFriendModal(user_id, el.currentTarget);
      });
      UserService.loadFriends(user_id);
    },
    onReady: () => {
      switchButton(4);
    },
  });
  app.route({
    view: "tables",
    load: "tables.html",
    onCreate: () => {
      ItemService.loadTable("tbl_packages");
      ItemService.loadTable("tbl_cars");
      ItemService.loadTable("tbl_hotels");
      ArticleService.loadTable();
      FeedbackService.loadTable();
      $("#add-package").on("click", () => {
        ItemService.addItemModal("package", false);
      });
      $("#add-car").on("click", () => {
        ItemService.addItemModal("car", false);
      });
      $("#add-hotel").on("click", () => {
        ItemService.addItemModal("hotel", false);
      });
      $("#add-article").on("click", () => {
        ArticleService.addArticleModal("Article added successfully", true);
      });
      $("#add-feedback").on("click", () => {
        FeedbackService.addFeedbackModal();
      });
      // loadProjectsTable("../assets/json/dashboard.json");
    },
    onReady: () => {
      switchButton(5);
    },
  });
  app.route({
    view: "files",
    load: "files.html",
    onCreate: () => {},
    onReady: () => {
      switchButton(6);
    },
  });
  app.route({
    view: "chat",
    load: "chat.html",
    onCreate: () => {
      const ws = new WebSocket("ws://balqan.net:8080");
      const messages = document.getElementById("messages");
      const messageInput = document.getElementById("messageInput");

      $("#messageButton").click(sendMessage);

      function sendMessage() {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(messageInput.value);
          appendMessage("Me: " + messageInput.value);
        } else {
          Utils.appearFailAlert("The connection is lost");
        }
        messageInput.value = "";
      }

      function appendMessage(message) {
        const messageElement = document.createElement("div");
        messageElement.textContent = message;
        messages.appendChild(messageElement);
      }

      ws.onopen = () => {
        ws.send(
          JSON.stringify({
            token: Utils.get_from_localstorage("user").token,
            message: "has joined the chat",
          })
        );

        appendMessage("Connection open");
      };

      ws.onmessage = (event) => {
        appendMessage(event.data);
      };

      ws.onclose = () => {
        appendMessage("Connection closed");
      };

      ws.onerror = (event) => {
        appendMessage("Error: " + event.message);
      };
    },
    onReady: () => {},
  });
  app.run();

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
              <span class="d-block c-grey fs-14 mt-10 fs-10-f">${data.job_title}</span>
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
          draftsWidget = "";

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

        data.drafts.forEach((reminder) => {
          draftsWidget += `
            <li class="d-flex align-center mt-15">
              <span class="key d-block"></span>
              <div class="pl-15">
                <p class="fs-14 fw-bold mt-0 mb-5">${reminder.title}</p>
                <span class="fs-13 c-grey">${reminder.date} - ${reminder.time}</span>
              </div>
            </li>
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
        document.querySelector(".screen.wrapper .drafts ul").innerHTML =
          draftsWidget;

        document.getElementById("profile-btn").addEventListener("click", () => {
          switchButton(0);
        });
      })
      .catch((error) => {
        console.error("Error fetching Dashboard data:", error);
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
          // TODO is it good, use js for styling?
          let left = 0;
          project.team.forEach((teamMember) => {
            content += `
            <span 
              style="left: ${left}px;"
              onclick="UserService.friendProfile(0, this)"
              >
              <!--TODO add user id instead of zero-->
              <img src="${teamMember}" alt="member image" />
            </span>`;
            left += 25;
          });
          content += `
              </div>
              <!--<div class="do d-flex">`;
          // project tasks (for example cities)
          // project.tasks.forEach((task) => {
          //   content += `<span class="fs-13 rad-6 bg-eee">${task}</span>`;
          // });

          content += `
              </div>-->
              <div class="info between-flex">
                <div class="prog bg-eee d-none">
                  <span class="bg-red" style="width: ${project.progress}%"></span>
                </div>
                <div class="fs-14 c-grey">
                  KM ${project.price}
                </div>
                <button
                  class="add-btn txt-c d-block fs-15 rad-6 c-white btn-shape"
                  type="button"
                >
                  Add User
                </button>
              </div>
            </div>`;
        });

        document.querySelector(".screen.projects-page").innerHTML = content;
      })
      .catch((error) => {
        console.error("Error fetching projects data:", error);
      });
  }

  function loadProjectsTable(src) {
    fetch(src)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        let tableRows = "";

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
        document.querySelector("table#tbl_projects tbody").innerHTML =
          tableRows;
      })
      .catch((error) => {
        console.error("Error fetching Dashboard data:", error);
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
