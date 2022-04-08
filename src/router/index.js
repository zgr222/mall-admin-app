import routes from './routes'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next()
  } else {
    const user = JSON.parse(localStorage.getItem('user'))
    if (!user) {
      next('/login');
    } else {
      next();
    }
  }
})

export default router
