document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  //add to cart
  const modal = document.getElementById("myModal"),
    addItemAlert = document.querySelector(".alert.alert-success.add-item");
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
});
