import {
  itemModal,
  setupModalActions,
  redirect,
  carouselSplide,
} from "./component.js";
document.addEventListener("DOMContentLoaded", () => {
  //share icon in article
  const shareIcons = document.querySelectorAll(".share-btn"),
    shareLists = document.querySelectorAll(".icons .font-share-icons");

  shareIcons.forEach((shareIcon, index) => {
    shareIcon.addEventListener("click", () => {
      if (shareLists[index].style.display != "grid") {
        shareLists[index].style.display = "grid";
        shareLists[index].style.animation = "appear 0.2s linear forwards";
      } else {
        shareLists[index].style.animation =
          "hidden var(--main-transition) linear forwards";
        setTimeout(() => {
          shareLists[index].style.display = "none";
        }, 300);
      }
    });
    shareIcon.addEventListener("blur", () => {
      shareLists[index].style.animation =
        "hidden var(--main-transition) linear forwards";
      setTimeout(() => {
        shareLists[index].style.display = "none";
      }, 300);
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

  //change main video
  function mainVideoSrc(src) {
    fetch(src)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        document.querySelector(".video-wraper .video video").innerHTML = `
        <source
            src="${data.src}"
            type="video/mp4"
          />`;
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }

  mainVideoSrc("assets/json/video.json");

  //New Packages
  setupModalActions();

  function newPackages(src) {
    fetch(src)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const newPackages = document.querySelector(".items .container.holder");
        data.map((packageData) => {
          const packageCon = `
        <div class="item splide__slide">
          <div class="box">
            <div class="back face">
              <button class="button" id="${packageData.id}-1">plan 1</button>
              <button class="button" id="${packageData.id}-2">plan 2</button>
              <button class="button" id="${packageData.id}-3">plan 3</button>
              <button class="button" id="${packageData.id}-4">plan 4</button>
            </div>
            <div class="image face">
              <img src="${packageData.imgSrc}" alt="package image" />
            </div>
          </div>
          <div class="text">
            <h3>${packageData.name}</h3>
            <p>Price: ${packageData.price} KM</p>
          </div>
          <button class="pckbtn"></button>
        </div>`;
          newPackages.innerHTML += packageCon;
        });

        document.querySelectorAll(".pckbtn").forEach((button, index) =>
          button.addEventListener("click", () => {
            const packageData = data[index];
            itemModal(
              "Package",
              packageData.name,
              packageData.imgSrc,
              packageData.min,
              packageData.max,
              packageData.price
            );
          })
        );

        carouselSplide(".items .items-carousel", 20);

        //redirect
        document.querySelectorAll(".item .back .button").forEach((button) => {
          button.addEventListener("click", () => {
            redirect("assets/html/item.html");
          });
        });
      });
  }

  newPackages("assets/json/newPackages.json");

  carouselSplide(".articles .splide");
});
