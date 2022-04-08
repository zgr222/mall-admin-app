
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'

export default [
  { name: 'home', path: '/', component: Home, },
  { name: 'login', path: '/login', component: Login },

]


// {
//   path: '/',
//   name: 'home',
//   component: HomeView
// },
// {
//   path: '/about',
//   name: 'about',
//   // route level code-splitting
//   // this generates a separate chunk (about.[hash].js) for this route
//   // which is lazy-loaded when the route is visited.
//   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
// }