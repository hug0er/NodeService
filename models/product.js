const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = Schema({
    name: String,
    description: String,
    stock: Number,
    delivery_date: Date,
    limit_date: Date,
    register_date: { type: Date, default: Date.now() },
    price: Number,
    category: { type: String, enum: ['Comida', 'Ocio', 'Tecnología', 'Tutorías'] },
    id_seller: Schema.Types.ObjectId,
    path: String
})

module.exports = mongoose.model('Product', productSchema)