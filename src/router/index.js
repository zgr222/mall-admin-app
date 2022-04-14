import routes from './routes'
import { createRouter, createWebHistory } from 'vue-router'
import getMenuRoutes from './filterRoleRouter'
import store from '../store'
import NProgress from "nprogress";
import 'nprogress/nprogress.css';
NProgress.configure({
  trickleSpeed: 10,
  showSpinner: false
})

const router = createRouter({
  history: createWebHistory(),
  routes
})

let isAddRoutes = false;
router.beforeEach((to, from, next) => {
  NProgress.start();
  if (to.path === '/login') {
    NProgress.done();
    return next()
  } else {
    const user = JSON.parse(localStorage.getItem('user'))
    if (!user) {
      NProgress.done();
      return next('/login');
    } else {
      if (!isAddRoutes) {
        const menuRoutes = getMenuRoutes(user.role);
        store.dispatch('setAsyncMenuRoutes', routes.concat(menuRoutes)).then(() => {
          menuRoutes.forEach((it) => {
            router.addRoute(it);
          })
          if (to.matched.length === 0) {
            router.push(to.path);
          }
          // console.log(to.matched, to.path);
          next();
        });
        isAddRoutes = true;
      }
      NProgress.done();
      return next();
    }
  }
})

export default router
