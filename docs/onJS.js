//Sing modal which is used to sign the user in and up is created dynamically using a separate js file and the innerHTML property [for that make sure the js script is implemented in the
//html file before the app js file loads because it has methods those are applied to this sign modal elements]

// The innerHTML template literal code is formatted like the html code due to installing an extension using this command in the quick open dialog [ext install nicolasparada.innerhtml]

// code that depends on the data to be coming from the serve needs to be inside the async function not after it.
// Also never forget to always update the NodeList after each item that will be created dynamically is created.
//Supseqent cssText properties override each others
// To make different page talk to each others or to send data from a page to another, store the data to the local storage then display it on the other one once refreshed.

//Json is a string representation of a js object
let myObject = { name: "John", age: 30 };
let jsonString = JSON.stringify(myObject);
// Result: '{"name":"John","age":30}'

/*  when it comes to redirecting the user to another page some times it is better to use the anchor tag to use the advantages of the href attribute like 
the inherited cursor pointer and the ability to open this link in another tap 
another way to redirect is this  // window.location.href = `/pages/book-details.html?id=${book.id}`;
 * Also it is a better approach to send the book id of the clicked book in the routing system to the details page and from there fetch this book using the id
instead of just saving the whole object in the localStorage and then use it in the book details js again, because when the backend update the book details the update
show to the user once he refreshes the page (because another fetch request will be made automatically) but if the book details are coming from the static saved data in
the localStorage then no update happened unless the user reload the page that contains the book to be clicked it self by that a new fetch is done to get all the books to load
them in hte slider or in the gallery. 
*/

// how to assign a class dynamically using js , this is a code inside innerHtml
<div class="detail ${bookDetails.subDescription.weight?'': 'hidden'}">
  <span>Wight </span>
  <span>${bookDetails.subDescription.weight}</span>
</div>;

/* 
You can store an input's value into a variable to use it to assign it's value to other variables or use it in expressions, but to send a value back
to this input you need  to use the input.value instead  */

//refresh the page
window.location.reload();
// trying to toggle classes on an element wont't work if it already has a bootstrap class that contradicts this class
/* In case of fetching a big set of data you might encounter performance issues like page not responding when trying to implement these data in the page, 
that why you may need to use logics like pagination by getting only a part of data in shape of one page from the back end, the backend creates this login and you just
call certain page and it's size, also you might need to use lazy loading to overcome this issue. */

// The coming code has logic errors

/////////// Add to cart
let addToCartUrl = `http://webstercassin1-001-site1.ftempurl.com/api/Cart?itemId=${bookId}&quantity=2`;
// create a function to call it with each quantity changing to update the quantity parameter in the url.
function updateUrlQyt(qyt) {
  addToCartUrl = `http://webstercassin1-001-site1.ftempurl.com/api/Cart?itemId=${bookId}&quantity=${qyt}`;
  console.log(addToCartUrl);
}
// get the token from the local or session storage where ever it is found;
let token = function getToken() {
  return localStorage.getItem(`token`)
    ? localStorage.getItem(`token`)
    : sessionStorage.getItem("token");
};
/* let cartData = {
  itemId :`${bookId}`,
  quantity : `${5}`
} */

async function postData(url) {
  try {
    let response = await fetch(url, {
      method: `POST`,
      headers: {
        Authorization: `bearer ${token}`,
        "Content-type": "application/json",
      },
      // body : JSON.stringify(bodyDate)
    });

    let data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error.message);
  }
}

document
  .querySelector(`.add-book-to-cart-submit`)
  .addEventListener(`click`, (_) => {
    console.log(Boolean(token));

    if (getToken()) {
      postData(addToCartUrl);
    } else {
      bodyOverlay.classList.remove(`hidden`);
      signModal.classList.toggle(`hidden`);
      signInBtn.classList.add(`activeBtn`);
      signUpBtn.classList.remove(`activeBtn`);
      revealSignInForm();
    }
  });

// and this is the corrected version

/////////// Add to cart
let addToCartUrl = `http://webstercassin1-001-site1.ftempurl.com/api/Cart?itemId=${bookId}&quantity=2`;
let token = getToken(); // Fetch token once
console.log(token);
function updateUrlQty(qty) {
  addToCartUrl = `http://webstercassin1-001-site1.ftempurl.com/api/Cart?itemId=${bookId}&quantity=${qty}`;
  console.log(addToCartUrl);
}

function getToken() {
  // use short circuiting to get the talking from local or session storage
  return localStorage.getItem("token") || sessionStorage.getItem("token");
}

async function postData(url) {
  try {
    let response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
      // body: JSON.stringify(bodyData)
    });

    let data = await response.json();
    if (data.Succeeded) {
      alert(" Item Added To Cart");
    } else {
      alert(data.Messages[0]);
    }
    console.log(data);
  } catch (error) {
    console.log(error.message);
  }
}

document
  .querySelector(".add-book-to-cart-submit")
  .addEventListener("click", async () => {
    // Once the button is get the token again, because in case the user is signed the token is saved to the storage so
    //we need to refresh the process of getting the token from the local storage once the user clicks add to cart the first time after signing in
    token = getToken();
    // if the token is found in local or session storage means the user is now logged in
    if (token) {
      // add this item to the cart
      try {
        await postData(addToCartUrl);
        // If the postData is successful, you can show the success message or perform other actions.
      } catch (error) {
        console.error("Error adding item to the cart:", error.message);
        // Handle the error if needed
      }
    } else {
      bodyOverlay.classList.remove("hidden");
      signModal.classList.toggle("hidden");
      signInBtn.classList.add("activeBtn");
      signUpBtn.classList.remove("activeBtn");
      revealSignInForm();
    }
  });

/*  if await is used outside an async function then the script Must be of type module */

// Signing in with google, If the url you are using is starting with 127 ....... that may not work , you need to use local host instead, http://localhost:5500/index.html
// for sure do same for credentials in the google cloud
//https://www.youtube.com/watch?v=Lz7hzTnW8Rw

/* Commenting a variable inside template literals that is inside the innerHTML function will hide it from html but not the js , so js will still see it 
and if not defined will cause error 
<!-- ${cartCount} -->
*/

// In case we need to return the a value from async function into a variable we need to call it using await so that the function
// if executed first then after that the value stored into the variable
// let addingCreditResponse = await getCreditCards();

// HTTP reauests
/* 
HTTP status codes are three-digit numbers returned by a server in response to a client's request made to the server. They provide information about the status of the request. Here's a brief overview of some common HTTP status codes:

**1xx (Informational):**
- **100 Continue:** The server has received the initial part of the request, and the client should continue with the request.

**2xx (Success):**
- **200 OK:** The request was successful, and the server has returned the requested data.
- **201 Created:** The request was successful, and a new resource was created as a result.
- **204 No Content:** The server successfully processed the request but there is no content to send in the response.

**3xx (Redirection):**
- **301 Moved Permanently:** The requested resource has been permanently moved to a new location, and the client should update its URL.
- **302 Found (or 307 Temporary Redirect):** The requested resource has been temporarily moved to a different location.

**4xx (Client Error):**
- **400 Bad Request:** The server could not understand the request due to invalid syntax, missing parameters, or other client-side issues.
- **401 Unauthorized:** The request requires user authentication, and the client has not provided valid credentials.
- **403 Forbidden:** The client does not have permission to access the requested resource.
- **404 Not Found:** The requested resource could not be found on the server.

**5xx (Server Error):**
- **500 Internal Server Error:** The server encountered an unexpected condition that prevented it from fulfilling the request.
- **502 Bad Gateway:** The server, while acting as a gateway or proxy, received an invalid response from an upstream server.
- **503 Service Unavailable:** The server is currently unable to handle the request due to temporary overloading or maintenance of the server.

These are just a few examples, and there are many more HTTP status codes. Each status code provides information about the outcome of the request, helping both the client and the server understand how to proceed. It's important to consult the HTTP specification or the documentation of the specific API or service you're working with to get accurate information about the meaning of each status code.
*/

// forEach can work on both multiple and singular values.

/* The same script like the header-footer-and-sign-modal.js in our case is applied separately in every html page it is linked in, for example if this script 
is targeting an element called X and this element is found in page 1 and not in page two , then the script runs properly in page 1 but when you load page 2 the moment 
the script tries to run it will not find the element x there then it will fire and error, so always make sure to insert this element in all pages those the script runs 
into or insert this element dynamically with the script it self*/

// The coming example has an issue and always the gender variable from the object will be empty string

/*
 let genderIs = '';
genderInputs.forEach(g => {
  g.addEventListener(`change`, _ => {
   genderIs = g.value;
   buildUserInfoObject()
  })
})

let userDataSet = {
    id : userData.id,
    firstName:firstName.value,
    lastName :lastName.value,
    email:eMail.value,
    phone :phonNum.value,
    gender : genderIs,
  }
 */

// Handling the pass visibility is found in the header script
// initiate gender
let genderIs = "";
// for each gender input
genderInputs.forEach((g) => {
  g.addEventListener(`change`, (_) => {
    // when the value is changed assign it to the initial value
    genderIs = g.value;
    // then call this function to build the object,
    buildUserInfoObject();
  });
});

let userDataSet;
function buildUserInfoObject() {
  userDataSet = {
    id: userData.id,
    firstName: firstName.value,
    lastName: lastName.value,
    email: eMail.value,
    phone: phonNum.value,
    gender: genderIs,
  };
}
/* Note that, the asynchronous nature of the addEventListener makes the userDataSet reads the initial value of the genderIs variable before the event is listened to. that's 
why we force to object to read the data only after the event is fired and all listeners listen to it  */

// In the form input using un compatible type and name values would rise and error saying
//An invalid form control with name='mail' is not focusable. <input type=​"number" name=​"mail" id=​"mail-validation-code" placeholder=​"Confirmation code" required style=​"flex:​1;​">​
// you can see teh name is mail but the type is number which does'nt make any sense
