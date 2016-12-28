<template>
  <div class="row">
    <message-view></message-view>
    <user-view></user-view>
  </div>
</template>

<script>
import MessageView from './MessageView'
import UserView from './UserView'

export default {
  components: { MessageView, UserView }
}
</script>

<style scoped>

</style>
