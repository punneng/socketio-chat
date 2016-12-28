const _ = require('lodash')
const P = require('bluebird')

const MessageService = require('./message')

function start (io) {
  io.on('connection', (socket) => {
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

    socket.on('chat message', (message) => {
      const messageAttrs = { displayName: 'neng', message }
      return new P.resolve(MessageService.saveAsync(messageAttrs))
      .then((messageObject) => {
        if (messageObject.errors) {
          socket.emit('chat error', messageObject.errors)
        } else {
          socket.broadcast.emit('chat message', messageObject)
        }
      })
    })

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
