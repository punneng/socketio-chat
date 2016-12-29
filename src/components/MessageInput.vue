<template>
  <div class="panel-footer">
    <div class="input-group">
      <input type="text" class="form-control" placeholder="Enter Message" v-model="message">
      <span class="input-group-btn">
        <button class="btn btn-info" type="button" name="send" v-on:click="send">SEND</button>
      </span>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      message: ''
    }
  },

  methods: {
    ...mapActions({
      sendMessage: 'sendMessage'
    }),

    send () {
      this.sendMessage(this.message)
      this.message = ''
    }
  }
}
</script>

<style lang='less' scoped>

  div.row {
    position: fixed;
    bottom: 0;
  }
</style>
