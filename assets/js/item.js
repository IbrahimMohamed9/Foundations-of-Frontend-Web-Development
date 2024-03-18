// Main image

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

leftArrowItems.addEventListener("focus", () => {
  leftArrowItems.classList.add("active");
});
leftArrowItems.addEventListener("blur", () => {
  leftArrowItems.classList.remove("active");
});

rightArrowItems.addEventListener("focus", () => {
  rightArrowItems.classList.add("active");
});
rightArrowItems.addEventListener("blur", () => {
  rightArrowItems.classList.remove("active");
});

//share icon
const shareIcon = document.querySelector(".share");
const shareLists = document.querySelectorAll(".icons .font-share-icons");

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
    }
  } else {
    if (shareLists[0].style.display === "grid") {
      shareLists[0].style.animation =
        "hidden var(--main-transition) linear forwards";
      setTimeout(() => {
        shareLists[0].style.display = "none";
      }, 300);
    } else {
      shareLists[0].style.display = "grid";
      shareLists[0].style.animation =
        "appear var(--main-transition) linear forwards";
    }
  }
});

//add to cart
var modal = document.getElementById("myModal");

var btns = document.querySelectorAll(".pckbtn");

function handleClick() {
  modal.classList.add("active");
  document.body.classList.add("fix");
}

btns.forEach((button) => button.addEventListener("click", handleClick));

document.querySelector(".x").addEventListener("click", function () {
  modal.classList.remove("active");
  document.body.classList.remove("fix");
});

document.querySelector(".checkout-btn").addEventListener("click", function () {
  modal.classList.remove("active");
  document.body.classList.remove("fix");
});
