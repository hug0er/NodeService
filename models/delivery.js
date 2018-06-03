const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const deliverySchema = Schema({
    category: { type: Number, enum: [1, 2, 3, 4, 5] },
    state: { type: String, enum: ['Cancelado', 'Entregado', 'En camino', 'Solicitado'] }
})

module.exports = mongoose.model('Delivery', deliverySchema)