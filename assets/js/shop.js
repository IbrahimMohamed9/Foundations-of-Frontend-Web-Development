import {
  itemModal,
  setupModalActions,
  redirect,
  carouselSplide,
} from "./component.js";

document.addEventListener("DOMContentLoaded", () => {
  setupModalActions();

  function packages(src) {
    fetch(src)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const packages = document.querySelector(".items.packages .container");
        data.map((packageData) => {
          const packageCon = `
              <div class="item splide__slide">
              <div class="box">
                <div class="back face">
                  <button class="button" id="${packageData.id}-1">plan 1</button>
                  <button class="button" id="${packageData.id}-2">plan 2</button>
                  <button class="button" id="${packageData.id}-3">plan 3</button>
                  <button class="button" id="${packageData.id}-4">plan 4</button>
                </div>
                <div class="image face">
                  <img src="${packageData.imgSrc}" alt="" />
                </div>
              </div>
              <div class="text">
                <h3>${packageData.name}</h3>
                <p>Price: ${packageData.price} KM</p>
              </div>
              <button class="pckbtn"></button>
            </div>
            `;
          packages.innerHTML += packageCon;
        });

        document.querySelectorAll(".pckbtn").forEach((button, index) =>
          button.addEventListener("click", () => {
            const packageData = data[index];

            itemModal(
              "Package",
              packageData.name,
              packageData.imgSrc,
              packageData.min,
              packageData.max,
              packageData.price,
              true
            );
          })
        );

        carouselSplide(".splide.packages-carousel", 20);

        //redirect
        document
          .querySelectorAll(".package .back .button")
          .forEach((button, index) => {
            button.addEventListener("click", () => {
              redirect("../html/item.html");
            });
          });
      });
  }

  packages("../json/packages.json");

  //cars
  function cars(src) {
    fetch(src)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const cars = document.querySelector(".items.cars .container");
        data.map((itemData) => {
          const car = `
                <div class="item splide__slide">
                <div class="image car">
                  <img src="${itemData.imgSrc}" alt="" />
                </div>
                <div class="text">
                  <h3>${itemData.name}</h3>
                  <p>Price: ${itemData.price} KM/day</p>
                </div>
                <button class="pckbtn"></button>
              </div>
            `;
          cars.innerHTML += car;
        });

        document
          .querySelectorAll(".items.cars .container .pckbtn")
          .forEach((button, index) =>
            button.addEventListener("click", () => {
              const itemData = data[index];
              itemModal(
                "Car",
                itemData.name,
                itemData.imgSrc,
                itemData.min,
                itemData.max,
                itemData.price,
                false
              );
            })
          );

        carouselSplide(".splide.cars-carousel", 20);
      });
  }
  cars("../json/cars.json");

  //Hotels
  function hotels(src) {
    fetch(src)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const cars = document.querySelector(".items.hotels .container");
        data.map((itemData) => {
          const car = `
                  <div class="item splide__slide">
                  <div class="image car">
                    <img src="${itemData.imgSrc}" alt="" />
                  </div>
                  <div class="text">
                    <h3>${itemData.name}</h3>
                    <p>Price: ${itemData.price} KM/day</p>
                  </div>
                  <button class="pckbtn"></button>
                </div>
              `;
          cars.innerHTML += car;
        });

        document
          .querySelectorAll(".items.hotels .container .pckbtn")
          .forEach((button, index) =>
            button.addEventListener("click", () => {
              const itemData = data[index];
              itemModal(
                "Hotel",
                itemData.name,
                itemData.imgSrc,
                itemData.min,
                itemData.max,
                itemData.price,
                false
              );
            })
          );

        carouselSplide(".splide.hotels-carousel", 20);
      });
  }
  hotels("../json/hotels.json");
});
