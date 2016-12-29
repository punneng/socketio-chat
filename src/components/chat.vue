<template>
  <div class="row">
    <message-view :messages="$store.state.messages"></message-view>
    <user-view :users="$store.state.users"></user-view>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import MessageView from './MessageView'
import UserView from './UserView'

export default {
  components: { MessageView, UserView },
  created () {
    this.getStarter()
  },
  methods: {
    ...mapActions({
      getStarter: 'getStarter'
    })
  }
}
</script>
