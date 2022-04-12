import routes from './routes'
import { createRouter, createWebHistory } from 'vue-router'
import getMenuRoutes from './filterRoleRouter'
import store from '../store'

const router = createRouter({
  history: createWebHistory(),
  routes
})

let isAddRoutes = false;
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    return next()
  } else {
    const user = JSON.parse(localStorage.getItem('user'))
    if (!user) {
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
      return next();
    }
  }
})
// router.beforeEach((to, from, next) => {
//   if (to.path !== '/login') {
//     const user = JSON.parse(localStorage.getItem('user'))
//     if (user) {
//       console.log(user);
//       if (!isAddRoutes) {
//         const menuRoutes = getMenuRoutes(user.role);
//         store.dispatch('setAsyncMenuRoutes', routes.concat(menuRoutes)).then(() => {
//           menuRoutes.forEach((it) => {
//             router.addRoute(it);
//           })
//           next();
//         });
//         isAddRoutes = true;
//       }
//       return next();
//     }
//     return next('/login');
//   }
//   return next();
// });

export default router
