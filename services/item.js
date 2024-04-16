var ItemService = {
  loadTable: function (id) {
    const category =
      id === "tbl_packages"
        ? "package"
        : id === "tbl_cars"
        ? "car"
        : id === "tbl_hotels"
        ? "hotel"
        : alert("check the id");
    fetch(Constants.API_BASE_URL + "get_items.php?category=" + category)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const tableBody = document.querySelector("#" + id + " tbody");

        tableBody.innerHTML = "";
        data.map((itemData) => {
          id === "tbl_packages" || id === "tbl_hotels" || id === "tbl_cars"
            ? ItemService.loadTableRow(tableBody, itemData)
            : alert("check the id");
        });
      });
  },
  loadTableRow: function (tableBody, itemData) {
    const intP = String(itemData.price).substring(
        0,
        String(itemData.price).indexOf(".")
      ),
      decP = Utils.checkDec(itemData.price);
    tableBody.innerHTML += `
    <tr>
    <td class="table-image">
      <img
        src="https${itemData.imgs_srcs.trim().split("https")[1]}"
        alt="Package Image"
      />
    </td>
    <td>${itemData.name}</td>
    ${
      itemData.category === "package"
        ? `<td>${itemData.days}</td>`
        : `<td>${itemData.min_days}</td>
      <td>${itemData.max_days}</td>`
    }
    ${
      itemData.category === "car"
        ? `<td>${itemData.persons}</td>`
        : `<td>${itemData.min_persons}</td>
      <td>${itemData.max_persons}</td>`
    }
    <td>$${intP}${decP}</td>
    <td>${itemData.status}</td>
    <td>
      <button
        class="txt-c d-block fs-15 rad-6 bg-blue c-white w-81 btn-shape"
        onClick="ItemService.openEditItemModal(${itemData.item_id}, '${
      itemData.category
    }')"
      >
        Edit
      </button>
      <button
        class="txt-c mt-10 d-block fs-15 rad-6 bg-red c-white w-81 btn-shape"
        onClick="ItemService.removeItem(${itemData.item_id}, '${
      itemData.category
    }')"
      >
        Remove
      </button>
    </td>
  </tr>
    `;
  },
  loadCards: function (category) {
    fetch(Constants.API_BASE_URL + "get_items.php?category=" + category)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        data.map((itemData) => {
          category === "car" || category === "hotel" || category === "package"
            ? ItemService.loadCard(itemData)
            : alert("check the category");
        });
        Utils.carouselSplide(`.splide.${category}s-carousel`, 20);
      });
  },
  loadCard: function (itemData) {
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
    //         <img src="https${
    //           itemData.imgs_srcs.trim().split("https")[1]
    //         }" alt="${itemData.category} Image" /></div>
    //       </div>
    //     </div>
    //     <div class="text">
    //       <h3>${itemData.name}</h3>
    //       <p>Price: ${intP}${decP} KM/day</p>
    //     </div>
    //     <button class="pckbtn"></button>
    //   </div>
    //   `;
    const intP = String(itemData.price).substring(
        0,
        String(itemData.price).indexOf(".")
      ),
      decP = Utils.checkDec(itemData.price);
    const content = `
      <div class="item splide__slide">
        <a href="pages/item.html"
          ><div class="image item-img">
            <img src="https${
              itemData.imgs_srcs.trim().split("https")[1]
            }" alt="${itemData.category} Image" /></div
        ></a>
        <div class="text">
          <h3>${itemData.name}</h3>
          <p>Price: ${intP}${decP} KM/day</p>
        </div>
        <button class="pckbtn" 
        onClick="Utils.itemModal(
        '${itemData.category}',
        '${itemData.name}',
        'https${itemData.imgs_srcs.trim().split("https")[1]}',
        '1',
        '12',
        '${itemData.price}',
        '3',
        '${itemData.category == "car" ? "Persons: " + itemData.persons : ""}',
        '${
          itemData.category == "car"
            ? "Days"
            : itemData.category == "package"
            ? "persons"
            : ""
        }'
        )"
        ></button>
      </div>
    `;

    const items = document.querySelector(
      `.items.${itemData.category}s .container`
    );
    items.innerHTML += content;
  },
  addItemModal: function (category) {
    const modal = document.getElementById("myModal");
    modal.innerHTML = `
      <div class="master-container">
        <div class="card cart">
          <div class="top-title">
            <span class="title">Add ${category}</span>
            <i class="fa-solid fa-xmark x"></i>
          </div>
          <div class="form">
            <form id="${category}-form">
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
                    <span>N</span>
                    <span>a</span>
                    <span>m</span>
                    <span>e</span>
                  </label>
                </div>
                <div class="form-control">
                  <input type="text" 
                  class="field" 
                  required 
                  id="title" 
                  name="title" />
                  <label for="title">
                    <span>T</span>
                    <span>i</span>
                    <span>t</span>
                    <span>l</span>
                    <span>e</span>
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
                    <span>D</span>
                    <span>a</span>
                    <span>y</span>
                    <span>s</span>
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
                    <span>M</span>
                    <span>i</span>
                    <span>n</span>
                    <span>&nbsp;</span>
                    <span>D</span>
                    <span>a</span>
                    <span>y</span>
                    <span>s</span>
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
                    <span>M</span>
                    <span>a</span>
                    <span>x</span>
                    <span>&nbsp;</span>
                    <span>D</span>
                    <span>a</span>
                    <span>y</span>
                    <span>s</span>
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
                    <span>P</span>
                    <span>e</span>
                    <span>r</span>
                    <span>s</span>
                    <span>o</span>
                    <span>n</span>
                    <span>s</span>
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
                    <span>M</span>
                    <span>i</span>
                    <span>n</span>
                    <span>&nbsp;</span>
                    <span>P</span>
                    <span>e</span>
                    <span>r</span>
                    <span>s</span>
                    <span>o</span>
                    <span>n</span>
                    <span>s</span>
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
                    <span>M</span>
                    <span>a</span>
                    <span>x</span>
                    <span>&nbsp;</span>
                    <span>P</span>
                    <span>e</span>
                    <span>r</span>
                    <span>s</span>
                    <span>o</span>
                    <span>n</span>
                    <span>s</span>
                  </label>
                </div>
                `
    }
                <div class="form-control">
                  <input
                    type="number"
                    class="field"
                    required
                    id="price"
                    name="price" 
                  />
                  <label for="price">
                    <span>P</span>
                    <span>r</span>
                    <span>i</span>
                    <span>c</span>
                    <span>e</span>
                  </label>
                </div>
                <div class="form-control">
                  <input
                    type="number"
                    class="field"
                    required
                    id="stock_quantity"
                    name="stock_quantity" 
                  />
                  <label for="stock_quantity">
                    <span>S</span>
                    <span>t</span>
                    <span>o</span>
                    <span>c</span>
                    <span>k</span>
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
                    <span>S</span>
                    <span>t</span>
                    <span>a</span>
                    <span>t</span>
                    <span>u</span>
                    <span>s</span>
                  </label>
                </div>
                <div class="form-control full">
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
                    <span>I</span>
                    <span>n</span>
                    <span>t</span>
                    <span>r</span>
                    <span>o</span>
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
                    <span>D</span>
                    <span>e</span>
                    <span>s</span>
                    <span>c</span>
                    <span>r</span>
                    <span>i</span>
                    <span>p</span>
                    <span>t</span>
                    <span>i</span>
                    <span>o</span>
                    <span>n</span>
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

                  <label id="imgs_srcs" class="txtar-la">
                    <span>I</span>
                    <span>m</span>
                    <span>a</span>
                    <span>g</span>
                    <span>e</span>
                    <span>&nbsp;</span>

                    <span>S</span>
                    <span>o</span>
                    <span>u</span>
                    <span>r</span>
                    <span>c</span>
                    <span>e</span>
                  </label>
                </div>
              </div>
              <input type="submit" class="submit" value="Submit" />
            </form>
          </div>
        </div>
      </div>
    `;
    Utils.formAnimation();
    modal.querySelector(".x").addEventListener("click", () => {
      Utils.removeItemModal(false, modal);
    });
    Utils.appearModal(false);
    ItemService.submit(
      category + "-form",
      "add_item.php",
      "tbl_" + category + "s",
      modal
    );
  },
  submit: function (id, to = "add_item.php", tableId, modal) {
    FormValidation.validate("#" + id, {}, (data) => {
      Utils.block_ui("#myModal");
      $("#myModal .x").trigger("click");
      $.post(Constants.API_BASE_URL + to, data)
        .done(function (data) {
          Utils.unblock_ui("#myModal");
          Utils.removeItemModal(false, modal);
          Utils.appearSuccAlert("Item added successfully");
          ItemService.loadTable(tableId);
        })
        .fail(function (xhr) {
          Utils.removeItemModal(false, modal);
          Utils.appearFailAlert(xhr.responseText);
        });
    });
  },
  openEditItemModal: function (id) {
    RestClient.get("get_item.php?item_id=" + id, function (data) {
      ItemService.addItemModal(data.category, true);

      $("#myModal input[name='item_id']").val(data.item_id);
      $("#myModal input[name='name']").val(data.name);
      $("#myModal input[name='price']").val(data.price);
      $("#myModal input[name='stock_quantity']").val(data.stock_quantity);
      $("#myModal input[name='title']").val(data.title);
      $("#myModal input[name='status']").val(data.status);
      $("#myModal input[name='added_time']").val(data.added_time);
      $("#myModal textarea[name='imgs_srcs']").val(data.imgs_srcs);
      $("#myModal textarea[name='description']").val(data.description);
      $("#myModal textarea[name='intro']").val(data.intro);

      $("#myModal input[name='days']").val(data.days);
      $("#myModal input[name='min_days']").val(data.min_days);
      $("#myModal input[name='max_days']").val(data.max_days);

      $("#myModal input[name='persons']").val(data.persons);
      $("#myModal input[name='max_persons']").val(data.max_persons);
      $("#myModal input[name='min_persons']").val(data.min_persons);
      Utils.formAnimation();
    });
  },
  removeItem: function (id, category) {
    if (confirm("Do you want to delete item with the id " + id + "?") == true) {
      RestClient.delete("delete_item.php?item_id=" + id, {}, () => {
        ItemService.loadTable("tbl_" + category + "s");
      });
    }
  },
};
