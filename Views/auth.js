const User = require('../models/user')
const Service = require('../service/service')

let signUp = (req, res) => {
    let user = new User({
        name: req.body.name,
        lastName: req.body.lastName,
        email: req.body.email,
        cellphone: req.body.cellphone,
        image: req.body.image,
        password: req.body.password
    })
    user.save((err) => {
        if (err) {
            console.log('Error al guardar usuario: ' + err)
            res.status(500).send({ msg: `error al crear usuario` })
        }
        return res.status(200).send({ token: Service.createToken(user) })
    })
}

let signIn = (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) {
            console.log('Existio un error en SignIn: ' + err);
            return res.status(500).send({ msg: `Error con el Servidor` })
        }
        if (!user) return res.status(404).send({ msg: `No existe el usuario: ${req.body.email}` })
        return user.comparePassword(req.body.password, (err, isMatch) => {
            if (err) {
                console.log('Existio un error en Comparacion del pasword: ' + err);
                return res.status(500).send({ msg: `Error con el servidor` })
            }
            if (!isMatch) {
                return res.status(404).send({ msg: `Error de contraseña: ${req.body.email}` })
            }
            req.user = user
            return res.status(200).send({ msg: 'Te has logueado correctamente', token: Service.createToken(user) })
        });
    }).select('_id email +password');
}


module.exports = {
    signIn,
    signUp
}