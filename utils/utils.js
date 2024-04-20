var Utils = {
  block_ui: function (element) {
    $(element).block({
      message: '<div class="loader"></div>',
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
  unblock_ui: function (element) {
    $(element).unblock({});
  },
  setupModalActions: function (
    message = "Cart: Item Added!",
    removeeBtn = true,
    cartModal = false
  ) {
    const modal = cartModal
      ? document.getElementById("cartModal")
      : document.getElementById("myModal");
    modal.querySelector(".x").addEventListener("click", () => {
      Utils.removeModal(removeeBtn, modal);
    });

    modal.querySelector(".checkout-btn").addEventListener("click", () => {
      Utils.removeModal(removeeBtn, modal);
      Utils.appearSuccAlert(message);
    });
  },
  carouselSplide: function (carousel, gap = 25) {
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
  },
  itemModal: function (
    category,
    name,
    imgSrc,
    min,
    max,
    price,
    quantity,
    nameDescription,
    quantityDescription
    //plans
  ) {
    const modal = document.getElementById("myModal"),
      sumOfTotalModal = modal.querySelector(
        ".checkout .checkout--footer .price"
      ).children,
      body = document.body,
      itemName = modal.querySelector(".item-name"),
      itemDescription = itemName.nextElementSibling,
      quantityLabel = modal.querySelector(".quantity-label"),
      itemImage = modal.querySelector(".modal-img"),
      itemPrice = modal.querySelector(".price.small"),
      itemCategory = modal.querySelector(".top-title .title"),
      modalQuantity = modal.querySelector(".master-container .cart .quantity"),
      quantityBtns = Array.from(modalQuantity.children);
    itemDescription.textContent = nameDescription;
    itemCategory.textContent = category;
    quantityNumber = quantityBtns[1];
    itemName.textContent = name;
    itemImage.src = imgSrc;
    itemPrice.textContent = `${price} KM`;
    quantityNumber.textContent = quantity;
    quantityLabel.textContent = quantityDescription;

    const total = parseInt(quantityNumber.textContent) * Number(price);
    sumOfTotalModal[1].textContent = Math.floor(total);
    sumOfTotalModal[2].textContent = Utils.checkDec(total);

    quantityBtns[0].addEventListener("click", () => {
      Utils.cartQuantityBtn(
        min,
        max,
        0,
        price,
        quantityNumber,
        sumOfTotalModal
      );
    });
    quantityBtns[2].addEventListener("click", () => {
      Utils.cartQuantityBtn(
        min,
        max,
        1,
        price,
        quantityNumber,
        sumOfTotalModal
      );
    });

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
  },
  checkDec: function (number) {
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
  cartQuantityBtn: function (
    min,
    max,
    plus,
    price,
    quantityNumber,
    sumOfTotalModal
  ) {
    plus
      ? parseInt(quantityNumber.textContent) < max
        ? Utils.buttomFunction(plus, price, quantityNumber, sumOfTotalModal)
        : Utils.appearFailAlert("This is the maximum number")
      : parseInt(quantityNumber.textContent) > min
      ? Utils.buttomFunction(plus, price, quantityNumber, sumOfTotalModal)
      : Utils.appearFailAlert("This is the minimum number");
  },
  appearFailAlert: function (message) {
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
  buttomFunction: function (plus, price, quantityNumber, sumOfTotalModal) {
    quantityNumber.textContent =
      parseInt(quantityNumber.textContent) + (plus ? 1 : -1);

    const total = parseInt(quantityNumber.textContent) * Number(price);

    sumOfTotalModal[1].textContent = Math.floor(total);
    sumOfTotalModal[2].textContent = Utils.checkDec(total);
  },
  removeModal: function (removeBtn, modal) {
    if (removeBtn) {
      const quantityBtns = Array.from(
        modal.querySelector(".master-container .cart .quantity").children
      );
      Utils.removeAllEventListeners(quantityBtns[0]);
      Utils.removeAllEventListeners(quantityBtns[2]);
    }

    modal.classList.remove("active");
    document.body.classList.remove("fix");
    setTimeout(() => {
      modal.classList.remove("d-block");
    }, 300);
  },
  removeAllEventListeners: function (element) {
    const clone = element.cloneNode(true);
    element.parentNode.replaceChild(clone, element);
  },
  appearSuccAlert: function (message) {
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
  appearModal: function (cartModal = true) {
    const selectedOptions = document.querySelectorAll(
        ".cart .containerr .products .row .select-container select option:checked"
      ),
      modal = cartModal
        ? document.getElementById("cartModal")
        : document.getElementById("myModal"),
      masterContainer = modal.querySelector(".master-container");
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

      // Check if the height of master container is more than the height of the customer
      const masterContainerHeight = masterContainer.offsetHeight,
        customerHeight = window.innerHeight;

      if (masterContainerHeight > customerHeight) {
        masterContainer.style.marginTop = "115px";
        masterContainer.style.paddingBottom = "50px";
      }
    }, 1);
  },
  fieldAnimation: function (field) {
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
        setTimeout(() => {
          input.target.classList.remove("delay");
        }, 500);
      }
    });
  },
  formAnimation: function () {
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
          setTimeout(() => {
            txtarLabels[index].classList.remove("delay");
          }, 900);
        }
      });
    });

    fields.forEach((field) => {
      Utils.fieldAnimation(field);
    });
  },
  submit: function (form_id, to, success_mge, block_id, loadTable, modal) {
    const form = $("#" + form_id),
      block = $("#" + block_id);

    FormValidation.validate(form, {}, (data) => {
      Utils.block_ui(block);
      $.post(Constants.API_BASE_URL + to, data)
        .done(function (data) {
          form[0].reset();
          Utils.unblock_ui(block);
          if (modal) {
            Utils.removeModal(false, modal);
          }
          Utils.appearSuccAlert(success_mge);
          if (loadTable) {
            loadTable();
          }
        })
        .fail(function (xhr) {
          Utils.unblock_ui(block);

          if (modal) {
            Utils.removeModal(false, modal);
          }
          Utils.appearFailAlert(xhr.responseText);
        });
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
};
