import Vue from 'vue';
import VueRouter from 'vue-router';

import NotFound from '../pages/404.vue';
import IndexPage from '../pages/IndexPage.vue';
import UserPage from '../pages/UserPage.vue';

Vue.use(VueRouter);
const router = new VueRouter({
  routes: [
    { path: '/', component: IndexPage },
    { path: '/user/:id', component: UserPage },
    { path: '*', component: NotFound }
  ]
});

export default router;
