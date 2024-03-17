//share icon in article
const shareIcons = document.querySelectorAll(".share");

shareIcons.forEach((shareIcon, index) => {
  shareIcon.addEventListener("click", () => {
    const parentDiv = shareIcon.parentElement;
    const shareList = parentDiv.querySelector(".font-share-icons");
    if (shareList.style.display === "grid") {
      shareList.style.display = "none";
    } else {
      shareList.style.display = "grid";

      shareIcons.forEach((shareIcon1, index1) => {
        if (index1 !== index) {
          removeOpenShare(index1);
        }
      });
    }
  });
});

function removeOpenShare(index) {
  const shareIcon = shareIcons[index];
  const parentDiv = shareIcon.parentElement;
  const shareList = parentDiv.querySelector(".font-share-icons");
  shareList.style.display = "none";
}

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
let buttons = document.querySelectorAll(".info .row .content button");

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

//redirect plan 1
document.getElementById("p-1-4").addEventListener("click", redirect);
function redirect() {
  window.location = "assets/html/item.html";
}
