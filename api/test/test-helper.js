process.env['NODE_ENV'] = 'test'
const P        = require('bluebird')
const Mongoose = require('../lib/mongoose')

const mongoose = Mongoose.init()
