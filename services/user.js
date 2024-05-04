var UserService = {
  fetchUserInfo: async (user_id) => {
    try {
      let data = localStorage.getItem("userInfo");
      if (data === null) {
        data = await new Promise((resolve, reject) => {
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

        localStorage.setItem("userInfo", JSON.stringify(data));
        return data;
      } else {
        return JSON.parse(data);
      }
    } catch (error) {
      console.error("Error fetching Profile data:", error);
    }
  },
  fetchUserWidgets: async (user_id) => {
    try {
      let widgets = localStorage.getItem("userWidgets");
      if (widgets === null) {
        widgets = await new Promise((resolve, reject) => {
          RestClient.get(
            "users/get/get_user_widgets_by_id.php?user_id=" + user_id,
            (data) => {
              resolve(data);
            },
            (error) => {
              reject(error);
            }
          );
        });

        localStorage.setItem("userWidgets", JSON.stringify(widgets));
        return widgets;
      } else {
        return JSON.parse(widgets);
      }
    } catch (error) {
      console.error("Error fetching Profile data:", error);
    }
  },
  mainImage: async (user_id) => {
    const data = await UserService.fetchUserInfo(user_id);
    $($(".content .head .icons img")[0]).attr("src", data.img);
  },
  deleteUserInfoFormLocalStorage: () => {
    localStorage.removeItem("userInfo");
  },
  deleteUserWidgetsFormLocalStorage: () => {
    localStorage.removeItem("userWidgets");
  },
  loadProfile: async (user_id) => {
    UserService.deleteUserInfoFormLocalStorage();
    const data = await UserService.fetchUserInfo(user_id),
      content = UserService.loadMainProfileWidget(data, user_id, true);
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
  loadMainProfileWidget: (data, user_id, profilePage) => {
    let content = `
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
              <p class="c-grey m-0 fs-13">${
                data.ratings.split(" ").length
              } Rating</p>
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
                ${
                  profilePage
                    ? `<div class="fs-14">
                        <span class="c-grey">Nationality:</span>
                        <span>${data.nationality}</span>
                      </div>`
                    : ""
                }
                  <div class="fs-14">
                  <span class="c-grey">User ID:</span>
                  <span>${user_id}</span>
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

                ${
                  profilePage
                    ? `<div class="fs-14">
                        <span class="c-grey">Date Of Birth:</span>
                        <span>${data.DOB}</span>
                      </div>`
                    : `<div class="fs-14">
                        <span class="c-grey">Job Title:</span>
                        <span>${data.job_title}</span>
                      </div>`
                }
              </div>
              <!-- End Information Row -->`;
    if (profilePage)
      content += `
              <!-- Start Information Row -->
              <div class="box p-20 d-flex align-center">
                <h4 class="c-grey w-full fs-15 m-0">Job Information</h4>
                <div class="fs-14">
                  <span class="c-grey">Title:</span>
                  <span>${data.job_title}</span>
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

    return content;
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

    UserService.deleteUserInfoFormLocalStorage();
    const data = await UserService.fetchUserInfo(user_id),
      welcomWidgetContent = `
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
                    data.job_title
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

    welcomWidget.html(welcomWidgetContent);
    Utils.unblock_ui(welcomWidget);
    $("profile-btn").click(() => {
      switchButton(0);
    });
    UserService.addDraft(user_id);
  },
  loadDashboardWidgets: async (user_id) => {
    const widgets = await UserService.fetchUserWidgets(user_id);

    widgets.targets
      ? UserService.loadYearlyTarget(user_id)
      : $("#dashboard .screen div:has(.targets)").addClass("d-none");

    widgets.tickets
      ? UserService.loadTicketsStatistics(user_id)
      : $("#dashboard .screen div:has(.tickets)").addClass("d-none");

    widgets.drafts
      ? UserService.loadDrafts(user_id)
      : $("#dashboard .screen div:has(.drafts)").addClass("d-none");

    widgets.quick_draft
      ? $("#dashboard .screen div:has(.quick-draft)").removeClass("d-none")
      : $("#dashboard .screen div:has(.quick-draft)").addClass("d-none");
  },
  loadYearlyTarget: (user_id) => {
    const targetWidget = $(".screen.wrapper .targets .target-rows");
    $("#dashboard .screen div:has(.targets)").removeClass("d-none");

    Utils.block_ui(targetWidget);
    RestClient.get(
      "users/get/get_user_targets.php?user_id=" + user_id,
      (data) => {
        let targetsWidget = "";
        targetWidget.html("");

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
    $("#dashboard .screen div:has(.tickets)").removeClass("d-none");

    const ticketWidget = $(".screen.wrapper .tickets .tickets-wrapper");
    Utils.block_ui(ticketWidget);
    RestClient.get(
      "users/get/get_user_tickets.php?user_id=" + user_id,
      (data) => {
        let ticketsWidget = "";
        ticketWidget.html("");

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
    $("#dashboard .screen div:has(.drafts)").removeClass("d-none");

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
        $(modal).html(modalContent);
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
      null,
      () => {
        Utils.appearFailAlert("Draft deleted successfully");
        UserService.loadDrafts(user_id);
        Utils.removeModal(false, $("#myModal")[0]);
      }
    );
  },
  loadSettings: async (user_id) => {
    const data = await UserService.fetchUserInfo(user_id);
    UserService.settingsGeneralForm(data);
    UserService.loadSecurityWidget(data, user_id);
    UserService.loadWidgetsControl(user_id);

    Utils.submit(
      "edit-user-info-form",
      "users/edit/edit_user_info.php?user_id=" + user_id,
      "Info edited successfully",
      async () => {
        UserService.deleteUserInfoFormLocalStorage();
        const data = await UserService.fetchUserInfo(user_id);
        UserService.settingsGeneralForm(data);
      }
    );
  },
  showHideWidget: async (user_id, widgetName) => {
    Utils.block_ui($("#" + widgetName), true);
    const widgets = await UserService.fetchUserWidgets(user_id),
      widgetValue = !widgets[widgetName] ? 1 : 0;
    $.post(
      Constants.API_BASE_URL +
        "users/get/get_user_widgets_by_id.php?user_id=" +
        user_id +
        "&" +
        widgetName +
        "=" +
        widgetValue,
      null
    ).done(() => {
      widgets[widgetName] = widgetValue;
      UserService.deleteUserWidgetsFormLocalStorage();
      localStorage.setItem("userWidget", JSON.stringify(widgets));
      UserService.loadWidgetsControl(user_id);
    });
    Utils.unblock_ui($("#" + widgetName));
  },
  settingsGeneralForm: (data) => {
    $(".settings-page input[type=email]").val(data.email);
    $(".settings-page input#name").val(data.name);
    $(".settings-page input#phone").val(data.phone);
  },
  loadSecurityWidget: (data, user_id) => {
    $(".security-widget .password-info").html(`
    <div>
      <span>Password</span>
      <p class="c-grey mt-5 mb-0 fs-13">Last Change On ${data.last_change}</p>
    </div>
    <button
      class="bg-main-color d-block c-white fs-15 rad-6 c-white w-fit btn-shape btn-position"
      onclick="UserService.eidtPassword(${user_id}, '${data.password}', this)"
      >
      Change
    </button>
    `);
  },
  loadWidgetsControl: async (user_id) => {
    const widgetControl = $(
        "#settings .widgets-control .control input[type=checkbox]"
      ),
      widgets = await UserService.fetchUserWidgets(user_id);

    widgetControl.each((index, el) => {
      const widgetName = `${$(el).attr("id")}`;
      $(el).prop("checked", widgets[widgetName]);
    });
    if (Utils.counter() === 1) {
      widgetControl.each((index, el) => {
        const widgetName = `${$(el).attr("id")}`;
        $(el).click(() => {
          UserService.showHideWidget(user_id, widgetName);
        });
      });
    }
  },
  eidtPassword: (userID, oldPassword, el) => {
    Utils.block_ui(el);
    const modal = $("#myModal")[0];
    $(modal).html(`
          <div class="master-container">
          <div class="card cart">
            <div class="top-title">
              <span class="title">Edit Password</span>
              <i class="fa-solid fa-xmark x"></i>
            </div>
            <div class="form">
              <form id="edit-password-form">
                <div class="inputs">
                  <div class="form-control full">
                    <input
                      type="hidden"
                      id="user_id"
                      name="user_id"
                      value="${userID}"
                    />
                    <input
                      type="password"
                      class="field"
                      required
                      id="old_password"
                      name="old_password"
                    />
                    <label for="old_password">Old Password</label>
                  </div>
                  <div class="form-control full">
                    <input
                      type="password"
                      class="field"
                      required
                      id="password"
                      name="password"
                    />
                    <label for="password">New Password</label>
                  </div>
                  <div class="form-control full">
                    <input
                      type="password"
                      class="field"
                      required
                      id="rep_password"
                      name="rep_password"
                    />
                    <label for="rep_password">Repeat Password</label>
                  </div>
                </div>
                <input type="submit" class="submit save" value="Save" />
              </form>
            </div>
          </div>
        </div>`);
    Utils.formAnimation();
    Utils.setupModalActions();
    Utils.appearModal(false);
    Utils.unblock_ui(el);
    Utils.submit(
      "edit-password-form",
      "users/edit/edit_user_password.php",
      "Password edited successfully",
      async () => {
        UserService.deleteUserInfoFormLocalStorage();
        const data = await UserService.fetchUserInfo(userID);
        UserService.loadSecurityWidget(data);
        Utils.removeModal(false, modal);
      }
    );
  },
  addFriend: (user_id) => {
    const addFriendForm = $("#add-friend-form");
    const addFriendBtn = $("#add-friend");
    const addFriendInput = addFriendForm.find("#requested_id");
    const addFriendIcon = addFriendForm.find("i.add-friend");

    addFriendBtn.click(() => {
      Utils.addBtnsAnimation(
        addFriendForm,
        addFriendBtn,
        addFriendInput,
        addFriendIcon
      );
    });
    // TODO user_id can't be same friend_id
    // const ids = localStorage.getItem("friendsId");
    // if ($(addFriendInput).val())
    Utils.submit(
      "add-friend-form",
      "users/add/add_friend_request.php?requester_id=" + user_id,
      "Friend request sent successfully",
      () => {
        Utils.addBtnsAnimation(
          addFriendForm,
          addFriendBtn,
          addFriendInput,
          addFriendIcon
        );
      }
    );
  },
  requestsFriendModal: (user_id, el) => {
    Utils.block_ui(el, true);
    RestClient.get(
      "users/get/get_friend_requests.php?user_id=" + user_id,
      (data) => {
        const modal = $("#myModal")[0];
        let modalContent = `
        <div class="master-container">
              <div class="card cart">
                <div class="top-title">
                  <span class="title">Friend requests</span>
                  <i class="fa-solid fa-xmark x"></i>
                </div>
                <div class="products p-5">
        `;
        data.map((requester) => {
          modalContent += `
            <div class="product mb-0">
              <img class="modal-img" src="${requester.img}" alt="friend image" title="${requester.name}"/>
              <div class="col-2 w-full">
                <p class="item-name">${requester.name}</p>
                <p class="item-description">${requester.job_title}</p>
              </div>
              <div class="d-flex align-center gap-10">
                <button type="button" class="btn btn-danger"
                onclick="UserService.editFriendRequestStatus(${user_id}, ${requester.user_id}, 0)"
                >
                  <i class="fa-solid fa-circle-minus fa-lg"></i>
                </button>
                <button type="button" class="btn btn-success"
                onclick="UserService.editFriendRequestStatus(${user_id}, ${requester.user_id}, 1)"
                >
                  <i class="fa-solid fa-circle-check fa-lg"></i>
                </button>
              </div>
            </div>
          `;
        });
        modalContent += `</div></div></div>`;
        $(modal).html(modalContent);
        Utils.setupModalActions();
        Utils.appearModal(false);
        Utils.unblock_ui(el);
      }
    );
  },
  editFriendRequestStatus: (requested_id, requester_id, status) => {
    $.post(
      Constants.API_BASE_URL +
        "users/edit/edit_friend_request_status.php?requested_id=" +
        requested_id +
        "&requester_id=" +
        requester_id,
      "&status=" + status,
      null
    ).done(() => {
      UserService.requestsFriendModal(requested_id);
      if (status) UserService.loadFriends(requested_id);
    });
  },
  loadFriends: (user_id) => {
    RestClient.get("users/get/get_friends.php?user_id=" + user_id, (data) => {
      let content = "",
        friendStorage = [],
        friendsId = "";
      data.forEach((friend, index) => {
        friendStorage.push(friend);
        friendsId += friend.user_id + " ";
        content += `
          <div class="friend bg-fourth rad-6 p-20 p-relative">
          <div class="contact">
            <a 
              href="tel:${friend.phone}" 
              class="d-inline" 
              title="${friend.phone}"
            >
              <i class="fa-solid fa-phone"></i>
            </a>
            <a 
              href="mailto:${friend.email}" 
              class="d-inline" 
              title="${friend.email}"
            >
              <i class="fa-regular fa-envelope"></i>
            </a>
          </div>
          <div class="txt-c">
            <img
              class="rad-half mt-10 mb-10 w-100 h-100"
              src="${friend.img}"
              alt="friend image"
              title="${friend.name}"
            />
            <h4 class="m-0">${friend.name}</h4>
            <p class="c-grey fs-13 mt-5 mb-0">${friend.job_title}</p>
          </div>
          <div class="icons fs-14 p-relative">
            <div class="mb-10">
              <i class="fa-regular fa-face-smile fa-fw"></i>
              <span>${friend.number_of_friends} Friends</span>
            </div>
            <div class="mb-10">
              <i class="fa-solid fa-code-commit fa-fw"></i>
              <span>${friend.projects} Projects</span>
            </div>
            ${
              friend.level > 30
                ? '<span class="vip fw-bold c-orange">VIP</span>'
                : ""
            }
          </div>
          <div class="info between-flex fs-13">
            <span 
              class="c-grey"
            >
              Joined ${Utils.dateOfTimestamp(friend.joined_date)}
            </span>
            <div class="d-flex gap-5">
              <button 
                type="button" 
                class="bg-blue c-white btn-shape"
                onclick="UserService.friendProfile(${index}, this)"
              >
                Profile
              </button>
              <button 
                type="button" 
                class="bg-red c-white btn-shape"
                onclick="
                UserService.removeFriend(
                  ${friend.friendship_id},
                  ${user_id},
                  this
                )"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      `;
      });
      localStorage.setItem("friends", JSON.stringify(friendStorage));
      localStorage.setItem("friendsId", JSON.stringify(friendsId));
      document.querySelector(".screen.friends-page").innerHTML = content;
    });
  },
  friendProfile: (index, el) => {
    Utils.block_ui(el, true);
    const data = JSON.parse(localStorage.getItem("friends"))[index],
      content =
        `<div class="master-container profile-page ">
        <div class="card cart overview bg-fourth rad-10 d-flex align-center">
                <div class="top-title">
                  <span class="title">Friend</span>
                  <i class="fa-solid fa-xmark x"></i>
                </div>
                ` +
        UserService.loadMainProfileWidget(data, data.user_id, false) +
        "</div>";
    $("#myModal").html(content);
    Utils.setupModalActions();
    Utils.appearModal(false);
    Utils.unblock_ui(el);
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
  removeFriend: (friendship_id, user_id, el) => {
    Utils.block_ui(el, true);

    RestClient.delete(
      "users/delete/delete_friend.php?friendship_id=" + friendship_id,
      null,
      () => {
        Utils.appearFailAlert("Friend deleted successfully");
        UserService.loadFriends(user_id);
        Utils.removeModal(false, $("#myModal")[0]);
      }
    );
  },
};
