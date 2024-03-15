const mainImage = document.querySelector(".item-container .images .main img");
const imageList = document.querySelectorAll(
  ".item-container .images .list-container .img-container"
);
imageList.forEach((image, index) => {
  const imgElement = image.querySelector("img");
  image.addEventListener("mouseover", () => {
    mainImage.src = imgElement.src;
    image.classList.add("active");
    removeActive(index);
  });
});

function removeActive(hoverdIndex) {
  imageList.forEach((image, index) => {
    if (!(hoverdIndex === index)) {
      image.classList.remove("active");
    }
  });
}

function check(el) {
  let curOverf = el.style.overflow;

  if (!curOverf || curOverf === "visible") el.style.overflow = "hidden";

  let isOverflowing =
    el.clientWidth < el.scrollWidth || el.clientHeight < el.scrollHeight;

  el.style.overflow = curOverf;

  return isOverflowing;
}

const parentItems = document.getElementById("more-items-parent");
const containerItems = document.getElementById("more-items-container");

scrollItems();
function scrollItems() {
  if (check(parentItems)) {
    parentItems.style.setProperty("--display", "flex");
    containerItems.style.justifyContent = "left";
  }
}
const leftArrowItems = document.querySelector(".more-items .left-arrow");
const rightArrowItems = document.querySelector(".more-items .right-arrow");

leftArrowItems.addEventListener("click", () => {
  containerItems.style.transform = "translateX(-125px)";
});
rightArrowItems.addEventListener("click", () => {
  containerItems.style.transform = "translateX(125px)";
});

const shareIcons = document.querySelectorAll(".share");

shareIcons.forEach((shareIcon, index) => {
  shareIcon.addEventListener("click", () => {
    if (window.matchMedia("(max-width:500px)").matches) {
      if (navigator.share) {
        navigator
          .share({
            title: "Web Share API Draft",
            text: "Take a look at this spec!",
            url: "https://wicg.github.io/web-share/#share-method",
          })
          .then(() => console.log("Successful share"))
          .catch((error) => console.log("Error sharing", error));
      } else {
        console.log("Share not supported on this browser, do it the old way.");
      }
    } else {
      const parentDiv = shareIcon.parentElement;
      const shareList = parentDiv.querySelector(".font-share-icons");
      if (shareList.style.display === "grid") {
        shareList.style.display = "none";
      } else {
        shareList.style.display = "grid";
      }
    }
  });
});
