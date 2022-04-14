// Exercise 6
// Validate fields entered by the user: name, phone, password, and email
function validate(e) {
  if (!checkoutForm.checkValidity()) {
    e.preventDefault();
    e.stopPropagation();
  }

  checkoutForm.classList.add("was-validated");
}
