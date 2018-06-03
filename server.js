const mongoose = require('mongoose');
const app = require('./app')
const config = require('./config')

//Coneccion a MongoDB
mongoose.connect(config.db).then(
    () => {
        console.log('Coneccion establecida');
        app.listen(config.port, () => {
            console.log(`escuchando en el puerto ${config.port}`);
        })
    },
    err => { return console.log('Error en coneccion establecida', err) }
)