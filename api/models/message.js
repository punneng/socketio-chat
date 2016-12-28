const Mongoose = require('mongoose')

const schema = new Mongoose.Schema({
  displayName: {
    type: String,
    required: true,
    index: true
  },

  message: {
    type: String,
    required: true
  },

  channel: {
    type: Object,
    default: {}
  },

  createdAt: {
    type: Date,
    default: Date.now,
    index: true
  }
})

const model = Mongoose.model('messages', schema)
module.exports = model
