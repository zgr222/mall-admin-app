
export default [
  {
    name: 'Home',
    path: '/',
    meta: {
      title: '首页',
      hidden: false,
      icon: 'icon-home'
    },
    redirect: { name: 'Index' },
    component: () => import('../views/layout/Home.vue'),
    children: [{
      name: 'Index',
      path: 'index',
      meta: {
        title: '统计',
        hidden: false,
        icon: 'icon-tongji'
      },
      component: () => import('../views/pages/Index.vue'),
    }]
  },
  {
    name: 'Login',
    path: '/login',
    meta: {
      title: '登录',
      hidden: true,
    },
    component: () => import('../views/layout/Login.vue')
  },
]



