function setCart(newCart) {
    localStorage.setItem("cart", JSON.stringify(newCart));
  }

  function getCart() {
    try {
      return JSON.parse(localStorage.getItem("cart"));
    } catch {
      return [];
    }
}


Promise.all(fetch("//localhost:3000/api/products")
  .then((response) => response.json())
  .then((response) => {
    console.log("response", response);
    const itemContainer = document.getElementById('cart__items');
    for (let i = 0; i < response.length; i += 1) {
        const {_id, altTxt, description, imageUrl, name} = response[i];
      const item = `<section id="cart__items">
      <article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
         <div class="cart__item__img">
           <img src=${imageUrl} alt="Photo of a sofa">
         </div>
         <div class="cart__item__content">
           <div class="cart__item__content__description">
             <h2>${name}</h2>
             <p>${cart.color}</p>
             <p>${price}</p>
           </div>
           <div class="cart__item__content__settings">
             <div class="cart__item__content__settings__quantity">
               <p>Quantity : ${cart.quantity} </p>
               <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
             </div>
             <div class="cart__item__content__settings__delete">
               <p class="deleteItem">Delete</p>
             </div>
           </div>
         </div>
       </article> 
     </section>`;
        itemContainer.innerHTML += item;
    }
  }))
  .catch((err) => console.error("error", err));
