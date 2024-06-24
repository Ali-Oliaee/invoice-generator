const productsSchema = {
  version: 0,
  primaryKey: "id",
  type: "object",
  properties: {
    id: {
      type: "string",
      maxLength: 100,
    },
    name: {
      type: "string",
    },
    image: {
      type: "string",
    },
    description: {
      type: "string",
    },
    price: {
      type: "number",
    },
    count: {
      type: "number",
    },
  },
  required: ["id", "name", "image", "description", "price", "count"],
}

const shoppingBagSchema = {
  version: 0,
  primaryKey: "id",
  type: "object",
  properties: {
    id: {
      type: "string",
      maxLength: 100,
    },
  },
  required: ["id"],
}

const customersSchema = {
  version: 0,
  primaryKey: "id",
  type: "object",
  properties: {
    id: {
      type: "string",
      maxLength: 100,
    },
    name: {
      type: "string",
    },
    phone: {
      type: "string",
    },
    address: {
      type: "string",
    },
  },
  required: ["id", "name", "address", "phone"],
}

module.exports = {
  productsSchema,
  shoppingBagSchema,
  customersSchema,
}
