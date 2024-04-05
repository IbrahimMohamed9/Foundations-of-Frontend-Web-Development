import { setupModalActions, carouselSplide, itemModal } from "./component.js";

document.addEventListener("DOMContentLoaded", () => {
  setupModalActions();

  carouselSplide(".splide");

  // Main image
  var previous = 0;

  const mainImage = document.querySelector(".item-container .images .main img"),
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

  function removeActive(hoverdIndex) {
    if (hoverdIndex != previous) {
      imageList[previous].classList.remove("active");
    }
  }

  //share icon
  const shareIcon = document.querySelector(".share-btn"),
    shareLists = document.querySelector(".icons .font-share-icons");

  shareIcon.addEventListener("click", () => {
    if (window.matchMedia("(max-width:500px)").matches && navigator.share) {
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

  document.querySelector(".pckbtn").addEventListener("click", itemModal);
});
