function articles(src, redirect, sectionSelector) {
  fetch(src)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      const articles = document.querySelector(sectionSelector);
      data.map((articleData) => {
        const articleCon = `
          <div class="col">
            <a href="${redirect}">
              <div class="card">
                <img
                  src="${articleData.imgSrc}"
                  class="card-img-top"
                  alt="Article Image"
                />
                <div class="card-body">
                  <h3 class="card-title">${articleData.title}</h3>
                  <p class="card-text">
                  ${articleData.description}
                  </p>
                </div>
                <div class="footer">
                  <div class="category">
                    <span>${articleData.category}</span>
                    <span>${articleData.time}</span>
                  </div>
                </div>
              </div>
            </a>
          </div>
        `;
        articles.innerHTML += articleCon;
      });
    });
}
document.addEventListener("DOMContentLoaded", () => {
  //images in example
  const scrollers = document.querySelectorAll(".scroller");
  addAnimation();
  function addAnimation() {
    scrollers.forEach((scroller) => {
      const scrollerInner = scroller.querySelector(".scroller__inner");
      const scrollerConternt = Array.from(scrollerInner.children);

      scrollerConternt.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        duplicatedItem.setAttribute("aria-hidden", true);
        scrollerInner.appendChild(duplicatedItem);
      });
    });
  }

  function mainTitleAnimation() {
    const mainTitles = document.querySelectorAll(".main-title");
    mainTitles.forEach((mainTitle) => {
      mainTitle.addEventListener("mouseenter", () => {
        dotAnimation(mainTitle);
      });
      mainTitle.addEventListener("click", () => {
        dotAnimation(mainTitle);
      });
    });
  }

  function dotAnimation(title) {
    title.classList.remove("unhovered");
    title.classList.add("hovered");
    setTimeout(() => {
      title.classList.remove("hovered");
      title.classList.add("unhovered");
    }, 1500);
  }

  function expandGraph() {
    //expand the content in info
    const buttons = document.querySelectorAll(".info .row .content button");

    buttons.forEach((button, index) => {
      button.addEventListener("click", function () {
        let span = this.querySelector("span");
        let paragraph = this.nextElementSibling;

        paragraph.classList.toggle("show");

        if (paragraph.classList.contains("show")) {
          span.textContent = "";
        } else {
          span.textContent = "More";
        }
        removeOpen(index);
      });
    });

    function removeOpen(clickedIndex) {
      buttons.forEach((button, index) => {
        if (index !== clickedIndex) {
          let paragraph = button.nextElementSibling;
          let span = button.querySelector("span");

          paragraph.classList.remove("show");
          span.textContent = "More";
        }
      });
    }
  }

  function articlesArticle(src, redirect, sectionSelector) {
    fetch(src)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const articles = document.querySelector(sectionSelector);
        data.map((articleData) => {
          const articleCon = `
            <div class="col">
              <a href="${redirect}">
                <div class="card">
                  <img
                    src="${articleData.imgSrc}"
                    class="card-img-top"
                    alt="Article Image"
                  />
                  <div class="card-body">
                    <h3 class="card-title">${articleData.title}</h3>
                    <p class="card-text">
                    ${articleData.description}
                    </p>
                  </div>
                  <div class="footer">
                    <div class="category">
                      <span>${articleData.category}</span>
                      <span>${articleData.time}</span>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          `;
          articles.innerHTML += articleCon;
        });
      });
  }

  const dashIcons = document.querySelectorAll(".main-header ul.tile-wrds li");

  let previous;
  //dashboard
  function switchButton(clickedIndex) {
    if (
      previous !== null &&
      clickedIndex !== previous &&
      previous !== undefined
    ) {
      dashIcons[previous].classList.remove("current-page");
    }
    dashIcons[clickedIndex].classList.add("current-page");
    previous = clickedIndex;
  }

  var app = $.spapp({
    defaultView: "#home",
    templateDir: "pages/homePages/",
  });

  app.route({
    view: "home",
    load: "home.html",
    onCreate: function () {
      mainTitleAnimation();
      switchButton(0);
      ItemService.loadCards("package");
      expandGraph();
      ArticleService.loadArticleCrousel();
    },
    onReady: function () {
      Utils.setupModalActions();
      switchButton(0);
    },
  });

  app.route({
    view: "contact",
    load: "contact-us.html",
    onCreate: function () {
      mainTitleAnimation();
      Utils.formAnimation();
    },
    onReady: function () {
      switchButton(1);
    },
  });

  app.route({
    view: "articles",
    load: "articles.html",
    onCreate: function () {
      ArticleService.articlesArticle("cities");
      ArticleService.articlesArticle("Hotels");
      ArticleService.articlesArticle("Tourism");
    },
    onReady: function () {
      switchButton(2);
    },
  });

  app.route({
    view: "shop",
    load: "shop.html",
    onCreate: function () {
      mainTitleAnimation();
      Utils.setupModalActions();
      ItemService.loadCards("package");
      ItemService.loadCards("car");
      ItemService.loadCards("hotel");
    },
    onReady: function () {
      switchButton(4);
    },
  });

  function appearModal() {
    const selectedOptions = document.querySelectorAll(
        ".cart .containerr .products .row .select-container select option:checked"
      ),
      modal = document.getElementById("cartModal"),
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
  }

  app.route({
    view: "cart",
    load: "cart.html",
    onCreate: function () {
      const modal = document.getElementById("cartModal"),
        modalProducts = modal.querySelector(".products"),
        sumOfTotalModal = modal.querySelector(
          ".checkout .checkout--footer .price"
        ).children;
      let totalPricesCart,
        quantitiesCart,
        quantitiesModal,
        sumOfTotalPrices = 0;

      Utils.setupModalActions("Items Registered Successfully!", false, true);

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
                decimalPart = Utils.checkDec(parseFloat(itemData.price)),
                totalPrice = parseFloat(itemData.price) * itemData.quantity,
                totalDecimalPart = Utils.checkDec(totalPrice);
              sumOfTotalPrices = totalPrice + parseFloat(sumOfTotalPrices);

              //   if (itemData.category == "package") {
              //     modalContent = `
              //   <div class="products">
              //     <div class="product">
              //       <img src="${itemData.imgSrc}" alt="" />
              //       <div>
              //         <span>${itemData.category}</span>
              //         <p>${itemData.name}</p>
              //         <p class="plan">${itemData.plan}</p>
              //       </div>
              //       <div class="quantity">
              //         <button>
              //           <i class="fa-solid fa-minus"></i>
              //         </button>
              //         <span>${itemData.quantity}</span>
              //         <button>
              //           <i class="fa-solid fa-plus"></i>
              //         </button>
              //       </div>
              //       <span class="price small">
              //         <sup>KM</sup>
              //         <span>${Math.floor(price)}</span>
              //         <sub>${decimalPart}</sub>
              //       </span>
              //     </div>
              //   </div>
              // `;
              //     content = `
              //     <div class="row">
              //       <div class="image">
              //         <img src="${itemData.imgSrc}" alt="" />
              //       </div>
              //       <div class="name-plan">
              //         <h2>${itemData.name}</h2>
              //         <div class="select-container">
              //           <select name="plans">
              //             <option value="plan1">Plan 1</option>
              //             <option value="plan2">Plan 2</option>
              //             <option value="plan3">Plan 3</option>
              //             <option value="plan4">Plan 4</option>
              //           </select>
              //           <i class="fa-solid fa-chevron-down"></i>
              //         </div>
              //       </div>
              //       <div class="price">
              //         <p>
              //           <span class="price small">
              //             <sup>KM</sup>
              //             <span>${Math.floor(price)}</span>
              //             <sub>${decimalPart}</sub>
              //           </span>
              //         </p>
              //       </div>
              //       <div class="quantity">
              //         <button>
              //           <i class="fa-solid fa-minus"></i>
              //         </button>
              //         <span>${itemData.quantity}</span>
              //         <button>
              //           <i class="fa-solid fa-plus"></i>
              //         </button>
              //       </div>
              //       <div class="total">
              //         <p>
              //           <sup>KM</sup>
              //           <span class="totalInt">${Math.floor(totalPrice)}</span>
              //           <sup class="down">${totalDecimalPart}</sup>
              //           <i class="fa-solid fa-trash trash"></i>
              //           <i class="fa-solid fa-circle-minus circle-minus"></i>
              //         </p>
              //       </div>
              //     </div>
              //   `;
              //   } else {
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
                    <span>${itemData.quantity}</span>
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
                  <span>${itemData.quantity}</span>
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
              // }
              items.innerHTML += content;
              modalProducts.innerHTML += modalContent;
            });

            const sumOfInts = Math.floor(sumOfTotalPrices),
              sumOfDecs = Utils.checkDec(sumOfTotalPrices);
            sumOfTotalModal[1].innerHTML = sumOfInts;
            sumOfTotalModal[2].innerHTML = sumOfDecs;

            //total column
            totalPricesCart = Array.from(
              items.querySelectorAll(
                ".cart .containerr .products .row .total p"
              )
            );

            //total in the modal footer
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
            document
              .querySelector(".btn-pay")
              .addEventListener("click", appearModal);
          });
      }

      loadItems("assets/json/cart.json");

      //change the quantity and prices in modal and page
      function cartQuantityBtn(min, max, plus, price, index) {
        const quantityCart = quantitiesCart[index].children[1];
        plus
          ? parseInt(quantityCart.textContent) < max
            ? buttomFunction(plus, price, index)
            : Utils.appearFailAlert("This is the maximum number")
          : parseInt(quantityCart.textContent) > min
          ? buttomFunction(plus, price, index)
          : Utils.appearFailAlert("This is the minimum number");
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
        decPartCart.textContent = decPartCart.textContent =
          Utils.checkDec(total);

        sumOfTotalModal[1].innerHTML = Math.floor(sumOfTotalPrices);
        sumOfTotalModal[2].innerHTML = Utils.checkDec(sumOfTotalPrices);
      }
    },
    onReady: function () {
      switchButton(4);
    },
  });

  app.run();
});
