`use strict`;

// *************** ELEMENTS
//#region Orders
const userSectionHeader = document.querySelectorAll(`.user-section-header`);

//#endregion
//#region Update info
const updateInfoLabels = document.querySelectorAll(
  `.update-user-info .container form label`
);
const updateInfoInputs = document.querySelectorAll(
  `.update-user-info .container form input`
);
//#endregion

// *************** FUNCTIONALITIES
// Once the page loads get the information of the user
let token = localStorage.getItem(`token`) || sessionStorage.getItem("token");
if (!token) {
  window.location.href = "/index.html";
}
let userInfoUrl =
  "http://webstercassin1-001-site1.ftempurl.com/api/Users/GetMyInfo";
let userOrdersUrl = "http://webstercassin1-001-site1.ftempurl.com/api/Order";
let userAddressesUrl =
  "http://webstercassin1-001-site1.ftempurl.com/api/address";
let userPaymentsUrl =
  "http://webstercassin1-001-site1.ftempurl.com/api/PaymentMethod";

let userData = (await request(userInfoUrl)).data;
let userOrders = await request(userOrdersUrl);
let userAddresses = await request(userAddressesUrl);
let userPayments = await request(userPaymentsUrl);

async function request(url) {
  // give a default value for the parameter 'requestMethod' in case it was not passed in the function call.
  let response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    },
  });
  let data = await response.json();
  return data;
}
// Store user Id in local storage
console.log(userData);
console.log(userOrders);
console.log(userAddresses);
// console.log(userPayments)
localStorage.setItem(`userId`, userData.id);
localStorage.setItem(`userName`, userData.firstName);
console.log(localStorage);
/////////////////////////////////////////////////////////////// POST request

async function postNewAddressInfo(bodyObject) {
  // because the new address post request is using parameters and not request body, I will receive the object and then destruct it here.
  // In regular cases the data is sent in the body and not the url as parameters, in such cases I only will have to pass the pure url and the request object
  // in the function call and the request function will handle them , this we we only create one request function for all requests, but in our case we may create many
  let {
    name,
    country,
    governorate,
    district,
    city,
    street,
    building,
    apartment,
    zip,
    landmark,
  } = bodyObject;
  let newAddressUrl = `http://webstercassin1-001-site1.ftempurl.com/api/Address?street=${street}&city=${city}&building=${building}&apartment=${apartment}&markingPlace=${landmark}`;
  try {
    let response = await fetch(newAddressUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
    });
    if (!response.ok) {
      alert(" Failed operation");
    } else {
      let data = await response.json();
      if (!data.succeeded) {
        alert("Something went wrong, response says " + data.messages);
      } else {
        alert("Information Posted Successfully");
      }
    }
  } catch (error) {
    console.log(error.message);
  }
  return data;
}

/////////////////////////////////////////////////////////////// PUT request
async function putInfo(url, bodyObject) {
  try {
    let response = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify(bodyObject),
    });
    if (!response.ok) {
      alert(" Failed operation");
    } else {
      let data = await response.json();
      if (!data.succeeded) {
        alert("Something went wrong, response says " + data.messages);
      } else {
        alert("Updated");
      }
    }
  } catch (error) {
    console.log(error.message);
  }
  return data;
}

//#region //////////////////////////////////////////////////////////////////////////////////////// Orders

// Extend the division on clicking over the header
const openers = document.querySelectorAll(`[opener-for]`);
openers.forEach((opener) => {
  let isUserDivRevealed = false; // Must be inside forEach
  let openerFor = opener.getAttribute(`opener-for`);
  let contentDiv = document.getElementById(`${openerFor}`);
  opener.addEventListener(`click`, openUserContentDiv);
  function openUserContentDiv() {
    if (!isUserDivRevealed) {
      contentDiv.classList.remove(`hidden`);
      contentDiv.style.height = `${contentDiv.scrollHeight}px`;

      isUserDivRevealed = true;
    } else {
      contentDiv.style.height = `${0}px`;
      contentDiv.classList.add(`hidden`);
      isUserDivRevealed = false;
    }
  }
});

//#endregion

//#region //////////////////////////////////////////////////////////////////////////////////////// Addresses
//////////////// Fill the Governorate Drop down menu
// Array of governorate
let governorates = [
  "New Valley",
  "Matruh",
  "Red Sea",
  "Giza",
  "South Sinai",
  "North Sinai",
  "Suez",
  "Beheira",
  "Helwan",
  "Sharqia",
  "Dakahlia",
  "Kafr el-Sheikh",
  "Alexandria",
  "Monufia",
  "Minya",
  "Gharbia",
  "Faiyum",
  "Qena",
  "Asyut",
  "Sohag",
  "Ismailia",
  "Beni Suef",
  "Qalyubia",
  "Aswan",
  "Damietta",
  "Cairo",
  "Port Said",
  "Luxor",
  "6th of October",
];

// Function to add governorate to the dropdown list
function addGovernorate() {
  // Get the select element by id
  let governorateList = document.querySelectorAll(
    ".addresses-form-governorate-list"
  );

  // Use forEach to loop through the array of governorates
  governorates.forEach(function (governorate) {
    // Create a new option element
    let option = document.createElement("option");
    // Set it's value
    option.value = governorate.toLowerCase();
    // Set it's text
    option.text = governorate;
    // Add the option element to the select element
    governorateList.forEach((list) => list.add(option));
  });
}
addGovernorate();

///////////// Handle revealing and hiding the new address modal
const addNewAddressBtn = document.querySelector(`.add-new-address-btn`);
const addNewAddressForm = document.querySelector(`.new-address-form`);
const closeNewAddressModal = document.querySelector(`.close-new-address-modal`);
addNewAddressBtn.addEventListener(`click`, function (e) {
  e.preventDefault();
  addNewAddressForm.classList.remove(`hidden`);
  dashboardBodyOverlay.classList.remove(`hidden`);
});
closeNewAddressModal.addEventListener(`click`, function (e) {
  e.preventDefault();
  addNewAddressForm.classList.add(`hidden`);
  dashboardBodyOverlay.classList.add(`hidden`);
});

////////////////// Send a new-address request
// get all the elements to use
const newAddressName = document.getElementById(`new-address-name`);
const newAddressCountry = document.getElementById(`new-address-country`);
const newAddressGovernorate = document.getElementById(
  `new-address-governorate`
);
const newAddressCity = document.getElementById(`new-address-city`);
const newAddressDistrict = document.getElementById(`new-address-district`);
const newAddressStreet = document.getElementById(`new-address-street`);
const newAddressBuilding = document.getElementById(`new-address-building`);
const newAddressApartment = document.getElementById(`new-address-apartment`);
const newAddressZip = document.getElementById(`new-address-zip`);
const newAddressLandmark = document.getElementById(`new-address-landmark`);
// once the form is submitted
addNewAddressForm.addEventListener(`submit`, async function postNewAddress(e) {
  e.preventDefault();
  //// construct the body object
  let newAddressData = {
    name: newAddressName.value,
    country: newAddressCountry.value,
    governorate: newAddressGovernorate.value,
    city: newAddressCity.value,
    district: newAddressDistrict.value,
    building: newAddressBuilding.value,
    street: newAddressStreet.value,
    apartment: newAddressApartment.value,
    zip: newAddressZip.value,
    markingPlace: newAddressLandmark.value,
  };

  let newAddressResponse = await postNewAddressInfo(newAddressData);
  console.log(newAddressResponse);
});

//#endregion
//#region //////////////////////////////////////////////////////////////////////////////////////// Update Info
///////// Elements

const userContentSections = document.querySelectorAll(`.user-content-section`);
const dashboardCategoryDivs = document.querySelectorAll(
  `.dashboard-category-div`
);
const userInfoForm = document.querySelector(`.update-user-info-form`);
const accountInfoForm = document.querySelector(`.update-account-info-form`);
const firstName = document.getElementById(`first-name`);
const lastName = document.getElementById(`last-name`);
const maleInput = document.getElementById(`male-radio`);
const femaleInput = document.getElementById(`female-radio`);
const genderInputs = document.querySelectorAll(`[name = 'update-gender']`);
const phonNum = document.getElementById(`phone-num`); // what about activation
const eMail = document.getElementById(`e-mail`);
const currentPass = document.getElementById(`current-pass`);
const newPass = document.getElementById(`new-pass`);
const confirmNewPass = document.getElementById(`confirm-new-pass`);

// Fill info
firstName.value = userData.firstName;
lastName.value = userData.lastName;
phonNum.value = userData.phone;
eMail.value = userData.email;
/* genderInputs.forEach(genderInput => {
    if (genderInput.id == userData+'-radio' ) {
        genderInput.checked = true;
    }
}) */

let userDataBody = {
  userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  firstName: firstName.value,
  lastName: lastName.value,
  email: eMail.value,
  phone: phonNum.value,
  gender: "string",
};

////////////////// Reveal current content
dashboardCategoryDivs.forEach((cd) => {
  cd.addEventListener(`click`, revealRelatedContent);

  function revealRelatedContent() {
    let contentType = cd.getAttribute(`for-user-info`);
    userContentSections.forEach((userInfoSection) => {
      userInfoSection.classList.add(`hidden`);
    });
    document
      .querySelector(`[sectionOf = '${contentType}']`)
      .classList.remove("hidden");
  }
});

// Reveal update pass modal
const dashboardBodyOverlay = document.querySelector(".dashboard-body-overlay");
const openUpdatePassModalBtn = document.querySelector(
  ".open-update-pass-modal"
);
const updatePassModal = document.querySelector(".update-pass-modal");

openUpdatePassModalBtn.addEventListener("click", openUpdatePassModal);

function openUpdatePassModal(e) {
  e.preventDefault();
  updatePassModal.classList.remove("hidden");
  dashboardBodyOverlay.classList.remove("hidden");
}
// Close the modal
const closeUpdatePassModalBtn = document.querySelector(
  ".close-update-pass-modal"
);
closeUpdatePassModalBtn.addEventListener("click", closeUpdatePassModal);

function closeUpdatePassModal(e) {
  e.preventDefault();
  updatePassModal.classList.add("hidden");
  dashboardBodyOverlay.classList.add("hidden");
}

/////////////////// Update pass Validations
const currentPasswordInput = document.getElementById("current-password");
const newPasswordInput = document.getElementById("new-pass");
const confirmNewPasswordInput = document.getElementById("confirm-new-pass");
const updatePassButton = document.querySelector(".update-pass-now");

const currentPasswordValidation = document.getElementById(
  "current-password-validation"
);
const newPasswordValidation = document.getElementById("new-pass-validation");
const confirmNewPasswordValidation = document.getElementById(
  "confirm-new-pass-validation"
);

// Add blur event listeners to trigger validation on focus loss
currentPasswordInput.addEventListener("blur", function () {
  validateCurrentPassword();
});

newPasswordInput.addEventListener("blur", function () {
  validateNewPassword();
});

confirmNewPasswordInput.addEventListener("blur", function () {
  validateConfirmNewPassword();
});

updatePassButton.addEventListener("click", function () {
  // Trigger all validations on button click
  validateCurrentPassword();
  validateNewPassword();
  validateConfirmNewPassword();

  // Add any additional logic here based on validation results
  if (allValidationsPassed()) {
    console.log("All validations passed. Proceed with updating the password.");
  }
});

function validateCurrentPassword() {
  currentPasswordValidation.textContent = "";

  if (currentPasswordInput.value.trim() === "") {
    currentPasswordValidation.textContent = "Current password is required.";
  }
}

function validateNewPassword() {
  newPasswordValidation.textContent = "";

  if (newPasswordInput.value.trim() === "") {
    newPasswordValidation.textContent = "New password is required.";
  }
}

function validateConfirmNewPassword() {
  confirmNewPasswordValidation.textContent = "";

  if (confirmNewPasswordInput.value !== newPasswordInput.value) {
    confirmNewPasswordValidation.textContent = "Passwords do not match.";
  }
}

function allValidationsPassed() {
  // Check if all validation messages are empty
  return (
    currentPasswordValidation.textContent === "" &&
    newPasswordValidation.textContent === "" &&
    confirmNewPasswordValidation.textContent === ""
  );
}

//////////// End validation

////////////////////////// Updating information

//Once the form is submitted,

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
    userId: userData.id,
    firstName: firstName.value,
    lastName: lastName.value,
    email: eMail.value,
    phone: phonNum.value,
    gender: genderIs,
  };
}
/* Note that, the asynchronous nature of the addEventListener makes the userDataSet reads the initial value of the genderIs variable before the event is listened to. that's 
why we force to object to read the data only after the event is fired and all listeners listen to it  */

console.log(userDataSet);
userInfoForm.addEventListener(`submit`, updateUserInfo);
function updateUserInfo(e) {
  e.preventDefault();
  console.log(userDataSet);

  // Check if the user changes the mail, then he/she must insert the verification code
  if (eMail.value !== userData.email) {
    // send a request to verify the mail, when the request is succeeded then show the code input and then when the user insert it send another request with the new mail
    // and the code to verify it.
    // then if this process is done call the method to update the info
  } else {
    // or if the user didn't change the mail, update the information immediately
    let updateInfoUrl =
      "http://webstercassin1-001-site1.ftempurl.com/api/Users";
    putInfo(updateInfoUrl, userDataSet);
  }
}

//#endregion
