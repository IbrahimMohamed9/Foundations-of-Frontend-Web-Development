document.addEventListener("DOMContentLoaded", () => {
  //share icon in article
  const shareIcons = document.querySelectorAll(".share"),
    shareLists = document.querySelectorAll(".icons .font-share-icons");
  var previous = null;
  shareIcons.forEach((shareIcon, index) => {
    shareIcon.addEventListener("click", () => {
      if (shareLists[index].style.display === "grid") {
        shareLists[index].style.animation =
          "hidden var(--main-transition) linear forwards";
        setTimeout(() => {
          shareLists[index].style.display = "none";
        }, 300);
      } else {
        shareLists[index].style.display = "grid";
        shareLists[index].style.animation =
          "appear var(--main-transition) linear forwards";
        if (previous !== null && index != previous) {
          shareLists[previous].style.animation =
            "hidden var(--main-transition) linear forwards";
          setTimeout(() => {
            shareLists[previous].style.display = "none";
          }, 300);
        }
        setTimeout(() => {
          previous = index;
        }, 301);
      }
    });
  });

  //images in example
  const scrollers = document.querySelectorAll(".scroller");
  addAnimation();
  function addAnimation() {
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

  //redirect plan 1
  if (document.getElementById("p-1-4")) {
    document.getElementById("p-1-4").addEventListener("click", redirect);
    function redirect() {
      window.location = "assets/html/item.html";
    }
  }
});
