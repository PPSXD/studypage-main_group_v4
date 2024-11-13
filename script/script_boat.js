import data from "../script/data.json" with {type: "json"};

// Init a cart list
let cart = [];

// Prepare the price, addCart button, deleteItem, quantity, addItem for service HTML
let boatsHTML = data.boats.map(
  (boat) => `<strong>$${boat.price}</strong>
             <button class="boat-button" id=${boat.id}>Add to Cart</button>
             <div class="mid-${boat.id} unit">
             <button class ="unit-button unit-del-button" id=${boat.id}>-</button>
             <p>${boat.quantity}</p>
             <button class ="unit-button unit-add-button" id=${boat.id}>+</button>
             </div>`);

// Insert the prepared price, addCart button, deleteItem, quantity, addItem to service HTML
for (let i = 0; i <= boatsHTML.length-1; i++) {
  const boatsName = `.service-${data.boats[i].id}`;
  const result = document.querySelector(boatsName);
  result.innerHTML = boatsHTML[i];
}

// ======= Event Listener =======

// Add eventListener on all addCart button
let num = document.querySelectorAll(".boat-button").length;
for (let i = 0; i < num; i++) {
  document.querySelectorAll(".boat-button")[i].addEventListener("click", (e) => {
    addToCart(data.boats, parseInt(e.target.id));
  });
}

// Add eventListener on payment reset button
document.querySelector(".payment-button-reset").addEventListener("click", (e) => {
  // reset the cart list to empty list
  cart = [];

  // reset the quantity to unit 0
  for (let i = 1; i <= data.boats.length; i++) {
    const temp = document.querySelector(".mid-" + i + " p");
    temp.innerText = 0;
  }

  // Update the cart and the total amount
  updateCart();
  getTotal(cart);
});

// Add eventListener on all addItem button
let num1 = document.querySelectorAll(".unit-add-button").length;
for (let i = 0; i < num1; i++) {
  document.querySelectorAll(".unit-add-button")[i].addEventListener("click", (e) => {
    addItem(data.boats, parseInt(e.target.id));
  });
}

// Add eventListener on all deleteItem button
let num2 = document.querySelectorAll(".unit-del-button").length;
for (let i = 0; i < num2; i++) {
  document.querySelectorAll(".unit-del-button")[i].addEventListener("click", (e) => {
    deleteItem(data.boats, parseInt(e.target.id));
  });
}

// Reset all the value in the cart list if the page is reloaded even though item is added in the cart list below 
window.addEventListener('load', (e) => {
  console.log("Reload");

  let tempCart = JSON.parse(localStorage.getItem('totalCart'));

  console.log(tempCart);
  
  if (tempCart != undefined) {
    for (let i = 0; i < tempCart.length; i++) {
      // console.log(tempCart);
      if (tempCart[i].type === "boat") {
        const boat = data.boats.find((product) => product.id === tempCart[i].id);
        // const cartProduct = cart.find((product) => { return ((product.id === tempCart[i].id) && (product.type === "boat")) });
                                                   
        cart.unshift(boat);
        // console.log(boat);
        // console.log(cartProduct);
        const temp = document.querySelector(".mid-" + tempCart[i].id + " p");
        cart[0].quantity = tempCart[i].quantity;
        temp.innerText = cart[0].quantity;
      }  
      else if (tempCart[i].type === "service") {
        console.log("here for service");
        const boat = data.products.find((product) => product.id === tempCart[i].id);
        // const cartProduct = cart.find((product) => { return ((product.id === tempCart[i].id) && (product.type === "service")) });

        cart.unshift(boat);
        // console.log(boat);
        // console.log(cart);
        cart[0].quantity = tempCart[i].quantity;
      }
    }
  }  
});

// ======= Function =======

function addToCart(boats, id){
  const boat = boats.find((product) => product.id === id);
  // const cartProduct = cart.find((product) => product.id === id);
  const cartProduct = cart.find((product) => { return ((product.id === id) && (product.type === "boat")) });
  // If cart list is not empty, add cartProduct in existing cart list
  if (cartProduct != undefined && boat.id == cartProduct.id) {
    addItem(data.boats, id);
  } 
  // else cart list is empty, add item in the cart list
  else {
    cart.unshift(boat);
    // console.log(boat);
    // console.log(cart);
    const temp = document.querySelector(".mid-" + id + " p");
    cart[0].quantity = 1;
    temp.innerText = cart[0].quantity;
  }

  // Update the cart and the total amount
  updateCart();
  getTotal(cart);
};

function addItem(boats, id) {
  console.log(id);
  const boat = boats.find((product) => product.id === id);
  const cartProduct = cart.find((product) => { return ((product.id === id) && (product.type === "boat")) });
  
  console.log(cartProduct);
  // If cart list is not empty, add cartProduct in existing cart list
  // if (cartProduct != undefined && boat.id == cartProduct.id) {
  if (cartProduct != undefined) {
    // console.log("Add");
    for (let i = 0; i < cart.length; i++) {
      // if (cart[i] && cart[i].id == id && cart.type === "boat") {
      if (cart[i].id == id && cart[i].type === "boat") {
        cart[i].quantity += 1;
        const temp = document.querySelector(".mid-" + id + " p");
        temp.innerText = cart[i].quantity;
      }
    }
  } 
  // else cart list is empty, add item in the cart list
  else {
    // console.log("Add else")
    cart.unshift(boat);
    const temp = document.querySelector(".mid-" + id + " p");
    cart[0].quantity = 1;
    temp.innerText = cart[0].quantity;
  }

  updateCart();
  getTotal(cart);
}

function deleteItem(boats, id) {
  // console.log(cart);

  const boat = boats.find((product) => product.id === id);
  const cartProduct = cart.find((product) => { return ((product.id === id) && (product.type === "boat")) });

  console.log(cartProduct);
  // If cart list is not empty, delete cartProduct in existing cart list
  // if (cartProduct != undefined && boat.id == cartProduct.id) {
  if (cartProduct != undefined) {
    // console.log("Delete");
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].id == id && cart[i].type === "boat" && cart[i].quantity > 1) {
        // console.log("Delete 1");
        cart[i].quantity -= 1;
        const temp = document.querySelector(".mid-" + id + " p");
        temp.innerText = cart[i].quantity;
        // console.log(cart[i]);
      }
      else if (cart[i].id == id && cart[i].type === "boat" && cart[i].quantity <= 1) {
        // console.log("Delete 2");
        const removeProductById = (array, id) => { return array.filter(product => { return ((product.id != id) && (product.type === "boat")) || (product.type === "service") }) };
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

  //  console.log("total - " + `$${cartTotal}`);
  //  const totalItemsHTML = document.querySelector(".noOfItems");
  //  totalItemsHTML.innerHTML = `${totalItem} items`;  
  
  // Update the total and temporary store in the total variable for invoice HTML 
  localStorage.setItem('total', `$${cartTotal}`);
}