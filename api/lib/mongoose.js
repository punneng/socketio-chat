'use strict'

const Mongoose = require('mongoose')
const P = require('bluebird')
const Config = require('../config/main')

const clearDB = () => {
  return P.map(Object.keys(Mongoose.connection.models), collection => {
    return Mongoose.connection.models[collection].remove({})
  })
}

module.exports.init = () => {
  Mongoose.Promise = P

  const stack = (new Error()).stack

  const mongooseOpts = {
    db: {
      native_parser: true
    },
    server: {
      poolSize: 5,
      reconnectTries: Number.MAX_VALUE,
      auto_reconnect: true,
      socketOptions: { keepAlive: 120 }
    }
  }
  if (Config.MONGO_USER && Config.MONGO_PASS) {
    mongooseOpts.user = Config.MONGO_USER
    mongooseOpts.pass = Config.MONGO_PASS
  }

  Mongoose.connection.on('error', () => console.error('MongoDB: connection error,', mongooseOpts))

  Mongoose.connection.on('connecting', () => {
    console.info('MongoDB: connecting to MongoDB...')
  })

  Mongoose.connection.on('reconnected', () => console.info('MongoDB: reconnected to MongoDb'))

  Mongoose.connection.on('connected', () => {
    console.info('MongoDB: connected to MongoDb')
    if (Config.NODE_ENV === 'test') {
      console.info('MongoDB: clear test db')
      return clearDB()
    }
  })

  Mongoose.connection.on('disconnected', () => console.info('MongoDB: disconnected'))

  const reconnect = () => Mongoose.connect(Config.MONGO_URL, mongooseOpts, (err) => {
    if (err) {
      console.error('MongoDB: error -- reconnecting:', err.message, stack)
      setTimeout(reconnect, 1000)
    }
  })

  reconnect()
  return Mongoose
}

module.exports.clearDB = clearDB
