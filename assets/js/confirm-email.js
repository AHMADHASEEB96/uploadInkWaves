// Then validate code

const userValidMail = document.getElementById("mail-to-activate");
const validationCode = document.querySelector("#mail-validation-code");
const validationForm = document.querySelector(`.activate-mail-from`);
const sendCodeBtn = document.querySelector(`#send-code-btn`);
const enterCodeDiv = document.querySelector(`.enter-code-div`);
const enterMailDiv = document.querySelector(`.enter-mail-div`);
const activationMailUrl = `http://webstercassin1-001-site1.ftempurl.com/api/Auth/ActiveUser`;

// send the code to the user mail
sendCodeBtn.addEventListener(`click`, async () => {
  console.log(userValidMail.value);
  let mail = userValidMail.value;
  try {
    const sendCodeUrl = `http://webstercassin1-001-site1.ftempurl.com/api/Auth/SendActiveCode?email=${mail}`;

    const response = await validateMail(sendCodeUrl);
    if (response.succeeded) {
      alert("Code sent successfully!");
      // Hide the mail and show the code input
      enterMailDiv.classList.add("hidden");
      enterCodeDiv.classList.remove("hidden");
    } else {
      alert("Failed to send code. Please try again.");
    }
  } catch (error) {
    console.error("Error sending code:", error);
    alert("An error occurred. Please try again later.");
  }
});

// Submit the code
validationForm.addEventListener(`submit`, async (event) => {
  event.preventDefault();
  let mail = userValidMail.value;
  let code = validationCode.value;

  try {
    const response = await validateMail(activationMailUrl, mail, code);
    if (response.succeeded) {
      alert("Your Account is Activated successfully");
    } else {
      alert("Wrong insert");
    }
  } catch (error) {
    console.error("Validation error:", error);
    alert("An error occurred. Please try again.");
  }
});
async function validateMail(url, userValidMail, validationCode) {
  console.log(url, userValidMail, validationCode);

  // Create an empty object for the request body
  let requestBody = {};

  // Add email and code to the request body only if they are provided
  if (userValidMail) {
    requestBody.email = userValidMail;
  }

  if (validationCode) {
    requestBody.code = validationCode;
  }
  console.log(Object.keys(requestBody));

  // Then using the provided body and URL, send the request
  try {
    let response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // Only include the body if it is not empty
      body:
        Object.keys(requestBody).length > 0
          ? JSON.stringify(requestBody)
          : undefined,
    });

    // First, check that the status code is 200 (successful request)
    if (response.ok) {
      let data = await response.json();
      console.log(data);
    }
  } catch (error) {
    console.log(error);
  }
}

// Reveal sending code input again
const sendCodeAgainButton = document.getElementById(`send-code-again-btn`);
sendCodeAgainButton.addEventListener(`click`, (e) => {
  e.preventDefault();
  enterMailDiv.classList.remove("hidden");
  enterCodeDiv.classList.add("hidden");
});

/* In the lase example I have to requests to send, One to send only the email to the backend by clicking on the send code button so that the backend sends a code
to the uer, another to send the code the user inserts and the email again to the backend so that the backend checks if the code is correct, 
I could use two different requests for each one, for that I would create two function one receives only the mail and makes the request, another to receive the mail and the 
code and makes the request , but I preferred to use one function  for both requests
in normal cases the back end would require me to pass the information by one way using url parameters or using the request body, but in this case the backend developer made a mistake
that he requires the email to be sent as a parameter for the first request but the email and code to be send both in the request body for the seconde request
thats why in the first request call when I pass the email inside the request function I need to insert this mail into the url and then make sure that the body is 
not used in the call , so I use Object.keys() that creates an array of the object keys, then I check if this array is empty means that the object has no key (empty) then the body
value is undefined and this way it will not send any values in the request body  */
