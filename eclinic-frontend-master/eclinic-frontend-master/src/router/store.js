export default [
  {
    path: '/store',
    name: 'Super Market',
    component: () => import('@/views/Layout'),
    children: [
      {
        path: 'sale',
        name: 'Receipt',
        component: () => import('@/views/store/Sale'),
        alias: '/sale'
      },
      {
        path: 'return',
        name: 'Return Items',
        component: () => import('@/views/store/Return')
      },
      {
        path: 'stock',
        name: 'Stock Overview',
        component: () => import('@/views/super/stock/StockOverview'),
        props: true,
      },
      // TODO: Add stock overview here.
    ]
  }
]