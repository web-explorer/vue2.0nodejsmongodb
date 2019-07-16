<template>
    <div>
      <nav-header ref="navHeader"></nav-header>
      <nav-bread>
        <span>Products</span>
      </nav-bread>
      <div class="accessory-result-page accessory-page">
        <div class="container">
          <div class="filter-nav">
            <span class="sortby">Sort by:</span>
            <a href="javascript:void(0)" class="default" @click="sortProducts(0)" v-bind:class="{'cur': sortByPrice == 0}">Default</a>
            <a href="javascript:void(0)" class="price" @click="sortProducts()" v-bind:class="{'cur': sortByPrice != 0}">Price <span v-bind:class="{'hidden': sortByPrice == 0, 'fa': sortByPrice != 0, 'fa-arrow-up': sortByPrice == 1, 'fa-arrow-down': sortByPrice == -1}"></span></a>
            <a href="javascript:void(0)" class="filterby stopPop" @click.stop="showFilterPop">Filter by</a>
          </div>
          <div class="accessory-result">
            <!-- filter -->
            <div class="filter stopPop" id="filter" v-bind:class="{'filterby-show': filterBy}">
              <dl class="filter-price">
                <dt>Price:</dt>
                <dd><a href="javascript:void(0)" @click="setPriceFilter(-1)" v-bind:class="{'cur': priceRangeFlag == -1}">All</a></dd>

                <dd v-for="(price, index) in priceFilter">
                  <a href="javascript:void(0)" @click="setPriceFilter(index)" v-bind:class="{'cur': priceRangeFlag == index}">{{price.startPrice}} - {{price.endPrice}}</a>
                </dd>

                <!--<dd>
                  <a href="javascript:void(0)">0 - 100</a>
                </dd>
                <dd>
                  <a href="javascript:void(0)">100 - 500</a>
                </dd>
                <dd>
                  <a href="javascript:void(0)">500 - 1000</a>
                </dd>
                <dd>
                  <a href="javascript:void(0)">1000 - 2000</a>
                </dd>-->
              </dl>
            </div>

            <!-- search result accessories list -->
            <div class="accessory-list-wrap">
              <div class="accessory-list col-4">
                <ul>

                  <li v-for="item in products">
                    <div class="pic">
<!--                      <a href="#"><img v-lazy="'static/' + item.productImage" alt=""></a>-->
                      <a href="#"><img :src="'static/' + item.productImage" alt=""></a>
                    </div>
                    <div class="main">
                      <div class="name">{{item.productName}}</div>
                      <div class="price">{{item.salePrice}}</div>
                      <div class="btn-area">
                        <a href="javascript:;" class="btn btn--m" @click="addCart(item.productId, $event)">加入购物车</a>
                      </div>
                    </div>
                  </li>

                  <!--<li>
                    <div class="pic">
                      <a href="#"><img src="static/1.jpg" alt=""></a>
                    </div>
                    <div class="main">
                      <div class="name">XX</div>
                      <div class="price">999</div>
                      <div class="btn-area">
                        <a href="javascript:;" class="btn btn&#45;&#45;m">加入购物车</a>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="pic">
                      <a href="#"><img src="static/2.jpg" alt=""></a>
                    </div>
                    <div class="main">
                      <div class="name">XX</div>
                      <div class="price">1000</div>
                      <div class="btn-area">
                        <a href="javascript:;" class="btn btn&#45;&#45;m">加入购物车</a>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="pic">
                      <a href="#"><img src="static/3.jpg" alt=""></a>
                    </div>
                    <div class="main">
                      <div class="name">XX</div>
                      <div class="price">500</div>
                      <div class="btn-area">
                        <a href="javascript:;" class="btn btn&#45;&#45;m">加入购物车</a>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="pic">
                      <a href="#"><img src="static/4.jpg" alt=""></a>
                    </div>
                    <div class="main">
                      <div class="name">XX</div>
                      <div class="price">2499</div>
                      <div class="btn-area">
                        <a href="javascript:;" class="btn btn&#45;&#45;m">加入购物车</a>
                      </div>
                    </div>
                  </li>-->
                </ul>
                <p class="text-right">总计：<b>{{total}}</b>个商品</p>
                <div class="text-center">
                  <pagination v-bind:defaultPages="defaultPages" v-bind:pages="pages" v-bind:page="page" @turnTo="turnTo"></pagination>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="md-overlay" v-show="overLayFlag" @click="closePop"></div>
      <modal v-bind:mdShow="addCartFail" v-bind:mark="'addCartFail'" @close="close">
        <p slot="message">请先登录，否则无法添加到购物车中！</p>
        <div slot="btnGroup">
          <a href="javascript:;" class="btn btn--m" @click="close('addCartFail')">关闭</a>
        </div>
      </modal>
      <modal v-bind:mdShow="addCartSucc" v-bind:mark="'addCartSucc'" @close="close">
        <p slot="message">加入购物车成功！购物车中该商品的数量为：{{currProductNum}}</p>
        <div slot="btnGroup">
          <a href="javascript:;" class="btn btn--m" @click="close('addCartSucc')">继续购物</a>
          <router-link class="btn btn--m" to="/cart">查看购物车</router-link>
        </div>
      </modal>
      <nav-footer></nav-footer>
    </div>
</template>

<script>
    import Modal from '@/components/Modal'
    import NavHeader from '@/components/NavHeader'
    import NavFooter from '@/components/NavFooter'
    import NavBread from '@/components/NavBread'
    import Pagination from '@/components/Pagination'
    import axios from 'axios'
    // import $ from 'jquery'
    import './../util/jquery-ui'
    /*import 'jquery-ui/ui/core'
    import 'jquery-ui/ui/effect'
    import 'jquery-ui/ui/effects/effect-shake'*/

    import {getProducts} from "../api/products";

    export default {
        name: "Products",
        data() {
          return {
            currProductNum: 0,
            addCartFail: false,
            addCartSucc: false,
            page: 1,
            defaultPages: 5,
            sortByPrice: 0,
            pageSize: 2,//每页展示商品数
            total: 0,//商品总数
            sortByPrice: 0,
            pages: 0,//总页数
            products: [],//当前页商品集合
            priceFilter: [
              {
                startPrice: '0.00',
                endPrice: '500.00'
              },
              {
                startPrice: '500.00',
                endPrice: '1000.00'
              },
              {
                startPrice: '1000.00',
                endPrice: '2000.00'
              },
              {
                startPrice: '2000.00',
                endPrice: '4000.00'
              }
            ],
            priceRangeFlag: -1,
            filterBy: false,
            overLayFlag: false
          };
        },
        components: {
          NavHeader,
          NavFooter,
          NavBread,
          Pagination,
          Modal
        },
        mounted() {
          this._getProducts(this.pageSize, this.page, this.priceRangeFlag, this.sortByPrice);
        },
        methods: {
          _getProducts() {
            getProducts(this.pageSize, this.page, this.priceRangeFlag, this.sortByPrice).then((response) => {
              let res = response.data;
              if(res.code == 0){
                this.total = res.result.count;
                this.pages = res.result.pages;
                this.products = res.result.products;
              }else{
                alert(res.msg);
              }
            });
          },
          showFilterPop() {
            this.filterBy = true;
            this.overLayFlag = true;
          },
          setPriceFilter(index) {
            if(this.priceRangeFlag == index){

            }else{
              this.priceRangeFlag = index;
              this.page = 1;
              this._getProducts();
            }
            this.closePop();
          },
          closePop() {
            this.filterBy = false;
            this.overLayFlag = false;
          },
          sortProducts(num){
            if(num == 0){
              this.sortByPrice = num;
            }else{
              if(this.sortByPrice == 0){
                this.sortByPrice = 1;
              }else{
                this.sortByPrice = this.sortByPrice * -1;
              }
            }
            this.page = 1;
            this._getProducts();
          },
          addCart(str, e){

            let cart = $('.header .navbar-cart-container svg');
            let imgtodrag = $(e.currentTarget).parent().parent().prev().find('img:first');

            let that = this;
            axios.post('products/addCart', {userName: this.$refs.navHeader.nickname, productId: str}).then(function(response){
              let res = response.data;
              if(res.code == 0){

                if (imgtodrag.length) {
                  let imgclone = imgtodrag.clone().offset({
                    top: imgtodrag.offset().top,
                    left: imgtodrag.offset().left
                  }).css({
                    'opacity': '0.5',
                    'position': 'absolute',
                    'height': '150px',
                    'width': '150px',
                    'z-index': '100'
                  }).appendTo($('body')).animate({
                    'top': cart.offset().top + 10,
                    'left': cart.offset().left + 10,
                    'width': 75,
                    'height': 75
                  }, 1000);
                  setTimeout(function () {
                    console.log(cart[0]);
                    cart.effect('shake', { times: 2 }, 200);
                  }, 1500);
                  imgclone.animate({
                    'width': 0,
                    'height': 0
                  }, function () {
                    $(this).detach();
                  });
                }

                that.currProductNum = res.result;
                that.addCartSucc = true;
                that.$store.commit('updateCartCount', 1);
              }else{
                that.addCartFail = true;
              }
            });
          },
          close(mark) {
            switch (mark) {
              case 'addCartFail':
                this.addCartFail = false;
                break;
              case 'addCartSucc':
                this.addCartSucc = false;
                this.currProductNum = 0;
                break;
            }
          },
          turnTo(page) {
            this.page = page;
            this._getProducts();
          }
        }
    }
</script>

<style scoped lang="css">
  @import './../assets/css/product.css';
</style>
