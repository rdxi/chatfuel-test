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
        <a :href="previousPageUrl ? previousPageUrl : null" >« Prev</a>
        <a :href="nextPageUrl ? nextPageUrl : null">Next »</a>
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
      nextPageUrl: 'http://some-url99999999999.com',
      users: []
    }
  },

  created: function() {
    // console.log(this.$route.query);
    this.getInitialData();
  },

  methods: {
    getInitialData: function() {
      var that = this;
      axios.get('/users').then(function(response) {
        that.users = response.data;
      }).catch((error) => console.log(error.response));
    }
  }

  // methods: {
  //   addPost: function() {
  //     var that = this;
  //     axios.post('/posts', {text: this.formInput}).then(function(response) {
  //       that.posts.unshift(response.data);
  //     }).catch(err => that.formError = err.response.statusText);
  //   },

  //   deletePost: function(id) {
  //     var that = this;
  //     axios.delete('/posts/'+id).then(function(response) {
  //       var newPosts = that.posts.filter((post) => post.id !== response.data[0].id);
  //       that.posts = newPosts;
  //     }).catch((err) => console.log(err.response));
  //   }
  // }
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
  /* .posts {
    display: flex;
    justify-content: center;
  }

  .post-list {
    width: 70%;
  }

  .post-item {
    width: 100%;
    display: flex;
    margin-bottom: 20px;
    padding: 10px;
    box-sizing: border-box;
    outline: 1px solid rgb(169, 169, 169);
  }

  .post-date {
    width: 100px;
    flex-shrink: 0;
  }

  .post-text {
    margin-left: 20px;
    margin-right: 20px;
    word-break: break-all;
    white-space: pre-wrap;
  }

  .post-button {
    width: 100px;
    margin-left: auto;
    flex-shrink: 0;
  }

  .post-button button {
    width: 100%;
  }

  .post-form {
    position: relative;
    width: 30%;
    display: flex;
    flex-direction: column;
    margin-right: 20px;
  }

  .post-form textarea {
    height: 150px;
    padding: 10px;
    resize: none;
  }

  .post-form-error {
    padding: 5px;
    position: absolute;
    bottom: 100%;
    left: 0;
    right: 0;
    background-color: maroon;
    color: #fff;
  }

  @media (max-width: 420px) {
    .posts {
      flex-direction: column;
    }

    .post-form {
      width: 100%;
      margin-right: 0;
      margin-bottom: 20px;
    }

    .post-list {
      width: 100%;
    }

    .post-item {
      flex-direction: column;
    }

    .post-text {
      margin: 0;
      margin-top: 10px;
      margin-bottom: 10px;
    }

    .post-button {
      margin-left: 0;
    }
  } */
</style>

