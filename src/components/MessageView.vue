<template>
  <div class="col-md-8">
    <div class="panel panel-info">
      <div class="panel-heading">
        RECENT CHAT HISTORY
      </div>
      <div class="panel-body">
        <ul class="media-list">
          <li v-for="message in messages" class="media">
            <div class="media-body">
              <div class="media">
                <div v-bind:class="'media-body ' + textAlign(message.displayName)">
                    {{ message.message }}
                    <br>
                   <small class="text-muted">
                     {{ message.displayName }} | {{ fmtDate(message.createdAt) }}
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
import Moment from 'moment'
import jQuery from 'jquery'

import MessageInput from './MessageInput.vue'

export default {
  components: { MessageInput },

  updated () {
    jQuery('.panel-body').scrollTop(jQuery('.panel-body')[0].scrollHeight)
  },

  methods: {
    fmtDate (dateStr) {
      // 23rd June at 5:00pm
      return Moment(dateStr).format('Do MMM [at] h:mm a')
    },
    textAlign (name) {
      return name === this.displayName
      ? 'text-right'
      : 'text-left'
    }
  },
  props: ['messages', 'displayName']
}
</script>

<style lang="less" scoped>
  div.panel-body {
    height: 450px;
    overflow: scroll;
  }
</style>
