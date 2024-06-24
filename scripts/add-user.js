const checkAuth = () => {
  const isAuth = localStorage.getItem("isAuth")
  if (!isAuth) window.location.replace("/login.html")
}

document
  .getElementById("userForm")
  .addEventListener("submit", function (event) {
    event.preventDefault()

    const idInput = document.getElementById("user-id")
    const nameInput = document.getElementById("user-name")
    const phoneInput = document.getElementById("user-phone")
    const addressInput = document.getElementById("user-address")

    fetch("http://127.0.0.1:8000/add-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: idInput.value,
        name: nameInput.value,
        phone: phoneInput.value,
        address: addressInput.value,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 200) {
          alert("کاربر با موفقیت افزوده شد")
          idInput.value = ""
          nameInput.value = ""
          phoneInput.value = ""
          addressInput.value = ""
        } else if (result.status === 400) {
          alert("کاربر موجود است!")
        }
      })
      .catch((error) => console.error("Error:", error))
  })
