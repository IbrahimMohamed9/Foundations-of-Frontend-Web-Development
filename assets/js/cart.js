import {
  modal,
  appearQuantityAlert,
  checkDec,
  body,
  setupModalActions,
} from "./component.js";

document.addEventListener("DOMContentLoaded", () => {
  const modalProducts = modal.querySelector(".products"),
    sumOfTotalModal = modal.querySelector(
      ".checkout .checkout--footer .price"
    ).children;
  let totalPricesCart,
    totalPricesModal,
    quantitiesCart,
    quantitiesModal,
    sumOfTotalPrices = 0;
  setupModalActions("Items Registered Successfully!", false);

  //load the items of shopping cart
  function loadItems(src) {
    fetch(src)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const items = document.querySelector(".cart.shopping .cart-rows");
        let content, modalContent;
        data.map((itemData) => {
          const price = parseFloat(itemData.price),
            decimalPart = checkDec(parseFloat(itemData.price)),
            totalPrice = parseFloat(itemData.price) * itemData.quantaty,
            totalDecimalPart = checkDec(totalPrice);
          sumOfTotalPrices = totalPrice + parseFloat(sumOfTotalPrices);

          if (itemData.category == "package") {
            modalContent = `      
              <div class="products">
                <div class="product">
                  <img src="${itemData.imgSrc}" alt="" />
                  <div>
                    <span>${itemData.category}</span>
                    <p>${itemData.name}</p>
                    <p>${itemData.plan}</p>
                  </div>
                  <div class="quantity">
                    <button>
                      <i class="fa-solid fa-minus"></i>
                    </button>
                    <span>${itemData.quantaty}</span>
                    <button>
                      <i class="fa-solid fa-plus"></i>
                    </button>
                  </div>
                  <span class="price small">
                    <sup>KM</sup>
                    <span>${Math.floor(price)}</span>
                    <sub>${decimalPart}</sub>
                  </span>
                </div>
              </div>
            `;
            content = `
                <div class="row">
                  <div class="image">
                    <img src="${itemData.imgSrc}" alt="" />
                  </div>
                  <div class="name-plan">
                    <h2>${itemData.name}</h2>
                    <div class="select-container">
                      <select name="plans">
                        <option value="plan1">Plan 1</option>
                        <option value="plan2">Plan 2</option>
                        <option value="plan3">Plan 3</option>
                        <option value="plan4">Plan 4</option>
                      </select>
                      <i class="fa-solid fa-chevron-down"></i>
                    </div>
                  </div>
                  <div class="price">
                    <p>
                      <span class="price small">
                        <sup>KM</sup>
                        <span>${Math.floor(price)}</span>
                        <sub>${decimalPart}</sub>
                      </span>
                    </p>
                  </div>
                  <div class="quantity">
                    <button>
                      <i class="fa-solid fa-minus"></i>
                    </button>
                    <span>${itemData.quantaty}</span>
                    <button>
                      <i class="fa-solid fa-plus"></i>
                    </button>
                  </div>
                  <div class="total">
                    <p>
                      <sup>KM</sup>
                      <span class="totalInt">${Math.floor(totalPrice)}</span>
                      <sup class="down">${totalDecimalPart}</sup>
                      <i class="fa-solid fa-trash trash"></i>
                      <i class="fa-solid fa-circle-minus circle-minus"></i>
                    </p>
                  </div>
                </div>
              `;
          } else {
            modalContent = `      
              <div class="products">
                <div class="product">
                  <img src="${itemData.imgSrc}" alt="" />
                  <div>
                    <span>${itemData.category}</span>
                    <p>${itemData.name}</p>
                  </div>
                  <div class="quantity">
                    <button>
                      <i class="fa-solid fa-minus"></i>
                    </button>
                    <span>${itemData.quantaty}</span>
                    <button>
                      <i class="fa-solid fa-plus"></i>
                    </button>
                  </div>
                  <span class="price small">
                    <sup>KM</sup>
                    <span>${Math.floor(price)}</span>
                    <sub>${decimalPart}</sub>
                  </span>
                </div>
              </div>
            `;
            content = `
              <div class="row">
                <div class="image">
                  <img src="${itemData.imgSrc}" alt="" />
                </div>
                <div class="name-plan">
                  <h2>${itemData.name}</h2>
                </div>
                <div class="price">
                  <p>
                    <sup>KM</sup>${Math.floor(price)}<sub class="down"
                      >${decimalPart}</sub
                    >
                  </p>
                </div>
                <div class="quantity">
                  <button>
                    <i class="fa-solid fa-minus"></i>
                  </button>
                  <span>${itemData.quantaty}</span>
                  <button>
                    <i class="fa-solid fa-plus"></i>
                  </button>
                </div>
                <div class="total">
                  <p>
                    <sup>KM</sup>
                    <span class="totalInt">${Math.floor(totalPrice)}</span>
                    <sup class="down">${totalDecimalPart}</sup>
                    <i class="fa-solid fa-trash trash"></i>
                    <i class="fa-solid fa-circle-minus circle-minus"></i>
                  </p>
                </div>
              </div>
            `;
          }
          items.innerHTML += content;
          modalProducts.innerHTML += modalContent;
        });

        const sumOfInts = Math.floor(sumOfTotalPrices),
          sumOfDecs = checkDec(sumOfTotalPrices);
        sumOfTotalModal[1].innerHTML = sumOfInts;
        sumOfTotalModal[2].innerHTML = sumOfDecs;

        totalPricesCart = Array.from(
          items.querySelectorAll(".cart .containerr .products .row .total p")
        );

        totalPricesModal = Array.from(
          modal.querySelectorAll(".card .small.price")
        );

        quantitiesCart = document.querySelectorAll(
          ".cart .containerr .products .row .quantity"
        );
        quantitiesCart.forEach((cartQuantity, index) => {
          const itemData = data[index],
            quantityBtns = quantitiesCart[index].children;

          quantityBtns[0].addEventListener("click", () => {
            cartQuantityBtn(
              itemData.min,
              itemData.max,
              0,
              itemData.price,
              index
            );
          });
          quantityBtns[2].addEventListener("click", () => {
            cartQuantityBtn(
              itemData.min,
              itemData.max,
              1,
              itemData.price,
              index
            );
          });
        });
        quantitiesModal = document.querySelectorAll(
          ".master-container .cart .quantity"
        );

        quantitiesModal.forEach((bottom, index) => {
          const itemData = data[index],
            quantityBtns = quantitiesModal[index].children;

          quantityBtns[0].addEventListener("click", () => {
            cartQuantityBtn(
              itemData.min,
              itemData.max,
              0,
              itemData.price,
              index
            );
          });
          quantityBtns[2].addEventListener("click", () => {
            cartQuantityBtn(
              itemData.min,
              itemData.max,
              1,
              itemData.price,
              index
            );
          });
        });
      });
  }

  loadItems("../json/cart.json");

  //change the quantity and prices in modal and page
  function cartQuantityBtn(min, max, plus, price, index) {
    const quantityCart = quantitiesCart[index].children[1];
    plus
      ? parseInt(quantityCart.textContent) < max
        ? buttomFunction(plus, price, index)
        : appearQuantityAlert("This is the maximum number")
      : parseInt(quantityCart.textContent) > min
      ? buttomFunction(plus, price, index)
      : appearQuantityAlert("This is the minimum number");
  }

  function buttomFunction(plus, price, index) {
    const quantityModal = quantitiesModal[index].children[1],
      quantityCart = quantitiesCart[index].children[1];

    quantityCart.textContent = quantityModal.textContent =
      parseInt(quantityCart.textContent) + (plus ? 1 : -1);

    const intPartCart = totalPricesCart[index].children[1],
      decPartCart = totalPricesCart[index].children[2];

    const total = parseInt(quantityCart.textContent) * Number(price);

    sumOfTotalPrices += plus ? parseFloat(price) : -parseFloat(price);

    intPartCart.textContent = intPartCart.textContent = Math.floor(total);
    decPartCart.textContent = decPartCart.textContent = checkDec(total);

    sumOfTotalModal[1].innerHTML = Math.floor(sumOfTotalPrices);
    sumOfTotalModal[2].innerHTML = checkDec(sumOfTotalPrices);
  }
});
