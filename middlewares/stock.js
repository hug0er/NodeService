const Product = require('../models/product')

async function stock(req, res, next) {
    for (const element of req.body) {
        let quantity = element.quantity
        let id = element.id_product._id
        console.log(element.quantity);
        console.log(element.id_product._id);
        resp = await stock_async(id, quantity)
        console.log(resp);
        if (resp.offset) {
            return res.status(200).send(resp)
        } else if (resp.msg) {
            return res.status(resp.status).send(resp.msg)
        }
    }
    next()
}

function stock_async(id, quantity) {
    return new Promise(resolve => {
        Product.findById(id).exec((err, product) => {
            if (err) {
                console.log('Existio un error en stock ' + err);
                resolve({ status: 500, msg: `Error con el Servidor` })
            } else if (quantity > product.stock) {
                console.log('hola');
                resolve({ status: 200, offset: `El producto ${product.name} excede el stock máximo` })
            } else {
                resolve({})
            }
        })
    })
}
module.exports = stock