document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault()

    const formData = new FormData(this)
    const data = {
      id: formData.get("id"),
      password: formData.get("password"),
    }

    fetch("http://127.0.0.1:8000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 200) {
          localStorage.setItem("isAuth", "true")
          window.location.replace("/")
        }
      })
      .catch((error) => console.error("Error:", error))
  })
