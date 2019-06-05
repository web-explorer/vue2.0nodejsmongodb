<template>
  <div>
    <nav-header ref="navHeader"></nav-header>
    <nav-bread>
      <span>OrderSuccess</span>
    </nav-bread>
    <div class="container">
      <div class="page-title-normal">
        <h2 class="page-title-h2"><span>check out</span></h2>
      </div>
      <!-- 进度条 -->
      <div class="check-step">
        <ul>
          <li class="cur"><span>Confirm</span> address</li>
          <li class="cur"><span>View your</span> order</li>
          <li class="cur"><span>Make</span> payment</li>
          <li class="cur"><span>Order</span> confirmation</li>
        </ul>
      </div>

      <div class="order-create">
        <div class="order-create-pic"><img src="static/ok-2.png" alt=""></div>
        <div class="order-create-main">
          <h3>Congratulations! <br>Your order is under processing!</h3>
          <p>
            <span>Order ID：{{orderId}}</span>
            <span>Order total：{{orderTotal}}</span>
          </p>
          <div class="order-create-btn-wrap">
            <div class="btn-l-wrap">
              <a href="javascript:;" class="btn btn--m">Cart List</a>
            </div>
            <div class="btn-r-wrap">
              <a href="javascript:;" class="btn btn--m">Goods List</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
  import NavHeader from '@/components/NavHeader'
  import NavFooter from '@/components/NavFooter'
  import NavBread from '@/components/NavBread'
  import axios from 'axios'
    export default {
      data() {
        return {
          orderId: '',
          orderTotal: 0
        };
      },
        name: "OrderSuccess",
      mounted() {
        this.orderId = this.$route.query.orderId;
        axios.get(`/users/orderDetail?orderId=${this.orderId}`).then((response) => {
          let res = response.data;
          if(res.code == 0){
            this.orderTotal = res.result;
          }
        });
      },
      components: {
        NavHeader,
        NavFooter,
        NavBread
      },
    }
</script>

<style scoped lang="css">
  @import "./../assets/css/checkout.css";
</style>
