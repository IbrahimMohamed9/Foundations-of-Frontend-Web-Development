export const modal = document.getElementById("myModal"),
  addItemAlert = document.querySelector(".alert.alert-success.add-item"),
  quantityAlert = document.querySelector(".alert.alert-danger.decrease"),
  modalName = modal.querySelector(".item-name"),
  modalImage = modal.querySelector(".modal-img"),
  modalPrice = modal.querySelector(".price.small"),
  body = document.body,
  modalQuantity = modal.querySelector(".master-container .cart .quantity"),
  modalType = modal.querySelector(".top-title .title"),
  sumOfTotalModal = modal.querySelector(
    ".checkout .checkout--footer .price"
  ).children;

//appear the modal
var quantityNumber, quantityBtns;

export function itemModal(
  type,
  name,
  imgSrc,
  min,
  max,
  price,
  quantaty,
  plans = true
) {
  quantityBtns = Array.from(modalQuantity.children);

  modalType.textContent = type;
  quantityNumber = quantityBtns[1];
  modalName.textContent = name;
  modalImage.src = imgSrc;
  modalPrice.textContent = `${price} KM`;
  quantityNumber.textContent = quantaty;

  const total = parseInt(quantityNumber.textContent) * Number(price);
  sumOfTotalModal[1].textContent = Math.floor(total);
  sumOfTotalModal[2].textContent = checkDec(total);

  quantityBtns[0].addEventListener("click", () => {
    cartQuantityBtn(min, max, 0, price, quantityNumber);
  });
  quantityBtns[2].addEventListener("click", () => {
    cartQuantityBtn(min, max, 1, price, quantityNumber);
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

//change the quantity and prices in modal and page
function cartQuantityBtn(min, max, plus, price, quantityNumber) {
  plus
    ? parseInt(quantityNumber.textContent) < max
      ? buttomFunction(plus, price, quantityNumber)
      : appearQuantityAlert("This is the maximum number")
    : parseInt(quantityNumber.textContent) > min
    ? buttomFunction(plus, price, quantityNumber)
    : appearQuantityAlert("This is the minimum number");
}
function buttomFunction(plus, price, quantityNumber) {
  quantityNumber.textContent =
    parseInt(quantityNumber.textContent) + (plus ? 1 : -1);

  const total = parseInt(quantityNumber.textContent) * Number(price);

  sumOfTotalModal[1].textContent = Math.floor(total);
  sumOfTotalModal[2].textContent = checkDec(total);
}

export function appearQuantityAlert(message) {
  quantityAlert.classList.remove("d-none");
  quantityAlert.textContent = message;
  quantityAlert.style.animation = "alert 1.7s linear forwards";
  quantityAlert.addEventListener("animationend", () => {
    quantityAlert.classList.add("d-none");
  });
}

//remove the modal
export function removeItemModal(removeeBtn) {
  if (removeeBtn) {
    removeAllEventListeners(quantityBtns[0]);
    removeAllEventListeners(quantityBtns[2]);
  }

  modal.classList.remove("active");
  body.classList.remove("fix");
  setTimeout(() => {
    modal.classList.remove("d-block");
  }, 300);
}

//add the functionality of modal buttons
export function setupModalActions(
  message = "Cart: Item Added!",
  removeeBtn = true
) {
  document.querySelector(".x").addEventListener("click", () => {
    removeItemModal(removeeBtn);
  });

  document.querySelector(".checkout-btn").addEventListener("click", () => {
    removeItemModal(removeeBtn);
    appearSuccAlert(message);
  });
}

export function appearSuccAlert(message) {
  addItemAlert.innerHTML = message;
  addItemAlert.classList.remove("d-none");
  addItemAlert.style.animation = "alert 1.7s linear forwards";
  addItemAlert.addEventListener("animationend", () => {
    addItemAlert.classList.add("d-none");
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
        const content =
          content1 +
          itemData.imgSrc +
          content2 +
          itemData.name +
          content3 +
          itemData.price +
          content4;
        items.innerHTML += content;
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
              itemData.quantaty,
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
            packageData.quantaty,
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

//remove unnecessary decimal zeroes
export function checkDec(number) {
  let decPartTest = Number(
    String((parseFloat(number) - Math.floor(number)).toFixed(2)).slice(3)
  );
  if (decPartTest) {
    decPartTest = String(
      (parseFloat(number) - Math.floor(number)).toFixed(2)
    ).slice(1);
  } else {
    decPartTest = String(
      (parseFloat(number) - Math.floor(number)).toFixed(1)
    ).slice(1);
  }

  return Number(decPartTest) ? decPartTest : "";
}
