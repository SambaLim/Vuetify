import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Projects from './views/Projects.vue'
import Team from './views/Team.vue'
import Exist from './views/tds/Exist.vue'
import Login from './views/chat/Login.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/projects',
      name: 'projects',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: Projects
    },
    {
      path: '/team',
      name: 'team',
      component: Team
    },
    {
      path: '/tds/exist',
      name: 'exist',
      component: Exist
    },
    {
      path: '/chat/login',
      name: 'login',
      component: Login
    }
  ]
})
