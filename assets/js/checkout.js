// document.addEventListener("DOMContentLoaded", function () {

// once the page loads make sure that the user came to this page using the checkout button and not any way else
if (!sessionStorage.getItem(`isUserCheckingOut`, `true`)) {
  // alert('This page is not allowed')
  // document.body.classList.add('hidden')
  document.body.cssText =
    " display: flex; justify-content: center ; align-items: center;";
  document.body.innerHTML = ` <h1> Kindly sign in and checkout through the cart </h1>`;
}
//#region ////////////////////////////////////////////////////////////////////////////////////////////////////// Requests

////////////////////////////////////////////////////////////////////////////////////// Get all books in cart
let token = localStorage.getItem(`token`) || sessionStorage.getItem("token");

async function getCartBooks() {
  let response = await fetch(
    "http://webstercassin1-001-site1.ftempurl.com/api/cart",
    {
      headers: {
        Authorization: `bearer ${token}`,
        "Content-type": "application/json",
      },
    }
  );
  let data = await response.json();
  return data.data;
}

/*  if await is used outside an async function then the script Must be of type module */
let cartData = await getCartBooks();
console.log(cartData);

//////////////////////////////////////////////////////////////////////////////////////  get all Stored payment credit cards
async function getCreditCards() {
  let response = await fetch(
    "http://webstercassin1-001-site1.ftempurl.com/api/PaymentMethod",
    {
      headers: {
        Authorization: `bearer ${token}`,
        "Content-type": "application/json",
      },
    }
  );
  if (response.ok) {
    let data = await response.json();
    return data.data;
  }
}
// let creditData = await getCreditCards();
// console.log(creditData);
//////////////////////////////////////////////////////////////////////////////////////  Store a credit card
// destruct the needed filed values from the object into this function parameters list
async function storeCreditCard({ name, number, month, year, cvv }) {
  // try to do the request
  try {
    let response = await fetch(
      `http://webstercassin1-001-site1.ftempurl.com/api/PaymentMethod?cardName=${name}&cardNumber=${number}&cardMonth=${month}&cardYear=${year}&cardCvv=${cvv}`,
      {
        method: "POST",
        headers: {
          Authorization: `bearer ${token}`,
          "Content-type": "application/json",
        },
      }
    );
    // get the response on this request
    // if the fetch is ok
    if (response.ok) {
      let data = await response.json();
      console.log(data);
      if (data.succeeded) {
        alert("Bank card Added");
      } else {
        alert("Bank Card not added");
      }
    } else {
      alert("Some thing went wrong");
    }
    // return the data property from it
    // console.log(data) // can not see from inside the if statement
    // return data.data;

    // if there any error catch it
  } catch (error) {
    alert(error.message);
  }
}
// In case we need to return the a value from async function into a variable we need to call it using await so that the function
// if executed first then after that the value stored into the variable
// let addingCreditResponse = await storeCreditCard();
// console.log(addingCreditResponse);

//#endregion
//#region ////////////////////////////////////////////////////////////////////////////////////////////////////// Implement html
const ordersContainer = document.querySelector(".orders-to-checkout");
cartData.items.forEach((item) => {
  ordersContainer.innerHTML += `
  <div class="order-to-checkout">
    <div class="book-store-product d-block" data-product-ID=''>
      
      <div class="order-to-checkout-image">
        <span class="order-to-checkout-number" style="left : 10px;"> Item: ${
          cartData.items.indexOf(item) + 1
        } - X${item.quantity}</span>
              <img class="w-100 h-100 checkout-order-image" order-id = '${
                item.id
              }'
              src="${item.image}" alt=" order image">
              <div
              class="info-on-image d-flex align-items-center justify-content-between px-2 w-100">
              <div class="rating-on-image text-light "> <span class="rate "> 4.5</span> <span
              class="rating-star"> <i class="fa-solid fa-star"
              style="color: #d09c43;"></i></span> (<span
                          class="ratings-count ">55</span>)
                  </div>
                  <!-- <div class="cart-on-image text-light"> <i class="fa-solid fa-cart-plus"></i> </div> -->
              </div>
          </div>
          <div class="order-to-checkout-details bg-light w-100">
              <h5 class="order-to-checkout-title"> ${
                item.title.length >= 30
                  ? item.title.slice(1, 30) + "..."
                  : item.title
              } </h5>
              <div class="order-to-checkout-price-details"> EGP <span
                      class="order-to-checkout-price fw-bold">
                      ${
                        item.price
                      } </span> <!-- <span class="order-to-checkout-old-price"> 190 </span> <span
                      class="order-to-checkout-off-percentage">10%</span> -->
                    </div>
                  </div>
      </div>
    </div>
    `;
});
// Go for more details on this item, (any way it is not logical to click on the item to redirect to book details  when you are in the checkout stage)
/* ordersContainer.addEventListener(`click`, e => {
  if (e.target.classList.contains(`checkout-order-image`)) {
    let bookId = e.target.getAttribute(`order-id`);
    window.location.href = `/pages/book-details.html?id=${bookId}`
  }
}) */

//#ed=ndregion`order-id
//#region ////////////////////////////////////////////////////////////////////////////////////////////////////// Elements

const checkoutSubtotal = document.querySelector(`.checkout-subtotal`);
const checkoutTotal = document.querySelector(`.checkout-total`);
const checkoutShipping = document.querySelector(`.checkout-shipping`);
const storedCredits = document.querySelectorAll(`[name = 'credit-card']`);

const paymentOptions = document.querySelectorAll(`.payment-option`);
const creditCardOption = document.querySelector(`.credit-card-option`);
const cashOnDeliveryOption = document.querySelector(`.cash-on-delivery-option`);
const payWithCredit = document.querySelector(`.pay-with-credit`);
const payCash = document.querySelector(`.pay-cash`);
const paymentMethods = document.querySelectorAll(`.pay-with`);
const payUsingCredit = document.querySelector(`.using-credit`);
const goBackBtn = document.querySelector(`.go-back-to-stored-cards-btn`);
const addNewCardBtn = document.querySelector(`.add-new-card-btn`);
const addNewCard = document.querySelector(`.add-new-card`);

// form
const addingCreditForm = document.querySelector(`.credit-form`);
const creditCardName = document.getElementById(`credit-card-name`);
const creditCardNumber = document.getElementById(`credit-card-number`);
const creditCardMonth = document.getElementById(`credit-card-month`);
const creditCardYear = document.getElementById(`credit-card-year`);
const creditCardCvv = document.getElementById(`credit-card-cvv`);
const rememberCardCheckbox = document.getElementById(`remember-card-checkbox`);
const placeOrderBtn = document.querySelector(`.place-order-btn`);

//#endregion

//#region ////////////////////////////////////////////////////////////////////////////////////////////////////// Functionalities
// the total is the sum of subtotal, tax, shipping, but in the data from the api the total is only the sum of tax and subtotal thats why id didn't use the variable cardData.total
checkoutSubtotal.textContent = (cartData.subTotal + cartData.shipping).toFixed(
  2
);
checkoutShipping.textContent = cartData.shipping.toFixed(2);
checkoutTotal.textContent = (
  cartData.subTotal +
  cartData.shipping +
  cartData.tax
).toFixed(2);
// choose credit
storedCredits.forEach((credit) => {
  // for each stored credit , get the related radio input
  let relatedCvv = document.querySelector(`[cvv-for-card = "${credit.value}"]`);
  // disable all radios
  credit.setAttribute(`disabled`, ``);
  // enable the radio only that it's related cvv is validated
  relatedCvv.oninput = (_) => {
    if (relatedCvv.value.length == 3) {
      credit.removeAttribute(`disabled`);
      relatedCvv.style.border = "1px solid green";
    } else {
      credit.setAttribute(`disabled`, ``);
      placeOrderBtn.setAttribute(`disabled`, "");
      relatedCvv.style.border = "1px solid red";
    }
  };

  credit.addEventListener(`click`, () => {
    // get the cvv input related to this checked radio
    if (
      credit.checked &&
      relatedCvv.value != "" &&
      relatedCvv.value.length == 3
    ) {
      // once the card is selected correctly after all the previous validation, Enable the place order
      placeOrderBtn.removeAttribute("disabled");

      console.log(credit.value);
      placeOrderBtn.removeAttribute("disabled");
    } else {
      placeOrderBtn.setAttribute("disabled", "");
    }
  });
});

//////////////// Reveal payment method
// First decide what payment method to use.
let isCashOnDelivery = false;
// by clicking on the payment option, credit or cash activate that option to send the active one to the backend and reveal it here while hiding the other so that
// the user only can choose one payment method
paymentOptions.forEach((option) => {
  console.log(option);
  option.addEventListener(`click`, (_) => {
    paymentMethods.forEach((pay) => pay.classList.add(`hidden`));
    let currentOption = option.getAttribute(`option`);
    if (option.getAttribute("option") == "cash") {
      placeOrderBtn.removeAttribute("disabled");
      // Make it the active payment method now
      isCashOnDelivery = true;
      // then make sure to remove all the data from the credit section
    } else {
      placeOrderBtn.setAttribute("disabled", "");
      isCashOnDelivery = false;
    }
    document
      .querySelector(`[payment-method = "${currentOption}"]`)
      .classList.remove(`hidden`);
  });
});

////////////// Reveal adding new card
//by trying to add new card reveal the form and hide other cards details
let revealAddNewCard = function () {
  // reveal the form
  addNewCard.classList.remove(`hidden`);
  // hide other details
  payUsingCredit.classList.add(`hidden`);
};
// by clicking go back do the opposite
let goBack = function () {
  addNewCard.classList.add(`hidden`);
  payUsingCredit.classList.remove(`hidden`);
};
addNewCardBtn.addEventListener(`click`, revealAddNewCard);
goBackBtn.addEventListener(`click`, goBack);

/////////////// Form validation
// create the borders style strings will be used in the validation
let borderRed = "1px solid red";
let borderGreen = "1px solid green";

function cardNumberValidation() {
  // return creditCardNumber.value.length == 16 ? true:  false; //
  // get the value at this very moment and validate it
  return (
    creditCardNumber.value.length == 16 && creditCardNumber.value.length != ""
  );
}

creditCardNumber.addEventListener("input", validateCardNumber);
function validateCardNumber() {
  // on text inserting if returns true style the field with green border otherwise with red
  creditCardNumber.style.border = cardNumberValidation()
    ? borderGreen
    : borderRed;
}

// on leaving the CVV field
creditCardMonth.addEventListener(`blur`, validateMonth);
function validateMonth() {
  /* when the user leaves the input if the number is between 1 and 9 then ad 0 at the start  */
  let creditMonth = creditCardMonth.value;
  if (creditMonth.length == 1 && creditMonth < 10 && creditMonth > 0) {
    creditCardMonth.value = creditMonth.padStart(2, "0"); // creditMonth is a static value cant be used to send value back to the input
    creditCardMonth.style.border = borderGreen;
    // if it is not a single digit then make sure it is in the range
  } else {
    if (creditMonth.length == 2 && creditMonth < 13 && creditMonth > 0) {
      creditCardMonth.style.border = borderGreen;
    } else {
      creditCardMonth.style.border = borderRed;
    }
  }
}
// validate the year
creditCardYear.addEventListener(`input`, validateYear);
function validateYear() {
  // must be 4 digits length
  let creditYear = creditCardYear.value;
  creditCardYear.style.border =
    creditYear.length == 4 ? borderGreen : borderRed;
}

creditCardCvv.addEventListener(`input`, validateCVV);
function validateCVV() {
  let CVV = creditCardCvv.value;
  creditCardCvv.style.border = CVV.length == 3 ? borderGreen : borderRed;
}

addingCreditForm.addEventListener(`submit`, submitCredit);
function submitCredit(e) {
  // Prevent the default behavior like reloading the page and emptying the fields
  e.preventDefault();
  let creditCardInfo = {
    name: creditCardName.value,
    number: creditCardNumber.value,
    month: creditCardMonth.value,
    year: creditCardYear.value,
    cvv: creditCardCvv.value,
    // rememberCreditCard: rememberCardCheckbox.checked,
  };
  // Send the POST request
  storeCreditCard(creditCardInfo);

  console.log(creditCardInfo);
}

//#endregion
// });

placeOrderBtn.addEventListener(`click`, () => {
  placeOrder();
});

/* let ids = {
  shippingAddressId: "574D72D3-E2AD-4930-A8B5-3FFADFC62F1F",
  billingAddressId: "574D72D3-E2AD-4930-A8B5-3FFADFC62F1F",
}; */

let reqUrl =
  "http://webstercassin1-001-site1.ftempurl.com/api/Order/CreateFromCartOrder?billingAddressId=574D72D3-E2AD-4930-A8B5-3FFADFC62F1F&shippingAddressId=574D72D3-E2AD-4930-A8B5-3FFADFC62F1F";
let placeOrderID = "574D72D3-E2AD-4930-A8B5-3FFADFC62F1F";
async function placeOrder() {
  let response = await fetch(reqUrl, {
    method: "POST",
    headers: {
      Authorization: `bearer ${token}`,
      "Content-type": "application/json",
    },
    // body : JSON.stringify(ids),
  });
  try {
    if (response.ok) {
      let data = await response.json();
      console.log(data);
      // window.location.reload();
      // if the cart was not empty
      alert("Your order has been placed, You can continue shopping now ❤❤ ");
      window.location.href = "/pages/book-store.html";
    } else {
      alert("Something went wrong");
    }
  } catch (error) {
    console.log(error.message);
  }
}
