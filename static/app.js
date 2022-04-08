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

// Controls auto-scroll down Garden page
function scrollGifts() {
  const btn = "#scroll-btn";
  const garden = "#garden-wrapper";

  // calculate distance to bottom of gifts
  const distFromTop = $("#end-gifts").get(0).getBoundingClientRect().top;
  // calculate number of gifts
  const numGifts = $(".gift-card").length;

  $(btn).on("click", function () {
    if ($(garden).is(":animated")) {
      // pause scroll
      $(garden).stop();
      $(btn).html("Resume");
    } else {
      // resume scroll
      $(btn).html("Pause");
      $(garden).animate(
        {
          scrollTop: distFromTop,
        },
        numGifts * 2000,
        "linear"
      );
    }
  });
}

// Adds player's gift to database
function addGift() {
  $("#add-gift-btn").on("click", function () {
    const gift = $("#add-gift-input").val();

    // don't accept empty inputs
    if (gift.trim() == "") return;

    // get player's name
    let name = "Anonymous";
    if ("name" in localStorage) {
      name = localStorage.getItem("name");
    }

    // call express endpoint
    const params = JSON.stringify({ name: name, gift: gift });
    fetch("/add-gift", {
      method: "POST",
      body: params,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // clear field
    $("#add-gift-input").val("");
  });
}

// Auto-start garden scroll
function startGarden() {
  $("#scroll-btn").trigger("click");
}

$(function () {
  addToCart();
  removeFromCart();
  showCart();
  disableAddToCart();
  scrollGifts();
  addGift();
  startGarden();
});
