const express = require('express')

const findWishlistItem = 'SELECT COUNT(*) as count FROM wishlist WHERE product_id = ?;'
const saveToWishlistQuery = 'INSERT INTO wishlist (product_id) VALUES (?);'
const removeFromWishlistQuery = 'DELETE FROM wishlist WHERE product_id = ?'

class WishlistHandler {
  constructor (db) {
    this.db = db
  }

  getRouter () {
    const router = express.Router()
    router.post('/', this.saveToWishlist.bind(this))
    router.post('/remove', this.removeFromWishlist.bind(this))
    return router
  }

  saveToWishlist (req, res) {
    this.db.query(findWishlistItem, req.body.productId)
      .then((rows) => {
        if (rows[0].count === 0) {
          console.log('item not yet on wishlist, saving into database')
          return this.db.query(saveToWishlistQuery, [req.body.productId])
        }
      })
      .then(() => {
        res.sendStatus(201)
      })
      .catch((err) => {
        console.log(err)
        res.sendStatus(500)
      })
  }

  removeFromWishlist (req, res) {
    this.db.query(removeFromWishlistQuery, req.body.productId)
      .then(() => {
        console.log('item deleted from wishlist')
        res.sendStatus(204)
      })
      .catch((err) => {
        console.log(err)
        res.sendStatus(500)
      })
  }

}

module.exports = WishlistHandler
