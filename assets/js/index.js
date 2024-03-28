import { setupModalActions, carouselSplide, packages } from "./component.js";
document.addEventListener("DOMContentLoaded", () => {
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

  packages(
    "assets/json/newPackages.json",
    "assets/html/item.html",
    ".items .container.holder",
    ".items .items-carousel",
    20
  );
  // carouselSplide();

  //Newest Articles
  function articles(src, redirect, carouselSelector, sectionSelector) {
    fetch(src)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const articles = document.querySelector(sectionSelector);
        data.map((articleData) => {
          const articleCon = `
          <div class="article splide__slide">
          <div class="image">
            <img src="${articleData.imgSrc}" alt="" />
          </div>
          <div class="card">
            <div class="content">
              <h3>${articleData.title}</h3>
              <div class="icons">
                <ul class="font-share-icons">
                  <li>
                    <a href="" target="_blank"
                      ><i class="fa-brands fa-whatsapp whatsapp"></i
                    ></a>
                  </li>
                  <li>
                    <a href="" target="_blank"
                      ><i class="fa-brands fa-facebook-messenger"></i
                    ></a>
                  </li>
                  <li>
                    <a href="" target="_blank"
                      ><i class="fa-brands fa-telegram telegram"></i
                    ></a>
                  </li>
                  <li>
                    <a href="" target="_blank"
                      ><i class="fa-brands fa-facebook-f facebook"></i
                    ></a>
                  </li>
                  <li>
                    <a href="" target="_blank"
                      ><i class="fa-brands fa-instagram instagram"></i
                    ></a>
                  </li>
                </ul>
                <button class="share-btn">
                  <i class="fa-solid fa-share share"></i>
                </button>
              </div>
              <p>
              ${articleData.descreption}
              </p>
              <a href="" class="read"> Read More </a>
            </div>
          </div>
        </div>
            `;
          articles.innerHTML += articleCon;
        });

        carouselSplide(carouselSelector);

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

        //redirect
        document
          .querySelectorAll(".articles .container .article .card .read")
          .forEach((button) => {
            button.href = redirect;
          });
      });
  }

  articles(
    "assets/json/newArticles.json",
    "assets/html/article.html",
    ".articles .splide",
    ".articles .splide__track .container.splide__list"
  );
});
