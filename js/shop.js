// If you have time, you can move this variable "products" to a json file and load the data in this js. It will look more professional
var products = [
  {
    id: 1,
    name: "cooking oil",
    price: 10.5,
    type: "grocery",
    offer: {
      number: 3,
      percent: 20,
    },
  },
  {
    id: 2,
    name: "Pasta",
    price: 6.25,
    type: "grocery",
  },
  {
    id: 3,
    name: "Instant cupcake mixture",
    price: 5,
    type: "grocery",
    offer: {
      number: 10,
      percent: 30,
    },
  },
  {
    id: 4,
    name: "All-in-one",
    price: 260,
    type: "beauty",
  },
  {
    id: 5,
    name: "Zero Make-up Kit",
    price: 20.5,
    type: "beauty",
  },
  {
    id: 6,
    name: "Lip Tints",
    price: 12.75,
    type: "beauty",
  },
  {
    id: 7,
    name: "Lawn Dress",
    price: 15,
    type: "clothes",
  },
  {
    id: 8,
    name: "Lawn-Chiffon Combo",
    price: 19.99,
    type: "clothes",
  },
  {
    id: 9,
    name: "Toddler Frock",
    price: 9.99,
    type: "clothes",
  },
];
// Array with products (objects) added directly with push(). Products in this array are repeated.
var cartList = [];

// Improved version of cartList. Cart is an array of products (objects), but each one has a quantity field to define its quantity, so these products are not repeated.
var cart = [];

var total = 0;

// Exercise 1
function buy(id) {
  // 1. Loop for to the array products to get the item to add to cart
  for (const product of products) {
    if (product.id === id) {
      // 2. Add found product to the cartList array
      cartList.push(product);
    }
  }

  calculateTotal();
}

// Exercise 2
function cleanCart() {
  var deletedCart = cartList.splice(0, cartList.length);
  // Ho guardo en una variable per si en algun moment es volgués recuperar/guardar un carro de la compra.
  return deletedCart;
}

// Exercise 3
function calculateTotal() {
  // Calculate total price of the cart using the "cartList" array
  let totalAmount = 0;
  for (let product of cartList) {
    totalAmount += product.price;
  }
  return totalAmount;
}

// Exercise 4
function generateCart() {
  // Using the "cartlist" array that contains all the items in the shopping cart,
  // generate the "cart" array that does not contain repeated items, instead each item of this array "cart" shows the quantity of product.
  for (let product of cartList) {
    let indexID = cart.findIndex((prod) => prod.id === product.id);

    if (indexID === -1) {
      cart.push({
        ...product,
        quantity: 1,
        subtotal: product.price,
      });
    } else {
      cart[indexID].quantity++;
      cart[indexID].subtotal = cart[indexID].quantity * cart[indexID].price;
    }
  }
  applyPromotionsCart();
}

// Exercise 5
function applyPromotionsCart() {
  // Apply promotions to each item in the array "cart"
  let isDiscountOil = cart.findIndex((cartProduct) => cartProduct.id === 1);
  let isDiscountCake = cart.findIndex((cartProduct) => cartProduct.id === 3);

  if (isDiscountOil !== -1) {
    if (cart[isDiscountOil].quantity >= cart[isDiscountOil].offer.number) {
      cart[isDiscountOil].subtotalWithDiscount =
        cart[isDiscountOil].quantity * 10;
    }
  }
  if (isDiscountCake !== -1) {
    if (cart[isDiscountCake].quantity >= cart[isDiscountCake].offer.number) {
      cart[isDiscountCake].subtotalWithDiscount =
        (cart[isDiscountCake].quantity * cart[isDiscountCake].price * 2) / 3;
    }
  }
}

// ** Nivell II **

// Exercise 7
function addToCart(id) {
  // Refactor previous code in order to simplify it
  // 1. Loop for to the array products to get the item to add to cart
  // 2. Add found product to the cart array or update its quantity in case it has been added previously.
}

// Exercise 8
function removeFromCart(id) {
  // 1. Loop for to the array products to get the item to add to cart
  // 2. Add found product to the cartList array
}

// Exercise 9
function printCart() {
  // Fill the shopping cart modal manipulating the shopping cart dom
}

function open_modal() {
  console.log("Open Modal");
  generateCart();
}
