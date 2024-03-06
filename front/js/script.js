fetch("//localhost:3000/api/products")
  .then((response) => response.json())
  .then((response) => {
    console.log("response", response);
    const itemContainer = document.getElementById('items');
    for (let i = 0; i < response.length; i += 1) {
        const {_id, altTxt, description, imageUrl, name} = response[i];
      const item = ` <a href="./product.html?id=${_id}">
        <article>
          <img src=${imageUrl} alt=${altTxt}>
          <h3 class="productName">${name}</h3>
          <p class="productDescription">${description}</p>
        </article>
      </a>`;
        itemContainer.innerHTML += item;
    }
  })
  .catch((err) => console.error("error", err));
