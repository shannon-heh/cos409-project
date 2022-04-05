// Return cart as array from local storage
function getCart() {
  if (!("cart" in localStorage)) {
    return [];
  }
  return JSON.parse(localStorage.getItem("cart"));
}

// Set cart in local storage given cart array
function setCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Adds an item to user's cart
// Assumes cart is stored as list of items
// Assumes user cannot add an item more than once
function addToCart() {
  $(".buy-btn").on("click", function () {
    const item = $(this).attr("data-item");

    const cart = getCart();
    cart.push(item);
    setCart(cart);

    // disable button, change text
    $(this).attr("disabled", true);
    $(this).html("Added");
  });
}

// Remove item from cart
function removeFromCart() {
  $(".remove-btn").on("click", function () {
    const itemToRemove = $(this).attr("data-item");

    const cart = getCart();
    setCart(
      cart.filter((item) => {
        return item != itemToRemove;
      })
    );

    // hide item from cart pop-up and enable Add to Cart button
    $(this).parent(".cart-item-container").attr("hidden", true);
    const btnSelector = `.buy-btn[data-item="${itemToRemove}"]`;
    $(btnSelector).attr("disabled", false);
    $(btnSelector).html("Add to Cart");
  });
}

// Show cart as pop-up
function showCart() {
  $("#cart-btn").on("click", function () {
    const cart = getCart();

    // hide items that aren't in cart
    $(".cart-item-container").each(function () {
      const item = $(this).attr("data-item");
      $(this).attr("hidden", !cart.includes(item));
    });

    // show cart items in pop-up
    $("#cart-modal").modal("show");
  });
}

// Disable Add to Cart button for any items already in cart
function disableAddToCart() {
  $(".buy-btn").each(function () {
    const cart = getCart();
    const item = $(this).attr("data-item");
    if (cart.includes(item)) {
      $(this).attr("disabled", true);
      $(this).html("Added");
    }
  });
}

$(function () {
  addToCart();
  removeFromCart();
  showCart();
  disableAddToCart();
});
