// If you have time, you can move this variable "products" to a json file and load the data in this js. It will look more professional
var products = [
  {
    id: 1,
    name: "cooking oil",
    price: 10.5,
    type: "grocery",
    offer: {
      number: 3,
      discountPrice: 10,
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
      discountPrice: 3.33,
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
//var cartList = []; It has been deprecated in favour of cart = []

// Improved version of cartList. Cart is an array of products (objects), but each one has a quantity field to define its quantity, so these products are not repeated.
var cart = [];

var total = 0;

/* // Exercise 1
function buy(id) {
  // 1. Loop for to the array products to get the item to add to cart
  for (const product of products) {
    if (product.id === id) {
      // 2. Add found product to the cartList array
      cartList.push(product);
    }
  }
  calculateTotal();
} */

// Exercise 2
function cleanCart() {
  var deletedCart = cart.splice(0, cart.length);
  // Ho guardo en una variable per si en algun moment es volgués recuperar/guardar un carro de la compra.
  return deletedCart;
}

// Exercise 3
function calculateTotal() {
  // Calculate total price of the cart using the "cartList" array
  total = 0;
  for (let product of cart) {
    if (
      product.hasOwnProperty("offer") &&
      product.quantity >= product.offer.number
    ) {
      total += product.subtotalWithDiscount;
    } else {
      total += product.subtotal;
    }
  }
}

/* // Exercise 4
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
} */

// Exercise 5
function applyPromotionsCart() {
  for (let product of cart) {
    if (product.hasOwnProperty("offer")) {
      if (product.quantity >= product.offer.number) {
        product.subtotalWithDiscount =
          product.quantity * product.offer.discountPrice;
      } else {
        product.subtotalWithDiscount = 0;
        product.subtotal = product.price * product.quantity;
      }
    }
  }
}

// ** Nivell II **

// Exercise 7
function addToCart(id) {
  // Refactor previous code in order to simplify it
  // 1. Loop for to the array products to get the item to add to cart
  for (const product of products) {
    if (product.id === id) {
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
      applyPromotionsCart();
    }
  }
  countProducts();
}

function countProducts() {
  let productCount = 0;
  for (let product of cart) {
    productCount += product.quantity;
  }
  document.getElementById("count_product").innerHTML = productCount;
}

// Exercise 8
function removeFromCart(id) {
  // 1. Loop for to the array products to get the item to remove from the cart
  if (cart.length === 0) {
    let indexed = products.findIndex((product) => product.id === id);
    console.log(
      `You don't have any ${products[indexed].name} in your shopping cart`
    );
  } else {
    for (const wannaDelete of cart) {
      if (wannaDelete.id === id) {
        let deleteIndex = cart.findIndex((prod) => prod.id === wannaDelete.id);

        // 2. Remove found product from the cart array
        if (cart[deleteIndex].quantity === 1) {
          cart.splice(deleteIndex, 1);
        } else {
          cart[deleteIndex].quantity--;
          cart[deleteIndex].subtotal =
            cart[deleteIndex].quantity * cart[deleteIndex].price;
        }
        applyPromotionsCart();
      }
    }
    countProducts();
  }
}

// Exercise 9
function printCart() {
  // Fill the shopping cart modal manipulating the shopping cart dom
  document.getElementById("shoppingList").innerHTML = "";

  for (const product of cart) {
    let price = product.price;
    let subTot = product.subtotal;

    if (
      product.hasOwnProperty("offer") &&
      product.quantity >= product.offer.number
    ) {
      subTot = product.subtotalWithDiscount;
    }
    document.getElementById("shoppingList").innerHTML += `
      <tr>
        <td>${product.name}</td>
        <td class="text-end">${product.quantity}</td>
        <td class="text-end">${price.toFixed(2)}</td>
        <td class="text-end">${subTot.toFixed(2)}</td>
      </tr>`;
  }

  document.getElementById("shoppingList").innerHTML += `
    <tr>
      <th>TOTAL</th>
      <td></td><td></td>
      <th class="text-end">$${total.toFixed(2)}</th>
    </tr>
    `;
}

function isEmpty() {
  // Check if the cart has any item
  if (cart.length === 0) {
    document.getElementById("no_content").classList.remove("d-none");
    document.getElementById("shoppingTable").classList.add("d-none");
  } else {
    printCart();
    document.getElementById("shoppingTable").classList.remove("d-none");
    document.getElementById("no_content").classList.add("d-none");
  }
}

function open_modal() {
  calculateTotal();
  isEmpty();
}
