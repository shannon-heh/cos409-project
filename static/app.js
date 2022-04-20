// Restarts game by clearing their data
function restartGame() {
  $("#restart-btn").on("click", function () {
    localStorage.clear();
    window.location.replace("/");
  });
}

// Home page if user has played before
function setWelcome() {
  if ("username" in localStorage) {
    $("#username-form").css("display", "none");
    $("#home-welcome").html(`Welcome ${localStorage.getItem("username")}!`);
    $("#restart-btn").css("display", "block");
  }
}

// Set user's name
function setName() {
  $("#username-form").on("submit", function () {
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

// Helper method: return cart as array from local storage
function getCart() {
  if (!("cart" in localStorage)) {
    return {};
  }
  return JSON.parse(localStorage.getItem("cart"));
}

// Helper method: ste cart in local storage given cart array
function setCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Adds an item to user's cart
// Assumes cart is stored as object: key = category, value = item
// Assumes user cannot add an item more than once
function addToCart(category, item) {
  const cart = getCart();
  cart[category] = item;
  setCart(cart);
}

// Remove item from cart
function removeFromCart(category) {
  const cart = getCart();
  delete cart[category];
  setCart(cart);
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

// Open category modal
// Defaults to showing first iteme
function showCategory() {
  $(".category-container").on("click", function () {
    // do not trigger click event on drag
    if ($(this).hasClass("noclick")) {
      $(this).removeClass("noclick");
      return;
    }

    const selectedCategory = $(this).attr("data-category");
    const modal = `[id='${selectedCategory}-modal']`; // parent modal

    // set first item as active if none are active
    if ($(`${modal} .item-modal-btn.active`).length == 0) {
      $(`${modal} .item-modal-btn`).first().addClass("active");
      let count = 0;
      $(`${modal} .item-modal-text`).each(function () {
        $(this).attr("hidden", count > 0);
        count += 1;
      });
    }

    $(modal).modal("show");
  });
}

// Show description for selected item
function showItem() {
  $(".item-modal-btn").on("click", function () {
    const selectedItem = $(this).attr("data-item");
    const category = $(this).attr("data-category");
    const categoryId = `.modal-container[data-category='${category}']`;

    // hide text for other items
    $(`${categoryId} .item-modal-text`).each(function () {
      const item = $(this).attr("data-item");
      $(this).attr("hidden", selectedItem != item);
    });

    // set selected button as active
    $(`${categoryId} .item-modal-btn`).each(function () {
      const item = $(this).attr("data-item");
      if (selectedItem == item) {
        $(this).addClass("active");
      } else {
        $(this).removeClass("active");
      }
    });
  });
}

// Selects item using Done button on category modal
function chooseItem() {
  $(".modal-done-btn").on("click", function () {
    const category = $(this).attr("data-category");
    const categoryId = `[data-category='${category}']`;

    // get selected item
    const selectedItem = $(
      `.modal-container${categoryId} .item-modal-btn.active`
    ).attr("data-item");

    // set label
    $(`.category-container${categoryId} .item-choice`).html(selectedItem);

    // only add to cart if it's on the table
    if ($(`.category-container${categoryId}`).hasClass("can-drop")) {
      addToCart(category, selectedItem);
    }
  });
}

$(function () {
  if ($("body").hasClass("home")) {
    // Home page
    setWelcome();
    setName();
    restartGame();
  }
  if ($("body").hasClass("workshop")) {
    showCategory();
    showItem();
    chooseItem();
  }
  if ($("body").hasClass("garden")) {
    // Garden page
    scrollGifts();
    addGift();
    startGarden();
  }
  // TO-DO: ADD LISTENER, CLEAR ON RELOAD
});

export { addToCart, removeFromCart, showCategory };
