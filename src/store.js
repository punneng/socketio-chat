import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const mutations = {
  INIT_SOCKET (state, socket) {
    socket.on('chat message', (message) => {
      state.messages.push(message)
    })
    state.socket = socket
  },

  REGISTER (state, displayName) {
    const socket = state.socket
    socket.emit('chat register', displayName)
    socket.on('chat register', (registedName) => {
      state.displayName = registedName
      console.log(registedName, 'is registered')
    })

    socket.on('chat reject register', (registedName) => {
      console.log(registedName, 'is already taken')
    })
  },

  SEND_MESSAGE (state, message) {
    const socket = state.socket
    socket.emit('chat message', { displayName: state.displayName, message })
  },

  GET_MESSAGE_HISTORY (state) {
    const socket = state.socket
    socket.emit('chat history')
    socket.on('chat history', messages => {
      state.messages = messages
    })
  }
}

const actions = {
  initSocket: ({ commit }, io) => commit('INIT_SOCKET', io),
  register: ({ commit }, displayName) => commit('REGISTER', displayName),
  sendMessage: ({ commit }, message) => commit('SEND_MESSAGE', message),
  getMessageHistory: ({ commit }) => commit('GET_MESSAGE_HISTORY')
}

const store = new Vuex.Store({
  state: {
    io: null,
    displayName: '',
    messages: []
  },
  actions,
  mutations
})

export default store
