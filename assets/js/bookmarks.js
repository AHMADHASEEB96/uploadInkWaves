

// Because books html is loaded dynamically and asynchronously from the database, other functions those are not async need to wait tell Dom Content is loaded
document.addEventListener("DOMContentLoaded", (_) => {
    console.log(`dom loaded`)
  // After that I need to use event delegation on the document itself or the body so these dynamically loaded elements can listen to this event
  document.addEventListener(`click`, (e) => {
    console.log(e.target);

    // e.preventDefault();
    // because the target is the path, but I want to target the parent svg or i
    if (
      e.target.closest("div").classList.contains(`bookmarks-product-trash`)
    ) {
      console.log("add to book trash");
    } else {
      if (e.target.closest("div").classList.contains(`cart-on-image`)) {
        console.log("add to book cart");
        let itemId = e.target.closest("div").getAttribute(`product-id`);
        // call the function to add to cart, to use await it needs to be inside an async function or on top of a module script, 
        addToCartFromStore();
        // create a function to pass the url containing the id of the clicked book
        async function addToCartFromStore() {
          // Once the button is get the token again, because in case the user is signed the token is saved to the storage so
          //we need to refresh the process of getting the token from the local storage once the user clicks add to cart the first time after signing in
          token = getToken();
          // if the token is found in local or session storage means the user is now logged in
          if (token) {
            // add this item to the cart
            try {
              await postData(
                `http://webstercassin1-001-site1.ftempurl.com/api/cart?itemId=${itemId}&quantity=1` /* default quantity 1 then form cart change it */
              );
              // If the postData is successful, you can show the success message or perform other actions.
            } catch (error) {
              console.error("Error adding item to the cart:", error.message);
              // Handle the error if needed
            }
            // else if not signed in , sign in first to add to cart
          } else {
           alert(`Please sign in First`)
          }
        }
      } else {
        if (e.target.classList.contains(`store-book-img`)) {
          window.location.href = `/pages/book-details.html?id=${e.target.getAttribute(
            `book-id`
          )}`;
        }
        // window.location.href = `/pages/book-details.html/${id here}`
      }
    }
  });
}); // end DOMContentLoaded event








// Get the loading effect elements
const bookStoreBodyOverlay = document.querySelector(`.book-store-body-overlay`);
const bookStoreBodyLoader = document.querySelector(`.book-store-body-loader`);

// Once page loaded get all bookmarked products
/////////////// Get all books in cart
let token = getToken(); // Fetch token once
// First if the user not signed in make sure the loading effect not activated.
if (!token) {
    bookStoreBodyOverlay.classList.add("hidden");
    bookStoreBodyLoader.classList.add("hidden");
}
async function getCartBooks() {
  let response = await fetch(
    "http://webstercassin1-001-site1.ftempurl.com/api/Favourite",
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
let bookmarksData = await getCartBooks();
console.log(bookmarksData);

const bookmarksContainer = document.querySelector(
  `.bookmarks-products-container`
);
bookmarksData.forEach((bookmark) => fillBookMarks(bookmark));
function fillBookMarks(bookmark) {
  bookmarksContainer.innerHTML +=  `
  <div class="book-store-product bg-light d-block" data-product-ID =${
    bookmark.id
  }>
  <div class="book-store-product-image">
      <div class="bookmarks-product-trash" trash-for = '${bookmark.id}'> 
              <i class="fa-solid fa-trash-arrow-up book-store-product-bookmark-icon"></i> </div>
      <img class="w-100 h-100 store-book-img" src="${bookmark.image}"
          alt="${bookmark.title}" book-id = '${bookmark.id}'>
      <div class="info-on-image d-flex align-items-center justify-content-between px-2 w-100">
          <div class="rating-on-image text-light "> <span class="rate "> 4.5</span> <span
                  class="rating-star"> <i class="fa-solid fa-star"
                      style="color: #d09c43;"></i></span> (<span class="ratings-count ">55</span>)
          </div>
          <div class="cart-on-image text-light" product-id = '${
            bookmark.id
          }'> <i class="fa-solid fa-cart-plus"></i> </div>
      </div>
  </div>
  <div class="book-store-product-details  w-100">
      <h6 class="book-store-product-title"> ${
        bookmark.title.length > 45
          ? bookmark.title.slice(1, 40) + "..."
          : bookmark.title
      }</h6>
      <div class="book-store-product-price-details"> EGP <span class="book-store-product-price">
             ${
                bookmark.price
             } </span> <span class="book-store-product-old-price"> 190 </span> <span class="book-store-product-off-percentage">10%</span></div>
  </div>
</div>
`;
}





/////////// Add to cart function
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
    if (data.succeeded) {
      alert(" Item Added To Cart");
      const productsCountInCart = document.querySelector(
        ".number-of-products-in-cart"
      );
      //
      //get all the items in the cart to get the count and display it on the cart Icon
      let cart = await fetch(
        "http://webstercassin1-001-site1.ftempurl.com/api/Cart",
        { headers: { Authorization: `Bearer ${token}` } }
      ).then((res) => res.json());
      let cartCount = cart.data.itemCount;
      productsCountInCart.textContent = cartCount;
    } else {
      alert(
        " Something went wrong, Item not added and it may exists in cart already"
      );
    }
    console.log(data);
  } catch (error) {
    console.log(error.message);
  }
}



/// Delete from book marks 

bookmarksData.forEach((bookmark) => {
    document
      .querySelector(`[trash-for = '${bookmark.id}']`)
      .addEventListener(`click`, (e) => {
        // once the icon clicked, show the loader and the overlay
       if (confirm('Delete Items?')) {
  
          bookStoreBodyOverlay.classList.remove("hidden");
          bookStoreBodyLoader.classList.remove("hidden");
        //   undoDeletionDiv.style.transform = 'transform: translate(-50%, 0px);'
          deleteItem(bookmark.id);
        }
        
      });
  });
  
  async function deleteItem(id) {
    let token = localStorage.getItem(`token`) || sessionStorage.getItem(`token`);
    console.log(id, token);
    const deleteUrl = `http://webstercassin1-001-site1.ftempurl.com/api/Favourite?itemId=${id}`;
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
  