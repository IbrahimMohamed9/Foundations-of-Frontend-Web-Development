document.addEventListener("DOMContentLoaded", () => {
  //carousel
  const carousel = document.querySelector(".splide"),
    splideTrack = carousel.querySelector(".splide .splide__track"),
    widthOfCol = splideTrack.querySelector(".splide__slide").offsetWidth;

  // check overflow
  if (
    splideTrack.children[0].children.length * widthOfCol >
    document.documentElement.offsetWidth
  ) {
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
    }, 1);

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
  } else {
    carousel.classList.remove("splide");
    carousel.classList.add("not-overflow");
  }
});
