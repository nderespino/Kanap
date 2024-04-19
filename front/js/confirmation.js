fetch("//localhost:3000/api/products")
  .then((response) => response.json())
  .then((response) => {
    console.log("response", response);
    
  })
  .catch((err) => console.error("error", err));
