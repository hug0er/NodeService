const Product = require('../models/product')


let getProducts = (req, res) => {
    Product.find({}, (err, products) => {
        if (err) return res.status(500).send({ message: `Error en el servidor al mostrar productos ${err}` })
        res.status(200).send(products);
    })
}

let deleteProduct = (req, res) => {
    let productId = req.params.productId
    Product.findById(productId, (err, product) => {
        if (err) return res.status(500).send({ message: `Error en el servidor al guardar en la base de datos ${err}` });
        if (!product) return res.status(404).send({ message: `No existe el producto` });
        product.remove(err => {
            if (err) res.status(500).send({ message: `Error en el servidor al guardar en la base de datos ${err}` })
            res.status(200).send({ message: 'producto eliminado' })
        })
    })
}

let updateProduct = (req, res) => {
    let productId = req.params.productId
    let pUpdate = req.body
    Product.findOneAndUpdate(productId, pUpdate, (err, product) => {
        if (err) return res.status(500).send({ message: `Error en el servidor al guardar en la base de datos ${err}` });
        res.status(200).send(product)
    })

}

let insertProduct = (req, res) => {
    let product = new Product()
    product.name = req.body.name
    product.category = req.body.category
    product.description = req.body.description
    product.stock = req.body.stock
    product.delivery_date = req.body.delivery_date
    product.price = req.body.price
    product.image = req.body.image
    product.limit_date = req.body.start_date
    product.name = req.body.name
    product.id_seller = req.user
    product.path = req.file.path
    product.save((err, productSaved) => {
        if (err) return res.status(500).send({ message: `Error en el servidor al guardar en la base de datos ${err}` })
        res.status(200).send(productSaved)
    })
}

module.exports = {
    getProducts,
    deleteProduct,
    updateProduct,
    insertProduct
}