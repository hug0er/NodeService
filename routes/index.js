const express = require('express')
const route = express.Router()
const productViews = require('../Views/products')
const auth = require('../middlewares/auth')
const stock = require('../middlewares/stock')
const userViews = require('../Views/auth')
const cartViews = require('../Views/cart')
const mime = require('mime');
var multer = require('multer')
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './images')
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.' + mime.getExtension(file.mimetype))
    }
})

var upload = multer({ storage: storage })

route.post('/product', auth, upload.single('file'), productViews.insertProduct) //Esta function sirve para insertar un nuevo producto
route.get('/product', auth, productViews.getProducts) //Esta function sirve para listar todos los productos
route.delete('/product/:productId?', auth, productViews.deleteProduct) //Esta function sirve para eliminar los productos
route.put('/product/:productId?', auth, productViews.updateProduct) //Esta function sirve para actualizar los productos
route.post('/signUp', userViews.signUp) //Esta function sirve para Registrarse
route.post('/signIn', userViews.signIn) //Esta function sirve para Ingresa
route.get('/cart', auth, cartViews.getCart) // Esta function sirve para revisar el carrito 
route.post('/cart', auth, cartViews.insertOnCart) // Esta function sirve para insertar en el carrito
route.post('/cart/update', auth, cartViews.updateCart) // Esta function sirve para actualizar el carrito
route.delete('/cart/:cartId?', auth, cartViews.deleteCart) // Esta function sirve para actualizar el carrito
route.post('/cartOrder/:direction?', auth, stock, cartViews.orderCart) // Esta function sirve para actualizar el carrito


module.exports = route