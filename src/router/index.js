import { createRouter, createWebHistory } from 'vue-router'
import Lists from '../views/Lists.vue'

const routes = [
  {
    path: '/',
    name: 'HomeRoute',
    component: Lists,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => {
      return import(/* webpackChunkName: "about" */ '../views/Login.vue')
    }, 
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach((to,from,next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (sessionStorage.token !== "null") {
      // console.log(sessionStorage)
      // console.log('should be checkig')
      next()
    } else {
      next({name:'Login'})
    }
  } else {
    next()
  }
})

export default router
