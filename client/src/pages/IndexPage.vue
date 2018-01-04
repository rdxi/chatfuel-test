<template>
  <user-list></user-list>
</template>

<script>
import UserList from './../components/UserList.vue';

export default {
  components: {
    UserList
  },
  data: function() {
    return {
      // welcome: 'Click on user to see details'
    }
  }
}
</script>