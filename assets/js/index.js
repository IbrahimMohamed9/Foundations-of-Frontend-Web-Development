document.addEventListener("DOMContentLoaded", () => {
  //images in example
  const scrollers = document.querySelectorAll(".scroller");
  examplesImageAnimation();
  function examplesImageAnimation() {
    scrollers.forEach((scroller) => {
      const scrollerInner = scroller.querySelector(".scroller__inner");
      const scrollerConternt = Array.from(scrollerInner.children);

      scrollerConternt.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        duplicatedItem.setAttribute("aria-hidden", true);
        scrollerInner.appendChild(duplicatedItem);
      });
    });
  }

  function mainTitleAnimation() {
    const mainTitles = document.querySelectorAll(".main-title");
    mainTitles.forEach((mainTitle) => {
      mainTitle.addEventListener("mouseenter", () => {
        dotAnimation(mainTitle);
      });
      mainTitle.addEventListener("click", () => {
        dotAnimation(mainTitle);
      });
    });
  }

  function dotAnimation(title) {
    title.classList.remove("unhovered");
    title.classList.add("hovered");
    setTimeout(() => {
      title.classList.remove("hovered");
      title.classList.add("unhovered");
    }, 1500);
  }

  function expandGraph() {
    //expand the content in info
    const buttons = document.querySelectorAll(".info .row .content button");

    buttons.forEach((button, index) => {
      button.addEventListener("click", () => {
        let span = button.querySelector("span");
        let paragraph = button.nextElementSibling;

        paragraph.classList.toggle("show");

        if (paragraph.classList.contains("show")) {
          span.textContent = "";
        } else {
          span.textContent = "More";
        }
        removeOpen(index);
      });
    });

    function removeOpen(clickedIndex) {
      buttons.forEach((button, index) => {
        if (index !== clickedIndex) {
          let paragraph = button.nextElementSibling;
          let span = button.querySelector("span");

          paragraph.classList.remove("show");
          span.textContent = "More";
        }
      });
    }
  }

  const dashIcons = document.querySelectorAll(".main-header ul.tile-wrds li");

  let previous;
  function switchButton(clickedIndex) {
    if (
      previous !== null &&
      clickedIndex !== previous &&
      previous !== undefined
    ) {
      dashIcons[previous].classList.remove("current-page");
    }
    if (clickedIndex === null) {
      return;
    }
    dashIcons[clickedIndex].classList.add("current-page");
    previous = clickedIndex;
  }

  const app = $.spapp({
    defaultView: "#home",
    templateDir: "pages/homePages/",
  });
  const user_id = 1;

  app.route({
    view: "home",
    load: "home.html",
    onCreate: () => {
      mainTitleAnimation();
      switchButton(0);
      // ItemService.loadCards("newPackages", user_id);
      ItemService.loadCards("package", user_id, "home");
      expandGraph();
      ArticleService.loadArticleCrousel();
    },
    onReady: () => {
      Utils.setupModalActions("Item added successfully", true, false);
      switchButton(0);
    },
  });

  app.route({
    view: "contact",
    load: "contact-us.html",
    onCreate: () => {
      mainTitleAnimation();
      Utils.formAnimation();
      Utils.submit(
        true,
        "contact-form",
        "feedbacks/add",
        "Feedback added successfully",
        () => {
          Utils.resetFormAnimation();
        },
        false,
        false,
        {
          name: {
            required: true,
          },
          phone: {
            required: true,
            digits: true,
            minlength: 6,
            maxlength: 18,
          },
          email: {
            required: true,
            email: true,
          },
          message: {
            required: true,
          },
        },
        {
          name: "Please enter your full name",
          phone: {
            required: "Please enter your phone number",
            digits: "Please enter only digits",
            minlength: "Your phone number must be at least 6 digits",
            maxlength: "Your phone number must not exceed 18 digits",
          },
          email: "Please enter a valid email address",
          message: "Please enter your message",
        }
      );
    },
    onReady: () => {
      switchButton(1);
    },
  });

  app.route({
    view: "pray-times",
    load: "pray-times.html",
    onCreate: () => {
      mainTitleAnimation();
      Utils.formAnimation();

      const form = $("#pray-times-form");
      FormValidation.validate(
        form,
        {
          day: {
            required: true,
            range: [1, 31],
          },
          month: {
            required: true,
            range: [1, 12],
          },
          year: {
            required: true,
            minlength: 4,
            maxlength: 4,
          },
          city: {
            required: true,
          },
        },
        {
          day: {
            required: "Please enter the day (1-31)",
            range: "Day must be between 1 and 31",
          },
          month: {
            required: "Please enter the month (1-12)",
            range: "Month must be between 1 and 12",
          },
          year: {
            required: "Please enter a valid year",
            minlength: "Year must be 4 digits",
            maxlength: "Year must be 4 digits",
          },
          city: "Please select a city",
        },
        (data) => {
          $.ajax({
            url: `https://api.aladhan.com/v1/calendarByCity/${data.year}/${data.month}?city=${data.city}&country=Bosnia%20and%20Herzegovina`,
            type: "GET",
          })
            .done((response) => {
              console.log(response.data[data.day - 1].date.hijri.date);
              console.log(response.data[data.day - 1].date.hijri.month.en);
              console.log(response.data[data.day - 1].date.hijri.weekday.en);

              const prayTimes = response.data[data.day - 1].timings;

              const timesTable = $("#pray-time-table");
              timesTable.addClass("p-20 rad-10 p-10-f center-flex f-column");
              timesTable.removeClass("d-none");

              const getTime = (name) => {
                return prayTimes[name].split(" ")[0];
              };

              $(timesTable).find("table").html(`
                    <thead>
                      <tr>
                        <td>Fajr</td>
                        <td>Sunrise</td>
                        <td>Dhuhr</td>
                        <td>Asr</td>
                        <td>Maghrib</td>
                        <td>Isha</td>
                        <td>Midnight</td>
                        <td>First Third</td>
                        <td class="w-120">Last Third</td>
                      </tr>
                    </thead>
                    <tr class="not-me">
                      <td>${getTime("Fajr")}</td>
                      <td>${getTime("Sunrise")}</td>
                      <td>${getTime("Dhuhr")}</td>
                      <td>${getTime("Asr")}</td>
                      <td>${getTime("Maghrib")}</td>
                      <td>${getTime("Isha")}</td>
                      <td>${getTime("Midnight")}</td>
                      <td>${getTime("Firstthird")}</td>
                      <td>${getTime("Lastthird")}</td>
                    </tr>
              `);
            })
            .fail((jqXHR) => {
              Utils.appearFailAlert("There is problem, try again please.");
            });
        }
      );
    },
    onReady: () => {
      switchButton(3);
    },
  });

  app.route({
    view: "articles",
    load: "articles.html",
    onCreate: () => {
      ArticleService.loadArticlesPage("cities");
      ArticleService.loadArticlesPage("Hotels");
      ArticleService.loadArticlesPage("Tourism");
    },
    onReady: () => {
      switchButton(2);
    },
  });

  app.route({
    view: "shop",
    load: "shop.html",
    onCreate: () => {
      mainTitleAnimation();
      Utils.setupModalActions("Item added successfully", true, false);

      ItemService.loadCards("car", user_id, "shop");
      ItemService.loadCards("package", user_id, "shop");
      ItemService.loadCards("hotel", user_id, "shop");
    },
    onReady: () => {
      switchButton(4);
    },
  });
  app.route({
    view: "cart",
    load: "cart.html",
    onCreate: () => {},
    onReady: () => {
      const modalBtn = $("button.checkout-btn").eq(0);
      CartService.loadRows(user_id);
      switchButton(null);
      modalBtn.click(() => {
        CartService.checkout(user_id, "customer", modalBtn);
      });
      $(window).one("hashchange", () => {
        localStorage.removeItem("coupons");
        CartService.updateCart(user_id);
        Utils.removeAllEventListeners(modalBtn[0]);
      });
    },
  });

  app.run();
});
