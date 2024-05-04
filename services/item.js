var ItemService = {
  loadTable: (id) => {
    const category =
      id === "tbl_packages"
        ? "package"
        : id === "tbl_cars"
        ? "car"
        : id === "tbl_hotels"
        ? "hotel"
        : alert("check the id");
    RestClient.get("items/get_items.php?category=" + category, (data) => {
      const tableBody = document.querySelector("#" + id + " tbody");

      tableBody.innerHTML = "";
      data.map((itemData) => {
        id === "tbl_packages" || id === "tbl_hotels" || id === "tbl_cars"
          ? ItemService.loadTableRow(tableBody, itemData)
          : alert("check the id");
      });
    });
  },
  loadTableRow: (tableBody, itemData) => {
    const category = itemData.category,
      price = Utils.checkDecWithInt(Utils.getPrice(category, itemData));
    tableBody.innerHTML += `
    <tr>
    <td class="table-image">
      <img
        src="${Utils.firstLink(itemData.imgs_srcs)}"
        alt="Package Image"
      />
    </td>
    <td>${itemData.name}</td>
    ${
      category === "package"
        ? `
        <td>${itemData.days}</td>
        `
        : `
        <td>${itemData.min_days}</td>
      <td>${itemData.max_days}</td>
      `
    }
    ${
      category === "car"
        ? `
        <td>${itemData.persons}</td>
        <td>$${price}</td>
        `
        : category === "package"
        ? `
        <td>${itemData.min_persons}</td>
        <td>${itemData.max_persons}</td>
        <td>$${price}</td>
      `
        : `
        <td>${itemData.min_persons}</td>
        <td>${itemData.max_persons}</td>
        <td>$${Utils.checkDecWithInt(itemData.person_price)}</td>
        <td>$${Utils.checkDecWithInt(itemData.day_price)}</td>
      `
    }
    <td>${itemData.status}</td>
    <td>
      <button
        class="txt-c d-block fs-15 rad-6 bg-blue c-white w-81 btn-shape"
        onClick="ItemService.openEditItemModal(${
          itemData.item_id
        }, '${category}')"
      >
        Edit
      </button>
      <button
        class="txt-c mt-10 d-block fs-15 rad-6 bg-red c-white w-81 btn-shape"
        onClick="ItemService.removeItem(${itemData.item_id}, '${category}')"
      >
        Remove
      </button>
    </td>
  </tr>
    `;
  },
  loadCards: (category, user_id) => {
    RestClient.get("items/get_items.php?category=" + category, (data) => {
      data.forEach((itemData) => {
        category === "car" || category === "hotel" || category === "package"
          ? ItemService.loadCard(itemData, user_id)
          : alert("check the category");
      });
      // TODO
      /*
      When open shop page from home it appear error
      */
      Utils.carouselSplide(`.splide.${category}s-carousel`, 20);
    });
  },
  loadCard: (itemData, user_id) => {
    const items = document.querySelector(
        `.items.${itemData.category}s .container`
      ),
      category = itemData.category,
      price = Utils.checkDecWithInt(Utils.getPrice(category, itemData));
    // Package design
    // `
    //     <div class="item splide__slide">
    //     <div class="box">
    //       <div class="back face">
    //         <button class="button" id="${itemData.id}-1">plan 1</button>
    //         <button class="button" id="${itemData.id}-2">plan 2</button>
    //         <button class="button" id="${itemData.id}-3">plan 3</button>
    //         <button class="button" id="${itemData.id}-4">plan 4</button>
    //       </div>
    //       <div class="image face">
    //         <img src="${Utils.firstLink(itemData.imgs_srcs)
    //         }" alt="${category} Image" /></div>
    //       </div>
    //     </div>
    //     <div class="text">
    //       <h3>${itemData.name}</h3>
    //       <p>Price: ${price} KM/day</p>
    //     </div>
    //     <button class="pckbtn"></button>
    //   </div>
    //   `;

    const content = `
      <div class="item splide__slide">
        <a href="pages/item.html?item_id=${itemData.item_id}"
          ><div class="image item-img">
            <img src="${Utils.firstLink(
              itemData.imgs_srcs
            )}" alt="${category} Image" /></div
        ></a>
        <div class="text">
          <h3>${itemData.name}</h3>
          <p>Price: ${price} KM/day</p>
        </div>
        <button class="pckbtn" 
        onClick="Utils.itemModal(
        '${itemData.item_id}',
        '${user_id}',
        '${itemData.persons}',
        '${itemData.days}',
        '${category}',
        '${itemData.name}',
        '${Utils.firstLink(itemData.imgs_srcs)}',
        '${category == "car" ? itemData.min_days : itemData.min_persons}',
        '${category == "car" ? itemData.max_days : itemData.max_persons}',
        '${category == "car" ? itemData.day_price : itemData.person_price}',
        '${category == "car" ? itemData.max_days : itemData.max_persons}',
        '${category == "car" ? "Persons: " + itemData.persons : ""}',
        '${category == "car" ? "Days" : "persons"}',
        '${category == "hotel" ? itemData.max_days : ""}',
        '${category == "hotel" ? "Days" : ""}',
        '${category == "hotel" ? itemData.min_days : ""}',
        '${category == "hotel" ? itemData.max_days : ""}',
        '${category == "hotel" ? itemData.day_price : ""}'
        )"
        ></button>
      </div>
    `;

    items.innerHTML += content;
  },
  addItemModal: (category, edit) => {
    const modal = document.getElementById("myModal");
    modal.innerHTML = `
      <div class="master-container">
        <div class="card cart">
          <div class="top-title">
            <span class="title">Add ${category}</span>
            <i class="fa-solid fa-xmark x"></i>
          </div>
          <div class="form">
          <form id="${category}-form" name="${category}-form">
              <div class="inputs">
                <input
                  type="hidden"
                  id="category"
                  name="category"
                  value="${category}"
                />
                <input
                  type="hidden"
                  id="item_id"
                  name="item_id"
                />
                <div class="form-control">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    class="field"
                    required
                    autocomplete="name"
                    />
                  <label for="name">
                    Name
                  </label>
                </div>
                <div class="form-control">
                  <input type="text" 
                  class="field" 
                  required 
                  id="title" 
                  name="title" />
                  <label for="title">
                    Title
                  </label>
                </div>
                ${
                  category === "package"
                    ? `
                <div class="form-control">
                  <input type="number" 
                  class="field" 
                  required 
                  id="days" 
                  name="days" 
                  />
                  <label for="days">
                    Days
                  </label>
                </div>
                `
                    : `
                <div class="form-control">
                  <input
                    type="number"
                    class="field"
                    required
                    id="min_days"
                    name="min_days" 
                  />
                  <label for="min_days">
                    Min Days
                  </label>
                </div>
                <div class="form-control">
                  <input
                    type="number"
                    class="field"
                    required
                    id="max_days"
                    name="max_days" 
                  />
                  <label for="max_days">
                    Max Days
                  </label>
                </div>
                `
                } ${
      category === "car"
        ? `
          <div class="form-control">
            <input
              type="number"
              class="field"
              required
              id="persons"
              name="persons" 
            />
            <label for="persons">
              Persons
            </label>
          </div>
          `
        : `
                <div class="form-control">
                  <input
                    type="number"
                    class="field"
                    required
                    id="min_persons"
                    name="min_persons" 
                  />
                  <label for="min_persons">
                    Min persons
                  </label>
                </div>
                <div class="form-control">
                  <input
                    type="number"
                    class="field"
                    required
                    id="max_persons"
                    name="max_persons" 
                  />
                  <label for="max_persons">
                    Max persons
                  </label>
                </div>
                `
    }
                ${
                  category !== "package"
                    ? `
                  <div class="form-control">
                    <input type="number" class="field" required id="day_price" name="day_price" />
                    <label for="day_price"> Day Price </label>
                  </div>
                  `
                    : category === "package"
                    ? `
                  <div class="form-control">
                    <input
                      type="number"
                      class="field"
                      required
                      id="person_price"
                      name="person_price"
                    />
                    <label for="person_price"> Person Price </label>
                  </div>
                  `
                    : category ===
                      "hotel"`
                  <div class="form-control">
                    <input
                      type="number"
                      class="field"
                      required
                      id="person_price"
                      name="person_price"
                    />
                    <label for="person_price"> Person Price </label>
                  </div>
                  `
                }
                <div class="form-control">
                  <input
                    type="number"
                    class="field"
                    required
                    id="stock_quantity"
                    name="stock_quantity" 
                  />
                  <label for="stock_quantity">
                    Stock
                  </label>
                </div>
                <div class="form-control">
                  <input
                    type="text"
                    class="field"
                    required
                    id="status"
                    name="status" 
                  />
                  <label for="status">
                    Status
                  </label>
                </div>
                <div class="form-control full">
                  <label for="added_time" class="d-none">
                    Added Time
                  </label>
                  <input type="datetime-local" id="added_time" name="added_time" />
                </div>
              </div>
              <div class="textareas">
                <div class="form-control">
                  <div class="textarea">
                    <textarea
                      id="intro"
                      name="intro"
                      required
                      class="field" 
                    ></textarea>
                  </div>
                  <label for="intro" class="txtar-la">
                    Intro
                  </label>
                </div>
                <div class="form-control">
                  <div class="textarea">
                    <textarea
                      id="description"
                      name="description"
                      required
                      class="field" 
                    ></textarea>
                  </div>
                  <label for="description" class="txtar-la">
                    Description
                  </label>
                </div>
                <div class="form-control">
                  <div class="textarea">
                    <textarea
                      id="imgs_srcs"
                      name="imgs_srcs"
                      required
                      class="field"
                    ></textarea>
                  </div>

                  <label for="imgs_srcs" class="txtar-la">
                    Image Source
                  </label>
                </div>
              </div>
              <input type="submit" class="submit" value="Submit" />
            </form>
          </div>
        </div>
      </div>
    `;
    Utils.formSetup(modal, () => {
      const message =
        Utils.capitalizeFirstLetter(category) +
        (edit ? " edited successfully" : " added successfully");
      Utils.submit(
        category + "-form",
        "items/add_item.php",
        message,
        () => {
          ItemService.loadTable("tbl_" + category + "s");
        },
        modal
      );
    });
  },
  openEditItemModal: (id) => {
    RestClient.get("items/get_item.php?item_id=" + id, function (data) {
      ItemService.addItemModal(data.category, true);

      $("#myModal input[name='item_id']").val(data.item_id);
      $("#myModal input[name='name']").val(data.name);
      $("#myModal input[name='stock_quantity']").val(data.stock_quantity);
      $("#myModal input[name='title']").val(data.title);
      $("#myModal input[name='status']").val(data.status);
      $("#myModal input[name='added_time']").val(data.added_time);
      $("#myModal textarea[name='imgs_srcs']").val(data.imgs_srcs);
      $("#myModal textarea[name='description']").val(data.description);
      $("#myModal textarea[name='intro']").val(data.intro);

      $("#myModal input[name='person_price']").val(data.person_price);
      $("#myModal input[name='day_price']").val(data.day_price);

      $("#myModal input[name='days']").val(data.days);
      $("#myModal input[name='min_days']").val(data.min_days);
      $("#myModal input[name='max_days']").val(data.max_days);

      $("#myModal input[name='persons']").val(data.persons);
      $("#myModal input[name='max_persons']").val(data.max_persons);
      $("#myModal input[name='min_persons']").val(data.min_persons);
      Utils.formAnimation();
    });
  },
  removeItem: (id, category) => {
    if (confirm("Do you want to delete item with the id " + id + "?") == true) {
      RestClient.delete("items/delete_item.php?item_id=" + id, {}, () => {
        ItemService.loadTable("tbl_" + category + "s");
      });
    }
  },
  loadItemPage: (id) => {
    RestClient.get("items/get_item.php?item_id=" + id, (itemData) => {
      const itemWrapper = document.querySelector(".cart.item"),
        category = itemData.category,
        price = Utils.getPrice(category, itemData),
        intPart = Math.floor(parseFloat(price)),
        decimalPart = Utils.checkDec(price);

      const itemCon1 = `
            <div class="cart item position-relative">
              <div class="containerr">
                <div class="right-corner">
                  <a href="../index.html#home">Home</a>
                  <i class="fa-solid fa-chevron-right"></i>
                  <a href="../index.html#shop">Shop</a>
                  <i class="fa-solid fa-chevron-right"></i>
                  <a href="#">${itemData.name}</a>
                </div>
              </div>
              <div class="item-container position-relative">
                <!-- Start Item Images -->
                <div class="images">
                  <div class="main position-relative p-relative-c-m">
                    <img src="${Utils.firstLink(itemData.imgs_srcs)}" alt="" />
                    <div class="icons">
                      <ul class="font-share-icons">
                        <li>
                          <a href="" target="_blank"
                            ><i class="fa-brands fa-whatsapp whatsapp"></i
                          ></a>
                        </li>
                        <li>
                          <a href="" target="_blank"
                            ><i class="fa-brands fa-x-twitter twitter"></i
                          ></a>
                        </li>
                        <li>
                          <a href="" target="_blank"
                            ><i class="fa-brands fa-telegram telegram"></i
                          ></a>
                        </li>
                        <li>
                          <a href="" target="_blank"
                            ><i class="fa-brands fa-facebook-f facebook"></i
                          ></a>
                        </li>
                        <li>
                          <a href="" target="_blank"
                            ><i class="fa-brands fa-instagram instagram"></i
                          ></a>
                        </li>
                      </ul>
                      <button class="share-btn">
                        <span class="share"></span>
                      </button>
                    </div>
                  </div>
                  <span class="images-span">Roll over image to zoom in </span>
                  <div class="list-container position-relative">
                    <div class="center list-img">
          `;
      const srcsArray = itemData.imgs_srcs.split(" ");
      let itemCon2 = `
            <div class="img-container active">
              <img
                src="${srcsArray[0]}"
                alt=""
              />
            </div>
          `;
      srcsArray.forEach((imgSrc, index) => {
        if (!index) {
          return;
        }
        itemCon2 += `
              <div class="img-container">
                <img
                  src="${imgSrc}"
                  alt=""
                />
              </div>
            `;
      });
      const itemCon3 = `
                    </div>
                  </div>
                </div>
                <!--End Item Images -->
                <div class="content">
                  <h1>${itemData.name}</h1>
                  <p>${itemData.intro}
                    <br />
                    <span class="tlte"> ${itemData.title} </span>
                    ${itemData.description}
                  </p>
                </div>
                <!-- Start Price Box -->
                <div class="add">
                  <div class="wrapper">
                    <div class="price"><sup>km</sup>${intPart}<sub>${decimalPart}</sub></div>
                    <label for="count">people:</label>
                    <select name="peopleCount" id="count" class="btn">
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                    </select>
                    <button class="pckbtn btn">Add to cart</button>
                    <button class="pckbtn btn pay d-none">Pay Now</button>
                  </div>
                </div>
                <!-- End Price Box -->
              </div>
            </div>
          `;

      itemWrapper.innerHTML = itemCon1 + itemCon2 + itemCon3;

      // Main image
      let previous = 0;
      const mainImage = document.querySelector(
          ".item-container .images .main img"
        ),
        imageList = document.querySelectorAll(
          ".item-container .images .list-container .img-container"
        );
      imageList.forEach((image, index) => {
        const imgElement = image.querySelector("img");
        image.addEventListener("mouseover", () => {
          mainImage.src = imgElement.src;
          image.classList.add("active");
          removeActive(index);
          previous = index;
        });
      });

      // remove class active in img
      function removeActive(hoverdIndex) {
        if (hoverdIndex != previous) {
          imageList[previous].classList.remove("active");
        }
      }
      //share icon
      const shareIcon = document.querySelector(".share-btn"),
        shareLists = document.querySelector(".icons .font-share-icons");

      shareIcon.addEventListener("click", () => {
        if (window.matchMedia("(max-width:500px)").matches && navigator.share) {
          navigator
            .share({
              title: "10 Days",
              text: "Come to stay with the best 10 Days",
              url: "https://ibrahimmoatazmohamed.github.io/IT-207-Introduction-to-Web-Programming/assets/html/item.html",
            })
            .then(() => console.log("Successful share"))
            .catch((error) => console.log("Error sharing", error));
        } else {
          if (shareLists.style.display !== "grid") {
            shareLists.style.display = "grid";
            shareLists.style.animation =
              "appear var(--main-transition) linear forwards";
          } else {
            shareLists.style.animation =
              "hidden var(--main-transition) linear forwards";
            setTimeout(() => {
              shareLists.style.display = "none";
            }, 300);
          }
        }
      });

      // Hide share list on blur
      shareIcon.addEventListener("blur", () => {
        if (shareLists.style.display === "grid") {
          shareLists.style.animation =
            "hidden var(--main-transition) linear forwards";
          setTimeout(() => {
            shareLists.style.display = "none";
          }, 300);
        }
      });
    });
  },
  loadMoreItems: () => {
    RestClient.get("items/get_items.php", (data) => {
      const moreItemWrapper = document.querySelector(
        ".more-items .splide .wrapper.splide__track .carousel.splide__list"
      );
      data.map((itemData) => {
        let decimalPart = Utils.checkDec(parseFloat(itemData.price));
        const intPart = Math.floor(parseFloat(itemData.price));

        const moreItemCon = `
          <a
            href="./item.html?item_id=${itemData.item_id}"
            class="col splide__slide"
            draggable="false"
          >
            <h2>${itemData.category}</h2>
            <div class="image">
              <img
              src="${Utils.firstLink(itemData.imgs_srcs)}"
                alt=""
                draggable="false"
              />
            </div>
            <div class="text">
              <h3>${itemData.name}</h3>
            </div>
            <div class="footer">
              <div class="price">Price: <sup>km</sup>${intPart}<sub>${decimalPart}</sub></div>
            </div>
          </a>
        `;

        moreItemWrapper.innerHTML += moreItemCon;
      });
      Utils.carouselSplide(".splide");
    });
  },
  loadNewPackages: () => {
    newPackageLimit;
  },
};
