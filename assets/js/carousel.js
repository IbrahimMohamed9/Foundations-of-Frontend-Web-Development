document.addEventListener("DOMContentLoaded", () => {
  // check overflow
  // function checkOverf(el) {
  //   const elOverf = el.style.overflow;
  //   if (!elOverf || elOverf === "visible") el.style.overflow = "hidden";
  //   const isOverflowing =
  //     el.clientWidth < el.scrollWidth || el.clientHeight < el.scrollHeight;
  //   el.style.overflow = elOverf;
  //   return isOverflowing;
  // }

  //carousel
  const splideTrack = document.querySelector(".splide .splide__track"),
    widthOfCol = splideTrack.querySelector(".splide__slide").offsetWidth;

  splideTrack.addEventListener("mousedown", () => {
    splideTrack.classList.add("clicked");
  });

  //arrow design
  setTimeout(() => {
    const arrows = document.querySelectorAll(
      ".splide__arrows.splide__arrows--ltr .arrow"
    );
    arrows.forEach((arrow) => {
      arrow.addEventListener("focus", () => {
        arrow.classList.add("active");
      });
      arrow.addEventListener("blur", () => {
        arrow.classList.remove("active");
      });
    });
  }, 100);

  var splide = new Splide(".splide", {
    type: "loop",
    perPage: Math.floor(splideTrack.offsetWidth / widthOfCol),
    focus: "center",
    gap: 25,
    classes: {
      arrows: "splide__arrows your-class-arrows",
      arrow: "splide__arrow your-class-arrow",
      prev: "splide__arrow--prev your-class-prev left-arrow arrow",
      next: "splide__arrow--next your-class-next right-arrow arrow",
    },
  });

  splide.mount();
});
