
// 最终导出需要的路由
const asyncRouterMap = [
  {
    name: 'Product',
    path: '/product',
    meta: {
      title: '商品',
      hidden: false,
      icon: 'icon-shangpin'
    },
    redirect: { name: 'ProductList' },
    component: () => import('../views/layout/Home.vue'),
    children: [
      {
        name: 'ProductList',
        path: 'list',
        meta: {
          title: '商品列表',
          hidden: false,
          icon: 'icon-shangpinliebiao'
        },
        component: () => import('../views/pages/ProductList.vue')
      },
      {
        name: 'ProductEdit',
        path: 'edit/:id',
        meta: {
          title: '编辑商品',
          hidden: true,
          icon: 'icon-tianjiashangpin'
        },
        component: () => import('../views/pages/ProductAdd.vue')
      },
      {
        name: 'ProductAdd',
        path: 'add',
        meta: {
          title: '添加商品',
          hidden: false,
          icon: 'icon-tianjiashangpin'
        },
        component: () => import('../views/pages/ProductAdd.vue')
      },
    ],
  },
  {
    name: 'Category',
    path: '/category',
    meta: {
      title: '类目管理',
      hidden: false,
      icon: 'icon-fenjifenlei'
    },
    component: () => import('../views/pages/Category.vue')
  },
];

// 根据角色过滤路由
const roleToRoute = {
  coustomer: [
    { name: 'Product' },
    { name: 'ProductList' },
    { name: 'ProductEdit' },
    { name: 'ProductAdd' },
  ],
  admin: [
    { name: 'Product' },
    { name: 'ProductList' },
    { name: 'ProductEdit' },
    { name: 'ProductAdd' },
    { name: 'Category' },
  ]
}

export default function getMenuRoutes(role) {
  const allRoutesName = roleToRoute[role].map((it) => it.name);
  const resultRoutes = asyncRouterMap.filter((r) => {
    if (allRoutesName.indexOf(r.name) !== -1) {
      r.children = r.children.filter((c) => allRoutesName.indexOf(c.name) !== -1);
      return true;
    }
    return false;
  });
  return resultRoutes;
}