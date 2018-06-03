const express = require('express')
const app = express()
var bodyParser = require('body-parser');
const route = require('./routes/index')
var cors = require('cors');
var morgan = require('morgan')


app.use(morgan('dev'))
app.use(bodyParser.json()); // soporte para bodies codificados en jsonsupport
app.use(bodyParser.urlencoded({ extended: true })); // soporte para bodies codificados
app.use(cors()); //COOORSSS
app.use('/api', route)


module.exports = app