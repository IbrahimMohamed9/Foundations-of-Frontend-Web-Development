var projectService = {
  loadProjects: () => {
    RestClient.get("projects/get_projects.php", (projects) => {
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
              <!--TODO appear modal with profile info-->
              <img src="${teamMember.img}"
                alt="member image"
                title="${teamMember.position}"
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
        // form_id, to, success_mge, callBack, modal, formElement

        Utils.submit(
          false,
          "projects/add_user_project.php?project_id=" +
            projects[index]["project_id"],
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
    teamString += ",";
    const regex =
      /(?<id>\d+)\|(?<role>[A-Za-z ]+)\|(?<name>[A-Za-z -]+)\|(?<url>https:\/\/[^,]+),/g;
    const teamMembers = [];

    let match;
    while ((match = regex.exec(teamString)) !== null) {
      const { id, role, name, url } = match.groups;
      teamMembers.push({ user_id: id, name, position: role, img: url });
    }

    return teamMembers;
  },
};
