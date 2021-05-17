import Vue from 'vue'
import Router from 'vue-router'
import Index from '../view/index.vue'
import Category from '../view/category.vue'
import Detail from '../view/detail.vue'
import shopCart from '../view/shopCart'
import Order from '../view/order'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path:'/category/:id?',
      name: 'category',
      component: Category
    },
    {
      path:'/detail/:id',
      name: 'Detail',
      component: Detail
    },
    {
      path:'/shopcart',
      name: 'shopCart',
      component: shopCart
    },
    {
      path:'/order',
      name: 'Order',
      component: Order
    }
  ]
})
