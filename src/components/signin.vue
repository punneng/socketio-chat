<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      displayName: ''
    }
  },

  methods: {
    ...mapActions({
      register: 'register'
    }),
    signin () {
      this.register(this.displayName)
    }
  }
}
</script>

<template>
  <div class="row">
    <div class="col-md-6 col-md-offset-3">
      <div class="input-group">
        <input type="text" class="form-control" placeholder="Display Name" v-model="displayName">
        <span class="input-group-btn">
          <button class="btn btn-info" type="button" name="signin" v-on:click="signin">SIGNIN</button>
        </span>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
  div.container {
    padding-top: 200px;
  }
</style>
