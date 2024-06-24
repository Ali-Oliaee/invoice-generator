const addToCart = (product) => {
  fetch("http://127.0.0.1:8000/buy", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: product }),
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.status === 200) {
        alert("کالا به سبد خرید افزوده شد")
      }
    })
    .catch((error) => console.error("Error:", error))
}

const renderProducts = (products) => {
  const container = document.getElementById("products-list")
  products.map((product) => {
    const productTemplate = `
    <div class="product">
    <img src=${product.image} alt="Product Image" />
    <h2>${product.name}</h2>
    <p class="description">${product.description}</p>
    <p>${product.price} تومان</p>
    <button class="btn" onClick="addToCart(${product.id})">افزودن</button>
  </div>`

    container.innerHTML += productTemplate
  })
}

const fetchProducts = async () => {
  const isAuth = localStorage.getItem("isAuth")
  if (!isAuth) window.location.replace("/login.html")

  fetch("http://127.0.0.1:8000/products/", {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => renderProducts(data))
}
