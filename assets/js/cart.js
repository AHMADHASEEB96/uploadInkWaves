// Once the cart opens see if the uer logged in  , if not ( in case the user logged out while he was in the cart page) then hide the loading effect
let token = localStorage.getItem(`token`) || sessionStorage.getItem("token");
// target the overlay and loader animation
const bookStoreBodyOverlay = document.querySelector(`.book-store-body-overlay`);
const bookStoreBodyLoader = document.querySelector(`.book-store-body-loader`);
if (!token) {
  bookStoreBodyOverlay.classList.add("hidden");
  bookStoreBodyLoader.classList.add("hidden");
  alert('Please login to interact with your cart')
  // window.location.href = '/index.html', 
}

// get books in cart
// !token ? document.querySelector(`.cart-body`).innerHTML = `<div class = "container flex-center-all"> <h1> Kindly login to interact with cart </h1></div>`:
async function getCartBooks(id) {
  let response = await fetch(
    `http://webstercassin1-001-site1.ftempurl.com/api/cart${
      id ? "?id=" + id : ""
    }`,
    {
      headers: {
        Authorization: `bearer ${token}`,
        "Content-type": "application/json",
      },
    }
  );
  let data = await response.json();
  bookStoreBodyOverlay.classList.add("hidden");
  bookStoreBodyLoader.classList.add("hidden");
  return data.data;
}

/*  if await is used outside an async function then the script Must be of type module */
let cartData = await getCartBooks();
console.log(cartData);

//#region ////////////////////////////////////////////////////////////////////////////////////// Cart Elements
const cartTotal = document.querySelector(`.cart-total`);
const cartShipping = document.querySelector(`.cart-shipping`);
const cartSubtotal = document.querySelector(`.cart-subtotal`);
const cartTaxes = document.querySelector(`.cart-taxes`);
const cartItemsCount = document.querySelector(`.cart-items-count`);
const cartItemsContainer = document.querySelector(`.cart-products-container`);
const undoDeletionDiv = document.querySelector(`.undo-deletion`);
const undoDeletionBtn = document.querySelector(`.undo-deletion-btn`);

//#endregion

//#region ////////////////////////////////////////////////////////////////////////////////////// Cart Functionalities
cartTotal.textContent = (
  cartData.subTotal +
  cartData.tax +
  cartData.shipping
).toFixed(2);
cartShipping.textContent = cartData.shipping.toFixed(2);
cartSubtotal.textContent = cartData.subTotal.toFixed(2);
cartTaxes.textContent = cartData.tax.toFixed(2);
cartItemsCount.textContent = cartData.itemCount;
if (cartData.itemCount == 0) {
  cartTotal.textContent =  cartShipping.textContent = cartSubtotal.textContent = 0;
}
//////// fill cart hero details

//#endregion

// Change info in the cart hero
const checkoutBtns = document.querySelectorAll(`.checkout-btn`);

// for each checkout btn
checkoutBtns.forEach((btn) => {
  //  Make sure the cart is not empty, if so dont allow the redirect to checkout page and instead redirect to the book store
  if (cartData.itemCount !== 0) {
    btn.textContent = 'Checkout'
    btn.addEventListener(`click`, goToCheckOut);
    function goToCheckOut() {
      // first create a state that the user is going to the checkout page by clicking the button and not any way else like pasting the path in the url input directly
      sessionStorage.setItem(`isUserCheckingOut`, `true`);
      window.location.href = "/pages/checkout.html";
    }
  } else {
    // if the cart is empty change the btn text to redirect to the store instead to fill the cart before checking out.
    btn.textContent = 'Fill Cart To Checkout'
    btn.onclick = _ => {window.location.href = '/pages/book-store.html'}

  }
  
});

/////////////////// Fill the cart
// Get the data that is three days from now 
// Get current date
let date = new Date();
// get the day from the current data and increase it by 3 then set it to the current data
date.setDate(date.getDate() + 3); 
let DateFormattingOptions = {weekday : 'short', day : 'numeric', month : 'short'}
let after3DaysFormatted = date.toLocaleDateString('en-US', DateFormattingOptions)


// console.log(twoDaysFromNow) 
cartData.items.forEach((item) => {
  cartItemsContainer.innerHTML += `
  <div class="cart-product p-2 d-flex gap-3 justify-content-between border my-2">
      <div class="cart-product-details-side d-flex gap-3" style="flex: ;">
          <div class="cart-product-img">
            <a href = '/pages/book-details.html?id=${item.id}'><img class="w-100 h-100"
                  src="${item.image}"
                  alt="Product-image"> </a>
          </div>
          <div class="cart-product-details">
              <div class="cart-product-title d-flex gap-3 ">
                  <h5> ${item.title} </h5>
                  <h4 class="bookmark-book">
                      <i class="fa-solid fa-bookmark bookmark-book-icon"></i>
                  </h4>
                  <h6 class="cart-product-price" > EGP <span class="cart-book-price" prod-price-id = '${item.id}' value = '${item.price}'> ${item.price} </span> </h6>
              </div>
              <div class="cart-product-description">
                  <p class="cart-book-Author"> Author : <span> Dean Burnet </span></p>
                  <p class="cart-book-publisher"> Publisher : <span>Burnet</span></p>
                  <p class="cart-book-category"> Category : <span> Neuropsychology, Humor &
                          Entertainment</span></p>
                  <div class="book-rating d-flex gap-3 align-items-center">
                      <div class="rating-stars">
                          <span class="rating-star">⭐</span>
                          <span class="rating-star">⭐</span>
                          <span class="rating-star">⭐</span>
                          <span class="rating-star">⭐</span>
                          <span class="rating-star">⭐</span>
                      </div>
                      <div class="rating-number"> <span class="rate-value">5</span> /5 ( <span
                              class="rates-nubmer">
                              170</span> rates )</div>
                  </div>
                  <!-- <p class="more-details-on-product"><a href=""> More details </a></p> -->
              </div>
          </div>
      </div>
      <div class="cart-product-transaction-side" style="flex: ;">

          <div class="action-on-book">
              <div class="qty d-flex gap-3">
                  <div class="qty-arrows d-flex gap-3">
                      <button class="qty-down cart-qty-btn  fs-2" qty-prod-id = '${item.id}' qut-btn-type = 'down'> -  </button>
                      <input class="qty-input" type="number"  value="${item.quantity}" required qty-input-prod-id = '${item.id}' disabled>
                      <button class="qty-up cart-qty-btn  fs-2" qty-prod-id = '${item.id}' qut-btn-type = 'up'> +  </button>
                      </span>
                  </div>
              </div>
              <div class="total-price mt-1" > Total Item's price : 
                  <span class="total-price-for-this-product" total-price-prod-id = '${item.id}'> </span>    


              </div>
              <div class="in-stock mt-1 "> <span class="number-in-stock"> ${item.quantity} </span> in stock </div>
          </div>
          <div class="cart-delivery-details m-0">
              <div class="delivery-by d-flex align-items-center gap-3">
                  <span> Delivery by</span>
                  <h6 class="p-0 m-0 delivery-time"> ${after3DaysFormatted}</h6>
              </div>
          </div>

          <div class="remove-product" trash-for = '${item.id}'> <i class="fa-regular fa-trash-can"></i> </div>
      </div>
  </div>
`;
  // remove a product
});

/////////////////////////////////////////////////////////////// Control quantity

const cartqtyBtns = document.querySelectorAll(`.cart-qty-btn`);
cartqtyBtns.forEach((qBtn) => {
  controlqty(qBtn);
});

function controlqty(qBtn) {
  // The two buttons up and down along with the input three of them have the same id like the product itself. that's how we target
  // that particular input of that product by clicking the quantity buttons
  // get the button's id to target the input of same element and type to target the clicked button itself
  let prodId = qBtn.getAttribute(`qty-prod-id`);
  let qtyBtnType = qBtn.getAttribute(`qut-btn-type`);
  // get the input of that product
  const thisInput = document.querySelector(
    `[qty-input-prod-id = '${prodId}']`
  );
// the element that holds the total price for that particular product
  let totalPriceEl = document.querySelector(
    `[total-price-prod-id = '${prodId}']`
  );

  let productPrice = document
    .querySelector(`[prod-price-id = '${prodId}']`)
    .getAttribute(`value`);
     // calculate the total price once the cart page loads
  totalPriceEl.textContent = thisInput.value * productPrice;
// now disable the quantity down button when the quantity is 1 to prevent more reduction
// while clicking handle the same process
  if (thisInput.value == 1) {
    document.querySelector(`[qut-btn-type = 'down']`).setAttribute(`disabled`, '')
        } 
        // by clicking on any of the two buttons
  qBtn.addEventListener(`click`, async (_) => {
      // add Loading effect
  bookStoreBodyOverlay.classList.remove("hidden");
  bookStoreBodyLoader.classList.remove("hidden");
    // Increase or decrease the quantity for this item onlt
    // if the increase quantity button is clicked and the value is  less than the stock
    // get the stock of this item
    // let prod = await getCartBooks(prodId)
    console.log(prodId);
    if (qtyBtnType == "up" /* as long less than in stock */) {
      thisInput.value++;
      // send the new value to the server
      updateItemQty(prodId, thisInput.value);
      // if the decrease quantity button is clicked and the value is not more than 1 to make sure it doesn't go down to zero
    } else if (qtyBtnType == "down" && thisInput.value > 1) {
      thisInput.value--;
      // send the new value to the server
      updateItemQty(prodId, thisInput.value);
    } else {
      thisInput.value = 1;
    }

     totalPriceEl = document.querySelector(
      `[total-price-prod-id = '${prodId}']`
    );
     productPrice = document
      .querySelector(`[prod-price-id = '${prodId}']`)
      .getAttribute(`value`);
    totalPriceEl.textContent = thisInput.value * productPrice;
    // Each time you click check for the value and make sure the button (down) is disabled when ever the value of the input reaches 1 
    // this logic depends on the face that the user can not add a product with quantity 0 to the cart otherwise the page will loads with quantity 0 as initial value and that 
    // will ruin this process logic, to avid that we may use <= 1
    if (thisInput.value <= 1) {
      document.querySelector(`[qut-btn-type = 'down']`).setAttribute(`disabled`, '')
          } 
           else {
            document.querySelector(`[qut-btn-type = 'down']`).removeAttribute(`disabled`)
          }
  });
}

// Update the quantity of the cart item the database the cart with each value change
async function updateItemQty(id, itemQty) {
  console.log(id, itemQty);
  console.log(
    `http://webstercassin1-001-site1.ftempurl.com/api/Cart?itemId=${id}&quantity=${itemQty}`
  );
  console.log(token)
  await fetch(
    `http://webstercassin1-001-site1.ftempurl.com/api/Cart?itemId=${id}&quantity=${itemQty}`,
    {
      method: `PUT`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  )
    .then((res) => {
      res.json();
      // remove Loading effect
      bookStoreBodyOverlay.classList.add("hidden");
      bookStoreBodyLoader.classList.add("hidden");
    })
    .catch((error) => console.log(error.message));
}

cartData.items.forEach((item) => {
  document
    .querySelector(`[trash-for = '${item.id}']`)
    .addEventListener(`click`, (e) => {
      // once the icon clicked, show the loader and the overlay
     if (confirm('Delete Items?')) {

        bookStoreBodyOverlay.classList.remove("hidden");
        bookStoreBodyLoader.classList.remove("hidden");
        undoDeletionDiv.style.transform = 'transform: translate(-50%, 0px);'
        deleteItem(item.id);
      }
      
    });
});

async function deleteItem(id) {
  let token = localStorage.getItem(`token`) || sessionStorage.getItem(`token`);
  console.log(id, token);
  const deleteUrl = `http://webstercassin1-001-site1.ftempurl.com/api/Cart?itemId=${id}`;
  console.log(deleteUrl);
  try {
    let response = await fetch(deleteUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    let data = await response.json();
    console.log(data);
    window.location.reload(); // activate after the problem is solved

    bookStoreBodyOverlay.classList.add("hidden");
    bookStoreBodyLoader.classList.add("hidden");
  } catch (err) {
    alert("Error happened, the process is not completed");
  }
}
console.log(localStorage);
// When the user logs out make sure to hide the loading effect otherwise it will keep loading because the cart items are being requested but the request will not succeed
