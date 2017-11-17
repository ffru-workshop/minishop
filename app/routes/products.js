const express = require('express')

const getProductsQuery = 'SELECT * FROM products'

class ProductsHandler {
  constructor (db) {
    this.db = db
  }

  getRouter () {
    const router = express.Router()
    router.get('/', this.getProducts.bind(this))
    return router
  }

  getProducts (req, res) {
    console.log('trying to get products from database')
    this.db.query(getProductsQuery)
      .then((products) => {
        console.log('successfully fetched prodcuts')
        res.json(products)
      })
      .catch((err) => {
        console.log(err)
        res.sendStatus(500)
      })
  }
}

module.exports = ProductsHandler
