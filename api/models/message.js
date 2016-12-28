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

  createdAt: {
    type: Date,
    default: Date.now,
    index: true
  }
})

const model = Mongoose.model('messages', schema)
module.exports = model
