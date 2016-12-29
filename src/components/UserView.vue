<template>
  <div class="col-md-4">
    <div class="panel panel-primary">
      <div class="panel-heading">
         ONLINE USERS
      </div>
      <div class="panel-body">
        <ul class="media-list">
          <li v-for="displayName in users" class="media">
            <div class="media-body">
              <div class="media">
                <div class="media-body">
                    <h5>{{displayName}}</h5>
                   <small class="text-muted">Active</small>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['users']
}
</script>
