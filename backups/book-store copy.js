`use strict`

//#region //////////////////////////////////////////////////////////////////////////////////////////////////////////////// fetch book store 

const booksUrl = "http://webstercassin1-001-site1.ftempurl.com/api/Items";
async function getBooks() {
    try {
      let response = await fetch(booksUrl);
      let data = await response.json();
      return  data.data
} catch (error) { console.log(error.message)}
}
//#region

//#region //////////////////////////////////////////////////////////////////////////////////////////////////////////////// Implement book store Elements
const bookStoreSection = document.querySelector(`.book-store-sec .container .book-store`);
let books = await getBooks()
console.log(books)
let arr = [1,1,1,1,1,1,1,1,1,1]
arr.forEach(book => addBook())
function addBook(){
    bookStoreSection.innerHTML += `
        <div class="book-store-product d-block" data-product-ID =''>
            <div class="book-store-product-image">
                <div class="book-store-product-bookmark"> <i
                        class="fa-solid fa-bookmark book-store-product-bookmark-icon"></i> </div>
                <img class="w-100 h-100 " src="/assets/media/images/books Carousel/wheel-of-time.jpg"
                    alt="">
                <div class="info-on-image d-flex align-items-center justify-content-between px-2 w-100">
                    <div class="rating-on-image text-light "> <span class="rate "> 4.5</span> <span
                            class="rating-star"> <i class="fa-solid fa-star"
                                style="color: #d09c43;"></i></span> (<span class="ratings-count ">55</span>)
                    </div>
                    <div class="cart-on-image text-light"> <i class="fa-solid fa-cart-plus"></i> </div>
                </div>
            </div>
            <div class="book-store-product-details bg-light w-100">
                <h5 class="book-store-product-title"> The wheel of time </h5>
                <div class="book-store-product-price-details"> EGP <span class="book-store-product-price">
                        171 </span> <span class="book-store-product-old-price"> 190 </span> <span class="book-store-product-off-percentage">10%</span></div>
            </div>
        </div>
    `
}
//#endregion

//#region ////////////////////////////////////////////////////////////////////////////////////////////////////////////////  Book store Elements

const bookStoreProduct = document.querySelector(`.book-store-product`)
const productBookmark = document.querySelector(`.book-store-product-bookmark`)
const cartOnImage = document.querySelector(`.cart-on-image`)
console.log(cartOnImage, productBookmark, bookStoreProduct)

//#endregion
//#region ////////////////////////////////////////////////////////////////////////////////////////////////////////////////  Book store Functionalities
bookStoreProduct.addEventListener(`click`, productEvent)
function productEvent(event) {
    event.preventDefault()
    // because the target is the path, but I want to target the parent svg or i
if (event.target.closest('div').classList.contains(`book-store-product-bookmark`)) {
    console.log('add to book mark')
}
 else {if (event.target.closest('div').classList.contains(`cart-on-image`)) {
    console.log('add to book cart')
} else {
    // window.location.href = `/pages/book-details.html/${id here}`
}
} 
}



// slice an array into many sub arrays each contains a certain number of values

let mainArray =[1,2,3,4,5,6,7,8,9,10,11] // replace this with the array of objects comes from the back end 
let jaggedArray = [];
let filtrationNumber = 2;   
splitArray(mainArray, filtrationNumber) // 

function splitArray(mainArr, filtrationNumber) { 
// keep splicing a number of values from the mainArray ( splice removes from the mainArray) as long the main array is having values already
    while (  mainArray.length > 0 ) {
        jaggedArray.push(mainArr.splice(0, filtrationNumber))
        // console.log(mainArray) with each loop the first splittingSize number of values are removed from the main array then splice method splices another number of values 
        // from the new mainArray till it is empty 
        // take each sub array of elements and create a pagination div for and inside it add a product for each value inside this sub array

    }
    
    console.log(jaggedArray)
}



//#endregion

