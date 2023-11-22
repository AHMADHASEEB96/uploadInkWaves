//#region ////////////////////////////////////////////////////////////////////////////////////////////////////// Upper Page
//#region ////////////////////////////////////////////////////////////////////////////////////////////////////// Implement Upper Page Content
//get the token
let token = localStorage.getItem(`token`) || sessionStorage.getItem("token");
let cart;
let cartCount;
// if only the token exists, means the user is signed
if (token) {
  // get all the items in the cart
  cart = await fetch("http://webstercassin1-001-site1.ftempurl.com/api/Cart", {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    },
  }).then((res) => res.json());
  // get the count of the items
  cartCount = cart.data.itemCount;
}
// Same for bookmarks but this time count the items in the data array because there is no explicit key to tell the count ,
// fetch all the bookmarks
let bookmarks;
let bookmarksCount;
// if only the token exists, means the user is signed
if (token) {
  // get all the items in the cart
  bookmarks = await fetch(
    "http://webstercassin1-001-site1.ftempurl.com/api/Favourite",
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
    }
  ).then((res) => res.json());
  // get the count of the items
  bookmarksCount = bookmarks.data.length;
}

// If it is the token expiration data log the user out
console.log(sessionStorage, localStorage);
let tokenExpirationDateString =
  localStorage.getItem("tokenExpirationDate") ||
  sessionStorage.getItem("tokenExpirationDate");
// if the tokenExpirationDate exists
if (tokenExpirationDateString) {
  let currentDate = new Date();
  let tokenExpirationDate = new Date(tokenExpirationDateString);
  if (currentDate >= tokenExpirationDate) {
    logUserOut();
    window.location.reload();
  }
}
function renderUpperSignButtons() {
  return ` <div class = "upper-sign-btns"> 
  <button class="header-sign-btns mx-2" id="header-sign-in-btn"> Sign in</button>
  <button class="header-sign-btns" id="header-sign-up-btn"> Sign up</button>
</div>`;
}
function renderUpperUserData() {
  return `<div class = "upper-logged-user hidden"> 
  <i class="fa-solid fa-circle-user user-account"></i>
  <i class="fa-solid fa-right-from-bracket user-log-out"></i>
</div>`;
}
let userInfo = JSON.parse(window.localStorage.getItem(`userInfo`));
if (userInfo) {
  console.log(userInfo);
}
// console.log(window.localStorage.getItem(`userInfo`))
document.querySelector(`.upper-page`).innerHTML = `<div class="container">
<div class="header ">

    <a href="/index.html" >
        <div class="logo"><img src="../assets/media/images/logo.ng.png" alt="ink waves logo">
            <span style="font-family:  cairo; font-weight: bold; color: rgb(17, 78, 114);" class = "d-sm-none d-md-inline-block inkWaves-logo-word">InkWaves</span>

        </div>
    </a>
    <div class="header-content">
      <!-- If the key 'userName' found in the local or session storage show the work Hello else empty string,  inside the span of the name check
    if this key is located inside local or session storage and if that is true display it's value from  wherever it is found or show empty string  
  note that , ins the name space  the short-circuiting syntax only is not enough because when both are false it will show the last falsy value which is 'null' -->
      <div class = 'hello-user'> ${
        localStorage.getItem(`userName`) || sessionStorage.getItem(`userName`)
          ? "Hello "
          : ""
      } <span class = 'user-name'>${
  localStorage.getItem("userName") || sessionStorage.getItem(`userName`)
    ? localStorage.getItem(`userName`) || sessionStorage.getItem(`userName`)
    : ""
} </span></div>
        <div class="search">
            <input type="search" placeholder="Search" class="search-bar" id = 'search-bar'>
        </div>
        <!-- If only the cart count has a value then display it  -->
        <a href="/pages/cart.html" class="cart-anchor"> <i class="fa-solid fa-cart-shopping cart-icon"></i> <span
        
                class="number-of-products-in-cart"> ${
                  cartCount || ""
                }   </span> </a>
        <a href="/pages/bookmarks.html" class=" bookmarks-anchor"> <i class="fa-solid fa-bookmark header-bookmark"> </i> <span
        
                class="number-of-products-in-bookmarks"> ${
                  bookmarksCount || ""
                }   </span> </a>
        
        
       <div class = "upper-sign-btns"> 
         <button class="header-sign-btns mx-2" id="header-sign-in-btn"> Sign in</button>
         <button class="header-sign-btns" id="header-sign-up-btn"> Sign up</button>
<button style = "background-color: transparent; border: none; margin-left:10px;"> <a href = "/pages/confirm-email.html" >  Activate mail  </a> </button>

       </div>

       <div class = "upper-logged-user d-flex justify-content-center align-items-center hidden"> 
         <div class = "user-in-header"> 
         <i class="fa-solid fa-circle-user user-account"></i>
         
         <div class = "user-window  ">
        <ul> 

<li> <a href = "/pages/user-dashboard.html"> <i class="fa-solid fa-table-columns"></i>  Dashboard  </a> </li>
<li> <a href = "/pages/user-dashboard.html"> <i class="fa-solid fa-handshake"></i> My Orders  </a> </li>
<li> <a href = "/pages/user-dashboard.html"> <i class="fa-solid fa-marker"></i> Update info  </a> </li>
<li> <a href = "/pages/confirm-email.html"> <i class="fa-solid fa-marker"></i> Activate mail  </a> </li>
<hr>
<li style = "cursor: pointer;" class = "log-out">  <i class="fa-solid fa-right-from-bracket log-out"></i> Log out </li>

        </ul>  
        </div>
        </div>
         <!-- <i class="fa-solid fa-right-from-bracket user-log-out  ms-2"></i> -->
       </div>

    </div>

</div>
<nav class="navbar">
    <ul class="">
        <li>
            <a href="/pages/printing-options.html" id="a-1" itemName="print" class="listitem">

                Print
            </a>
        </li>
        <!-- <li>
            <a href="/pages/book-details.html" id="a-1" itemName="book-details" class="listitem w-100">
                Book details
            </a>
        </li> -->
        
        <li>
            <a href="/pages/book-store.html" id="a-2" itemName="book-store" class="listitem">
                Book store
            </a>
        </li>
        <!-- <li>
            <a href="/pages/reset-password.html" itemName="3" id="a-3" class="listitem">
                Reset pass
            </a>
        </li> -->
       <!--  <li>
            <a href="/pages/update-pass.html" itemName="3" id="a-3" class="listitem">
                update pass
            </a>
        </li> -->
        <li>
            <a href="/pages/contact.html" id="a-4" itemName="4" class="listitem">
                Contact InkWaves
            </a>
        </li>
        <li>
            <a href="" id="a-5" itemName="privacy-and-conditions" class="listitem">
                Privacy and Policy
            </a>
        </li>
        <li>
            <a href="" id="a-6" itemName="about" class="listitem">
                About InkWaves
            </a>
        </li>
    </ul>
</nav>
<!-- <div id="subsections-div" class="sub-divs-container hidden width-100% "> -->
    
<!-- </div> -->
</div>`;
//#endregion
//#region ////////////////////////////////////////////////////////////////////////////////////////////////////// Upper page Elements

const userName = document.querySelector(`.user-name`);
const logOut = document.querySelector(`.log-out`);
const bodyOverlay = document.querySelector(`.body-overlay`);
const upperPage = document.querySelector(`.upper-page`);
const subsectionsDiv = document.getElementById("subsections-div");
const navbar = document.querySelector(`.navbar`);
const listItems = document.querySelectorAll(".listitem");
const subsections = document.querySelectorAll(".subsection");
const headerSignBtns = document.querySelectorAll(`.header-sign-btns`);
const searchBar = document.querySelector(`.search-bar`);
const searchIcon = document.getElementById(`glass-icon`);
const upperSignBtns = document.querySelector(`.upper-sign-btns`);
const headerSignInBtn = document.getElementById(`header-sign-in-btn`);
const headerSignUpBtn = document.getElementById(`header-sign-up-btn`);
const userLogOut = document.querySelector(`.user-log-out`);
const userAccount = document.querySelector(`.user-account`);
console.log(userAccount);
const userWindow = document.querySelector(`.user-window `);
const userWindowUl = document.querySelector(`.user-window ul`);
const upperLoggedUser = document.querySelector(`.upper-logged-user`);
//#endregion
//#region ////////////////////////////////////////////////////////////////////////////////////////////////////// upper Page Functionalities

// Once the page loads update the header to show the user info if it was logged in (as long the token is stored in local or session storage).
updateLoginUI();

// remove the token info from both local and session storages on clicking on logout
logOut.addEventListener(`click`, logUserOut);
function logUserOut() {
  localStorage.removeItem("token");
  window.localStorage.removeItem("tokenExpirationDate");
  window.localStorage.removeItem("refreshToken");
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("tokenExpirationDate");
  sessionStorage.removeItem("refreshToken");
  localStorage.removeItem("userName");
  sessionStorage.removeItem("userName");
  //refresh the page to update the header
  window.location.reload();
  // any way if the token was stored in the session storage then it will be removed automatically by ending the session.
}

//Reveal user window on click, with animation effect
upperLoggedUser.addEventListener(`click`, revealUserWindow);
function revealUserWindow() {
  if (userWindow.clientHeight == 0) {
    userWindow.style.padding = `40px`; // if padding was added using css then the client height would not be zero
    userWindow.style.height = `${userWindow.scrollHeight + 50}px`;
    userWindow.style.border = `1px solid #eee`;
  } else {
    userWindow.style.padding = `0px`; // to make sure there is no padding making clientHeight != zero
    userWindow.style.height = "0px";
    userWindow.style.border = `none`;
  }
}

headerSignInBtn.addEventListener(`click`, function () {
  bodyOverlay.classList.remove(`hidden`);
  signModal.classList.toggle(`hidden`);
  signInBtn.classList.add(`activeBtn`);
  signUpBtn.classList.remove(`activeBtn`);
  revealSignInForm();
});
headerSignUpBtn.addEventListener(`click`, function () {
  bodyOverlay.classList.remove(`hidden`);
  signModal.classList.toggle(`hidden`);
  signUpBtn.classList.add(`activeBtn`);
  signInBtn.classList.remove(`activeBtn`);
  revealSignUpForm();
});
//#region //////////////////////////////////////////////////////////////////////////////////////// Nav bar
subsections.forEach((ss) => ss.classList.add("hidden"));
/* 
const hero = document.querySelector(`.hero`)
console.log(subsections)
subsections.forEach((subS) => {
  // hide all subsections
  subS.classList.add("hidden");
  // link this section to the related listitem
  // get the last word from the subsection id which is the same like the value of the attribute itemName in the listitem
  let listItemName = subS.id.slice(11) // slice from 11 to the end
  let currentLI = document.querySelector(`[itemName = '${listItemName}']`) // target the related listitem
  if (currentLI != null) { // make sure there is a related list item first
    currentLI.addEventListener("mouseover", function () { // when hovering 
      subS.classList.remove(`hidden`); // reveal the current subsection
      opacityBG.classList.remove(`hidden`); // reveal the overlay
      opacityBG.classList.add(`reveal-background-opacity`);
      // subS.style.height = `${subS.scrollHeight}px !important`
      if (hero) hero.style.transform = `translateY(${subS.clientHeight}px)` // translate the hero downward a space like the height of the subsection

    });
  }
 
// On hovering out do opposite
  if (currentLI != null) {
    currentLI.addEventListener("mouseout", function () {
      subS.classList.add('hidden')
      opacityBG.classList.add(`hidden`);
      // move it back the same amount of space , to respond to the transition effect on the way back
    if (hero) { hero.style.transform = `translateY(${-subS.scrollHeight}px)`} 

    });
  }

});

subsections.forEach((ss) => {
  ss.addEventListener("mouseover", () => {
    // subsectionsDiv.classList.remove(`hidden`);
    ss.classList.remove(`hidden`);
    opacityBG.classList.remove(`hidden`);
  });
});
subsections.forEach((ss) => {
  ss.addEventListener("mouseout", () => {
    ss.classList.add(`hidden`);
    opacityBG.classList.add(`hidden`);
  });
});
 */
// the previous approach of iterating over the subsections costed me less code than the one where I iterate over the list Items.
//#endregion
//#endregion
//#endregion upper page

//#region ////////////////////////////////////////////////////////////////////////////////////////////////////// Sign Modal
//#region ////////////////////////////////////////////////////////////////////////////////////////////////////// Implement the Sign Modal to the html file
const userSignModal = document.getElementById(`sign-modal`);
userSignModal.innerHTML = ` <button id="close-icon" class="fa-solid fa-circle-xmark close-modal-icon hidden"></button>
<!-- <button id = "closeModalButton" onclick="close()"> Close</button> -->
<div id="sign-side">
    <div class="internal-overlay hidden"></div>
    <div class="sign-side-holder hidde">
        <div id="sign-in-up-buttons" class=" my-3">
            <button class="sign-buttons sign-in-btn activeBtn"> Sign in
            </button><button class="sign-buttons sign-up-btn"> Sign up </button>
        </div>
        <div class="sign-windows">
          <!--  -->
        <form action="" class="sign-up-form sign-form hidden" id="signUpForm">
        <input type="text" name="firstName" placeholder="First name" required>
        <input type="text" name="lastName" placeholder="Last name" required>
        <label>
            <h6>Gender</h6>
            <label for="male-radio" style="font-size: 12px;"> Male </label>
            <input class="form-gender-check-input" name="gender" value="male" type="radio" id="male-radio" required>
            <label for="female-radio" style="font-size: 12px;"> Female </label>
            <input class="form--gender-check-input" name="gender" value="female" type="radio" id="female-radio">
        </label>
        <input type="tel" name="phone" placeholder="Phone number">
        <input type="email" name="email" id ='signup-email' placeholder="E-mail" autocomplete="username" required>
        <div class = 'input-div'> 
        <input type="password" class = 'pass-input sign-up-pass ' id = "signup-pass" name="password" placeholder="Password" autocomplete="new-password" required>
        <button class='show-pass-btn'>
                      <i class="fa-solid fa-eye"></i>
         </button>
        </div>

     
                    <div class = 'input-div'>
                    <input type="password" class = 'pass-input sign-up-pass' id = "signup-confirm-pass" name="confirmPassword" placeholder="Confirm Password" autocomplete="new-password" required>
                    <button class='show-pass-btn'>
                      <i class="fa-solid fa-eye"></i>
                    </button>
                  </div>
     
        <!-- <div class = 'show-pass-div m-2'> Show password <input class = 'show-pass-checkbox' show-pass-of = 'sign-up-pass'  type = 'checkbox'></div> -->

        <div class="privacy-agreement">
            By signing up you commit that you read and agreed with our <a href="" target="_blank">
                privacy </a> and <a href="" target="_blank"> policy </a>
        </div>
        <input type="submit" value="Sign up" class="sign-up-submit sign-buttons btn btn-primary modal-sign-btns">
    </form>
            <!-- <form action="" class="sign-in-form sign-form" onsubmit=" reset() ;return false"> -->
            <form action="" class="sign-in-form sign-form">

                <h3> Welcome back</h3>
                <p class = "message-to-user"> Nice to see you again </p>
                <input type="" name="lemail" placeholder="E-mail" autocomplete="username" required>
                <div class = 'pass-div input-div'> 
                <input class= 'w-100 pass-input sign-in-pass' type="password" name="lpassword" placeholder="Password" autocomplete="current-password"
                    required> 
                    <button class='show-pass-btn'>
                      <i class="fa-solid fa-eye"></i>
                    </button>
                    <!-- <div class = 'show-pass-div m-2'> Show password <input class = 'show-pass-checkbox' show-pass-of = 'sign-in-pass' type = 'checkbox'></div> -->
                </div>
                <div class="remember-me">
                    <label>
                        <input type="checkbox" name="" id = 'sign-in-remember-me'>
                        Remember me
                    </label>
                    <a href="/pages/reset-password.html"> <span> Forgot password? </span></a>
                </div>
                <input type="submit" value="Sign in"
                    class="sign-in-submit sign-buttons btn btn-primary modal-sign-btns">

            </form>
            <p class="or-use"> Or use <span class="line-l line"></span> <span class="line-r line"></span>
            </p>
            <div id="sign-up-with-buttons" class=" my-3">
               
                    <div id="g_id_onload" data-client_id="536158144980-493s2fasqtibjfhfgebavsvvcr98l81s.apps.googleusercontent.com"
        data-context="signin" data-ux_mode="popup" data-callback="signInWithGoogle" data-auto_prompt="false">
    </div>

    <div class="g_id_signin" data-type="standard" data-shape="rectangular" data-theme="filled_blue"
        data-text="signin_with" data-size="large" data-logo_alignment="left">
    </div>
            </div>
        </div>
    </div>
</div>

<!--  //////////////// Details side -->
<div id="details-side" class="d-flex justify-content-center align-items-center ">
    <a href="index.html" class="logo w-75 h-75  modal-logo">
        <div class="logo w-100 h-100"><img class="w-100 h-100" src="../assets/media/images/logo.ng.png"
                alt="ink waves logo">
        </div>
    </a>
    <form action="" class="  enter-ur-mail sign-form hidden">
        <h4 class='ur-mail-header'>Insert Your Mail </h4>
        <input type="email" placeholder="E-mail" autocomplete="username">
        <input type="submit" value="Send" class="btn btn-primary send">
    </form>
    <form class="activation-code mail-validation-form hidden">
        <p> We have sent you a code on your Mail, please insert it</p>
        <input type="number" name="" id="mail-validation-code" required>
        <input type="submit" value="Submit" class=" submit-code btn btn-primary">
        <p class="m-0"> You should receive a code within </p>
        <span class="timer"> Time </span>
        <button class="Send-another-btn btn btn-primary" disabled> Send another</button>
        <div> <span id = 'not-you-email'></span> <a href ='/pages/confirm-email.html'> Not you?</a> </div>
    </form>
</div>`;
//#endregion

//#region ////////////////////////////////////////////////////////////////////////////////////////////////////// Sign Modal Elements
const signModal = document.getElementById(`sign-modal`);
const signSide = document.getElementById(`sign-side`);
const detailsSide = document.getElementById(`details-side`);
const closeModalIcon = document.querySelector(`.close-modal-icon`);
const closeIcon = document.getElementById(`close-icon`);
const signInBtn = document.querySelector(".sign-in-btn");
const signUpBtn = document.querySelector(".sign-up-btn");
const signInForm = document.querySelector(".sign-in-form");
const signUpForm = document.querySelector(".sign-up-form");
const rememberMeCheckbox = document.querySelector("#sign-in-remember-me");
const signInSubmit = document.querySelector(".sign-in-submit");
const signUpSubmit = document.querySelector(`.sign-up-submit`);
const modalSignButtons = document.querySelectorAll(`.modal-sign-btns`);
const showPassCheckboxes = document.querySelectorAll(`.show-pass-checkbox`);
const passInputs = document.querySelectorAll(`.pass-input`);

showPassCheckboxes.forEach((btn) => {
  let show = btn.getAttribute(`show-pass-of`);
  let inputsOfSameType = document.querySelectorAll(`.${show}`);
  btn.addEventListener(`change`, (_) => {
    inputsOfSameType.forEach((i) => {
      i.type = btn.checked ? "text" : "password";
    });
  });
});

const detailsBoxes = document.querySelectorAll(`.details-box`);
const bullets = document.querySelector(`.bullets`);
const pageNavLogo = document.getElementById(`page-nav-logo`);
const messageToUser = document.querySelector(".message-to-user");
//#endregion
//#region ////////////////////////////////////////////////////////////////////////////////////////////////////// Sign Modal Functionality
window.addEventListener(`resize`, handleSignModalResponsiveness);
function handleSignModalResponsiveness() {
  if (window.innerWidth <= 1200) {
    detailsSide.classList.add(`hidden`);
  } else {
    detailsSide.classList.remove(`hidden`);
  }
}

closeIcon.addEventListener(`click`, close);
function close() {
  console.log(`close function fetched`); /////////////////////
  signModal.classList.add(`hidden`);
}

signInBtn.addEventListener("click", revealSignInForm);
signUpBtn.addEventListener("click", revealSignUpForm);
function revealSignInForm() {
  signInForm.classList.remove("hidden");
  signUpForm.classList.add("hidden");
  signInBtn.classList.add(`activeBtn`);
  signUpBtn.classList.remove(`activeBtn`);
}
function revealSignUpForm() {
  signUpForm.classList.remove("hidden");
  signInForm.classList.add("hidden");
  signInBtn.classList.remove(`activeBtn`);
  signUpBtn.classList.add(`activeBtn`);
}

detailsBoxes.forEach((sb) => {
  let bullet = document.createElement("li");
  bullet.style.cssText = `background-color : blue; border-radius: 50%; width : 8px; height : 8px;`;
  bullets.appendChild(bullet);
});

// Close modal on clicking on the overlay ( Any where outside the modal itself) or pressing the Esc button
document.body.addEventListener(`click`, function (e) {
  if (e.target == bodyOverlay) {
    closeModal();
  }
});

document.addEventListener("keyup", function (e) {
  if (e.key == "Escape") {
    closeModal();
  }
});

function closeModal() {
  signModal.classList.add(`hidden`);
  bodyOverlay.classList.add(`hidden`);
}
/////

// Timer
const timerSpan = document.querySelector(`.timer`);
const sendAnotherBtn = document.querySelector(`.Send-another-btn `);
const activationCodeDiv = document.querySelector(`.activation-code`);
const modalLogo = document.querySelector(`.modal-logo`);
const signModalInternalOverlay = document.querySelector(`.internal-overlay`);

// Define the initial values ( the interval needs to be stored in a variable to clear it later )
let timerInterval = null;
let seconds = 10;
// once the submit or send code buttons are clicked initiate the seconds and the intervale
// signUpSubmit.addEventListener("click", countDown);
sendAnotherBtn.addEventListener("click", countDown);

function countDown() {
  // reveal the activation code division
  activationCodeDiv.classList.remove("hidden");
  modalLogo.classList.add("hidden");
  signModalInternalOverlay.classList.remove("hidden");

  // do the opposite of those when the submit code button is clicked and the code is the right one , show the logo again and a message (in separate page) that the account is activated and sign the user in
  seconds = 60;
  // disaple the send button till the count down is finished
  sendAnotherBtn.setAttribute("disabled", "");
  // start the interval
  timerInterval = setInterval(countingDown, 1000);
}
// start the count down
function countingDown() {
  if (seconds > 0) {
    seconds--;
    timerSpan.textContent = `${seconds} Second`;
  } else {
    // once the count down is finished enable the button and clear the interval to not interfere with the coming one
    clearInterval(timerInterval);
    sendAnotherBtn.removeAttribute("disabled");
  }
}

//Handle the eye button on passwords
const showPassBtns = document.querySelectorAll(".show-pass-btn");
showPassBtns.forEach((eyeBtn) => {
  eyeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const passwordInput = eyeBtn.previousElementSibling;

    // Toggle password visibility
    passwordInput.type =
      passwordInput.type === "password" ? "text" : "password";
  });
});

//#region //////////////////////////////////////////////////////////////////////////////////////// Sign Fetch
//#region ///////////////////////////////////////////////////// Sign up
// let userValidMail;
const registerUser = async (registerUserData) => {
  try {
    const response = await fetch(
      "http://webstercassin1-001-site1.ftempurl.com/api/Auth/Register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerUserData),
      }
    );

    if (response.ok) {
      // no after making sure the form is valid before calling this function, lets make sure the request is successful and if it is do some ui modifications
      const data = await response.json();
      // Handle the response from the backend
      console.log("Registration successful:", data);
      // hide the sign side and reveal the confirmation code side in smaller screen sized
      if (window.innerWidth <= 1200) {
        detailsSide.classList.remove(`hidden`);
        signSide.classList.add(`hidden`);
      }
      // Then save the mail once the request is successful
      signUpSubmit.value = `Confirm Code Now`;
      signUpSubmit.style.backgroundColor = "green";
      countDown();
    } else {
      signUpSubmit.value = `Couldn't Sign up`;
      signUpSubmit.style.backgroundColor = "red";
      setTimeout((_) => {
        signUpSubmit.value = `Try again`;
        signUpSubmit.style.backgroundColor = "#0b5ed7";
      }, 3000);

      // throw new Error("Registration failed");
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
};

// Then validate code

const validationForm = document.querySelector(`.mail-validation-form`);
validationForm.addEventListener(`submit`, (event) => {
  event.preventDefault();
  // get the mail from the sign up form
  let userValidMail = document.getElementById("signup-email").value;
  // add this value to the not you span

  // get the verification code the user inserts
  let validationCode = document.querySelector("#mail-validation-code").value;
  // call the validation function
  validateMail(userValidMail, validationCode);
});

async function validateMail(userValidMail, validationCode) {
  let response = await fetch(
    `http://webstercassin1-001-site1.ftempurl.com/api/Auth/ActiveUser`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userValidMail,
        code: validationCode,
      }),
    }
  );
  // First check that the status code is 200 ( successful request)
  if (response.ok) {
    let data = await response.json();
    console.log(data);
    // then make sure the other steps all are succeeded.
    if (data.succeeded) {
      alert(" Your Account is Activates successfully");
    } else {
      alert(`Wrong insert`);
    }
  }
}

// On submitting the signup form
document
  .querySelector(".sign-up-form")
  .addEventListener("submit", async (event) => {
    // Do all the validation required
    event.preventDefault();
    signUpSubmit.value = `loading...`;
    const firstName = document.querySelector(
      'input[placeholder="First name"]'
    ).value;
    console.log(firstName);
    const lastName = document.querySelector(
      'input[placeholder="Last name"]'
    ).value;
    const email = document.querySelector('input[placeholder="E-mail"]').value;
    // add it to the not you span
    document.querySelector(`#not-you-email`).textContent = email;
    const phone = document.querySelector(`[name = 'phone']`).value;
    const password = document.getElementById("signup-pass").value;
    const confirmPassword = document.getElementById(
      "signup-confirm-pass"
    ).value;
    // Get the gender
    let checkedGender;
    const genderInputs = document.querySelectorAll(`[name = 'gender']`);
    genderInputs.forEach((g) => {
      g.checked ? (checkedGender = g.value) : "";
    });
    const registerUserData = {
      firstName,
      lastName,
      email,
      password,
      phone,
      gender: checkedGender,
    };

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return false;
    }
    if (phone.length !== 11) {
      alert("Phone must be 11 digits-length starting with 01");
      return false;
    }
    // if the form is completely valid
    if (document.querySelector(".sign-up-form").checkVisibility()) {
      // call the registration method only if the form is valid,
      await registerUser(registerUserData);
      console.log("valid sign up form");
    } else {
      console.log(" NOt valid sign up form");
    }
  });

//#endregion signup
//#region ///////////////////////////////////////////// Login

document.querySelector(".sign-in-form").addEventListener("submit", (event) => {
  event.preventDefault();
  // change the button's text to loading till the request succeed.
  console.log(rememberMeCheckbox.checked);
  signInSubmit.value = `loading...`;
  const email = document.querySelector('input[name="lemail"]').value;
  console.log(email);
  const password = document.querySelector('input[name="lpassword"]').value;
  console.log(password);
  const signUserData = {
    email,
    password,
  };

  loginUser(signUserData);
});

const loginUser = async (signUserData) => {
  try {
    const response = await fetch(
      "http://webstercassin1-001-site1.ftempurl.com/api/Auth/Login",
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signUserData),
      }
    );

    //  Make sure that request is successful
    //  **200 OK:** The request was successful, and the server has returned the requested data.
    if (!response.ok) {
      alert("There is something went wrong!");
      signInSubmit.value = `Try again`;
    } else {
      // If the request passed
      // get the response as a js object from the response promise
      let data = await response.json();
      // get the data array from inside of the data object
      let user = data.data;
      // Handle the response from the backend
      console.log(user);
      if (!data.succeeded) {
        // If the sign in was not successful then update the Ui to match that case
        messageToUser.textContent = "Invalid email and/or password provided";
        messageToUser.style.color = "red";
        signInSubmit.value = `Couldn't Sign in`;
        signInSubmit.style.backgroundColor = "red";
        setTimeout((_) => {
          signInSubmit.value = `Try again`;
          signInSubmit.style.backgroundColor = "#0b5ed7";
        }, 3000);
        // if the login was verified and passed all the backend validations and verifications then the user exists and the login info are correct
      } else {
        // save token information to localStorage or sessionStorage depending on did the user check or didn't check the box.
        console.log(user);
        // get the token info from the response
        let token = user.accessToken;
        if (rememberMeCheckbox.checked) {
          // if user wants to be remembered
          // then save theses info into the local storage
          window.localStorage.setItem("token", `${token}`);
          window.localStorage.setItem(
            "tokenExpirationDate",
            `${user.expiration}`
          );
          window.localStorage.setItem("refreshToken", `${user.refreshToken}`);
          // if there is a user name received from the server save it to local storage
          if (user.firstName) {
            localStorage.setItem("userName", `${user.firstName}`);
          }
          //
        } else {
          // if not, save it to the session storage to be erased automatically after the session expires
          sessionStorage.setItem("token", `${token}`);
          sessionStorage.setItem("tokenExpirationDate", `${user.expiration}`);
          sessionStorage.setItem("refreshToken", `${user.refreshToken}`);
          // if there is a user name received from the server save it to session storage
          if (user.firstName) {
            sessionStorage.setItem("userName", `${user.firstName}`);
          }
        }

        // save the expiration date

        messageToUser.textContent = `Welcome back ${""}`; //put the name received from the server response
        messageToUser.style.color = "green";
        // hide the modal to keep the user in the current page
        setTimeout(closeModal, 2000);
        //update the submit button
        signInSubmit.value = `Signed in`;
        signInSubmit.style.backgroundColor = "green";
        // now refresh the page to get any user-related data requires opening the page ( like in case of opening cart or favorites)
        setTimeout((_) => {
          window.location.reload(); /////////////////
        }, 2500); // after 2.5 seconds to not contradict the sign modal effects
      }
    }
  } catch (error) {
    console.error("Error:", error);
  }

  //  update header to Keep the user signed in as long the token is stored in the local storage or session storage
  updateLoginUI();
  // this process needs to be inside the function and at it's end so the header updates once the function is called and the request is done
};

function updateLoginUI() {
  // if the token is stored in local or session storage then update the header to show that the user is singed
  if (localStorage.getItem("token") || sessionStorage.getItem("token")) {
    upperSignBtns.classList.add(`hidden`);
    upperLoggedUser.classList.remove(`hidden`);
    userName.textContent = `${""}`;
  } else {
    // otherwise update the header to show that the user is not signed in
    upperSignBtns.classList.remove(`hidden`);
    upperLoggedUser.classList.add(`hidden`);
  }
}

//#endregion sign In

//#endregion
//#endregion
//#endregion Sign Modal
//#region ////////////////////////////////////////////////////////////////////////////////////////////////////// Page Nav
const opacityBG = document.querySelector(`.background-opacity`);
const heroNav = document.querySelector(`.hero-nav`);
let pageNavListItems = document.querySelectorAll(`.hero-list-item`); // will be assigned again later
///////////// Reveal the list item on section intersecting the view
pageNavLogo.onclick = (_) => {
  upperPage.scrollIntoView();
};
window.onscroll = (_) => {
  pageNavLogo.textContent =
    pageNavLogo.getBoundingClientRect().top < 20
      ? "InkWaves - Go up "
      : "InkWaves";
};
// Create the options
let options = {
  root: null, // null for the view, set an element if you want
  rootMargin: "10px",
  threshold: 0.5, // observe the target when 70% of it's height is intersecting with the view
};
// Create a new Intersection Observer instance
var observer = new IntersectionObserver(callB, options);
//call the callback function when the observer observe the target
function callB(entries) {
  // Loop through the entries
  entries.forEach(function (entry) {
    // If the element is intersecting
    if (entry.isIntersecting) {
      let sectionName = entry.target.getAttribute("sectionOf");
      pageNavListItems.forEach((li) => {
        if (li.getAttribute("itemOf") == sectionName) {
          li.classList.add(`reveal-on-Intersection`);
        } else {
          li.classList.remove(`reveal-on-Intersection`);
        }
      });
    }
  });
}
//////////////////////////// Generate the nav list items one for each new section that has the tag name section
const sections = document.querySelectorAll(`section`);
sections.forEach((section) => {
  // observe the section
  observer.observe(section);
  let sectionName = section.getAttribute(`sectionOf`);
  let pageNavLi = document.createElement(`li`);
  pageNavLi.setAttribute(`itemOf`, `${sectionName}`);
  pageNavLi.classList.add(`hero-list-item`);
  pageNavLi.textContent = `${section.getAttribute(`sectionTitle`)}`;
  heroNav.appendChild(pageNavLi);
});
pageNavListItems = document.querySelectorAll(`.hero-list-item`); // must be here after the creating code and not in the start of the file. (Not very sure)
pageNavListItems.forEach((li) => {
  li.addEventListener(`click`, () => {
    console.log(li.textContent);
    sections.forEach((section) => {
      if (section.getAttribute(`sectionOf`) == li.getAttribute(`itemOf`)) {
        section.scrollIntoView();
        // or this way, to include the nav height in the process
        // let sectionTop = section.getBoundingClientRect().top;
        // window.scrollTo({top : sectionTop , behavior: `smooth`})
        // observer.observe(section);
      }
    });
  });
});

//   This whole code about the page nave  works but needs alot of refactoring
//#endregion

//#region ////////////////////////////////////////////////////////////////////////////////////////////////////// Footer
//#region ////////////////////////////////////////////////////////////////////////////////////////////////////// Implement footer
document.querySelector(`footer`).innerHTML = ` <div class="container">

<div class="left-footer">
    <div class="left-footer-logo">
        <a href="index.html">
            <div class="logo"><img src="../assets/media/images/logo.ng.png" alt="ink waves logo">
            </div>
        </a>
        <p> We provide best printing and book selling service </p>
    </div>
    <div class="left-footer-details">
        <h6>Get our app on</h6>
        <a href=""><i class="fa-brands fa-app-store-ios me-4"></i></a>
        <a href=""><i class="fa-brands fa-google-play"></i></a>
    </div>
</div>

<div class="middle-footer ">
<ul class="footer-list">
        <li>
            <a href="" id="a-1" itemName="print" class="listitem footer-listitem">

                Print
            </a>
        </li>
        <li>
            <a href="/pages/book-details.html" id="a-1" itemName="book-details" class="listitem footer-listitem w-100">
                Book details
            </a>
        </li>
        
        <li>
            <a href="/pages/book-store.html" id="a-2" itemName="book-store" class="listitem footer-listitem">
                Book store
            </a>
        </li>
      
        <li>
            <a href="/pages/contact.html" id="a-4" itemName="4" class="listitem footer-listitem">
                Contact InkWaves
            </a>
        </li>
        <li>
            <a href="" id="a-5" itemName="privacy-and-conditions" class="listitem footer-listitem">
                Privacy and Policy
            </a>
        </li>
        <li>
            <a href="" id="a-6" itemName="about" class="listitem  footer-listitem">
                About InkWaves
            </a>
        </li>
    </ul>

</div>
<div class="right-footer">

    <h3> Our vision</h3>
    <p>Our mission is to be the leading digital marketplace in Africa, providing a platform for businesses
        of all sizes to reach</p>
    <p>Our mission is to be the leading digital marketplace for independent publishers, providing them with
        a platform to reach customers world</p>
</div>



</div>
<div class="subfooter " style="height: 50px;">
<div class=" d-flex justify-content-center align-items-center flex-column">
    <ul class="d-flex gap-3 px-0 my-0 footer-social-list">
        <li> <a href="" target="_blank"> <i class="fa-brands fa-facebook"> </i> </a> </li>


        <li> <a href="mailto" target="_blank"> <i class="fa-solid fa-at"></i> </a>
        </li>
        <li><a href="https://wa.me/+201555807058" target="_blank"> <i class="fa-brands fa-whatsapp"
                    style='font-weight:600;'></i>
            </a></li>
        <li> <a href="tel:+20" target="_blank"> <i class="fa-solid fa-square-phone-flip"></i>
            </a></li>
        <li> <a href="https://github.com/AHMADHASEEB96" target="_blank"> <i class="fa-brands fa-github"></i>
            </a>
        </li>
        <li><a href=""> <i class="fa-solid fa-tree"></i></a></li>
    </ul>
    <p id="copyrights-p" class="my-0"> All rights reserved for InkWaves platform <span> </span> </p>
</div>
</div>
`;
//#endregion
//#region ////////////////////////////////////////////////////////////////////////////////////////////////////// Footer Elements
//#endregion
//#region ////////////////////////////////////////////////////////////////////////////////////////////////////// Footer Functionalities
//Dynamic year
const copyrightsYear = document.querySelector(`#copyrights-p span`);
copyrightsYear.textContent = new Date().getFullYear();
//#endregion

//#endregion Footer
//#region ////////////////////////////////////////////////////////////////////////////////////////////////////// General functions
function animateHeight(element) {
  // Get the element's current height
  let startHeight = element.clientHeight;
  // Temporarily set the height to 'auto'
  element.style.height = "auto";
  // Get the height with the new content
  let endHeight = element.clientHeight;
  // Revert the height back to its original value
  element.style.height = startHeight + "px";
  // Force a repaint (this is needed on some browsers to ensure the next step works)
  element.getBoundingClientRect();
  // Animate the height
  element.style.transition = "height 0.3s ease";
  element.style.height = endHeight + "px";
}

//#endregion

function signInWithGoogle(res) {
  let response = jwt_decode(res);
  console.log(response);
}

/* function parseJwt(gtoken) {
  var base64Url = gtoken.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}

var gtoken = "your.jwt.token";
var decoded = parseJwt(gtoken);
console.log(decoded); */

//#region ///////////////////////////////////////////////////////////////////////////////////////// Display categories
// let categories = JSON.parse(localStorage.getItem(`categories`)).data;
const categoriesUrl =
  "http://webstercassin1-001-site1.ftempurl.com/api/Categorys";
async function getCategories() {
  let response = await fetch(categoriesUrl);
  let data = await response.json();
  return data.data;
}
let categories = await getCategories();

// get the container,
const landingCategoriesContainer = document.querySelector(
  `.landing-categories-container`
);
// for each category add its name in a span inside the container
categories.forEach((category) => {
  // Make sure that this element exists in the page that this script is running into now, because it is attached to many pages most doesn't have this landing-categories-container`
  // and for sure assigning function or a property to undefined rises errors
  if (landingCategoriesContainer) {
    landingCategoriesContainer.innerHTML += `
    <span class ="landing-category"> ${category.name} </span>
    `;
  }
});
// When any category is licked redirect to the store
const categoryFields = document.querySelectorAll(`.landing-category`);
categoryFields.forEach((cat) => {
  cat.onclick = () => {
    window.location.href = "/pages/book-store.html";
  };
});

// this region's code causes an error while putting it in the beginning of the page
//#endregion
