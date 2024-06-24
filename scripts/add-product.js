const checkAuth = () => {
  const isAuth = localStorage.getItem("isAuth")
  if (isAuth) window.location.replace("/")
}

document
  .getElementById("productForm")
  .addEventListener("submit", function (event) {
    event.preventDefault()

    const nameInput = document.getElementById("product-name")
    const descriptionInput = document.getElementById("product-description")
    const priceInput = document.getElementById("product-price")

    fetch("http://127.0.0.1:8000/add-product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: nameInput.value,
        description: descriptionInput.value,
        price: priceInput.value,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 200) {
          alert("محصول با موفقیت افزوده شد")
          nameInput.value = ""
          descriptionInput.value = ""
          priceInput.value = ""
        }
      })
      .catch((error) => console.error("Error:", error))
  })
