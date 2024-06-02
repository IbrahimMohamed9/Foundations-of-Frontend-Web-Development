var Utils = {
  block_ui: (element, small) => {
    $(element).block({
      message: small
        ? '<div class="loader small"></div>'
        : '<div class="loader"></div>',
      css: {
        backgroundColor: "transparent",
        border: "0",
      },
      overlayCSS: {
        backgroundColor: "#000",
        opacity: 0.25,
      },
    });
  },
  unblock_ui: (element) => {
    $(element).unblock({});
  },
  setupModalActions: (message, removeeBtn, cartModal) => {
    const modal = cartModal
      ? document.getElementById("cartModal")
      : document.getElementById("myModal");
    modal.querySelector(".x").addEventListener("click", () => {
      Utils.removeModal(removeeBtn, modal);
    });
    if (removeeBtn || cartModal) {
      //TODO make it with unbock ui
      modal.querySelector(".checkout-btn").addEventListener("click", () => {
        Utils.removeModal(removeeBtn, modal);
        Utils.appearSuccAlert(message);
      });
    }
  },
  carouselSplide: (carousel, gap = 25) => {
    const splideTrack = document.querySelector(`${carousel} .splide__track`);

    const widthOfCol =
      document.querySelector(`${carousel} .splide__slide`).offsetWidth + gap;

    // check overflow
    const totalWidth = splideTrack.children[0].children.length * widthOfCol;

    if (
      totalWidth > document.documentElement.offsetWidth ||
      totalWidth > 1170
    ) {
      splideTrack.parentElement.parentElement.classList.add("overflow");

      //arrow design
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

      const splide = new Splide(carousel, {
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
  },
  itemModal: (
    item_id,
    persons,
    days,
    category,
    name,
    imgSrc,
    min,
    max,
    price,
    quantity,
    nameDescription,
    quantityDescription,
    quantity2,
    quantityDescription2,
    min2,
    max2,
    price2
    //plans
  ) => {
    console.log();
    if (Utils.get_from_localstorage("user") === null) {
      Utils.loginModal();
    } else {
      const modal = document.getElementById("myModal"),
        totalPriceModal = modal.querySelector(
          ".checkout .checkout--footer .price"
        ).children,
        body = document.body,
        itemName = modal.querySelector(".item-name"),
        itemDescription = itemName.nextElementSibling,
        quantityLabel = modal.querySelector(".quantity-label"),
        itemImage = modal.querySelector(".modal-img"),
        itemPrice = modal.querySelector(".price.small"),
        itemCategory = modal.querySelector(".top-title .title"),
        quantityBtns = Array.from(
          modal.querySelector(".master-container .cart .quantity").children
        ),
        quantityNumber = quantityBtns[1],
        quantity2Parent = modal.querySelector(
          ".master-container .cart .quantity-2"
        ).parentElement;

      itemDescription.textContent = nameDescription;
      itemCategory.textContent = category;
      itemName.textContent = name;
      itemImage.src = imgSrc;
      quantityNumber.textContent = quantity;
      quantityLabel.textContent = quantityDescription;

      if (
        quantity2 !== "" &&
        quantity2 !== null &&
        typeof quantity2 !== "undefined"
      ) {
        $(quantity2Parent).css("display", "block");
        quantity2Parent.parentElement.classList.add("hotel");
        const quantityBtns2 = Array.from(
            quantity2Parent.querySelector(".master-container .cart .quantity-2")
              .children
          ),
          quantityNumber2 = quantityBtns2[1];

        quantityNumber2.textContent = quantity2;

        quantity2Parent.querySelector(".quantity-label-2").innerHTML =
          quantityDescription2;

        Utils.totalPriceModal(
          parseInt(quantityNumber.textContent) * Number(price) +
            parseInt(quantityNumber2.textContent) * Number(price2),
          totalPriceModal,
          itemPrice,
          Number(price) + Number(price2)
        );

        quantityNumber2.textContent = quantity2;
        Utils.quantityBtnFunction(
          min,
          max,
          price,
          quantityNumber,
          totalPriceModal,
          [
            quantityBtns[0],
            quantityBtns[2],
            quantityBtns2[0],
            quantityBtns2[2],
          ],
          min2,
          max2,
          price2,
          quantityNumber2
        );

        $("#myModal .checkout .checkout-btn").click(() => {
          CartService.addToCart(
            item_id,
            quantityNumber.textContent,
            quantityNumber2.textContent
          );
        });
      } else {
        Utils.quantityBtnFunction(
          min,
          max,
          price,
          quantityNumber,
          totalPriceModal,
          [quantityBtns[0], quantityBtns[2]],
          -1,
          -1,
          -1,
          -1
        );

        $(quantity2Parent).css("display", "none");
        quantity2Parent.parentElement.classList.remove("hotel");

        Utils.totalPriceModal(
          parseInt(quantityNumber.textContent) * Number(price),
          totalPriceModal,
          itemPrice,
          price
        );
        $("#myModal .checkout .checkout-btn").on("click", () => {
          category === "package"
            ? CartService.addToCart(item_id, quantityNumber.textContent, days)
            : CartService.addToCart(
                item_id,
                persons,
                quantityNumber.textContent
              );
        });
      }

      // if (plans) {
      //   modal.querySelector(".select-container").style.display = "block";
      //   modal
      //     .querySelector(".cart .products .product p")
      //     .classList.remove("active");
      // } else {
      // modal.querySelector(".select-container").style.display = "none";
      // modal.querySelector(".cart .products .product p").classList.add("active");
      // }

      modal.classList.add("d-block");
      body.classList.add("fix");
      setTimeout(() => {
        modal.classList.add("active");
      }, 1);
    }
  },
  totalPriceModal: (total, totalPriceModal, itemPrice, price) => {
    totalPriceModal[1].textContent = Math.floor(total);
    totalPriceModal[2].textContent = Utils.checkDec(total);
    itemPrice.textContent = `${Utils.checkDecWithInt(price)} KM`;
  },
  getPrice: (category, itemData) => {
    return category === "package"
      ? itemData.person_price
      : category === "car"
      ? itemData.day_price
      : Number(itemData.day_price) + Number(itemData.person_price);
  },
  checkDecWithInt: (price) => {
    return `${Math.floor(parseFloat(price))}${Utils.checkDec(price)}`;
  },
  checkDec: (number) => {
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
  },
  counter: (() => {
    let counter = 0;
    return (restart) => {
      restart ? (counter = 0) : counter++;
      return counter;
    };
  })(),
  quantityBtnFunction: (
    min,
    max,
    price,
    quantityNumber,
    totalPriceModal,
    elements,
    min2,
    max2,
    price2,
    quantityNumber2,
    cart,
    totalItemPriceCart,
    quantityNumberCart,
    otherQuantity2,
    itemIndex
  ) => {
    $.each(elements, (index, element) => {
      const plus = index % 2,
        maxUsed = index <= 1 ? max : max2,
        quantityUsed = index <= 1 ? quantityNumber : quantityNumber2,
        minUsed = index <= 1 ? min : min2;
      let buttom = () => {
        const otherQuantity = index <= 1 ? quantityNumber2 : quantityNumber,
          priceUsed = index <= 1 ? price : price2,
          otherPrice = index <= 1 ? price2 : price;
        Utils.buttomFunction(
          plus,
          priceUsed,
          quantityUsed,
          totalPriceModal,
          otherPrice,
          otherQuantity,
          cart,
          totalItemPriceCart,
          quantityNumberCart,
          otherQuantity2,
          itemIndex
        );
      };

      $(element).click(() => {
        if (plus && parseInt(quantityUsed.textContent) < maxUsed) {
          buttom();
        } else if (!plus && parseInt(quantityUsed.textContent) > minUsed) {
          buttom();
        } else {
          Utils.appearFailAlert(
            plus ? "This is the maximum number" : "This is the minimum number"
          );
        }
      });
      // if (cart && Utils.counter() === 1) {
      //   $(window).on("hashchange", Utils.handleHashChange);
      //   $(window).on("beforeunload", Utils.handleHashChange);
      // }
    });
  },
  // handleHashChange: () => {
  //   CartService.updateCart(true);
  //   $(window).off("hashchange", Utils.handleHashChange);
  //   $(window).off("beforeunload", Utils.handleHashChange);
  // },
  appearFailAlert: (message) => {
    const quantityAlert = document.querySelector(
      ".alert.alert-danger.decrease"
    );
    quantityAlert.classList.remove("d-none");
    quantityAlert.textContent = message;
    quantityAlert.style.animation = "alert 1.7s linear forwards";
    quantityAlert.addEventListener("animationend", () => {
      quantityAlert.classList.add("d-none");
    });
  },
  buttomFunction: (
    plus,
    price,
    quantityNumberModal,
    totalPriceModal,
    otherPrice,
    otherQuantity,
    cart,
    totalItemPriceCart,
    quantityNumberCart,
    otherQuantity2,
    itemIndex
  ) => {
    const parentOfParent = quantityNumberModal.parentElement;

    quantityNumberModal.textContent =
      parseInt(quantityNumberModal.textContent) + (plus ? 1 : -1);

    if (cart && !parentOfParent.classList.contains("quantity-2")) {
      quantityNumberCart.textContent = quantityNumberModal.textContent;
    } else if (cart && parentOfParent.classList.contains("quantity-2")) {
      otherQuantity2.textContent = quantityNumberModal.textContent;
    }

    let total = parseInt(quantityNumberModal.textContent) * Number(price);
    if (otherPrice > -1) {
      total += parseInt(otherQuantity.textContent) * Number(otherPrice);
    }
    if (cart) {
      const storedArray = JSON.parse(localStorage.getItem("cart_items")),
        selectedNumber = quantityNumberModal.textContent;
      storedArray[itemIndex]["changed"] = true;
      if (storedArray[itemIndex]["category"] === "hotel") {
        storedArray[itemIndex]["persons_selected"] = selectedNumber;
        storedArray[itemIndex]["days_selected"] = otherQuantity2.textContent;
      } else {
        storedArray[itemIndex]["category"] === "package"
          ? (storedArray[itemIndex]["persons_selected"] = selectedNumber)
          : (storedArray[itemIndex]["days_selected"] = selectedNumber);
      }
      localStorage.setItem("cart_items", JSON.stringify(storedArray));

      totalItemPriceCart.children[1].textContent = Math.floor(total);
      totalItemPriceCart.children[2].textContent = Utils.checkDec(total);
      let currentTotal = Number(localStorage.getItem("totalPrice"));

      currentTotal += plus ? parseFloat(price) : -parseFloat(price);
      totalPriceModal[1].innerHTML = Math.floor(currentTotal);
      totalPriceModal[2].innerHTML = Utils.checkDec(currentTotal);

      localStorage.setItem("totalPrice", currentTotal);
    } else {
      totalPriceModal[1].textContent = Math.floor(total);
      totalPriceModal[2].textContent = Utils.checkDec(total);
    }
  },
  removeModal: (removeBtn, modal) => {
    if (removeBtn) {
      const quantityBtns = modal.querySelector(
          ".master-container .cart .quantity"
        ),
        quantityBtns2 = modal.querySelector(
          ".master-container .cart .quantity-2"
        );
      Utils.removeAllEventListeners(quantityBtns);
      Utils.removeAllEventListeners(quantityBtns2);
      Utils.removeAllEventListeners($("#myModal .checkout .checkout-btn")[0]);
    }

    modal.classList.remove("active");
    document.body.classList.remove("fix");
    setTimeout(() => {
      modal.classList.remove("d-block");
    }, 300);
  },
  removeAllEventListeners: (element) => {
    const clone = element.cloneNode(true);
    element.parentNode.replaceChild(clone, element);
  },
  appearSuccAlert: (message) => {
    const addItemAlert = document.querySelector(
      ".alert.alert-success.add-item"
    );
    addItemAlert.innerHTML = message;
    addItemAlert.classList.remove("d-none");
    addItemAlert.style.animation = "alert 1.7s linear forwards";
    addItemAlert.addEventListener("animationend", () => {
      addItemAlert.classList.add("d-none");
    });
  },
  appearModal: (cartModal) => {
    const selectedOptions = document.querySelectorAll(
        ".cart .containerr .products .row .select-container select option:checked"
      ),
      modal = cartModal
        ? document.getElementById("cartModal")
        : document.getElementById("myModal");
    let selectedText = [];
    selectedOptions.forEach((option) => {
      if (option.selected) {
        selectedText.push(option.textContent.trim());
      }
    });
    document
      .querySelectorAll(".cart .products .product p.plan")
      .forEach((element, index) => {
        element.textContent = selectedText[index];
      });

    modal.classList.add("d-block");
    document.body.classList.add("fix");
    setTimeout(() => {
      modal.classList.add("active");
    }, 1);
  },
  loginModal: () => {
    const modal = $("#loginModal");

    modal.html(Components.loginModal);
    $(modal).addClass("d-block");
    $("body").addClass("fix");
    Utils.formAnimation();
    setTimeout(() => {
      $(modal).addClass("active");
    }, 1);

    const signComponents = Array.from(
      document.querySelectorAll(".sign-component")
    );
    container = signComponents.shift();
    signComponents.forEach((btn, index) => {
      btn.addEventListener("click", () => {
        switch (index) {
          case 0:
            container.style.transform = "rotateY(0deg)";
            break;
          case 1:
            container.style.transform = "rotateY(-180deg)";
            break;
          case 2:
            container.classList.remove("right-panel-active");
            break;
          case 3:
            container.classList.add("right-panel-active");
            break;
          default:
            console.log("You add new sign-btn without event");
            break;
        }
      });
    });

    document.getElementById("sign_up").addEventListener("click", () => {
      UserService.signUp("sign_up_form", modal);
    });

    document.getElementById("sign_in").addEventListener("click", () => {
      UserService.signIn("sign_in_form", modal);
    });
  },
  fieldAnimation: (field) => {
    if (field.value.trim() !== "") {
      field.classList.add("active", "delay");
    }
    field.addEventListener("focus", (input) => {
      input.target.classList.add("active", "delay");
    });
    field.addEventListener("blur", (input) => {
      if (input.target.value.trim() == "") {
        input.target.classList.remove("active");
        input.target.value = input.target.value.trim();
      }
    });
  },

  resetFormAnimation: () => {
    const textareas = document.querySelectorAll("textarea.field"),
      fields = document.querySelectorAll(".form-control input"),
      txtarLabels = document.querySelectorAll(".txtar-la");

    textareas.forEach((textarea, index) => {
      txtarLabels[index].classList.remove("active");
      textarea.classList.remove("active");
    });
    fields.forEach((field) => {
      field.classList.remove("active");
    });
  },
  formAnimation: () => {
    const textareas = document.querySelectorAll("textarea.field"),
      fields = document.querySelectorAll(".form-control input"),
      txtarLabels = document.querySelectorAll(".txtar-la");

    textareas.forEach((textarea, index) => {
      if (textarea.value.trim() !== "") {
        txtarLabels[index].classList.add("active", "delay");
        textarea.classList.add("active");
      }
      textarea.addEventListener("focus", () => {
        txtarLabels[index].classList.add("active", "delay");
        textarea.classList.add("active");
      });
      textarea.addEventListener("blur", () => {
        if (textarea.value.trim() == "") {
          txtarLabels[index].classList.remove("active");
          textarea.classList.remove("active");
          textarea.value = textarea.value.trim();
        }
      });
    });

    fields.forEach((field) => {
      Utils.fieldAnimation(field);
    });
  },
  submit: (
    post,
    form_id,
    to,
    success_mge,
    callBack,
    modal,
    formElement,
    validate,
    messages
  ) => {
    const form = formElement ? formElement : $("#" + form_id);
    const block = form.find("*[type=submit]").first();

    FormValidation.validate(form, validate, messages, (data) => {
      Utils.block_ui(block);
      if (data["added_time"]) {
        data["added_time"] = Utils.formatDateTime(data["added_time"]);
      }
      RestClient.request(
        to,
        post ? "POST" : "PUT",
        data,
        (data) => {
          form[0].reset();
          Utils.unblock_ui(block);
          if (modal) Utils.removeModal(false, modal);

          if (success_mge) Utils.appearSuccAlert(success_mge);
          if (callBack) callBack(data);
        },
        (xhr) => {
          Utils.unblock_ui(block);
          if (modal) Utils.removeModal(false, modal);
          Utils.appearFailAlert(xhr.responseText);
        }
      );
    });
  },
  submitPost: (form_id, to, success_mge, callBack, modal, formElement) => {
    const form = formElement ? formElement : $("#" + form_id),
      block = form.find("*[type=submit]").first();

    FormValidation.validate(form, {}, {}, (data) => {
      Utils.block_ui(block);
      $.post(Constants.get_api_base_url() + to, data)
        .done((data) => {
          form[0].reset();
          Utils.unblock_ui(block);
          if (modal) Utils.removeModal(false, modal);

          if (success_mge) Utils.appearSuccAlert(success_mge);
          if (callBack) callBack();
        })
        .fail((xhr) => {
          Utils.unblock_ui(block);

          if (modal) Utils.removeModal(false, modal);

          Utils.appearFailAlert(xhr.responseText);
        });
    });
  },
  submitPut: (form_id, to, success_mge, callBack, modal, formElement) => {
    const form = formElement ? formElement : $("#" + form_id),
      block = form.find("*[type=submit]").first();

    FormValidation.validate(form, {}, {}, (data) => {
      Utils.block_ui(block);
      RestClient.put(
        to,
        data,
        (data) => {
          form[0].reset();
          Utils.unblock_ui(block);
          if (modal) Utils.removeModal(false, modal);

          if (success_mge) Utils.appearSuccAlert(success_mge);
          if (callBack) callBack();
        },
        (xhr) => {
          Utils.unblock_ui(block);

          if (modal) Utils.removeModal(false, modal);

          Utils.appearFailAlert(xhr.responseText);
        }
      );
    });
  },
  formSetup: (modal, submit) => {
    Utils.formAnimation();
    if (modal) {
      modal.querySelector(".x").addEventListener("click", () => {
        Utils.removeModal(false, modal);
      });
    }
    Utils.appearModal(false);

    if (submit) {
      submit();
    }
  },
  capitalizeFirstLetter: (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  },
  capitalizeWords: (str) => {
    return str.replace(/\b\w/g, function (char) {
      return char.toUpperCase();
    });
  },
  firstLink: (imgs_srcs) => {
    return `https${imgs_srcs.trim().split("https")[1]}`;
  },
  removeAllChildrenExcept: (parentElement, exceptionElements) => {
    Array.from(parentElement.children).forEach((child) => {
      if (!exceptionElements.includes(child)) {
        parentElement.removeChild(child);
      }
    });
  },
  dateOfTimestamp: (date) => {
    return date.split(" ")[0];
  },
  addBtnsAnimation: (form, btn, inputField, icon) => {
    form.hasClass("d-none")
      ? form.removeClass("d-none").addClass("between-flex")
      : setTimeout(() => {
          form.addClass("d-none").removeClass("between-flex");
        }, 300);

    btn.toggleClass("hidden-by-width");

    setTimeout(() => {
      inputField.toggleClass("hidden-by-width");
      if (icon) icon.toggleClass("fs-0");
    }, 0);
  },
  addDaysToDate: (daysToAdd) => {
    try {
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() + daysToAdd);

      // Format the date components
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Zero-based month
      const day = String(currentDate.getDate()).padStart(2, "0");
      const hours = String(currentDate.getHours()).padStart(2, "0");
      const minutes = String(currentDate.getMinutes()).padStart(2, "0");
      const seconds = String(currentDate.getSeconds()).padStart(2, "0");

      const formattedTimestamp = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
      return formattedTimestamp;
    } catch (error) {
      return "Error occurred while calculating the new timestamp.";
    }
  },
  formatDateTime: (isoDateTime) => {
    let formattedDateTime = isoDateTime.replace("T", " ");

    if (formattedDateTime.split(" ")[1].split(":").length === 2) {
      formattedDateTime += ":00";
    }

    return formattedDateTime;
  },
  get_from_localstorage: (key) => {
    return JSON.parse(localStorage.getItem(key));
  },
  set_to_localstorage: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  showImage: (imgSrc) => {
    modal = $("#loginModal");

    modal.html(`<img src="${imgSrc}" alt="" class="img-modal">`);
    $(modal).addClass("d-block");
    $("body").addClass("fix");
    setTimeout(() => {
      $(modal).addClass("active");
    }, 1);

    $(modal).click(() => {
      $(modal).removeClass("active");

      $("body").removeClass("fix");

      setTimeout(() => {
        $(modal).removeClass("d-block");
      }, 300);
    });
  },
};
