
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const mutations = {
  INIT_SOCKET (state, socket) {
    socket.on('chat message', message => {
      state.messages.push(message)
    })

    socket.on('user connect', user => {
      state.users.push(user)
    })

    socket.on('user disconnect', user => {
      const userIndex = state.users.indexOf(user)
      state.users.splice(userIndex, 1)
    })
    state.socket = socket
  },

  REGISTER (state, displayName) {
    const socket = state.socket
    socket.emit('user register', displayName)
    socket.on('user register', (registedName) => {
      state.displayName = registedName
      console.log(registedName, 'is registered')
    })

    socket.on('user reject register', (registedName) => {
      console.log(registedName, 'is already taken')
    })
  },

  SEND_MESSAGE (state, message) {
    const socket = state.socket
    socket.emit('chat message', { displayName: state.displayName, message })
  },

  GET_STARTER (state) {
    const socket = state.socket
    socket.emit('chat starter')
    socket.on('chat history', messages => {
      state.messages = messages
    })

    socket.on('user users', users => {
      state.users = users
    })
  }
}

const actions = {
  initSocket: ({ commit }, io) => commit('INIT_SOCKET', io),
  register: ({ commit }, displayName) => commit('REGISTER', displayName),
  sendMessage: ({ commit }, message) => commit('SEND_MESSAGE', message),
  getStarter: ({ commit }) => commit('GET_STARTER')
}

const store = new Vuex.Store({
  state: {
    io: null,
    displayName: '',
    messages: [],
    users: []
  },
  actions,
  mutations
})

export default store
