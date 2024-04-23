var UserService = {
  loadProfile: (user_id) => {
    fetch(
      Constants.API_BASE_URL + "users/get_user_by_id.php?user_id=" + user_id
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
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
        UserService.loadActivity(user_id);
        document.querySelector(".other-data .skills-card ul").innerHTML +=
          skillsList;

        document.querySelector(".screen .overview").innerHTML = content;
      })
      .catch((error) => {
        console.error("Error fetching Profile data:", error);
      });
  },
  loadActivity: (user_id) => {
    fetch(
      Constants.API_BASE_URL + "users/get_user_activity.php?user_id=" + user_id
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
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
      });
  },
  signIn: (form_id) => {
    const form = $("#" + form_id),
      block = form;

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
