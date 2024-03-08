//add to cart
var modal = document.getElementById("myModal");

var btns = document.querySelectorAll(".pckbtn");

function handleClick() {
  modal.classList.add("active");
  document.body.classList.add("fix");
}

btns.forEach((button) => button.addEventListener("click", handleClick));

document.querySelector(".x").addEventListener("click", function () {
  modal.classList.remove("active");
  document.body.classList.remove("fix");
});

document.querySelector(".checkout-btn").addEventListener("click", function () {
  modal.classList.remove("active");
  document.body.classList.remove("fix");
});
