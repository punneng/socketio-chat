<template>
  <div id="app" class="container">
    <div class="row">
      <h1 class="text-center">Chat Example</h1>
    </div>
    <signin v-if="$store.state.displayName === ''"></signin>
    <chat v-if="$store.state.displayName !== ''"></chat>
  </div>
</template>

<script>
import Socket from 'socket.io-client'
import store from './store'

import Signin from './components/signin'
import Chat from './components/chat'

import { mapActions } from 'vuex'

export default {
  name: 'app',
  store,
  mounted () {
    const socket = Socket('http://localhost:8080')
    this.initSocket(socket)
  },
  methods: {
    ...mapActions({
      initSocket: 'initSocket'
    })
  },
  components: { Signin, Chat }
}
</script>

<style lang="less" scoped>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }
</style>
