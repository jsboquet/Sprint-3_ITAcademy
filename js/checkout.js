// Get the input fields
var nom = document.getElementById("fName");
var mail = document.getElementById("fEmail");
var address = document.getElementById("fAddress");
var lastN = document.getElementById("fLastN");
var password = document.getElementById("fPassword");
var phone = document.getElementById("fPhone");

// Get the error elements
var errorName = document.getElementById("errorName");
var errorMail = document.getElementById("errorEmail");
var errorAddress = document.getElementById("errorAddress");
var errorLastN = document.getElementById("errorLastN");
var errorPassword = document.getElementById("errorPassword");
var errorPhone = document.getElementById("errorPhone");

// Exercise 6
function validate(event) {
  // Validate fields entered by the user: name, phone, password, address and email
  let nameVal = nom.value;
  let mailVal = mail.value;
  let addressVal = address.value;
  let lastNVal = lastN.value;
  let passwordVal = password.value;
  let phoneVal = phone.value;

  let onlyLetters =
    /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g;

  if (nameVal.length < 3 || !nameVal.match(onlyLetters)) {
    prevent(event);
    errorStyling(nom, errorName);
  }
  if (lastNVal.length < 3 || !lastNVal.match(onlyLetters)) {
    prevent(event);
    errorStyling(lastN, errorLastN);
  }

  let onlyNumbers = /^-?\d+\.?\d*$/;

  if (phoneVal.length < 8 || !phoneVal.match(onlyNumbers)) {
    prevent(event);
    errorStyling(phone, errorPhone);
  }

  let onlyEmails = new RegExp(
    "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$"
  );

  if (mailVal.length < 3 || !mailVal.match(onlyEmails)) {
    prevent(event);
    errorStyling(mail, errorMail);
  }

  let onlyPassword = new RegExp("(?=.*[A-Za-z])(?=.*d)[A-Za-zd]");

  if (
    passwordVal.length < 4 ||
    passwordVal.length >= 9 ||
    !passwordVal.match(onlyPassword)
  ) {
    prevent(event);
    errorStyling(password, errorPassword);
  }

  if (addressVal.length < 3) {
    prevent(event);
    errorStyling(address, errorAddress);
  }
}

function prevent(e) {
  e.preventDefault();
  e.stopPropagation();
}

function errorStyling(ele, eleErr) {
  ele.style.border = "thin solid #DC3545";
  eleErr.style.display = "inline";
}
