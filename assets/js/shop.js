import { setupModalActions, loadItems, packages } from "./component.js";

document.addEventListener("DOMContentLoaded", () => {
  setupModalActions();

  packages(
    "../json/packages.json",
    "../html/item.html",
    ".items.packages .container",
    ".splide.packages-carousel",
    20
  );

  //cars
  //   `
  //   <div class="item splide__slide">
  //   <div class="image car">
  //     <img src="${itemData.imgSrc}" alt="" />
  //   </div>
  //   <div class="text">
  //     <h3>${itemData.name}</h3>
  //     <p>Price: ${itemData.price} KM/day</p>
  //   </div>
  //   <button class="pckbtn"></button>
  // </div>
  // `;
  loadItems(
    "../json/cars.json",
    '<div class="item splide__slide"><div class="image item-img "><img src="',
    '" alt="" /></div><div class="text"><h3>',
    "</h3><p>Price: ",
    ' KM/day</p></div><button class="pckbtn"></button></div>',
    "cars"
  );

  //Hotels
  // `
  // <div class="item splide__slide">
  // <div class="image car">
  // <img src="${itemData.imgSrc}" alt="" />
  //       </div>
  //       <div class="text">
  // <h3>${itemData.name}</h3>
  // <p>Price: ${itemData.price} KM/day</p>
  //       </div>
  //       <button class="pckbtn"></button>
  //     </div>
  //`;
  loadItems(
    "../json/hotels.json",
    '<div class="item splide__slide"><div class="image item-img "><img src="',
    '" alt="" /></div><div class="text"><h3>',
    "</h3><p>Price: ",
    ' KM/day</p></div><button class="pckbtn"></button></div>',
    "hotels"
  );
});
