var UserService = {
  fetchUserInfo: async (user_id) => {
    try {
      const response = await new Promise((resolve, reject) => {
        RestClient.get(
          "users/get/get_user_by_id.php?user_id=" + user_id,
          (data) => {
            resolve(data);
          },
          (error) => {
            reject(error);
          }
        );
      });

      localStorage.setItem("userInfo", JSON.stringify(response));
      return response;
    } catch (error) {
      console.error("Error fetching Profile data:", error);
    }
  },
  deleteUserInfo: () => {
    localStorage.removeItem("userInfo");
  },
  loadProfile: async (user_id) => {
    UserService.deleteUserInfo();
    let data = localStorage.getItem("userInfo");
    if (data === null) {
      data = await UserService.fetchUserInfo(user_id);
    } else {
      data = JSON.parse(data);
    }
    const ratingsArray = data.ratings.split(" ");
    const content = `
            <div class="avatar-box txt-c p-20">
              <img class="rad-half mb-10" src="${data.img}" alt="Profile Img" />
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
              <p class="c-grey m-0 fs-13">${ratingsArray.length} Rating</p>
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
    UserService.loadLatestActivity(user_id);
    document.querySelector(".other-data .skills-card ul").innerHTML +=
      skillsList;

    document.querySelector(".screen .overview").innerHTML = content;
  },
  loadLatestActivity: (user_id) => {
    RestClient.get(
      "users/get/get_user_latest_activity.php?user_id=" +
        user_id +
        "&limit=" +
        Constants.latestActivitiesLimit,
      (data) => {
        const activitiesList = data
          .map(
            (activity) => `
              <div class="activity d-flex align-center txt-c-mobile">
                <img src="${activity.img_src}" alt="Activity Image" />
                <div class="info">
                  <span class="d-block mb-10">${activity.name}</span>
                  <span class="c-grey">${activity.description}</span>
                </div>
                <div class="date">
                  <span class="d-block mb-10">${activity.time}</span>
                  <span class="c-grey">${activity.date}</span>
                </div>
              </div>
            `
          )
          .join("");

        document.querySelector(".other-data .activities").innerHTML +=
          activitiesList;
      }
    );
  },
  loadDashboard: async (user_id) => {
    const welcomWidget = $(".screen.wrapper .welcome");
    Utils.block_ui(welcomWidget);

    UserService.deleteUserInfo();
    let data = localStorage.getItem("userInfo");
    if (data === null) {
      data = await UserService.fetchUserInfo(user_id);
    } else {
      data = JSON.parse(data);
    }
    const welcomWidgetContent = `
              <div class="intro p-20 d-flex space-between bg-third pl-10-f pr-10-f">
                <div>
                  <h2 class="m-0">Welcom</h2>
                  <p class="c-grey mt-5 txt-c-f">${data.name}</p>
                </div>
                <img src="../assets/images/profile/welcome.png" alt="" />
              </div>
              <img src="${data.img}" alt="Profile image" class="avatar" />
              <div class="body txt-c d-flex p-20 mt-20 mb-20 bg-fourth pl-10-f pr-10-f">
                <div class="fs-13-f">
                  ${data.name}
                  <span class="d-block c-grey fs-14 mt-10 fs-10-f">${
                    data.jobTitle
                  }</span>
                </div>
                <div class="fs-13-f">
                  ${data.projects}
                  <span class="d-block c-grey fs-14 fs-10-f mt-10">Projects</span>
                </div>
                <div class="fs-13-f">
                  KM ${Utils.checkDecWithInt(data.earned)}
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
    // let progressWidget = '';
    // data.progrProjs.forEach((progrProj) => {
    //   progressWidget += `
    //         <li class="mt-25 d-flex align-center ${progrProj.status}">${progrProj.part}</li>
    //         `;
    // });

    // data.drafts.forEach((reminder) => {
    //   draftsWidget += `
    //           <li class="d-flex align-center mt-15">
    //             <span class="key d-block"></span>
    //             <div class="pl-15">
    //               <p class="fs-14 fw-bold mt-0 mb-5">${reminder.title}</p>
    //               <span class="fs-13 c-grey">${reminder.date} - ${reminder.time}</span>
    //             </div>
    //           </li>
    //         `;
    // });
    // document.querySelector(".screen.wrapper .last-project ul").innerHTML =
    //   progressWidget;
    UserService.loadYearlyTarget(user_id);
    UserService.loadTicketsStatistics(user_id);
    UserService.loadDrafts(user_id);
    welcomWidget.html(welcomWidgetContent);
    Utils.unblock_ui(welcomWidget);

    $("profile-btn").click(() => {
      switchButton(0);
    });
    UserService.addDraft(user_id);
  },
  loadYearlyTarget: (user_id) => {
    const targetWidget = $(".screen.wrapper .targets");
    Utils.block_ui(targetWidget);
    RestClient.get(
      "users/get/get_user_targets.php?user_id=" + user_id,
      (data) => {
        let targetsWidget = "";
        data.forEach((target) => {
          const achieved = Number(target.achieved),
            goal = Number(target.goal),
            percentageAchieved = ((achieved / goal) * 100).toFixed(0);

          targetsWidget += `
              <div class="target-row mb-20 mb-25-f d-flex align-center">
                <div class="icon center-flex">
                  <i class="fa-solid ${target.icon} fa-lg"></i>
                </div>
                <div class="details">
                  <span class="fs-14 c-grey">${target.label}</span>
                  <span class="d-block p-relative mb-10 fw-bold">${goal}</span>
                  <div class="progress rad-10 p-relative">
                    <span style="width: ${percentageAchieved}%" class="rad-10">
                      <span class="rad-6 fs-13 c-white fw-bold">${percentageAchieved}%</span></span
                    >
                  </div>
                </div>
              </div>
            `;
        });
        targetWidget.append(targetsWidget);
        Utils.unblock_ui(targetWidget);
      }
    );
  },
  loadTicketsStatistics: (user_id) => {
    const ticketWidget = $(".screen.wrapper .tickets .tickets-wrapper");
    Utils.block_ui(ticketWidget);
    RestClient.get(
      "users/get/get_user_tickets.php?user_id=" + user_id,
      (data) => {
        let ticketsWidget = "";
        data.forEach((ticket) => {
          ticketsWidget += `
              <div class="box border-ccc p-20 p-10-f pr-10-f fs-13 c-grey">
                <i class="fa-solid ${ticket.icon} fa-2x mb-10"></i>
                <span class="d-block c-main-font fw-bold fs-25 mb-5">${Utils.checkDecWithInt(
                  ticket.achieved
                )}</span>
                ${ticket.label}
              </div>
            `;
        });
        ticketWidget.append(ticketsWidget);
        Utils.unblock_ui(ticketWidget);
      }
    );
  },
  loadDrafts: (user_id) => {
    const draftWidget = $(".screen.wrapper .drafts ul");
    draftWidget.html("");
    Utils.block_ui(draftWidget);
    RestClient.get(
      "users/get/get_user_drafts.php?user_id=" + user_id,
      (data) => {
        let draftsWidget = "";
        Utils.unblock_ui(draftWidget);
        data.forEach((draft) => {
          const [datePart, timePart] = draft.time.split(" "),
            [hour, minute] = timePart.split(":").slice(0, 2);

          draftsWidget += `
                  <li class="d-flex align-center mt-15" onclick="UserService.getDraft(${user_id}, ${draft.draft_id}, this)">
                    <span class="key d-block"></span>
                    <div class="pl-15">
                      <p class="fs-14 fw-bold mt-0 mb-5">${draft.title}</p>
                      <span class="fs-13 c-grey">${datePart} - ${hour}:${minute}</span>
                    </div>
                  </li>
                `;
        });
        draftWidget.append(draftsWidget);
        Utils.unblock_ui(draftWidget);
      }
    );
  },
  addDraft: (user_id) => {
    Utils.submit(
      "draft-form",
      "users/add/add_draft.php?user_id=" + user_id,
      "Draft added successfully",
      () => {
        UserService.loadDrafts(user_id);
      }
    );
  },
  editDraft: (user_id, draft_id, modal) => {
    Utils.submit(
      "edit-draft-form",
      "users/add/add_draft.php?draft_id=" + draft_id,
      "Draft edited successfully",
      () => {
        Utils.appearSuccAlert("Draft editted successfully");
        UserService.loadDrafts(user_id);
        Utils.removeModal(false, modal);
      }
    );
  },
  getDraft: (user_id, draft_id, el) => {
    Utils.block_ui(el);
    RestClient.get(
      "users/get/get_user_draft_by_id.php?draft_id=" + draft_id,
      (data) => {
        const modal = $("#myModal")[0];
        const modalContent = `
          <div class="master-container">
            <div class="card cart">
              <div class="top-title">
                <span class="title">Edit Draft</span>
                <i class="fa-solid fa-xmark x"></i>
              </div>
              <div class="form">
                <form id="edit-draft-form">
                  <div class="inputs">
                    <div class="form-control">
                      <input type="hidden" id="draft_id" name="draft_id" value="${data.draft_id}"/>
                      <input
                        type="text"
                        class="field"
                        required
                        id="title"
                        name="title"
                        value="${data.title}"
                      />
                      <label for="title">Title</label>
                    </div>
                  </div>
                  <div class="textareas">
                    <div class="form-control">
                      <div class="textarea">
                        <textarea
                          id="content"
                          name="content"
                          required
                          class="field"
                        >${data.content}</textarea>
                      </div>
                      <label for="content" class="txtar-la">
                        Content
                      </label>
                    </div>
                  </div>
                  <div>
                    <input type="submit" class="submit save" value="Save" />
                    <button class="submit remove" type="button" onclick="UserService.removeDraft(${user_id}, ${data.draft_id}, this)">Remove</button>
                  </div>
                </form>
              </div>
            </div>
          </div>`;
        modal.innerHTML = modalContent;
        Utils.formAnimation();
        Utils.setupModalActions();
        Utils.appearModal(false);
        Utils.unblock_ui(el);
        UserService.editDraft(user_id, data.draft_id, modal);
      }
    );
  },
  removeDraft: (user_id, draft_id, el) => {
    Utils.block_ui(el.parentNode, true);
    RestClient.delete(
      "users/delete/delete_user_draft.php?draft_id=" + draft_id,
      draft_id,
      () => {
        Utils.appearFailAlert("Draft deleted successfully");
        UserService.loadDrafts(user_id);
        Utils.removeModal(false, $("#myModal")[0]);
      }
    );
  },
  signIn: (form_id) => {
    const form = $("#" + form_id),
      block = $(form).find("input[type=submit]");
    FormValidation.validate(form, {}, (data) => {
      Utils.block_ui(block);
      RestClient.get(
        "users/user_login.php?sign_email=" +
          data.sign_email +
          "&signin_password=" +
          data.signin_password,
        (data) => {
          Utils.unblock_ui(block);
          if (data["counter"]) {
            window.location.pathname =
              "/IT-207-Introduction-to-Web-Programming";
            Utils.appearFailAlert("Done.");
          } else {
            Utils.appearFailAlert(
              "Invalid email or password. Please try again."
            );
          }
        },
        (xhr) => {
          Utils.unblock_ui(block);
          Utils.appearFailAlert(xhr.responseText);
        }
      );
    });
  },
};
