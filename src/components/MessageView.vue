<template>
  <div class="col-md-8">
    <div class="panel panel-info">
      <div class="panel-heading">
        RECENT CHAT HISTORY
      </div>
      <div class="panel-body">
        <ul v-for="messageObject in $store.state.messages" class="media-list">
          <li class="media">
            <div class="media-body">
              <div class="media">
                <div v-bind:class="'media-body ' + textAlign(messageObject.displayName)">
                    {{ messageObject.message }}
                    <br>
                   <small class="text-muted">
                     {{ messageObject.displayName }} | {{ fmtDate(messageObject.createdAt) }}
                   </small>
                    <hr>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <message-input></message-input>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Moment from 'moment'
import jQuery from 'jquery'

import MessageInput from './MessageInput.vue'

export default {
  components: { MessageInput },
  created () {
    this.getMessageHistory()
  },

  updated () {
    jQuery('.panel-body').scrollTop(jQuery('.panel-body')[0].scrollHeight)
  },

  methods: {
    ...mapActions({
      getMessageHistory: 'getMessageHistory'
    }),

    fmtDate (dateStr) {
      // 23rd June at 5:00pm
      return Moment(dateStr).format('Do MMM [at] h:mm a')
    },
    textAlign (displayName) {
      return displayName === this.$store.state.displayName
      ? 'text-right'
      : 'text-left'
    }
  }
}
</script>

<style lang="less" scoped>
  div.panel-body {
    height: 450px;
    overflow: scroll;
  }
</style>
