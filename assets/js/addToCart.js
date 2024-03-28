document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  //add to cart
  const modal = document.getElementById("myModal"),
    addItemAlert = document.querySelector(".alert.alert-success.add-item"),
    decreaseAlert = document.querySelector(".alert.alert-danger.decrease");
  function addItemModal() {
    modal.classList.add("d-block");
    setTimeout(() => {
      modal.classList.add("active");
      body.classList.add("fix");
    }, 1);
  }
  function removeItemModal() {
    modal.classList.remove("active");
    body.classList.remove("fix");
    setTimeout(() => {
      modal.classList.remove("d-block");
    }, 300);
  }
  document
    .querySelectorAll(".pckbtn")
    .forEach((button) => button.addEventListener("click", addItemModal));

  document.querySelector(".x").addEventListener("click", removeItemModal);

  document.querySelector(".checkout-btn").addEventListener("click", () => {
    removeItemModal();

    addItemAlert.classList.remove("d-none");
    addItemAlert.style.animation = "alert 1.7s linear forwards";
    setTimeout(() => {
      addItemAlert.classList.add("d-none");
    }, 1700);
  });

  const quantity = Array.from(
      document.querySelector(".cart .quantity").children
    ),
    QuantityNumber = quantity[1];
  quantity.splice(1, 1);
  
  quantity.forEach((el, index) => {
    el.addEventListener("click", () => {
      modalButton(index, 1);
    });
  });

  function modalButton(index, min) {
    if (index === 0) {
      if (parseInt(QuantityNumber.textContent) - min)
        QuantityNumber.textContent = parseInt(QuantityNumber.textContent) - 1;
      else {
        decreaseAlert.classList.remove("d-none");
        decreaseAlert.style.animation = "alert 1.7s linear forwards";
        decreaseAlert.addEventListener("animationend", () => {
          decreaseAlert.classList.add("d-none");
        });
      }
    } else {
      QuantityNumber.textContent = parseInt(QuantityNumber.textContent) + 1;
    }
  }
});
