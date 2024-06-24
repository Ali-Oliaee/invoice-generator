const redirectToFactor = async () => {
  await fetch("http://127.0.0.1:8000/shopping-card/", {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.length) window.location.replace("/factor.html")
      else alert("لطفا محصولی را انتخاب کنید")
    })
}

const removeFromCard = async (product) => {
  await fetch("http://127.0.0.1:8000/remove", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: product }),
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.status === 200) fetchProducts()
    })
    .catch((error) => console.error("Error:", error))
}

const setProductCount = async (productId, count) => {
  if (count >= 1 && count <= 8) {
    await fetch("http://127.0.0.1:8000/change-count", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: productId, count }),
    })
      .then((response) => response.json())
      .then(() => fetchProducts())
      .catch((error) => console.error("Error:", error))
  }
}

const renderProducts = (products) => {
  const container = document.getElementById("products-list")
  const totalPriceElement = document.getElementById("total-price")
  container.innerHTML = ""
  let totalPrice = 0
  products.map((product) => {
    totalPrice += product.price * product.count
    const productTemplate = `
     <div class="cart-item">
        <img src=${product.image} alt="Product Image" />
        <p>${product.name}</p>
        <p>${product.price} تومان</p>
        <div class="counter-container">
          <button class="counter-btn" id="decrease"
          onclick="setProductCount(${product.id},${product.count - 1})"
          >-</button>
          <span id="counter">${product.count}</span>
          <button class="counter-btn" id="increase" onclick="setProductCount(${
            product.id
          }, ${product.count + 1})">+</button>
        </div>
        <button class="btn" onclick="removeFromCard(${product.id})">حذف</button>
      </div>`

    container.innerHTML = productTemplate + container.innerHTML
  })
  totalPriceElement.innerHTML = `جمع کل: ${totalPrice} تومان`
}

const fetchProducts = async () => {
  const isAuth = localStorage.getItem("isAuth")
  if (!isAuth) window.location.replace("/login.html")

  await fetch("http://127.0.0.1:8000/shopping-card/", {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => renderProducts(data))
}
