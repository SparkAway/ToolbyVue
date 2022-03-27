import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const routes = [
  {
    path: '/',
    redirect:'/Login',
    meta:{needLogin:true}
  },
  {
    path: '/Main',
    name: 'Main',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/Main.vue'),
    meta:{needLogin:true},
    children:[
      {
        path: '/users',
        name: 'Users',
        component: () => import('../views/user/Users'),
        meta:{needLogin:true}
      },
      {
        path: '/beiwanglu',
        name: 'beiwanglu',
        component: () => import('../views/user/beiwanglu'),
        meta:{needLogin:true}
      },
      {
        path: '/caiwu',
        name: 'caiwu',
        component: () => import('../views/user/caiwu'),
        meta:{needLogin:true}
      },
      {
        path: '/counter',
        name:'counter',
        component:()=>import('../views/tool/Counter'),
        meta:{needLogin:true}
      },
      {
        path: '/clock',
        name:'clock',
        component:()=>import('../views/tool/Clock'),
        meta:{needLogin:true}
      },
      {
        path: '/calendar',
        name: 'calendar',
        component: () => import('../views/tool/calendar'),
        meta:{needLogin:true}
      },
      {
        path: '/todo',
        name: 'todo',
        component: () => import('../views/tool/todo'),
        meta:{needLogin:true}
      },
      {
        path: '/childtofather',
        name: 'childtofather',
        component: () => import('../views/tool/ChildToFather'),
        meta:{needLogin:true}
      },
      {
        path: '/vuedoublebind',
        name: 'vuedoublebind',
        component: () => import('../views/tool/VuedoubleBind'),
        meta:{needLogin:true}
      },
      {
        path: '/shengbei',
        name: 'shengbei',
        component: () => import('../views/tool/shengbeibuju'),
        meta:{needLogin:true}
      },
      {
        path: '/shuangfeiyi',
        name: 'shuangfeiyi',
        component: () => import('../views/tool/shuangfeiyi'),
        meta:{needLogin:true}
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
