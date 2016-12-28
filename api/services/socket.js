const _ = require('lodash')
const P = require('bluebird')

const Mongoose = require('../lib/mongoose')

Mongoose.init()
const MessageService = require('./message')

function start (io) {
  io.on('connection', (socket) => {

    // chat register => receive regiteration
    socket.on('chat register', (displayName) => {
      const onlineUsers = _.map(io.clients().connected, onlineSocket => {
        return onlineSocket._displayName
      })
      if (_.includes(onlineUsers, displayName)) {
        socket.emit('chat reject register', displayName)
      } else {
        socket._displayName = displayName
        socket.emit('chat register', displayName)
      }
    })

    // chat message => receive a message from a client
    socket.on('chat message', ({displayName, message}) => {
      const messageAttrs = { displayName: displayName, message }
      return new P.resolve(MessageService.saveAsync(messageAttrs))
      .then((messageObject) => {
        if (messageObject.errors) {
          socket.emit('chat error', messageObject.errors)
        } else {
          io.emit('chat message', messageObject)
        }
      })
    })

    // chat history => receive a request to get the chat history
    socket.on('chat history', () => {
      return new P.resolve(MessageService.getHistoryAsync())
      .then(messageObjects => {
        socket.emit('chat history', messageObjects)
      })
    })
  })
}

module.exports = {
  init (server) {
    const io = require('socket.io')(server)
    start(io)
  }
}
