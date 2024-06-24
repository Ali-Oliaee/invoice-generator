const setFactorInfo = () => {
  const factorIdInput = document.getElementById("factor-id")
  const dateInput = document.getElementById("created-date")
  factorIdInput.value = Math.floor(Math.random() * 10000000)
  dateInput.value = new Date().toLocaleDateString("fa-IR")
}

setFactorInfo()

const generateFactor = async (customer) => {
  const customerName = document.getElementById("customer-name").value
  const customerPhone = document.getElementById("customer-phone").value
  const customerAddress = document.getElementById("customer-address").value
  const data = {
    name: customerName,
    phone: customerPhone,
    address: customerAddress,
  }

  await fetch("http://127.0.0.1:8000/generate-factor/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (response) => {
    const blob = await response.blob()
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "factor.pdf"
    document.body.appendChild(a)
    a.click()
    a.remove()
    window.URL.revokeObjectURL(url)
  })
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
          <p>تعداد: ${product.count}</p>
        </div>`

    container.innerHTML = productTemplate + container.innerHTML
  })
  totalPriceElement.innerHTML = `جمع کل: ${totalPrice} تومان`
}

const fetchProducts = async () => {
  await fetch("http://127.0.0.1:8000/shopping-card/", {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => renderProducts(data))
}

const onSearchCustomer = () => {
  const customerNameInput = document.getElementById("customer-name")
  const customerPhoneInput = document.getElementById("customer-phone")
  const customerAddressInput = document.getElementById("customer-address")
  const customerId = document.getElementById("customer-id").value

  if (customerId)
    fetch(`http://127.0.0.1:8000/customer/${customerId}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.id) {
          customerNameInput.value = data.name
          customerPhoneInput.value = data.phone
          customerAddressInput.value = data.address
        } else {
          customerNameInput.value = ""
          customerPhoneInput.value = ""
          customerAddressInput.value = ""
        }
      })
}
