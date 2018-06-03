const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Delivery = require('./delivery')

const transactionSchema = Schema({
    direction: String,
    quantity: Number,
    price: Number,
    id_user: Schema.Types.ObjectId,
    id_product: Schema.Types.ObjectId,
})

module.exports = mongoose.model('Transaction', transactionSchema)