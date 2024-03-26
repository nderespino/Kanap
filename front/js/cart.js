function setCart(newCart) {
  localStorage.setItem("cart", JSON.stringify(newCart));
}

function getCart () {
  let cart = localStorage.getItem('cart'); // grab cart from local storage (will either be a string or null)
  if (cart) { // check if a chart was returned from local Storage
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
idFetch.push(fetch("//localhost:3000/api/products/" + cartIds[i]).then((response) => response.json()));
}
//promise all to execute all fetches at once 
 Promise.all(idFetch)
 //returns array of data responses
 .then((response) => {
//make empty object 
let library = {};
//saving a reference to each of the response datas onto the library, reference response without iterating response itself
for (let i = 0; i < response.length; i += 1) {
  library[response[i]._id] = response[i];
}
 console.log(library);
 setCart(cart);
   console.log("response", response);
   const cartItemContainer = document.getElementById('cart__items');
   for (let i = 0; i < cart.length; i += 1) {
    //deconstructing variables from the object in cart array
    const {color, quantity, id} = cart[i];
       const {altTxt, price, name, imageUrl} = library[id];
       const cartItems =  `
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
       

        let deleteButton = document.querySelectorAll(".cart__item__content__settings__delete");
       
        const article = document.querySelector(".cart__item");
 
 
        console.log(article.dataset.id);
        
          function cartFilter() {
           return cart.color === article.dataset.color && cart.id === article.dataset.id;
         }
         function deleteItem(e) {
         cart = cart.filter(cartFilter);
         console.log(cart);
          const parent = e.target.closest('.cart__item');
          console.log(parent);
          parent.remove()
          
          }
          
         // remove nearest article with cart__item class to click event 
         deleteButton.forEach(btn => {
          btn.addEventListener("click", deleteItem)
         })
        
        // delete button has to remove item from cart figure out how to remove items from the cart 
        //the button first. then link the removal to the delete button


       // add event listener for delete button when button is pressed remove item from cart, 
       // when quantity number is changed, change the total price of the item but need to do a 
       // seperate quantity for the input on the cart page? how to do this without refreshing page? //
       //add total to bottom of cart adding up the quantities for every item in the cart//
      //   function updatedQuantity() {
      //  let itemQuantity = document.getElementById("quantity")
      //  let quantityValue = itemQuantity.value;
      //  itemQuantity.addEventListener('change', (event) => {
      //   quantityValue.textContent = this.value;
      //  });
      //  }
        
 });