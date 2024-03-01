const scrollers = document.querySelectorAll(".scroller");
if (!window.matchMedia("(prefers-reduced-motion: reduce").matches) {
  addAnimation();
}
function addAnimation() {
  scrollers.forEach((scroller) => {
    scroller.setAttribute("data-animated", true);

    const scrollerInner = scroller.querySelector(".scroller__inner");
    const scrollerConternt = Array.from(scrollerInner.children);

    scrollerConternt.forEach((item) => {
      const duplicatedItem = item.cloneNode(true);
      duplicatedItem.setAttribute("aria-hidden", true);
      scrollerInner.appendChild(duplicatedItem);
    });
  });
}

let buttons = document.querySelectorAll(".info .row .content button");

buttons.forEach((button) => {
  button.addEventListener("click", function () {
    let span = this.querySelector("span");
    let paragraph = this.nextElementSibling;

    paragraph.classList.toggle("show");

    if (paragraph.classList.contains("show")) {
      span.textContent = "";
    } else {
      span.textContent = "More";
    }
  });
});

const heartIcon = document.querySelector(".heart.fa-regular");

heartIcon.addEventListener("mouseenter", () => {
  heartIcon.classList.remove("fa-regular");
  heartIcon.classList.add("fa-solid");
});

heartIcon.addEventListener("mouseleave", () => {
  heartIcon.classList.remove("fa-solid");
  heartIcon.classList.add("fa-regular");
});
