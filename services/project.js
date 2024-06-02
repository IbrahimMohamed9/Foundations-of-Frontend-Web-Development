var projectService = {
  loadProjects: () => {
    RestClient.get("projects", (projects) => {
      let content = "";
      projects.forEach((project) => {
        content += `
            <div class="project bg-fourth p-20 rad-6 p-relative">
              <span class="date fs-13 c-grey">${Utils.dateOfTimestamp(
                project.start_date
              )}</span>
              <h4 class="m-0">${project.item_name}</h4>
              <p class="c-grey mt-10 mb-10 fs-14">${project.item_intro}</p>
              <div class="team">`;
        // TODO is it good, use js for styling?
        let left = 0;
        projectService
          .separateTeam(project["project_team"])
          .forEach((teamMember) => {
            content += `
            <span
              style="left: ${left}px;"
              >
              <img src="${teamMember.img}"
                alt="member image"
                title="${teamMember.position}"
                onclick="
                  projectService.userProfile(
                    ${teamMember.user_id},
                    ${project.project_id},
                    this
                  );
                "
              />
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
                <!--
                  <span class="bg-red" style="width: TODO %"></span>
                  -->
                </div>
                <div class="fs-14 c-grey">
                  KM ${Utils.checkDecWithInt(project.project_price)}
                </div>
                <button
                  class="add-btn txt-c d-block fs-15 rad-6 c-white btn-shape"
                >
                  Add user
                </button>
                <form class="d-none gap-10">
                  <input
                    type="number"
                    name="user_id"
                    min="1"
                    required
                    class="transition d-block border-ccc rad-6 w-full p-10 bg-third c-main-font hidden-by-width"
                    placeholder="Enter user ID"
                  />
                  <input
                    type="text"
                    name="position"
                    required
                    class="transition d-block border-ccc rad-6 w-full p-10 bg-third c-main-font"
                    placeholder="Enter user position"
                  />
                  <button type="submit" class="b-none bg-transparent">
                    <i
                      class="c-main-font transition fa-solid fa-user-plus fa-flip-horizontal fa-lg add-friend fs-0"
                    ></i>
                  </button>
                </form>
              </div>
            </div>`;
      });

      document.querySelector(".screen.projects-page").innerHTML = content;
      $(".info button.add-btn").each((index, element) => {
        const form = $(element).next();
        const formChildren = $(element).next().children();
        $(element).click(() => {
          Utils.addBtnsAnimation(
            form,
            $(element),
            formChildren.eq(0),
            formChildren.eq(2).children().eq(0)
          );
        });

        Utils.submit(
          //TODO make it false
          true,
          false,
          "projects/add_user?project_id=" + projects[index]["project_id"],
          "User added successfully",
          () => {
            Utils.addBtnsAnimation(
              form,
              $(element),
              formChildren.eq(0),
              formChildren.eq(1).children().eq(0)
            );
            projectService.loadProjects();
          },
          false,
          form
        );
      });
    });
  },
  separateTeam: (teamString) => {
    const teams = teamString.split(",,,,");
    const teamMembers = [];
    const regex =
      /(?<id>\d+)\|(?<role>[A-Za-z0-9 ]+)\|(?<name>[A-Za-z -]+)\|(?<url>https:\/\/[^,]+)/;

    for (const team of teams) {
      const match = regex.exec(team);
      if (match) {
        const { id, role, name, url } = match.groups;
        teamMembers.push({ user_id: id, name, position: role, img: url });
      }
    }

    return teamMembers;
  },
  userProfile: (user_id, project_id, el) => {
    //TODO  make this and that friendProfile one function
    //TODO  add error call back function
    Utils.block_ui(el, true);
    RestClient.get("projects/get/" + user_id + "/" + project_id, (data) => {
      const content =
        `<div class="master-container profile-page ">
        <div class="card cart overview bg-fourth rad-10 d-flex align-center">
                <div class="top-title">
                  <span class="title">User</span>
                  <i class="fa-solid fa-xmark x"></i>
                </div>
                ` +
        UserService.loadMainProfileWidget(data, data.user_id, false) +
        "</div>";
      $("#myModal").html(content);
      Utils.setupModalActions();
      Utils.appearModal(false);
      Utils.unblock_ui(el);
    });
  },
};
