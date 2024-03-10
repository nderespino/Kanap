/* let itemImage = document.getElementsByClassName('item__img');
let itemTitle = document.getElementById('title');
let itemDescription = document.getElementById('description');
let itemColors = document.getElementById('colors');
let itemPrice = document.getElementById('price');
let itemQuantity = document.getElementById('quantity'); */

let productIdUrl = window.location.search;

let urlParams = new URLSearchParams(productIdUrl);
let productId = urlParams.get('id');
console.log("product id:", productId);



fetch("//localhost:3000/api/products/" + productId)
  .then((response) => response.json())
  .then((response) => {
    console.log("response", response);
    const itemContainer = document.querySelector('.item');
    
   
    
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

        let select = document.getElementById('colors');
        for (let i = 0; i < response.colors.length; i++) {
          let optn = response.colors[i];
          let el = document.createElement('option');
          el.textContent= optn;
          el.value = optn;
          select.appendChild(el);
          
        }
    }
  )
  .catch((err) => console.error("error", err));




function setCart(newCart){

localStorage.setItem('cart', JSON.stringify(newCart));
}

function getCart(){
try {
    return JSON.parse(localStorage.getItem('cart'));
}catch {
    return [];
}


}



