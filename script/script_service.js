import data from "../script/data.json" with {type: "json"};

// Define service product list
// const products = [
//     { id: 1, name: "DJ onboard",           price: 2500, quantity: 0},
//     { id: 2, name: "water-toy",            price: 1200, quantity: 0},
//     { id: 3, name: "catering-onboard",     price: 1500, quantity: 0},
//     { id: 4, name: "asian-style",          price: 400,  quantity: 0},
//     { id: 5, name: "mediterranean-style",  price: 500,  quantity: 0},
//     { id: 6, name: "continental-style",    price: 550,  quantity: 0},
//   ];

// Init a cart list
let cart = [];

// Prepare the price, addCart button, deleteItem, quantity, addItem for service HTML
const productsHTML = data.products.map(
      (product) => `<strong>$${product.price}</strong>
                    <button class="service-button" id=${product.id}>Add to Cart</button>
                    <div class="mid-${product.id} unit">
                      <button class ="unit-button unit-del-button" id=${product.id}">-</button>
                      <p>${product.quantity}</p>
                      <button class ="unit-button unit-add-button" id=${product.id}}>+</button>
                    </div>`);

// Insert the prepared price, addCart button, deleteItem, quantity, addItem to service HTML
for (let i = 0; i <= productsHTML.length-1; i++) {
  const productName = `.service-${data.products[i].id}`;
  const result = document.querySelector(productName);
  result.innerHTML = productsHTML[i];
}

// ======= Event Listener =======

// Add eventListener on all addCart button
let num = document.querySelectorAll(".service-button").length;
for (let i = 0; i < num; i++) {
  document.querySelectorAll(".service-button")[i].addEventListener("click", (e) => {
    addToCart(data.products, parseInt(e.target.id));
  });
}

// Add eventListener on payment reset button
document.querySelector(".payment-button-reset").addEventListener("click", (e) => {
  // reset the cart list to empty list
  cart = [];

  // reset the quantity to unit 0
  for (let i = 1; i <= data.products.length; i++) {
    const temp = document.querySelector(".mid-" + i + " p");
    temp.innerText = 0;
  }

  // Update the cart and the total amount
  updateCart();
  getTotal(cart);
});

// Add eventListener on addItem button
let num1 = document.querySelectorAll(".unit-add-button").length;
for (let i = 0; i < num1; i++) {
  document.querySelectorAll(".unit-add-button")[i].addEventListener("click", (e) => {
    addItem(data.products, parseInt(e.target.id));
  });
}

// Add eventListener on deleteItem button
let num2 = document.querySelectorAll(".unit-del-button").length;
for (let i = 0; i < num2; i++) {
  document.querySelectorAll(".unit-del-button")[i].addEventListener("click", (e) => {
    deleteItem(data.products, parseInt(e.target.id));
  });
}

// Reset all the value in the cart list if the page is reloaded even though item is added in the cart list below 
window.addEventListener('load', (e) => {
  console.log("Reload");

  let tempCart = JSON.parse(localStorage.getItem('totalCart'));

  console.log(tempCart);
  
  if (tempCart != undefined) {
    for (let i = 0; i < tempCart.length; i++) {
      if (tempCart[i].type === "service") {
        const product = data.products.find((product) => product.id === tempCart[i].id);
        // const cartProduct = cart.find((product) => { return ((product.id === tempCart[i].id) && (product.type === "service")) });

        cart.unshift(product);
        // console.log(boat);
        // console.log(cart);
        const temp = document.querySelector(".mid-" + tempCart[i].id + " p");
        cart[0].quantity = tempCart[i].quantity;
        temp.innerText = cart[0].quantity;
      }
      else if (tempCart[i].type === "boat") {
        console.log("here for boat");
        const boat = data.boats.find((product) => product.id === tempCart[i].id);
        // const cartProduct = cart.find((product) => { return ((product.id === tempCart[i].id) && (product.type === "boat")) });

        cart.unshift(boat);
        cart[0].quantity = tempCart[i].quantity;
      }  
    }
  }  
});

// ======= Function =======

function addToCart(products, id){
  const product = products.find((product) => product.id === id);
  const cartProduct = cart.find((product) => { return ((product.id === id) && (product.type === "service")) });

  // If cart list is not empty, add cartProduct in existing cart list
  if (cartProduct != undefined && product.id == cartProduct.id) {
    addItem(data.products, id);
  } 
  // else cart list is empty, add item in the cart list
  else {
    //  console.log("product - " + product.name + " " + product.price + " " + product.id + " " +  product.quantity);
    cart.unshift(product);
    const temp = document.querySelector(".mid-" + id + " p");
    cart[0].quantity = 1;
    temp.innerText = cart[0].quantity;
    // console.log(temp)
    // console.log("cart - " + cart[0].price + " " + cart[0].id);
  }

  // Update the cart and the total amount
  updateCart();
  getTotal(cart);
};

function addItem(products, id) {
  console.log(id);
  const product = products.find((product) => product.id === id);
  const cartProduct = cart.find((product) => { return ((product.id === id) && (product.type === "service")) });
  
  // console.log(cartProduct);
  // ===========================
  // If cart list is not empty, add cartProduct in existing cart list
  // if (cartProduct != undefined && product.id == cartProduct.id) {
  if (cartProduct != undefined) {
    // console.log("Add");
    for (let i = 0; i < cart.length; i++) {
      // if (cart[i] && cart[i].id == id) {
      if (cart[i].id == id && cart[i].type === "service") {
        cart[i].quantity += 1;
        const temp = document.querySelector(".mid-" + id + " p");
        temp.innerText = cart[i].quantity;
      }
    }
  } 
  // else cart list is empty, add item in the cart list
  else {
    console.log("add else")
    cart.unshift(product);
    const temp = document.querySelector(".mid-" + id + " p");
    cart[0].quantity = 1;
    temp.innerText = cart[0].quantity;
  }
  // =============================

  // for (let i = 0; i < cart.length; i++) {
  // if (cart[i] && cart[i].id == id) {
  // cart[i].quantity += 1;
  // const temp = document.querySelector(".mid-" + id + " p");
  // temp.innerText = cart[i].quantity;
  // }
  // }
  updateCart();
  getTotal(cart);
}

function deleteItem(products, id) {
  // console.log(cart);
  const product = products.find((product) => product.id === id);
  const cartProduct = cart.find((product) => { return ((product.id === id) && (product.type === "service")) });
  
  console.log(cartProduct);
  // ===========================
  // If cart list is not empty, delete cartProduct in existing cart list
  // if (cartProduct != undefined && product.id == cartProduct.id) {
  if (cartProduct != undefined) {
    // console.log("Delete");
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].id == id && cart[i].type === "service" && cart[i].quantity > 1) {
        // console.log("Delete 1");
        cart[i].quantity -= 1;
        const temp = document.querySelector(".mid-" + id + " p");
        temp.innerText = cart[i].quantity;
        // console.log(cart[i]);
      }
      else if (cart[i].id == id && cart[i].type === "service" && cart[i].quantity <= 1) {
        // console.log("Delete 2");
        const removeProductById = (array, id) => { return array.filter(product => { return ((product.id != id) && (product.type === "service")) || (product.type === "boat")  }) };                                       
        const updateProduct = removeProductById(cart, id);
        cart = updateProduct;
        const temp = document.querySelector(".mid-" + id + " p");
        temp.innerText = 0;
        // console.log(updateProduct);
        // console.log(cart);
      }
    }
  } 
  // else cart list is empty, add item in the cart list
  else {
    console.log("delete here2");
  }

  updateCart();
  getTotal(cart);
}

// function deleteItem(id) {  
//   for (let i = 0; i < cart.length; i++) {
//     if (cart[i].id === id) {
//       cart[i].quantity = 1;
//       cart.splice(i, 1);
//     }
//   }
//   updateCart();
//   getTotal(cart);
// }

function updateCart() {
  console.log(cart.length);
  if (cart.length > 1) {
    cart.sort(function (type1, type2) {

      let temp1 = type1.type.toUpperCase();
      let temp2 = type2.type.toUpperCase();

      if (temp1 < temp2) {
          return -1;
      }
      if (temp1 > temp2) {
          return 1;
      }
      return 0;
    });
  }

  // Prepare the invoice item for invoice HTML 
  const cartHTML = cart.map(
    (item) => `<div class="cart-item">
                <h3>${item.name}</h3>                
                <p class="qty">${item.quantity}</p>
                <p class="amount">$${item.price}</p>                                
              </div>`
  );

  console.log("cartHTML - " + cartHTML);
  // Update the invoice item list and temporary store in the invoice-paid variable for invoice HTML 
  localStorage.setItem('invoice-paid', cartHTML);

  localStorage.setItem('totalCart', JSON.stringify(cart));
  // console.log(JSON.parse(localStorage.getItem('totalCart')));
}

function getTotal(cart) {
  // console.log(cart);

  // Update totalItem (all product) and each product (total quantity and price)
  let { totalItem, cartTotal } = cart.reduce(
    (total, cartItem) => {
      // console.log(total);
      // console.log(cartItem);
      total.cartTotal += cartItem.price * cartItem.quantity;
      total.totalItem += cartItem.quantity;
      return total;
    },
    { totalItem: 0, cartTotal: 0 }
  );

  // console.log(totalItem);
  // console.log("noOfItem - " + `${totalItem} items`);

  // Update the totalItem and temporary store in the noOfItem variable for invoice HTML 
  localStorage.setItem('noOfItem', `${totalItem} items`);

  // console.log("total - " + `$${cartTotal}`);
  //  const totalItemsHTML = document.querySelector(".noOfItems");
  //  totalItemsHTML.innerHTML = `${totalItem} items`;  
  
  // Update the total and temporary store in the total variable for invoice HTML 
  localStorage.setItem('total', `$${cartTotal}`);
}