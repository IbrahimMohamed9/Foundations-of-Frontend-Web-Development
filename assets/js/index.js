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
      button.addEventListener("click", function () {
        let span = this.querySelector("span");
        let paragraph = this.nextElementSibling;

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
  //dashboard
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

  app.route({
    view: "home",
    load: "home.html",
    onCreate: function () {
      mainTitleAnimation();
      switchButton(0);
      ItemService.loadCards("package");
      expandGraph();
      ArticleService.loadArticleCrousel();
    },
    onReady: function () {
      Utils.setupModalActions("Item added successfully", true, false);
      switchButton(0);
    },
  });

  app.route({
    view: "contact",
    load: "contact-us.html",
    onCreate: function () {
      mainTitleAnimation();
      Utils.formAnimation();
      Utils.submit(
        "contact-form",
        "feedbacks/add_feedback.php",
        "Feedback added successfully",
        "contact-form .submit",
        () => {
          Utils.resetFormAnimation();
        }
      );
    },
    onReady: function () {
      switchButton(1);
    },
  });

  app.route({
    view: "articles",
    load: "articles.html",
    onCreate: function () {
      ArticleService.loadArticlesPage("cities");
      ArticleService.loadArticlesPage("Hotels");
      ArticleService.loadArticlesPage("Tourism");
    },
    onReady: function () {
      switchButton(2);
    },
  });

  app.route({
    view: "shop",
    load: "shop.html",
    onCreate: function () {
      mainTitleAnimation();
      Utils.setupModalActions("Item added successfully", true, false);

      ItemService.loadCards("package");
      ItemService.loadCards("car");
      ItemService.loadCards("hotel");
    },
    onReady: function () {
      switchButton(4);
    },
  });

  app.route({
    view: "cart",
    load: "cart.html",
    onCreate: function () {},
    onReady: function () {
      CartService.loadCart(1);
      switchButton(null);
    },
  });

  app.run();
});
