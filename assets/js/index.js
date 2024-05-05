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
  const user_id = 1;

  app.route({
    view: "home",
    load: "home.html",
    onCreate: () => {
      mainTitleAnimation();
      switchButton(0);
      ItemService.loadCards("package", user_id);
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
        "contact-form",
        "feedbacks/add_feedback.php",
        "Feedback added successfully",
        () => {
          Utils.resetFormAnimation();
        }
      );
    },
    onReady: () => {
      switchButton(1);
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

      ItemService.loadCards("car", user_id);
      ItemService.loadCards("package", user_id);
      ItemService.loadCards("hotel", user_id);
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
        CartService.checkOut(user_id, "customer", modalBtn);
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
