const express = require('express')
const bodyParser = require('body-parser')
const addRequestId = require('express-request-id')
const dbConnection = require('./util/dbconnection')
const ProductsHandler = require('./app/routes/products')
const WishlistHandler = require('./app/routes/wishlist')

const app = express()
app.use(bodyParser.json())
app.use(addRequestId())

dbConnection.setup()
  .then((db) => {
    app.get('/status', function (req, res) {
      res.sendStatus(200)
    })

    const productsRouter = (new ProductsHandler(db)).getRouter()
    const wishlistRouter = (new WishlistHandler(db)).getRouter()

    app.use('/v1/products', productsRouter)
    app.use('/v1/wishlist', wishlistRouter)

    app.use((err, req, res, next) => {
      console.error(err)
      res.sendStatus(500)
    })

    return startServer(app, 9000)
  })
  .catch((err) => {
    console.log(err)
    process.exit(1)
  })

function startServer (server, port) {
  return new Promise((resolve, reject) => {
    server.listen(port, (err) => {
      if (err) return reject(err)
      console.log(`Listening on port ${port}`)
      resolve()
    })
  })
}
