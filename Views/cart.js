const Cart = require('../models/cart')
const User = require('../models/user')
const Product = require('../models/product')
const Transaction = require('../models/transaction')
const Fawn = require("fawn");
const mongoose = require('mongoose');
Fawn.init(mongoose);
var task = Fawn.Task();


let getCart = (req, res) => {
    Cart.find({ id_user: req.user }).populate({ path: 'id_product', model: 'Product' }).exec((err, products) => {
        if (err) {
            console.log('Existio un error en getCart: ' + err);
            return res.status(500).send({ msg: `Error con el Servidor` })
        }
        return res.status(200).send(products)
    })
}

let insertOnCart = (req, res) => {
    let cart = new Cart()
    cart.quantity = req.body.quantity
    cart.id_user = req.user
    cart.id_product = req.body.id_product
    cart.save((err, cartSaved) => {
        if (err) {
            console.log('Existio un error en insertOnCart ' + err);
            return res.status(500).send({ msg: `Error con el Servidor` })
        }
        return res.status(200).send(cartSaved)
    })
}

let deleteCart = (req, res) => {
    let cartId = req.params.cartId
    Cart.findById(cartId, (err, product) => {
        if (err) {
            console.log('Existio un error en deleteCart ' + err);
            return res.status(500).send({ msg: `Error con el Servidor` })
        }
        if (!product) return res.status(404).send({ msg: `No existe el producto` });
        product.remove(err => {
            if (err) {
                console.log('Existio un error en deleteCart ' + err);
                return res.status(500).send({ msg: `Error con el Servidor` })
            }
            res.status(200).send({ msg: 'producto eliminado' })
        })
    })
}

let updateCart = (req, res) => {
    for (var i = 0; i < Object.keys(req.body).length; i++) {
        task.update("Cart", { _id: req.body[i]._id }, { $set: { quantity: req.body[i].quantity } })
    }
    task.run({ useMongoose: true })
        .then(() => {
            return res.status(200).send({})
        })
        .catch((err) => {
            console.log('Existio un error en updateCart ' + err);
            return res.status(500).send({ msg: `Error con el Servidor` })
        })
}

let orderCart = (req, res) => {
    let direction = req.params.direction
    for (var i = 0; i < Object.keys(req.body).length; i++) {
        task.save("Transaction", { direction: direction, quantity: req.body[i].quantity, price: req.body[i].price, id_user: req.user, id_product: req.body[i].id_product._id })
        task.remove("Cart", { _id: req.body[i]._id })
    }
    task.run({ useMongoose: true })
        .then(() => {
            return res.status(200).send({})
        })
        .catch((err) => {
            console.log('Existio un error en orderCart ' + err);
            return res.status(500).send({ msg: `Error con el Servidor` })
        })
}


module.exports = {
    getCart,
    insertOnCart,
    updateCart,
    deleteCart,
    orderCart
}