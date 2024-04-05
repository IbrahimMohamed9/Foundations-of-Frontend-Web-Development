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

export function loadItems(
  src,
  content1,
  content2,
  content3,
  content4,
  modalTitle
) {
  fetch(src)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      const items = document.querySelector(`.items.${modalTitle} .container`);
      data.map((itemData) => {
        const car =
          content1 +
          itemData.imgSrc +
          content2 +
          itemData.name +
          content3 +
          itemData.price +
          content4;
        items.innerHTML += car;
      });

      document
        .querySelectorAll(`.items.${modalTitle} .container .pckbtn`)
        .forEach((button, index) =>
          button.addEventListener("click", () => {
            const itemData = data[index];
            itemModal(
              modalTitle,
              itemData.name,
              itemData.imgSrc,
              itemData.min,
              itemData.max,
              itemData.price,
              false
            );
          })
        );

      carouselSplide(`.splide.${modalTitle}-carousel`, 20);
    });
}

export function packages(
  src,
  redirect,
  sectionSelector,
  carouselSelector,
  gap
) {
  fetch(src)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      const packages = document.querySelector(sectionSelector);
      data.map((packageData) => {
        const packageCon = `
            <div class="item splide__slide">
            <div class="box">
              <div class="back face">
                <button class="button" id="${packageData.id}-1">plan 1</button>
                <button class="button" id="${packageData.id}-2">plan 2</button>
                <button class="button" id="${packageData.id}-3">plan 3</button>
                <button class="button" id="${packageData.id}-4">plan 4</button>
              </div>
              <div class="image face">
                <img src="${packageData.imgSrc}" alt="" />
              </div>
            </div>
            <div class="text">
              <h3>${packageData.name}</h3>
              <p>Price: ${packageData.price} KM</p>
            </div>
            <button class="pckbtn"></button>
          </div>
          `;
        packages.innerHTML += packageCon;
      });

      document.querySelectorAll(".pckbtn").forEach((button, index) =>
        button.addEventListener("click", () => {
          const packageData = data[index];

          itemModal(
            "Package",
            packageData.name,
            packageData.imgSrc,
            packageData.min,
            packageData.max,
            packageData.price,
            true
          );
        })
      );

      carouselSplide(carouselSelector, gap);

      //redirect
      document.querySelectorAll(".item .back .button").forEach((button) => {
        button.addEventListener("click", () => {
          window.location = redirect;
        });
      });
    });
}
