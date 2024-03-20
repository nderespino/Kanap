
 Promise.all(fetch("//localhost:3000/api/products")
 .then((response) => response.json())
 .then((response) => {

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
 console.log(cart);
 console.log(cart.color);
 setCart(cart);
   console.log("response", response);
   const cartItemContainer = document.getElementById('cart__items');
   for (let i = 0; i < cart.length; i += 1) {
       const {_id, altTxt, description, price} = response[i];
    const {color, quantity, name, image} = cart[i];
       const cartItems =  `<section id="cart__items">
       <article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
          <div class="cart__item__img">
            <img src=${image} alt="Photo of a sofa">
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
                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${quantity}">
              </div>
              <div class="cart__item__content__settings__delete">
                <p class="deleteItem">Delete</p>
              </div>
            </div>
          </div>
        </article> 
      </section>`;
       cartItemContainer.innerHTML += cartItems;
   }
 }))
 .catch((err) => console.error("error", err));


