/* let itemImage = document.getElementsByClassName('item__img');
let itemTitle = document.getElementById('title');
let itemDescription = document.getElementById('description');
let itemColors = document.getElementById('colors');
let itemPrice = document.getElementById('price');
let itemQuantity = document.getElementById('quantity'); */

let productIdUrl = window.location.search;

let urlParams = new URLSearchParams(productIdUrl);
let productId = urlParams.get("id");
console.log("product id:", productId);

fetch("//localhost:3000/api/products/" + productId)
  .then((response) => response.json())
  .then((response) => {
    console.log("response", response);
    const itemContainer = document.querySelector(".item");

    const item = `<section class="item">
          <article>
            <div class="item__img">
              <img src=${response.imageUrl} alt=${response.altTxt}>
            </div>
            <div class="item__content">

              <div class="item__content__titlePrice">
                <h1 id="title">${response.name}</h1>
                <p>Prix : <span id="price">${response.price}</span>€</p>
              </div>

              <div class="item__content__description">
                <p class="item__content__description__title">Description:</p>
                <p id="description">${response.description}</p>
              </div>

              <div class="item__content__settings">
                <div class="item__content__settings__color">
                  <label for="color-select">Chose your color:</label>
                  <select name="color-select" id="colors">
                      <option value="">--Please, select a color --</option>
                    
                  </select>
                </div>

                <div class="item__content__settings__quantity">
                  <label for="itemQuantity">Number of articles (1-100):</label>
                  <input type="number" name="itemQuantity" min="1" max="100" value="0" id="quantity">
                </div>
              </div>

              <div class="item__content__addButton">
                <button id="addToCart">Add to cart</button>
              </div>

            </div>
          </article>
        </section>`;
    itemContainer.innerHTML = item;

    let colorInput = document.getElementById("colors");
    for (let i = 0; i < response.colors.length; i++) {
      let optn = response.colors[i];
      let el = document.createElement("option");
      el.textContent = optn;
      el.value = optn;
      colorInput.appendChild(el);
    }

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
    /* pushing product information to array after add to cart button is clicked
-- colors variable already established above --  */

    let quantityInput = document.getElementById("quantity");
    let cart = getCart();
    // set input function makes new item object with products id, color, and quantity
    function setInput() {
      let newItem = {
        id: productId,
        color: colorInput.value,
        quantity: quantityInput.value,
      };
// checking the color and id of new item and comparing them to all the items in the cart
      function sameColor(item) {
        return item.color === newItem.color && item.id === newItem.id;
      }
// to filter out any items that match both id and color by including items that dont match color or id
      function cartFilter(item) {
        return item.color !== newItem.color || item.id !== newItem.id;
      }
//using callback to find first match in the cart if there is one will return object or undefined
      let foundItem = cart.find(sameColor);
      

      /*if there was a match we return an array of all non-matches then spread the found Item so it is not
       mutatable then set new quantity to the sum of both objects (original and found)*/
      if (foundItem) {
       cart = cart.filter(cartFilter);
       newItem = {
        ...foundItem,
        quantity: Number(newItem.quantity) + Number(foundItem.quantity),
       }
      }

      //push new item object regardless of if it was changed or not from if statement
        cart.push(newItem);
    
      //update cart
      setCart(cart);
      console.log(cart);
    }

    let cartButton = document.getElementById("addToCart");
//event listener for add to cart button calling setInput function
    cartButton.addEventListener("click", (event) => {
      setInput();
    });
  })
  .catch((err) => console.error("error", err));

/* things to do to add product to cart --
get the data from the color and quantity elements,
if the color is the same for each add to array with the same color
if the color is different add to cart seperately,
pull just the product id and color and quantity.

-- how to do this? --

function that adds event listener to click on add to cart 
takes both color and quantity elements.
add new item to array when item is added for the first time
if color is the same simply increase the quanitity of the product
get dom element for button id = addToCart

*/
