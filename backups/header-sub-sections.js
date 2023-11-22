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
    <div id="subsection-print" class="subsection">
        <div class="sub-links">
          
            <p class="sub-link"> Here is the sublink print</p>
            <p class="sub-link"> Here is the sublink</p>
            <p class="sub-link"> Here is the sublink</p>
            <p class="sub-link"> Here is the sublink</p>
        </div>
        <div class="boxes-side">
            <a href="" class="box">
                <h6 class="box-title">Box Title </h6>
                <p class="box-description"> this is a short description</p>
            </a>
            <a href="" class="box">
                <h6 class="box-title">Box Title </h6>
            </a>
        </div>
    </div>
    <div id="subsection-book-details" class="subsection">
        <div class="sub-links">
          
            <p class="sub-link"> Here is the sublink print</p>
            <p class="sub-link"> Here is the sublink</p>
            <p class="sub-link"> Here is the sublink</p>
            <p class="sub-link"> Here is the sublink</p>
        </div>
        <div class="boxes-side">
            <a href="" class="box">
                <h6 class="box-title">Box Title </h6>
                <p class="box-description"> this is a short description</p>
            </a>
            <a href="" class="box">
                <h6 class="box-title">Box Title </h6>
            </a>
        </div>
    </div>
    <div id="subsection-user-dashboard" class="subsection">
        <div class="sub-links">
          
            <p class="sub-link"> Here is the sublink print</p>
            <p class="sub-link"> Here is the sublink</p>
            <p class="sub-link"> Here is the sublink</p>
            <p class="sub-link"> Here is the sublink</p>
        </div>
        <div class="boxes-side">
            <a href="" class="box">
                <h6 class="box-title">Box Title </h6>
                <p class="box-description"> this is a short description</p>
            </a>
            <a href="" class="box">
                <h6 class="box-title">Box Title </h6>
            </a>
        </div>
    </div>
    <div id="subsection-book-store" class="subsection">
        <div class="sub-links">
            <p class="sub-link"> Here is the sublink store</p>
            <p class="sub-link"> Here is the sublink</p>
            <p class="sub-link"> Here is the sublink</p>
            <p class="sub-link"> Here is the sublink</p>
            <p class="sub-link"> Here is the sublink</p>
            <p class="sub-link"> Here is the sublink</p>
            <p class="sub-link"> Here is the sublink</p>
        </div>
        <div class="boxes-side">
            <a href="" class="box">
                <h6 class="box-title">Box Title </h6>
                <p class="box-description"> this is a short description</p>
            </a>
            <a href="" class="box">
                <h6 class="box-title">Box Title </h6>
            </a>
        </div>
    </div>
    <div id="subsection-privacy-and-conditions" class="subsection">
        <div class="sub-links">
            <p class="sub-link"> Here is the sublink conditions</p>
            <p class="sub-link"> Here is the sublink</p>
            <p class="sub-link"> Here is the sublink</p>
            <p class="sub-link"> Here is the sublink</p>
        </div>
        <div class="boxes-side">
            <a href="" class="box">
                <h6 class="box-title">Box Title </h6>
                <p class="box-description"> this is a short description</p>
            </a>
            <a href="" class="box">
                <h6 class="box-title">Box Title </h6>
            </a>
        </div>
    </div>
    <div id="subsection-about" class="subsection">
        <div class="sub-links">
            <p class="sub-link"> Here is the sublink about</p>
            <p class="sub-link"> Here is the sublink</p>
            <p class="sub-link"> Here is the sublink</p>
            <p class="sub-link"> Here is the sublink</p>
        </div>
        <div class="boxes-side">
            <a href="" class="box">
                <h6 class="box-title">Box Title </h6>
                <p class="box-description"> this is a short description</p>
            </a>
            <a href="" class="box">
                <h6 class="box-title">Box Title </h6>
            </a>
        </div>
    </div>
    <div id="subsection-4" class="subsection">
        <div class="sub-links">
            <p class="sub-link"> Here is the sublink</p>
            <p class="sub-link"> Here is the sublink</p>
            <p class="sub-link"> Here is the sublink</p>
            <p class="sub-link"> Here is the sublink</p>
        </div>
        <div class="boxes-side">
            <a href="" class="box">
                <h6 class="box-title">Box Title </h6>
                <p class="box-description"> this is a short description</p>
            </a>
            <a href="" class="box">
                <h6 class="box-title">Box Title </h6>
            </a>
        </div>
    </div>
    <div id="subsection-5" class="subsection">
        <div class="sub-links">
            <p class="sub-link"> Here is the sublink</p>
            <p class="sub-link"> Here is the sublink</p>
            <p class="sub-link"> Here is the sublink</p>
            <p class="sub-link"> Here is the sublink</p>
        </div>
        <div class="boxes-side">
            <a href="" class="box">
                <h6 class="box-title">Box Title </h6>
                <p class="box-description"> this is a short description</p>
            </a>
            <a href="" class="box">
                <h6 class="box-title">Box Title </h6>
            </a>
        </div>
    </div>
<!-- </div> -->
</div>`;
//#endregion
