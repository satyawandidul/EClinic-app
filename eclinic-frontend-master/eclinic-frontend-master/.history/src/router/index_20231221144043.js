import Vue from 'vue'
import VueRouter from 'vue-router'

// Import all the paths here.
import SuperAdminRoutes from './super'
import StoreRoutes from './store'
import ReceptionRoutes from './reception'
// import AdminRoutes from './admin'
import DoctorRoutes from './doctor'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('@/views/Login')
  },
  {
    path: '/reroute',
    name: 'LoadCorrectPath',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/Login')
  },
  //...SuperAdminRoutes,
  ...ReceptionRoutes,
  // ...AdminRoutes,
  ...StoreRoutes,
  ...DoctorRoutes
]

const router = new VueRouter({
  mode: process.env.IS_ELECTRON ? 'hash' : 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
