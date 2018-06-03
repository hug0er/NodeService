const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = Schema({
    quantity: Number,
    id_user: Schema.Types.ObjectId,
    id_product: Schema.Types.ObjectId,
})

module.exports = mongoose.model('Cart', cartSchema)