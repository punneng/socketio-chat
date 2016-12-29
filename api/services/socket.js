const _ = require('lodash')
const P = require('bluebird')

const Mongoose = require('../lib/mongoose')

Mongoose.init()
const MessageService = require('./message')

function getOnlineUsers (io) {
  return _(io.clients().connected)
  .map(socket => {
    return _.get(socket, '_displayName', null)
  })
  .compact()
}

function start (io) {
  io.on('connection', (socket) => {
    // chat register => receive regiteration
    socket.on('user register', (displayName) => {
      const onlineUsers = getOnlineUsers(io)
      if (_.includes(onlineUsers, displayName)) {
        socket.emit('user reject register', displayName)
      } else {
        socket._displayName = displayName
        socket.emit('user register', displayName)
        socket.broadcast.emit('user connect', displayName)
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
    socket.on('chat starter', () => {
      return new P.resolve(MessageService.getHistoryAsync())
      .then(messageObjects => {
        socket.emit('chat history', messageObjects)
      })
      .tap(() => {
        const users = getOnlineUsers(io)
        socket.emit('user users', users)
      })
    })

    socket.on('disconnect', () => {
      if (socket._displayName) {
        io.emit('user disconnect', socket._displayName)
      }
    })
  })
}

module.exports = {
  init (server) {
    const io = require('socket.io')(server)
    start(io)
  }
}
