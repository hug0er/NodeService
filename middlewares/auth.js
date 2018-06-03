const Service = require('../service/service')

function isAuth(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(403).send({ msg: `No tienes autorización` })
    }

    const token = req.headers.authorization.split(" ")[1]
    Service.decodeToken(token)
        .then(response => {
            req.user = response
            next()
        })
        .catch(response => {
            res.status(response.status).send(response.msg)
        })
}

module.exports = isAuth