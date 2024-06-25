const setFactorInfo = () => {
  const factorIdInput = document.getElementById("factor-id")
  const dateInput = document.getElementById("created-date")
  factorIdInput.value = Math.floor(Math.random() * 10000000)
  dateInput.value = new Date().toLocaleDateString("fa-IR")
}

setFactorInfo()

const generateFactor = async () => {
  const { jsPDF } = window.jspdf

  html2canvas(document.querySelector("body")).then((canvas) => {
    const imgData = canvas.toDataURL("image/png")
    const pdf = new jsPDF("p", "pt", "a4")
    const imgProps = pdf.getImageProperties(imgData)
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight)

    if (pdfHeight > pdf.internal.pageSize.getHeight()) {
      let yOffset = pdf.internal.pageSize.getHeight()
      while (yOffset < pdfHeight) {
        pdf.addPage()
        pdf.addImage(imgData, "PNG", 0, -yOffset, pdfWidth, pdfHeight)
        yOffset += pdf.internal.pageSize.getHeight()
      }
    }

    pdf.save("invoice.pdf")
  })
}

const renderProducts = (products) => {
  const container = document.getElementById("products-list")
  const totalPriceElement = document.getElementById("total-price")
  const finalAmountElement = document.getElementById(
    "total-price-after-discount"
  )
  container.innerHTML = ""
  let totalPrice = 0
  let finalPrice = 0
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
  finalAmountElement.innerHTML = `مبلغ نهایی : ${finalPrice} تومان`
}

const calculateDiscount = () => {
  const totalPriceElement = document.getElementById("total-price")
  const finalAmountElement = document.getElementById(
    "total-price-after-discount"
  )
  const totalPriceAnount = totalPriceElement.innerHTML.match(/\d+/)[0]
  const discountValue = document.getElementById("discount-input").value
  if (discountValue) {
    const res = Math.abs(
      (parseInt(discountValue) * totalPriceAnount) / 100 - totalPriceAnount
    ).toFixed(3)
    finalAmountElement.innerHTML = `مبلغ نهایی:‌${res} تومان`
  } else {
    finalAmountElement.innerHTML = totalPriceElement.innerHTML.replace(
      "جمع کل",
      "مبلغ نهایی"
    )
  }
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

  if (customerId) {
    fetch(`http://127.0.0.1:8000/user/${customerId}`, {
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
  } else {
    customerNameInput.value = ""
    customerPhoneInput.value = ""
    customerAddressInput.value = ""
  }
}

const onSearchSeller = () => {
  const sellerNameInput = document.getElementById("seller-name")
  const sellerPhoneInput = document.getElementById("seller-phone")
  const sellerAddressInput = document.getElementById("seller-address")
  const sellerId = document.getElementById("seller-id").value

  if (sellerId) {
    fetch(`http://127.0.0.1:8000/user/${sellerId}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.id) {
          sellerNameInput.value = data.name
          sellerPhoneInput.value = data.phone
          sellerAddressInput.value = data.address
        } else {
          sellerNameInput.value = ""
          sellerPhoneInput.value = ""
          sellerAddressInput.value = ""
        }
      })
  } else {
    sellerNameInput.value = ""
    sellerPhoneInput.value = ""
    sellerAddressInput.value = ""
  }
}

document.getElementById("seller-id").addEventListener("input", onSearchSeller)
document
  .getElementById("customer-id")
  .addEventListener("input", onSearchCustomer)
document
  .getElementById("discount-input")
  .addEventListener("input", calculateDiscount)
document
  .getElementById("factorForm")
  .addEventListener("submit", function (event) {
    event.preventDefault()
    generateFactor()
  })
