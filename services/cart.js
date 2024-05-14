var CartService = {
  addToCart: (user_id, item_id, persons, days) => {
    const data = {
      user_id: user_id,
      item_id: item_id,
      persons_selected: persons ?? 0,
      days_selected: days ?? 0,
    };

    // TODO fix when add two same item to cart
    CartService.submit(
      "carts/add_item",
      data,
      "Item added successfully",
      "#myModal .checkout .checkout-btn"
    );
  },
  submit: async (to, data, success_mge, block_selector, modal) => {
    const block = $(block_selector);
    //TODO add unblock_ui and use remove modal in this time
    // Utils.block_ui(block);
    modal = $("#myModal")[0];
    //TODO fix that to add
    localStorage.removeItem("cart_items");
    RestClient.post(
      to,
      data,
      async (response) => {
        if (modal) Utils.removeModal(true, modal);

        Utils.appearSuccAlert(success_mge);
        CartService.shoppingCartCounter(data.user_id, 1);
      },
      (xhr) => {
        Utils.unblock_ui(block);
        if (modal) Utils.removeModal(true, modal);
        Utils.appearFailAlert(xhr.responseText);
      }
    );
  },
  shoppingCartCounter: async (user_id, change) => {
    // try {
    // TODO make it in localstorage
    // const cart_items = JSON.parse(localStorage.getItem("cart_items"));
    // let counter = localStorage.getItem("counter");
    // if (counter === null || counter === undefined) {
    // const counter = await new Promise((resolve, reject) => {
    RestClient.get(
      "carts/counter/" + user_id,
      (data) => {
        $(".shopping-cart-icon").attr("data-counter", data.counter);
        // resolve(Number(data.counter));
      },
      () => {
        $(".shopping-cart-icon").attr("data-counter", 0);
        // resolve(Number(data.counter));
      }
      // (error) => {
      // reject(error);
      // }
    );
    // });
    // } else {
    //   if (change && counter.filter)
    //     counter = Number(JSON.parse(counter)) + change;
    // }

    // $(".shopping-cart-icon").attr("data-counter", counter);
    // localStorage.setItem("counter", JSON.stringify(counter));
    // } catch (error) {
    //   console.error("Error fetching cart items count:", error);
    // }
  },
  fetchCartItems: async (user_id) => {
    try {
      let data = localStorage.getItem("cart_items");

      if (data === null) {
        data = await new Promise((resolve, reject) => {
          RestClient.get(
            "carts/get/" + user_id,
            (data) => {
              data = data.data;
              resolve(
                data.map((itemData) => ({
                  ...itemData,
                  price: Utils.getPrice(itemData.category, itemData),
                  changed: false,
                  user_id: user_id,
                }))
              );
            },
            (error) => {
              reject(error);
            }
          );
        });
        localStorage.setItem("cart_items", JSON.stringify(data));
        return data;
      } else {
        return JSON.parse(data);
      }
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  },
  loadRows: async (user_id) => {
    const items = $(".cart.shopping .cart-rows")[0];
    const cartItems = await CartService.fetchCartItems(user_id);
    const modal = document.getElementById("cartModal");
    const modalProducts = modal.querySelector(".products");
    const sumOfTotalModal = modal.querySelector(
      ".checkout .checkout--footer .price"
    ).children;

    let content;
    let modalContent;
    let totalPricesCart;
    let totalPriceModal = 0;

    modalProducts.innerHTML = "";
    Utils.setupModalActions("Items Registered Successfully!", false, true);

    Utils.counter(true);
    Utils.removeAllChildrenExcept(items, [
      //first row title of table
      $(".cart .containerr .products .row:first-child")[0],
      //check out buttom
      $(".cart .containerr .products .footer")[0],
    ]);
    cartItems.forEach((itemData) => {
      const category = itemData.category;
      const price = itemData.price;
      const decimalPart = Utils.checkDec(price);
      const [totalPrice, totalDecimalPart] = CartService.getTotalItemPrice(
        itemData,
        false
      );
      const imgSrc = Utils.firstLink(itemData.imgs_srcs);
      totalPriceModal = totalPrice + parseFloat(totalPriceModal);
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

    const sumOfInts = Math.floor(totalPriceModal),
      sumOfDecs = Utils.checkDec(totalPriceModal);
    sumOfTotalModal[1].innerHTML = sumOfInts;
    sumOfTotalModal[2].innerHTML = sumOfDecs;

    //total column
    totalPricesCart = Array.from(
      items.querySelectorAll(".cart .containerr .products .row .total p")
    );
    //total in the modal footer
    totalPriceModal = Array.from(modal.querySelectorAll(".card .small.price"));
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
      const itemData = cartItems[index],
        category = itemData.category,
        quantityBtnsModal = Array.from(quantitiesCart[index].children),
        quantityBtnsCart = Array.from(quantitiesModal[index].children),
        quantityTxtCart = quantityBtnsCart[1],
        quantityTxtModal = quantityBtnsModal[1],
        quantities2CartArray =
          quantities2Cart !== undefined
            ? Array.from(quantities2Cart[Math.floor(counter)]?.children || [])
            : [];
      quantities2ModalArray =
        quantities2Modal !== undefined
          ? Array.from(quantities2Modal[Math.floor(counter)]?.children || [])
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
            category === "package" ? itemData.min_persons : itemData.min_days,
            category === "package" ? itemData.max_persons : itemData.max_days,
            category === "package" ? itemData.person_price : itemData.day_price,
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
    $.each($(".cart .containerr .products .row .total p i"), (index, icon) => {
      const currentItem = cartItems[Math.floor(removeIconCounter)];
      $(icon).click(() => {
        CartService.removeItemCart(
          currentItem["cart_item_id"],
          currentItem["user_id"],
          currentItem["name"]
        );
      });
      removeIconCounter += 0.5;
    });
    // TODO fix coupon part apply one times
    // and remove from local storage
    $(".coupons #coupon input[type=submit]").click(() => {
      CartService.coupon("coupon", sumOfTotalModal);
    });
  },
  getTotalItemPrice: (data, oneNumber) => {
    const totalPrice =
      Number(data.person_price) * Number(data.persons_selected) +
      Number(data.day_price) * Number(data.days_selected);
    return oneNumber
      ? Number(Utils.checkDecWithInt(totalPrice))
      : [totalPrice, Utils.checkDec(totalPrice)];
  },
  updateCart: async (user_id, removeLocalStorage) => {
    const items = await CartService.fetchCartItems(user_id);
    items.forEach((data) => {
      if (data.changed) {
        RestClient.put(
          "carts/item?cart_item_id=" +
            data.cart_item_id +
            "&persons_selected=" +
            data.persons_selected +
            "&days_selected=" +
            data.days_selected,
          null
        );
      }
    });
    if (removeLocalStorage) {
      localStorage.removeItem("cart_items");
      localStorage.removeItem("totalPrice");
    }
  },
  removeItemCart: (cart_item_id, user_id, name) => {
    if (confirm("Do you want to delete " + name + "?") == true) {
      // TODO: fix this amazing error the function call
      // callback_error instead of call back

      RestClient.delete(
        "carts/delete/" + cart_item_id,
        () => {},
        (error) => {
          // TODO make it withou remove from localStorage
          localStorage.removeItem("cart_items");
          console.log(error);
          CartService.loadRows(user_id);
          Utils.appearFailAlert(name + " was deleted");
          CartService.shoppingCartCounter(user_id, -1);
        }
      );
    }
  },
  //TODO fix when user open the modal in cart and go out
  coupon: (form_id, totalPriceModal) => {
    const form = $("#" + form_id);
    FormValidation.validate(form, {}, {}, (data) => {
      Utils.block_ui(form);
      RestClient.get(
        "carts/coupon?code=" + data.code,
        (data) => {
          form[0].reset();
          Utils.unblock_ui(form);
          if (data) {
            let coupons = JSON.parse(localStorage.getItem("coupons")) ?? [];

            let currentTotal = Number(localStorage.getItem("totalPrice"));
            currentTotal = data.amount
              ? currentTotal - data.amount
              : currentTotal - data.percentage * currentTotal;

            totalPriceModal[1].innerHTML = Math.floor(currentTotal);
            totalPriceModal[2].innerHTML = Utils.checkDec(currentTotal);

            coupons.push(data);
            localStorage.setItem("coupons", JSON.stringify(coupons));
            localStorage.setItem("totalPrice", currentTotal);
          } else {
            Utils.appearFailAlert("Invalid coupon");
          }
        },
        (error) => {
          Utils.unblock_ui(form);
          Utils.appearFailAlert(error);
        }
      );
    });
  },
  checkout: async (user_id, position, btn) => {
    Utils.block_ui(btn, true);
    CartService.updateCart(user_id);

    const couponsString = localStorage.getItem("coupons");
    const items = await CartService.fetchCartItems(user_id);
    let coupons;
    if (couponsString) coupons = JSON.parse(couponsString);

    const totalAmount = coupons
      ? coupons.reduce((acc, coupon) => acc + (coupon.amount ?? 0), 0)
      : 0;
    const totalPercentage = coupons
      ? coupons.map((coupon) => coupon.percentage ?? 0)
      : 0;

    items.forEach((item) => {
      let price = CartService.getTotalItemPrice(item, true);
      if (coupons) {
        const percentageToAmount = totalPercentage.reduce((acc, percentage) => {
          if (acc === 0) {
            return price * parseFloat(percentage);
          } else {
            return acc + acc * parseFloat(percentage);
          }
        }, 0);

        price -= percentageToAmount + totalAmount / items.length;
      }
      const data = {
        user_id: user_id,
        price: price,
        position: position,
        cart_item_id: item.cart_item_id,
        end_date: Utils.addDaysToDate(item.days_selected),
      };
      RestClient.post("projects/add", data);
    });
    RestClient.post(
      "carts/insert_cart/" + user_id,
      null,
      (data) => {
        // TODO make it more logic remove one by one
        localStorage.removeItem("coupons");
        localStorage.removeItem("totalPrice");
        localStorage.removeItem("cart_items");
        CartService.loadRows(user_id);
        CartService.shoppingCartCounter(user_id, 0);
        Utils.unblock_ui(btn);
      },
      (error) => {
        Utils.appearFailAlert(error);
        Utils.unblock_ui(btn);
      }
    );
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
