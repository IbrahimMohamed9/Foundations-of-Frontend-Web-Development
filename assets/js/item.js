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
  containerItems.style.transform = "translateX(-225px)";
  leftArrowItems.style.outlineColor = "var(--secondary-color)";
});

rightArrowItems.addEventListener("click", () => {
  containerItems.style.transform = "translateX(125px)";
  rightArrowItems.style.outlineColor = "var(--secondary-color)";
});

const shareIcons = document.querySelectorAll(".share");

shareIcons.forEach((shareIcon, index) => {
  shareIcon.addEventListener("click", () => {
    if (window.matchMedia("(max-width:500px)").matches) {
      if (navigator.share) {
        navigator
          .share({
            title: "10 Days",
            text: "Come to stay with the best 10 Days",
            url: "https://ibrahimmoatazmohamed.github.io/IT-207-Introduction-to-Web-Programming/assets/html/item.html",
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
