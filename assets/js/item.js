function check(el) {
  let curOverf = el.style.overflow;

  if (!curOverf || curOverf === "visible") el.style.overflow = "hidden";

  let isOverflowing =
    el.clientWidth < el.scrollWidth || el.clientHeight < el.scrollHeight;

  el.style.overflow = curOverf;

  return isOverflowing;
}

const parentItems = document.getElementById("more-items-parent");

scrollItems();
function scrollItems() {
  if (check(parentItems)) {
    parentItems.style.setProperty("--display", "flex");
  }
}
const leftArrowItems = document.querySelector(".more-items .left-arrow");
const rightArrowItems = document.querySelector(".more-items .right-arrow");
const containerItems = document.getElementById("more-items-container");

leftArrowItems.addEventListener("click", () => {
  containerItems.style.transform = "translateX(-125px)";
});
rightArrowItems.addEventListener("click", () => {
  containerItems.style.transform = "translateX(125px)";
});
