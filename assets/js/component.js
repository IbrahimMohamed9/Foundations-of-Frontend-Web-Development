export const modal = document.getElementById("myModal"),
  addItemAlert = document.querySelector(".alert.alert-success.add-item"),
  quantityAlert = document.querySelector(".alert.alert-danger.decrease"),
  modalName = modal.querySelector(".item-name"),
  modalImage = modal.querySelector(".modal-img"),
  modalPrice = modal.querySelector(".price.small"),
  body = document.body,
  quantity = modal.querySelector(".cart .quantity"),
  modalType = modal.querySelector(".top-title .title");

//appear the modal
var quantityNumber, quantityBtns;

export function itemModal(type, name, imgSrc, min, max, price, plans = true) {
  quantityBtns = Array.from(quantity.children);

  modalType.textContent = type;
  quantityNumber = quantityBtns[1];
  modalName.textContent = name;
  modalImage.src = imgSrc;
  modalPrice.textContent = `${price} KM`;
  quantityNumber.textContent = min;

  quantityBtns[0].addEventListener("click", () => {
    modalButton(0, min, max);
  });
  quantityBtns[2].addEventListener("click", () => {
    modalButton(2, min, max);
  });

  if (plans) {
    modal.querySelector(".select-container").style.display = "block";
    modal
      .querySelector(".cart .products .product p")
      .classList.remove("active");
  } else {
    modal.querySelector(".select-container").style.display = "none";
    modal.querySelector(".cart .products .product p").classList.add("active");
  }

  modal.classList.add("d-block");
  body.classList.add("fix");
  setTimeout(() => {
    modal.classList.add("active");
  }, 1);
}

//increse and decrease the quantity
export function modalButton(index, min, max) {
  if (index === 0) {
    if (parseInt(quantityNumber.textContent) - min)
      quantityNumber.textContent = parseInt(quantityNumber.textContent) - 1;
    else {
      appearQuantityAlert("This is the minimum number");
    }
  } else {
    if (parseInt(quantityNumber.textContent) < max)
      quantityNumber.textContent = parseInt(quantityNumber.textContent) + 1;
    else {
      appearQuantityAlert("This is the maximum number");
    }
  }
}

function appearQuantityAlert(message) {
  quantityAlert.classList.remove("d-none");
  quantityAlert.textContent = message;
  quantityAlert.style.animation = "alert 1.7s linear forwards";
  quantityAlert.addEventListener("animationend", () => {
    quantityAlert.classList.add("d-none");
  });
}

//remove the modal
export function removeItemModal() {
  removeAllEventListeners(quantityBtns[0]);
  removeAllEventListeners(quantityBtns[2]);

  modal.classList.remove("active");
  body.classList.remove("fix");
  setTimeout(() => {
    modal.classList.remove("d-block");
  }, 300);
}

//add the functionality of modal buttons
export function setupModalActions() {
  document.querySelector(".x").addEventListener("click", removeItemModal);

  document.querySelector(".checkout-btn").addEventListener("click", () => {
    removeItemModal();

    addItemAlert.classList.remove("d-none");
    addItemAlert.style.animation = "alert 1.7s linear forwards";
    addItemAlert.addEventListener("animationend", () => {
      addItemAlert.classList.add("d-none");
    });
  });
}

function removeAllEventListeners(element) {
  const clone = element.cloneNode(true);
  element.parentNode.replaceChild(clone, element);
}

export function redirect(src) {
  window.location = src;
}

export function carouselSplide(carousel, gap = 25) {
  const splideTrack = document.querySelector(`${carousel} .splide__track`);

  const widthOfCol =
    document.querySelector(`${carousel} .splide__slide`).offsetWidth + gap;

  // check overflow
  const totalWidth = splideTrack.children[0].children.length * widthOfCol;

  if (totalWidth > document.documentElement.offsetWidth || totalWidth > 1170) {
    splideTrack.parentElement.parentElement.classList.add("overflow");

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

    var splide = new Splide(carousel, {
      type: "loop",
      perPage: Math.floor(splideTrack.offsetWidth / widthOfCol),
      perMove: 1,
      focus: 0,
      gap: gap,
      autoWidth: true,
      keyboard: "global",
      wheel: true,
      speed: 1500,
      wheelSleep: 200,
      drag: true,
      classes: {
        arrows: "splide__arrows your-class-arrows",
        arrow: "splide__arrow your-class-arrow",
        prev: "splide__arrow--prev your-class-prev left-arrow arrow",
        next: "splide__arrow--next your-class-next right-arrow arrow",
      },
    }).mount();
  } else {
    splideTrack.parentElement.classList.remove("splide");
    splideTrack.parentElement.classList.add("not-overflow");
  }
}
