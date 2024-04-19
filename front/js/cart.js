function setCart(newCart) {
  localStorage.setItem("cart", JSON.stringify(newCart));
}

function getCart() {
  let cart = localStorage.getItem("cart"); // grab cart from local storage (will either be a string or null)
  if (cart) {
    // check if a chart was returned from local Storage
    try {
      cart = JSON.parse(cart); // try parsing the cart from localStorage
      return cart; // if cart array was successfully parsed, return it
    } catch {
      return []; // if JSON.parse threw an error, return an empty cart array
    }
  } else {
    return []; // if no cart was in localStorage, return an empty cart array
  }
}
let cart = getCart();
//maps through cart array and grabs the id from the cart array
let cartIds = cart.map((item) => item.id);
//getting an array from a set that we got from an array , converts to set to get rid of duplicates
cartIds = [...new Set(cartIds)];
//make empty array for array of fetches
let idFetch = [];
//for loop to push fetches into array
for (let i = 0; i < cartIds.length; i += 1) {
  idFetch.push(
    fetch("//localhost:3000/api/products/" + cartIds[i]).then((response) =>
      response.json()
    )
  );
}

function deleteItem(event) {
  const cartItem = event.target.closest(".cart__item");
  const itemId = cartItem.dataset.id;
  const itemColor = cartItem.dataset.color;

  // Find the index of the item to remove from cart array
  //const cartItemFilter = cart.findIndex(item => item.id === itemId && item.color === itemColor);
  const newCart = cart.filter(
    (item) => !(item.id === itemId && item.color === itemColor)
  );
  setCart(newCart);

  // Remove the cart item from the DOM
  cartItem.remove();
}

function updateCartItemQuantity(event) {
  const quantity = Number(event.target.value);
  const cartItem = event.target.closest(".cart__item");
  const itemId = cartItem.dataset.id;
  const itemColor = cartItem.dataset.color;

  // Find the corresponding item in the cart array
  const cartItemIndex = cart.findIndex(
    (item) => item.id === itemId && item.color === itemColor
  );

  if (cartItemIndex !== -1) {
    // Update the quantity in the cart array
    cart[cartItemIndex].quantity = quantity;

    // Update the displayed price
    const priceElement = cartItem.querySelector(
      ".cart__item__content__description p:last-child"
    );
    const { price } = library[itemId] || {};
    priceElement.textContent = `$${price * quantity}`;
  }

  // Update localStorage with the modified cart
  localStorage.setItem("cart", JSON.stringify(cart));
}

let library = {};

//promise all to execute all fetches at once
Promise.all(idFetch)
  //returns array of data responses
  .then((response) => {
    //make empty object
   
    //saving a reference to each of the response datas onto the library, reference response without iterating response itself
    for (let i = 0; i < response.length; i += 1) {
      library[response[i]._id] = response[i];
    }
    console.log(library);
    setCart(cart);
    console.log("response", response);
    const cartItemContainer = document.getElementById("cart__items");
    for (let i = 0; i < cart.length; i += 1) {
      //deconstructing variables from the object in cart array
      const { color, quantity, id } = cart[i];
      const { altTxt, price, name, imageUrl } = library[id];
      const cartItems = `
       <article class="cart__item" data-id=${id} data-color=${color}>
          <div class="cart__item__img">
            <img src=${imageUrl} alt=${altTxt}>
          </div>
          <div class="cart__item__content">
            <div class="cart__item__content__description">
              <h2>${name}</h2>
              <p>${color}</p>
              <p>$${price * quantity}</p>
            </div>
            <div class="cart__item__content__settings">
              <div class="cart__item__content__settings__quantity">
                <p>Quantity : </p>
                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" id="quantity" value="${quantity}">
              </div>
              <div class="cart__item__content__settings__delete">
                <p class="deleteItem">Delete</p>
              </div>
            </div>
          </div>
        </article> 
      `;

      cartItemContainer.innerHTML += cartItems;

    

  }
  
  


    let deleteButton = document.querySelectorAll(
      ".cart__item__content__settings__delete"
    );

    const quantityInputs = document.querySelectorAll(".itemQuantity");

     // remove nearest article with cart__item class to click event
     deleteButton.forEach((btn) => {
      btn.addEventListener("click", deleteItem);
    });

    //update cart function
   

    // Attach event listener to quantity inputs
    
    quantityInputs.forEach((input) => {
      input.addEventListener("change", updateCartItemQuantity);
    });

   

    //function to iterate over the cart array to get total of all items price in cart
    function calculateTotalAmount() {
      let total = 0;
    
      // Iterate through the cart array
      for (let i = 0; i < cart.length; i++) {
        // Add the price of each item multiplied by its quantity to the total
        const { id, quantity } = cart[i];
        const { price } = library[id] || {}; // Fetch the price from the library
        total += price * quantity;
      }
    
      return total;
    }
//function to iterate over the cart array to get total quantity of items in cart
    function calculateTotalQuantity() {
      let totalQuantity = 0;
    
      // Iterate through the cart array
      for (let i = 0; i < cart.length; i++) {
        // Add the quantity of each item to the total quantity
        totalQuantity += cart[i].quantity;
      }
    
      return totalQuantity;
    }
//push function returns into html to display total number of items and price 
    let totalContainer = document.querySelector(".cart__price");
    let totalQuantity = `
    <p>Total (<span id="totalQuantity"><!-- 2 -->${calculateTotalQuantity()}</span>) : €<span id="totalPrice">${calculateTotalAmount()}</span></p>
  `;
    totalContainer.innerHTML += totalQuantity;
  });
  let orderBtn = document.getElementById('order');


  //getting error message elements from dom
  let firstNameError = document.getElementById('firstNameErrorMsg');
  let lastNameError = document.getElementById('lastNameErrorMsg');
  let addressError = document.getElementById('addressErrorMsg');
  let cityError = document.getElementById('cityErrorMsg');
  let emailError = document.getElementById('emailErrorMsg');


  function validateForm(e) {
    e.preventDefault();
      let firstName = document.getElementById('firstName').value;
      let lastName = document.getElementById('lastName').value;
      let address = document.getElementById('address').value;
      let city = document.getElementById('city').value;
      let email = document.getElementById('email').value;

        // Function to validate email
  function validateEmail(email) {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

   
    const emailInput = email.trim();
    if (validateEmail(emailInput)) {
      emailErrorMsg.textContent = "";
    } else {
      emailErrorMsg.textContent = "Please enter a valid email address.";
      return false;
    }
  
      
      if (firstName.trim() === "" && lastName.trim() === "" && address.trim() === "" && city.trim() === "") {
        firstNameError.innerHTML = "Please enter your first name";
        lastNameError.innerHTML = "Please enter your last name";
        addressError.innerHTML = "Please enter your address";
        cityError.innerHTML = "Please enter your city";
        return false;
      }
     
      return submitForm({firstName, lastName, address, city, email});

      
    }
    
    orderBtn.addEventListener('click', validateForm);

    function submitForm(contact){
      fetch("http://localhost:3000/api/order", {
      method: "POST",
      body: JSON.stringify({contact, products:getCart().map(p => p._id)}),
      headers: {"Content-Type": 'application/json', Accept: 'application/json'}
      }).catch(e => {console.log(e)})
    }
    
    //const formData = new FormData(this);

    //fetch(this.action, {
    //  method: this.method,
    //  body: formData
    //})




    
  


  




