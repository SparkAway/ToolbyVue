import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect:'/Login'
  },
  {
    path: '/Main',
    name: 'Main',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/Main.vue'),
    children:[
      {
        path: '/users',
        name: 'Users',
        component: () => import('../views/user/Users')
      },
      {
        path: '/beiwanglu',
        name: 'beiwanglu',
        component: () => import('../views/user/beiwanglu')
      },
      {
        path: '/caiwu',
        name: 'caiwu',
        component: () => import('../views/user/caiwu')
      },
      {
        path: '/counter',
        name:'counter',
        component:()=>import('../views/tool/Counter')
      },
      {
        path: '/clock',
        name:'clock',
        component:()=>import('../views/tool/Clock')
      },
      {
        path: '/calendar',
        name: 'calendar',
        component: () => import('../views/tool/calendar')
      },
      {
        path: '/todo',
        name: 'todo',
        component: () => import('../views/tool/todo')
      },
      {
        path: '/childtofather',
        name: 'childtofather',
        component: () => import('../views/tool/ChildToFather')
      },
      {
        path: '/vuedoublebind',
        name: 'vuedoublebind',
        component: () => import('../views/tool/VuedoubleBind')
      },
      {
        path: '/shengbei',
        name: 'shengbei',
        component: () => import('../views/tool/shengbeibuju')
      },
      {
        path: '/shuangfeiyi',
        name: 'shuangfeiyi',
        component: () => import('../views/tool/shuangfeiyi')
      }


    ]
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/Login.vue')
  }

]

const router = new VueRouter({
  routes
})

export default router
