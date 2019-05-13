import Vue from 'vue'
import Router from 'vue-router'
import Products from '@/views/Products'
import Cart from '@/views/Cart'
import Address from '@/views/Address'
import orderConfirm from '@/views/orderConfirm'

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
      path: '/orderConfirm',
      name: 'orderConfirm',
      component: orderConfirm
    }
  ]
})
