// Define service product list
const products = [
    { id: 1, name: "38 Surf",  price: 1, quantity: 0},
    { id: 2, name: "Regal LS4",  price: 2, quantity: 0},
    { id: 3, name: "Regal 42 Fly",  price: 3, quantity: 0},
    { id: 4, name: "Regal 38 Grande",  price: 4, quantity: 0},
    { id: 5, name: "Beneteau Oceanis 60",  price: 5, quantity: 0},
    { id: 6, name: "Oceanco Black Pearl",  price: 6, quantity: 0},
    { id: 7, name: "Bail 5.8",  price: 7, quantity: 0},
  ];

// Init a cart list
let cart = [];

// Prepare the price, addCart button, deleteItem, quantity, addItem for service HTML
const productsHTML = products.map(
      (product) => `<strong>$${product.price}</strong>
                    <button class="service-button" id=${product.id}>Add to Cart</button>
                    <div class="mid-${product.id} unit">
                      <button class ="unit-button" onclick={deleteItem(${product.id})}>-</button>
                      <p>${product.quantity}</p>
                      <button class ="unit-button" onclick={addItem(${product.id})}>+</button>
                    </div>`);

// Insert the prepared price, addCart button, deleteItem, quantity, addItem to service HTML
for (let i = 0; i <= productsHTML.length-1; i++) {
  const productName = `.service-${products[i].id}`;
  const result = document.querySelector(productName);
  result.innerHTML = productsHTML[i];
}

// ======= Event Listener =======

// Add eventListener on all addCart button
let num = document.querySelectorAll(".service-button").length;
for (let i = 0; i < num; i++) {
  document.querySelectorAll(".service-button")[i].addEventListener("click", (e) => {
    addToCart(products, parseInt(e.target.id));
  });
}

// Add eventListener on payment reset button
document.querySelector(".payment-button-reset").addEventListener("click", (e) => {
  // reset the cart list to empty list
  cart = [];

  // reset the quantity to unit 0
  for (let i = 1; i <= products.length; i++) {
    const temp = document.querySelector(".mid-" + i + " p");
    temp.innerText = 0;
  }

  // Update the cart and the total amount
  updateCart();
  getTotal(cart);
});

// Reset all the value in the cart list if the page is reloaded even though item is added in the cart list below 
window.addEventListener('load', (e) => {
  console.log("here load");
  console.log(cart);
  console.log(products);
  // for (let i = 1; i <= products.length; i++) {
  //   const temp = document.querySelector(".mid-" + i + " p");
  //   //console.log(products[i-1]);
  //   temp.innerText = products[i-1].quantity;
  // }
  // updateCart();
  // getTotal(cart);
});


// ======= Function =======

function addToCart(products, id){
  const product = products.find((product) => product.id === id);
  const cartProduct = cart.find((product) => product.id === id);

  // If cart list is not empty, add cartProduct in existing cart list
  if (cartProduct != undefined && product.id == cartProduct.id) {
    addItem(id);
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

function addItem(id) {
  // console.log(cart);
  const product = products.find((product) => product.id === id);
  const cartProduct = cart.find((product) => product.id === id);
  // console.log(cartProduct);
  // ===========================
  // If cart list is not empty, add cartProduct in existing cart list
  if (cartProduct != undefined && product.id == cartProduct.id) {
    console.log("add here");
    for (let i = 0; i < cart.length; i++) {
      if (cart[i] && cart[i].id == id) {
        cart[i].quantity += 1;
        const temp = document.querySelector(".mid-" + id + " p");
        temp.innerText = cart[i].quantity;
      }
    }
  } 
  // else cart list is empty, add item in the cart list
  else {
    console.log("add here 2")
  //   //  console.log("product - " + product.name + " " + product.price + " " + product.id + " " +  product.quantity);
    cart.unshift(product);
    const temp = document.querySelector(".mid-" + id + " p");
    cart[0].quantity = 1;
    temp.innerText = cart[0].quantity;
  // console.log(temp)
  // console.log("cart - " + cart[0].price + " " + cart[0].id);
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

function deleteItem(id) {
  // console.log(cart);
  const product = products.find((product) => product.id === id);
  const cartProduct = cart.find((product) => product.id === id);
  // console.log(cartProduct);
  // ===========================
  // If cart list is not empty, delete cartProduct in existing cart list
  if (cartProduct != undefined && product.id == cartProduct.id) {
    console.log("delete here");
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].id == id && cart[i].quantity > 1) {
        console.log("delete here if");
        cart[i].quantity -= 1;
        const temp = document.querySelector(".mid-" + id + " p");
        temp.innerText = cart[i].quantity;
        console.log(cart[i]);
      }
      else {
        console.log("delete here else");
        const removeProductById = (array, id) => { return array.filter(product => product.id != id);};
        console.log(cart);
        console.log(id);
        const updateProduct = removeProductById(cart, id);
        cart = updateProduct;
        const temp = document.querySelector(".mid-" + id + " p");
        temp.innerText = 0;
        console.log(updateProduct);
        console.log(cart);
      }
    }
  } 
  // else cart list is empty, add item in the cart list
  else {
    console.log("delete here2");
    //   //  console.log("product - " + product.name + " " + product.price + " " + product.id + " " +  product.quantity);
      // cart.unshift(product);
      // const temp = document.querySelector(".mid-" + id + " p");
      // cart[0].quantity = 1;
      // temp.innerText = cart[0].quantity;
    // console.log(temp)
    // console.log("cart - " + cart[0].price + " " + cart[0].id);
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
}

function getTotal(cart) {
  console.log(cart);

  // Update totalItem (all product) and each product (total quantity and price)
  let { totalItem, cartTotal } = cart.reduce(
    (total, cartItem) => {
      console.log(total);
      console.log(cartItem);
      total.cartTotal += cartItem.price * cartItem.quantity;
      total.totalItem += cartItem.quantity;
      return total;
    },
    { totalItem: 0, cartTotal: 0 }
  );

  console.log(totalItem);
  // console.log("noOfItem - " + `${totalItem} items`);

  // Update the totalItem and temporary store in the noOfItem variable for invoice HTML 
  localStorage.setItem('noOfItem', `${totalItem} items`);

  console.log("total - " + `$${cartTotal}`);
  //  const totalItemsHTML = document.querySelector(".noOfItems");
  //  totalItemsHTML.innerHTML = `${totalItem} items`;  
  
  // Update the total and temporary store in the total variable for invoice HTML 
  localStorage.setItem('total', `$${cartTotal}`);
}