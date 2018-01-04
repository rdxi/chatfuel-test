<template>
  <div class="page page--user">
    <h3>User details</h3>
    <p>Name can be edited here</p>
    <div class="link-home">
      <a href="#" @click="$router.go(-1)">Go Back</a>
    </div>
    <div class="user">
      <div class="user-avatar">
        <img :src="avatarUrl" :alt="name" >
      </div>
      <div class="user-details">
        <div class="user-id">User id: {{ id }}</div>
        <div class="user-name">
          <div v-show="!isEditing" class="user-name-normal">
            <div>{{ name }}</div>
            <button @click="startEditing">Edit name</button>
          </div>
          <div v-show="isEditing" class="user-name-edit">
            <div>
              <input
                type="text"
                ref="editNameInput"
                v-model="newName"
                @keyup.enter="stopEditing(true)"
                @keyup.esc="stopEditing(false)"
                maxlength="500"
              >
            </div>
            <button @click="stopEditing(true)">Confirm</button>
            <button @click="stopEditing(false)">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data: function() {
    return {
      isEditing: false,
      newName: '',
      id: '',
      name: 'Fetching data...',
      avatarUrl: ''
    }
  },

  created: function() {
    this.getInitialData();
    console.log(this.$route);
  },

  methods: {
    startEditing: function() {
      var that = this;
      this.isEditing = true;
      this.newName = this.name;

      setTimeout(function() {
        that.$refs.editNameInput.focus();
      }, 10);
    },

    stopEditing: function(confirm) {
      var isEmpty = (this.newName === '');
      var isSame = (this.newName === this.name);

      if (confirm === true && !isEmpty && !isSame) {
        this.isEditing = false;
        this.name = this.newName;
        this.postNewName();
      } else {
        this.isEditing = false;
        this.newName = this.name;
      }
    },

    getInitialData: function() {
      var that = this;
      axios.get('/user/' + this.$route.params.id).then(function(response) {
        that.id = response.data.id;
        that.name = response.data.name;
        that.avatarUrl = response.data.avatarUrl;
      }).catch((error) => console.log(error.response));
    },

    postNewName: function() {
      var that = this;
      var newUserData = {
        name: this.name,
        avatarUrl: this.avatarUrl
      };
      axios.post('/users/' + this.$route.params.id, newUserData).then(function(response) {
        console.log(response);
      }).catch((error) => console.log(error.response));
    }
  },

  // TODO: make sure components reload if url is changed directly "reacting to param changes" https://router.vuejs.org/en/essentials/dynamic-matching.html
  // beforeRouteUpdate (to, from, next) {},
  watch: {
    '$route' (to, from) {
      this.getInitialData();
    }
  }

}
</script>

<style scoped>
  .user {
    max-width: 600px;
    margin: auto;
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    outline: 1px solid #ccc;
  }

  .user-avatar {
    width: 100px;
    height: 100px;
    margin-right: 10px;
  }

  .user-avatar img {
    width: 100%;
  }

  .user-details {
    display: flex;
    flex-direction: column;
  }

  .user-name {
    font-size: 2em;
    font-weight: 600;
  }

  /* .user-name-edit {
    margin-top: auto;
  } */

  .link-home {
    text-align: center;
    margin-bottom: 1em;
  }
</style>
