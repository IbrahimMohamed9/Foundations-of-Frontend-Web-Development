import {
  setupModalActions,
  carouselSplide,
  itemModal,
  checkDec,
} from "./component.js";

document.addEventListener("DOMContentLoaded", () => {
  setupModalActions();

  function loadItems(src) {
    fetch(src)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const itemWrapper = document.querySelector(".cart.item"),
          moreItemWrapper = itemWrapper.nextElementSibling.querySelector(
            ".carousel.splide__list"
          );
        data.map((itemData, index) => {
          let decimalPart = checkDec(parseFloat(itemData.price));
          const intPart = Math.floor(parseFloat(itemData.price));
          if (!index) {
            if (decimalPart === "&emsp;") {
              decimalPart = "";
            }
            const itemCon1 = `
              <div class="cart item position-relative">
                <div class="containerr">
                  <div class="right-corner">
                    <a href="../../index.html">Home</a>
                    <i class="fa-solid fa-chevron-right"></i>
                    <a href="../html/shop.html">Shop</a>
                    <i class="fa-solid fa-chevron-right"></i>
                    <a href="#">${itemData.name}</a>
                  </div>
                </div>
                <div class="item-container position-relative">
                  <!-- Start Item Images -->
                  <div class="images">
                    <div class="main position-relative p-relative-c-m">
                      <img src="${itemData.imgSrc}" alt="" />
                      <div class="icons">
                        <ul class="font-share-icons">
                          <li>
                            <a href="" target="_blank"
                              ><i class="fa-brands fa-whatsapp whatsapp"></i
                            ></a>
                          </li>
                          <li>
                            <a href="" target="_blank"
                              ><i class="fa-brands fa-x-twitter twitter"></i
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
                          <span class="share"></span>
                        </button>
                      </div>
                    </div>
                    <span class="images-span">Roll over image to zoom in </span>
                    <div class="list-container position-relative">
                      <div class="center list-img">
            `;
            const srcsArray = itemData.imgsSrcs.split(" ");
            let itemCon2 = `
              <div class="img-container active">
                <img
                  src="${srcsArray[0]}"
                  alt=""
                />
              </div>
            `;
            srcsArray.forEach((imgSrc, index) => {
              if (!index) {
                return;
              }
              itemCon2 += `
                <div class="img-container">
                  <img
                    src="${imgSrc}"
                    alt=""
                  />
                </div>
              `;
            });
            const itemCon3 = `
                      </div>
                    </div>
                  </div>
                  <!--End Item Images -->
                  <div class="content">
                    <h1>${itemData.name}</h1>
                    <p>${itemData.intro}
                      <br />
                      <span class="tlte"> ${itemData.title} </span>
                      ${itemData.description}
                    </p>
                  </div>
                  <!-- Start Price Box -->
                  <div class="add">
                    <div class="wrapper">
                      <div class="price"><sup>km</sup>${intPart}<sub>${decimalPart}</sub></div>
                      <label for="count">people:</label>
                      <select name="peopleCount" id="count" class="btn">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                      </select>
                      <button class="pckbtn btn">Add to cart</button>
                      <button class="pckbtn btn pay d-none">Pay Now</button>
                    </div>
                  </div>
                  <!-- End Price Box -->
                </div>
              </div>
            `;

            itemWrapper.innerHTML = itemCon1 + itemCon2 + itemCon3;
          } else {
            const moreItemCon = `
              <a
                href="../html/item.html"
                class="col splide__slide"
                draggable="false"
              >
                <h2>${itemData.category}</h2>
                <div class="image">
                  <img
                    src="${itemData.imgSrc}"
                    alt=""
                    draggable="false"
                  />
                </div>
                <div class="text">
                  <h3>${itemData.name}</h3>
                </div>
                <div class="footer">
                  <div class="price">Price: <sup>km</sup>${intPart}<sub>${decimalPart}</sub></div>
                </div>
              </a>
            `;

            moreItemWrapper.innerHTML += moreItemCon;
          }
        });

        carouselSplide(".splide");

        // Main image
        let previous = 0;
        const mainImage = document.querySelector(
            ".item-container .images .main img"
          ),
          imageList = document.querySelectorAll(
            ".item-container .images .list-container .img-container"
          );
        imageList.forEach((image, index) => {
          const imgElement = image.querySelector("img");
          image.addEventListener("mouseover", () => {
            mainImage.src = imgElement.src;
            image.classList.add("active");
            removeActive(index);
            previous = index;
          });
        });

        // remove class active in img
        function removeActive(hoverdIndex) {
          if (hoverdIndex != previous) {
            imageList[previous].classList.remove("active");
          }
        }
        //share icon
        const shareIcon = document.querySelector(".share-btn"),
          shareLists = document.querySelector(".icons .font-share-icons");

        shareIcon.addEventListener("click", () => {
          if (
            window.matchMedia("(max-width:500px)").matches &&
            navigator.share
          ) {
            navigator
              .share({
                title: "10 Days",
                text: "Come to stay with the best 10 Days",
                url: "https://ibrahimmoatazmohamed.github.io/IT-207-Introduction-to-Web-Programming/assets/html/item.html",
              })
              .then(() => console.log("Successful share"))
              .catch((error) => console.log("Error sharing", error));
          } else {
            if (shareLists.style.display !== "grid") {
              shareLists.style.display = "grid";
              shareLists.style.animation =
                "appear var(--main-transition) linear forwards";
            } else {
              shareLists.style.animation =
                "hidden var(--main-transition) linear forwards";
              setTimeout(() => {
                shareLists.style.display = "none";
              }, 300);
            }
          }
        });

        // Hide share list on blur
        shareIcon.addEventListener("blur", () => {
          if (shareLists.style.display === "grid") {
            shareLists.style.animation =
              "hidden var(--main-transition) linear forwards";
            setTimeout(() => {
              shareLists.style.display = "none";
            }, 300);
          }
        });

        document.querySelector(".pckbtn").addEventListener("click", () => {
          const i = data[0];
          itemModal(i.category, i.name, i.imgSrc, i.min, i.max, i.price, false);
        });
      });
  }
  loadItems("../json/item.json");
});
