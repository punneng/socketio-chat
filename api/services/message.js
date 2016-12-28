const P                   = require('bluebird')
const _                   = require('lodash')
const { ValidationError } = require('mongoose').Error

const Const               = require('../models/constant')
const MessageModel        = require('../models/message')

module.exports = {
  saveAsync: P.coroutine(function* (attrs) {
    const message = new MessageModel(attrs)
    return P.try(P.coroutine(function* () {
      yield MessageModel.create(message)
      return MessageModel.findOne({ _id: message._id })
    }))
    .catch(ValidationError, error => {
      const errors = _.reduce(error.errors, (result, value, key) => {
        result[key] = value.message
        return result
      }, {})
      return { errors }
    })
  }),

  getHistoryAsync: P.coroutine(function* () {
    const messages = yield MessageModel.find({})
    .sort({ createdAt: -1, _id: -1 })
    .limit(Const.MAX_MESSAGE)
    .lean()

    return messages.reverse()
  })
}
