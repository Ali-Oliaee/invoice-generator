const { createRxDatabase } = require("rxdb")
const { getRxStorageMemory } = require("rxdb/plugins/storage-memory")
const PDFDocument = require("pdfkit")
const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")

const productsList = require("./products-list")
const customersList = require("./customers-list")
const {
  shoppingBagSchema,
  productsSchema,
  customersSchema,
} = require("./schemas")

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const initDb = async () => {
  try {
    const database = await createRxDatabase({
      name: "db",
      storage: getRxStorageMemory(),
    })
    console.log("database created!")

    const collections = await database.addCollections({
      products: {
        schema: productsSchema,
      },
      shoppingBag: {
        schema: shoppingBagSchema,
      },
      customers: {
        schema: customersSchema,
      },
    })
    console.log("schemas created!")

    await collections.products.bulkInsert(productsList)
    console.log("products list added!")

    await collections.customers.bulkInsert(customersList)
    console.log("customers list added!")

    return { database, collections }
  } catch (e) {
    console.error(e)
  }
}

const db = initDb()

app.post("/login", (req, res) => {
  const id = req.body.id
  const password = req.body.password

  if (id === "1" && password === "1234") {
    res.send({ status: 200, message: "login successfully!" })
    res.end()
  } else {
    res.status(400).send({ message: "wrong input!" })
    res.end()
  }
})

app.get("/products", async (req, res) => {
  const { database } = await db
  try {
    const productsCollection = (await database.products.find().exec()).map(
      ({ _data }) => _data
    )
    res.status(200).send(productsCollection)
  } catch (e) {
    console.error(e)
    res.send({ status: 500, message: "Internal Server Error" })
  }
})

app.post("/buy", async (req, res) => {
  try {
    const { database, collections } = await db
    const products = (await database.products.find().exec()).map(
      ({ _data }) => _data
    )
    const productId = req.body.id
    const productData = products.find(
      (product) => product.id === String(productId)
    )

    const productStatus = await collections.shoppingBag
      .findOne({
        selector: {
          id: String(productId),
        },
      })
      .exec()

    if (!productStatus)
      collections.shoppingBag.insert({
        id: String(productData.id),
      })
    res.send({ status: 200, message: "added!" })
  } catch (e) {
    console.error(e)
    res.send({ status: 500, message: "Internal Server Error" })
  }
})

app.get("/shopping-card", async (req, res) => {
  try {
    const { database } = await db
    const products = (await database.products.find().exec()).map(
      ({ _data }) => _data
    )

    const shoppingBagIds = (await database.shoppingBag.find().exec()).map(
      ({ _data }) => _data.id
    )

    const shoppingBagItems = products.filter((product) =>
      shoppingBagIds.includes(product.id)
    )

    res.status(200).send(shoppingBagItems)
  } catch (e) {
    console.error(e)
    res.send({ status: 500, message: "Internal Server Error" })
  }
})

app.post("/remove", async (req, res) => {
  try {
    const { collections } = await db
    const productId = req.body.id

    const productStatus = await collections.shoppingBag
      .findOne({
        selector: {
          id: String(productId),
        },
      })
      .exec()

    if (productStatus)
      await collections.shoppingBag
        .findOne({
          selector: {
            id: String(productId),
          },
        })
        .remove()

    res.send({ status: 200, message: "removed!!" })
  } catch (e) {
    console.error(e)
    res.send({ status: 500, message: "Internal Server Error" })
  }
})

app.post("/change-count", async (req, res) => {
  try {
    const { database, collections } = await db
    const productId = req.body.id
    const count = req.body.count

    const product = await collections.products
      .findOne({
        selector: {
          id: String(productId),
        },
      })
      .exec()

    if (product) {
      await product.modify((doc) => {
        doc.count = count
        return doc
      })
    } else {
      console.log("Product not found")
    }

    const productsCollection = (await database.products.find().exec()).map(
      ({ _data }) => _data
    )

    res.send(productsCollection)
  } catch (e) {
    console.error(e)
    res.send({ status: 500, message: "Internal Server Error" })
  }
})

app.get("/user/:id", async (req, res) => {
  try {
    const { collections } = await db
    const userId = req.params.id
    const user = await collections.customers
      .findOne({
        selector: {
          id: { $regex: `.*${userId}.*` },
        },
      })
      .exec()

    if (user) res.send(user._data)
    else res.send({})
  } catch (e) {
    console.error(e)
    res.send({ status: 500, message: "Internal Server Error" })
  }
})

app.post("/add-product", async (req, res) => {
  try {
    const { collections } = await db

    const productNmae = req.body.name
    const productDescription = req.body.description
    const productPrice = req.body.price

    collections.products.insert({
      id: String(Math.floor(Math.random() * 1000)),
      name: productNmae,
      image: "",
      price: Number(productPrice),
      description: productDescription,
      count: 1,
    })
    res.send({ status: 200, message: "added!" })
  } catch (e) {
    console.error(e)
    res.send({ status: 500, message: "Internal Server Error" })
  }
})

app.post("/add-user", async (req, res) => {
  try {
    const { collections } = await db

    const userId = req.body.id
    const username = req.body.name
    const userPhone = req.body.phone
    const userAddress = req.body.address

    const userStatus = await collections.customers
      .findOne({
        selector: {
          id: userId,
        },
      })
      .exec()

    if (!userStatus) {
      collections.customers.insert({
        id: userId,
        name: username,
        phone: userPhone,
        address: userAddress,
      })
      res.send({ status: 200, message: "added!" })
    } else {
      res.send({ status: 400, message: "user exist!" })
    }
  } catch (e) {
    console.error(e)
    res.send({ status: 500, message: "Internal Server Error" })
  }
})

const PORT = 8000
app.listen(PORT, (e) => console.log(e ? e : `Server running on port ${PORT}`))
