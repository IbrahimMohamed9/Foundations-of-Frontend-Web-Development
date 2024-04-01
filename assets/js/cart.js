import { modal, appearQuantityAlert, body, addItemAlert } from "./component.js";

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
  setupModalActions();

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
            decimalPart = checkDec(price),
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
                    <span>${Math.floor(totalPrice)}</span>
                    <sub>${totalDecimalPart}</sub>
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
                    <p><sup>KM</sup>${Math.floor(
                      price
                    )}<sup class="down">${decimalPart}</sup></p>
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
                    <span>${Math.floor(totalPrice)}</span>
                    <sub>${totalDecimalPart}</sub>
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
    const quantityModal = quantitiesModal[index].children[1],
      quantityCart = quantitiesCart[index].children[1];

    if (plus) {
      if (parseInt(quantityCart.textContent) < max) {
        quantityCart.textContent = quantityModal.textContent =
          parseInt(quantityCart.textContent) + 1;

        const intPartModal = totalPricesModal[index].children[1],
          decPartModal = totalPricesModal[index].children[2],
          intPartCart = totalPricesCart[index].children[1],
          decPartCart = totalPricesCart[index].children[2];

        const total =
          Number(intPartModal.textContent) +
          Number(decPartModal.textContent) +
          Number(price);
        sumOfTotalPrices += parseFloat(price);

        intPartModal.textContent = intPartCart.textContent = Math.floor(total);
        decPartModal.textContent = decPartCart.textContent = checkDec(total);
        const sumOfInts = Math.floor(sumOfTotalPrices),
          sumOfDecs = checkDec(sumOfTotalPrices);
        sumOfTotalModal[1].innerHTML = sumOfInts;
        sumOfTotalModal[2].innerHTML = sumOfDecs;
      } else {
        appearQuantityAlert("This is the maximum number");
      }
    } else {
      if (parseInt(quantityCart.textContent) > min) {
        quantityCart.textContent = quantityModal.textContent =
          parseInt(quantityCart.textContent) - 1;

        const intPartModal = totalPricesModal[index].children[1],
          decPartModal = totalPricesModal[index].children[2],
          intPartCart = totalPricesCart[index].children[1],
          decPartCart = totalPricesCart[index].children[2];

        const total =
          Number(intPartModal.textContent) +
          Number(decPartModal.textContent) -
          Number(price);

        sumOfTotalPrices -= parseFloat(price);

        intPartModal.textContent = intPartCart.textContent = Math.floor(total);
        decPartModal.textContent = decPartCart.textContent = checkDec(total);
        const sumOfInts = Math.floor(sumOfTotalPrices),
          sumOfDecs = checkDec(sumOfTotalPrices);
        sumOfTotalModal[1].innerHTML = sumOfInts;
        sumOfTotalModal[2].innerHTML = sumOfDecs;
      } else {
        appearQuantityAlert("This is the minimum number");
      }
    }
  }

  //remove unnecessary decimal zeroes
  function checkDec(number) {
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

  //remove the modal
  function removeItemModal() {
    modal.classList.remove("active");
    body.classList.remove("fix");
    setTimeout(() => {
      modal.classList.remove("d-block");
    }, 300);
  }
  //add the functionality of modal buttons
  function setupModalActions() {
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
});
