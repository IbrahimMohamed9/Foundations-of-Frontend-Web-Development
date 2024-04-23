var CartService = {
  addToCart: (cart_id, item_id, persons, days) => {
    const data = {
      cart_id: cart_id,
      item_id: item_id,
      persons_selected: persons ?? 0,
      days_selected: days ?? 0,
    };

    CartService.submit(
      "carts/add_item_cart.php",
      data,
      "Item added successfully",
      "#myModal .checkout .checkout-btn"
    );
  },
  submit: (to, data, success_mge, block_selector, modal) => {
    const block = $(block_selector);
    Utils.block_ui(block);
    modal = $("#myModal")[0];
    $.post(Constants.API_BASE_URL + to, data)
      .done((data) => {
        Utils.unblock_ui(block);
        if (modal) Utils.removeModal(true, modal);

        Utils.appearSuccAlert(success_mge);
        CartService.shoppingCartCounter(1);
      })
      .fail((xhr) => {
        Utils.unblock_ui(block);

        if (modal) Utils.removeModal(true, modal);

        Utils.appearFailAlert(xhr.responseText);
      });
  },
  shoppingCartCounter: (cart_id) => {
    RestClient.get(
      "carts/get_cart_items_number_by_id.php?cart_id=" + cart_id,
      (data) => {
        document
          .querySelector(".fa-solid.fa-cart-shopping.cart-shopping")
          .setAttribute("data-counter", data.counter);
      }
    );
  },
  loadCart: (cart_id) => {
    fetch(
      Constants.API_BASE_URL +
        "carts/get_cart_items_by_id.php?cart_id=" +
        cart_id
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        Utils.setupModalActions("Items Registered Successfully!", false, true);
        const items = document.querySelector(".cart.shopping .cart-rows");
        let content, modalContent;

        const modal = document.getElementById("cartModal"),
          modalProducts = modal.querySelector(".products"),
          sumOfTotalModal = modal.querySelector(
            ".checkout .checkout--footer .price"
          ).children;
        let totalPricesCart,
          totalPriceModal = 0;
        modalProducts.innerHTML = "";
        Utils.counter(true);
        Utils.removeAllChildrenExcept(items, [
          $(".cart .containerr .products .row:first-child")[0],
          $(".cart .containerr .products .footer")[0],
        ]);
        let itemsLocalStorage = [];
        data.map((itemData) => {
          const category = itemData.category,
            price = Utils.getPrice(category, itemData),
            decimalPart = Utils.checkDec(price),
            totalPrice =
              Number(itemData.person_price) *
                Number(itemData.persons_selected) +
              Number(itemData.day_price) * Number(itemData.days_selected),
            totalDecimalPart = Utils.checkDec(totalPrice),
            imgSrc = Utils.firstLink(itemData.imgs_srcs);
          totalPriceModal = totalPrice + parseFloat(totalPriceModal);

          itemsLocalStorage.push({
            item_id: itemData.item_id,
            cart_id: itemData.cart_id,
            persons_selected: itemData.persons_selected,
            days_selected: itemData.days_selected,
            category: category,
            name: itemData.name,
          });

          // add package plan here
          modalContent = `
              <div class="products">
                <div class="product ${category === "hotel" ? "hotel" : ""}">
                  <img class="modal-img" src="${imgSrc}" alt="${category} Image" />
                  <div>
                    <p class="item-name">${category}</p>
                    <p class="item-description">${itemData.name}</p>
                  </div>
                ${
                  category === "hotel"
                    ? `
                        <div>
                          <span class="quantity-label-2 center">Days</span>
                          <div class="quantity-2">
                            <button>
                              <i class="fa-solid fa-minus"></i>
                            </button>
                            <span>${itemData.days_selected}</span>
                            <button>
                              <i class="fa-solid fa-plus"></i>
                            </button>
                          </div>
                        </div>

                        <div>
                          <span class="quantity-label center">Persons</span>
                          <div class="quantity">
                            <button>
                              <i class="fa-solid fa-minus"></i>
                            </button>
                            <span>${itemData.persons_selected}</span>
                            <button>
                              <i class="fa-solid fa-plus"></i>
                            </button>
                          </div>
                        </div>
                      `
                    : `
                    <div>
                      <span class="quantity-label center">${
                        category === "package" ? "Persons" : "Days"
                      }</span>
                      <div class="quantity">
                        <button>
                          <i class="fa-solid fa-minus"></i>
                        </button>
                        <span>${
                          category === "package"
                            ? itemData.persons_selected
                            : itemData.days_selected
                        }</span>
                        <button>
                          <i class="fa-solid fa-plus"></i>
                        </button>
                      </div>
                    </div>
                  `
                }
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
                  <img src="${imgSrc}" alt="" />
                </div>
                <div class="name-plan">
                  <h2>${itemData.name}</h2>
                </div>
                <div class="price">
                  <p>
                    <sup>KM</sup>${Math.floor(
                      price
                    )}<sub class="down">${decimalPart}</sub>
                  </p>
                </div>
                ${
                  category === "hotel"
                    ? `
                  <div class="products">
                    <div class="product hotel btns">
                      <div>
                        <span class="quantity-label-2 center">Days</span>
                        <div class="quantity-2">
                          <button>
                            <i class="fa-solid fa-minus"></i>
                          </button>
                          <span>${itemData.days_selected}</span>
                          <button>
                            <i class="fa-solid fa-plus"></i>
                          </button>
                        </div>
                      </div>

                      <div>
                        <span class="quantity-label center">Persons</span>
                        <div class="quantity">
                          <button>
                            <i class="fa-solid fa-minus"></i>
                          </button>
                          <span>${itemData.persons_selected}</span>
                          <button>
                            <i class="fa-solid fa-plus"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                      `
                    : `
                  <div class="exception">
                    <div>
                      <span class="quantity-label center">${
                        category === "package" ? "Persons" : "Days"
                      }</span>
                      <div class="quantity">
                        <button>
                          <i class="fa-solid fa-minus"></i>
                        </button>
                        <span>${
                          category === "package"
                            ? itemData.persons_selected
                            : itemData.days_selected
                        }</span>
                        <button>
                          <i class="fa-solid fa-plus"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  `
                }
                <div class="total">
                  <p>
                    <sup>KM</sup>
                    <span class="totalInt">${Math.floor(totalPrice)}</span>
                    <sup class="down">${totalDecimalPart}</sup>
                    <i class="fa-solid fa-trash trash"></i>
                    <i class="fa-solid fa-circle-minus circle-minus"></i>
                  </p>
                </div>
              </div>`;
          // } the closer of else block for package plan

          items.innerHTML += content;
          modalProducts.innerHTML += modalContent;
        });

        localStorage.setItem("cart_items", JSON.stringify(itemsLocalStorage));

        const sumOfInts = Math.floor(totalPriceModal),
          sumOfDecs = Utils.checkDec(totalPriceModal);
        sumOfTotalModal[1].innerHTML = sumOfInts;
        sumOfTotalModal[2].innerHTML = sumOfDecs;

        //total column
        totalPricesCart = Array.from(
          items.querySelectorAll(".cart .containerr .products .row .total p")
        );
        //total in the modal footer
        totalPriceModal = Array.from(
          modal.querySelectorAll(".card .small.price")
        );
        const quantitiesCart = document.querySelectorAll(
            ".cart .containerr .products .row .quantity"
          ),
          quantities2Cart = document.querySelectorAll(
            ".cart .containerr .products .row .quantity-2"
          ),
          quantitiesModal = document.querySelectorAll(
            "#cartModal .master-container .cart .quantity"
          ),
          quantities2Modal = document.querySelectorAll(
            "#cartModal .master-container .cart .quantity-2"
          );
        let counter = 0.0;
        quantitiesCart.forEach((cartQuantity, index) => {
          const itemData = data[index],
            category = itemData.category,
            quantityBtnsModal = Array.from(quantitiesCart[index].children),
            quantityBtnsCart = Array.from(quantitiesModal[index].children),
            quantityTxtCart = quantityBtnsCart[1],
            quantityTxtModal = quantityBtnsModal[1],
            quantities2CartArray =
              quantities2Cart !== undefined
                ? Array.from(
                    quantities2Cart[Math.floor(counter)]?.children || []
                  )
                : [];
          quantities2ModalArray =
            quantities2Modal !== undefined
              ? Array.from(
                  quantities2Modal[Math.floor(counter)]?.children || []
                )
              : [];
          localStorage.setItem(
            "totalPrice",
            String(Number(sumOfInts) + Number(sumOfDecs))
          );
          buttom = (
            quantityBtnsArray,
            quantityTxtCart,
            quantityTxtModal,
            quantityBtns2Array,
            otherQuantityBtn2
          ) => {
            quantityBtnsArray.splice(1, 1);
            if (category !== "hotel") {
              Utils.quantityBtnFunction(
                category === "package"
                  ? itemData.min_persons
                  : itemData.min_days,
                category === "package"
                  ? itemData.max_persons
                  : itemData.max_days,
                category === "package"
                  ? itemData.person_price
                  : itemData.day_price,
                quantityTxtModal,
                sumOfTotalModal,
                quantityBtnsArray,
                -1,
                -1,
                -1,
                "",
                true,
                totalPricesCart[index],
                quantityTxtCart,
                "",
                index
              );
            } else {
              const quantityNumber2Cart = quantityBtns2Array[1];
              Utils.quantityBtnFunction(
                itemData.min_days,
                itemData.max_days,
                itemData.day_price,
                quantityTxtModal,
                sumOfTotalModal,
                quantityBtnsArray.concat([
                  quantityBtns2Array[0],
                  quantityBtns2Array[2],
                ]),
                itemData.min_persons,
                itemData.max_persons,
                itemData.person_price,
                quantityNumber2Cart,
                true,
                totalPricesCart[index],
                quantityTxtCart,
                otherQuantityBtn2[1],
                index
              );
              counter += 0.5;
            }
          };

          buttom(
            quantityBtnsCart,
            quantityTxtCart,
            quantityTxtModal,
            quantities2CartArray,
            quantities2ModalArray
          );
          buttom(
            quantityBtnsModal,
            quantityTxtCart,
            quantityTxtModal,
            quantities2ModalArray,
            quantities2CartArray
          );
        });
        let removeIconCounter = 0.0;
        $.each(
          $(".cart .containerr .products .row .total p i"),
          (index, icon) => {
            const currentItem =
              itemsLocalStorage[Math.floor(removeIconCounter)];
            $(icon).click(() => {
              CartService.removeItemCart(
                currentItem["cart_id"],
                currentItem["item_id"],
                currentItem["name"]
              );
            });
            removeIconCounter += 0.5;
          }
        );
        document
          .querySelector(".coupons .form#coupon")
          .addEventListener("click", () => {
            CartService.coupon("coupon", sumOfTotalModal);
          });
      });
  },
  updateCart: (removeLocalStorage) => {
    // TODO: MAKE MORE SAFETY
    JSON.parse(localStorage.getItem("cart_items")).forEach((data) => {
      $.post(Constants.API_BASE_URL + "carts/update_item_cart.php", data)
        .done((data) => {})
        .fail((xhr) => {});
    });
    if (removeLocalStorage) {
      localStorage.removeItem("cart_items");
      localStorage.removeItem("totalPrice");
    }
  },
  removeItemCart: (cart_id, item_id, name) => {
    if (confirm("Do you want to delete " + name + "?") == true) {
      RestClient.delete(
        "carts/delete_item_cart.php?cart_id=" + cart_id + "&item_id=" + item_id,
        () => {},
        () => {
          CartService.loadCart(1);
          Utils.appearFailAlert(name + " was deleted");
        }
      );
    }
  },
  coupon: (form_id, totalPriceModal) => {
    const form = $("#" + form_id);

    FormValidation.validate(form, {}, (data) => {
      Utils.block_ui(form);
      $.post(Constants.API_BASE_URL + "carts/check_coupon.php", data)
        .done((data) => {
          form[0].reset();
          Utils.unblock_ui(form);

          let currentTotal = Number(localStorage.getItem("totalPrice"));
          currentTotal = data.amount
            ? currentTotal - data.amount
            : currentTotal - data.percentage * currentTotal;

          totalPriceModal[1].innerHTML = Math.floor(currentTotal);
          totalPriceModal[2].innerHTML = Utils.checkDec(currentTotal);

          localStorage.setItem("totalPrice", currentTotal);
        })
        .fail((xhr) => {
          Utils.unblock_ui(form);

          Utils.appearFailAlert(xhr.responseText);
        });
    });
  },
  checkOut: () => {
    CartService.updateCart(false);
    // TODO: MAKE MORE SAFETY

    JSON.parse(localStorage.getItem("cart_items")).forEach((data) => {
      $.post(Constants.API_BASE_URL + "carts/check_out.php", data)
        .done((data) => {})
        .fail((xhr) => {});
    });
    localStorage.removeItem("cart_items");
    localStorage.removeItem("totalPrice");
  },
};
/*
          if (category == "package") {
            modalContent = `
              <div class="products">
                <div class="product">
                  <img src="${imgSrc}" alt="" />
                  <div>
                    <span>${category}</span>
                    <p>${itemData.name}</p>

                    <p class="plan">${itemData.plan}</p>
                  </div>

                  <div class="quantity">
                    <button><i class="fa-solid fa-minus"></i></button>
                    <span>${itemData.quantity}</span>
                    <button><i class="fa-solid fa-plus"></i></button>
                  </div>

                  <span class="price small">
                    <sup>KM</sup> <span>${Math.floor(price)}</span>
                    <sub>${decimalPart}</sub>
                  </span>
                </div>
              </div>
              `;
            content = `
              <div class="row">
                <div class="image"><img src="${imgSrc}" alt="" /></div>

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
                      <sup>KM</sup> <span>${Math.floor(price)}</span>
                      <sub>${decimalPart}</sub>
                    </span>
                  </p>
                </div>

                <div class="quantity">
                  <button><i class="fa-solid fa-minus"></i></button>
                  <span>${itemData.quantity}</span>
                  <button><i class="fa-solid fa-plus"></i></button>
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
            */
