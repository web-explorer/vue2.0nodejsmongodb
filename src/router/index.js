import Vue from 'vue'
import Router from 'vue-router'
import Products from '@/views/Products'
import Cart from '@/views/Cart'
import Address from '@/views/Address'
import OrderConfirm from '@/views/OrderConfirm'
import OrderSuccess from '@/views/OrderSuccess'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Products',
      component: Products
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart
    }
    ,
    {
      path: '/address',
      name: 'Address',
      component: Address
    }
    ,
    {
      path: '/OrderConfirm',
      name: 'OrderConfirm',
      component: OrderConfirm
    }
    ,
    {
      path: '/OrderSuccess',
      name: 'OrderSuccess',
      component: OrderSuccess
    }
  ]
})
