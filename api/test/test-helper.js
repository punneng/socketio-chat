process.env['NODE_ENV'] = 'test'
const P        = require('bluebird')
const Mongoose = require('../lib/mongoose')

const mongoose = Mongoose.init()

const connection = mongoose.connection

// Clear all collection
module.exports = {
  clearDB: () => {
    return P.map(Object.keys(connection.models), collection => {
      return connection.models[collection].remove({})
    })
  }
}
