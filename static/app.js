// Set user's name
function setName() {
  $("#username-btn").on("click", function () {
    const username = $("#username-input").val();
    // restrict username length
    if (username.length > 100 || username.length <= 0) {
      $("#username-error").html(
        "Enter a non-empty string with fewer than 100 characters"
      );
      return;
    }

    // restrist username characters
    const regex = new RegExp(/^[a-zA-Z0-9._!?@*$#-]+$/i);
    if (!regex.test(username)) {
      $("#username-error").html(
        "Only enter characters 0-9, a-z, A-Z, ._-!?@*$#"
      );
      return;
    }
    $("#username-error").html("");

    // set username
    localStorage.setItem("username", username);

    // redirect to workshop page
    window.location.replace("/workshop");
  });
}

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
  $("#give-gift-btn").on("click", function () {
    const gift = $("#give-gift-input").val();

    const toastText = "#gift-toast .toast-text";

    // don't accept empty inputs
    if (gift.trim() == "") {
      $(toastText).html("Please give a non-empty gift.");
      const toastEl = new bootstrap.Toast($("#gift-toast"));
      toastEl.show();
      return;
    }

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
    }).then((res) => {
      // handle errors in adding gift
      if (res.status == 200) {
        $(toastText).html("Your gift is in the garden!");
      } else {
        $(toastText).html(
          "Oops! Your gift was not added to the garden. Please try again."
        );
      }
      const toastEl = new bootstrap.Toast($("#gift-toast"));
      toastEl.show();
    });

    // clear field
    $("#give-gift-input").val("");

    // disable button for 10s to prevent spamming
    $("#give-gift-btn").attr("disabled", true);
    setTimeout(function () {
      $("#give-gift-btn").attr("disabled", false);
    }, 10000);
  });
}

// Auto-start garden scroll
function startGarden() {
  $("#scroll-btn").trigger("click");
}

$(function () {
  setName();
  addToCart();
  removeFromCart();
  showCart();
  disableAddToCart();
  scrollGifts();
  addGift();
  startGarden();
});
