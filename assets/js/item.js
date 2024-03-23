document.addEventListener("DOMContentLoaded", () => {
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

  // check overflow
  function checkOverf(el) {
    const elOverf = el.style.overflow;
    if (!elOverf || elOverf === "visible") el.style.overflow = "hidden";
    const isOverflowing =
      el.clientWidth < el.scrollWidth || el.clientHeight < el.scrollHeight;
    el.style.overflow = elOverf;
    return isOverflowing;
  }

  //arrows design
  const carousel = document.getElementById("carousel"),
    arrows = document.querySelectorAll(".wrapper button.arrow");

  if (checkOverf(carousel)) {
    arrows[0].parentNode.style.setProperty("--display", "block");
  }

  arrows.forEach((arrow, index) => {
    arrow.addEventListener("focus", () => {
      arrow.classList.add("active");
    });
    arrow.addEventListener("blur", () => {
      arrow.classList.remove("active");
    });
  });

  //share icon
  const shareIcon = document.querySelector(".share"),
    shareLists = document.querySelectorAll(".icons .font-share-icons");

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
});
