import Vue from 'vue';
import VueRouter from 'vue-router';

import NotFound from '../components/404.vue';
import UserList from '../components/UserList.vue';
import UserDetails from '../components/UserDetails.vue';

Vue.use(VueRouter);
const router = new VueRouter({

  routes: [
    { path: '/', component: UserList },
    { path: '/user/:id', component: UserDetails },
    { path: '*', component: NotFound }
  ]
});

export default router;
