<template>
  <div class="page page--index">
    <h3>User list</h3>
    <p>Click on user to see details</p>
    <div class="users">
      <ul class="user-list">
        <li v-for="(user, index) in users" :key="index" class="user-item">
          <router-link :to="'user/' + user.id">
            <div class="user-avatar">
              <img :src="user.avatarUrl" :alt="user.name" >
            </div>
            <div class="user-name">{{user.name}}</div>
          </router-link>
        </li>
      </ul>
      <div class="user-list-pager">
        <router-link v-if="previousPageUrl" :to="previousPageUrl">« Prev</router-link>
        <a v-else>« Prev</a>

        <router-link v-if="nextPageUrl" :to="nextPageUrl">Next »</router-link>
        <a v-else>Next »</a>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'users',
  data: function() {
    return {
      previousPageUrl: '',
      nextPageUrl: '',
      users: []
    }
  },

  watch: {
    '$route' (to, from) {
      this.getInitialData();
    }
  },

  created: function() {
    this.getInitialData();
  },

  methods: {
    getInitialData: function() {
      var that = this;
      var url = '/users';
      if (this.$route.query.fromItem) {
        url = '/users' + '/?fromItem=' + this.$route.query.fromItem;
      }
      axios.get(url).then(function(response) {
        that.users = response.data.result;
        that.previousPageUrl = response.data.previousPageUrl;
        that.nextPageUrl = response.data.nextPageUrl;
      }).catch((error) => console.log(error.response));
    }
  }
}
</script>

<style scoped>
  .user-list {
    display: flex;
    flex-wrap: wrap;
  }

  .user-item {
    list-style: none;
    width: 25%;
    padding: 5px;
    box-sizing: border-box;
  }
  @media (max-width: 420px) {
    .user-item {
      width: 100%;
    }
  }

  .user-item a {
    display: flex;
    padding: 10px;
    outline: 1px solid #ccc;
  }

  .user-item a:hover {
    opacity: 0.8;
  }

  .user-avatar {
    width: 50px;
    height: 50px;
    margin-right: 10px;
    flex-shrink: 0;
  }

  .user-avatar img {
    border-radius: 50%;
  }

  .user-list-pager {
    margin-top: 10px;
    text-align: center;
  }

  .user-list-pager a {
    margin-left: 5px;
    margin-right: 5px;
  }
</style>

