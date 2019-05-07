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
                <dd><a href="javascript:void(0)" @click="setPriceFilter(-1)" v-bind:class="{'cur': priceChecked == -1}">All</a></dd>

                <dd v-for="(price, index) in priceFilter">
                  <a href="javascript:void(0)" @click="setPriceFilter(index)" v-bind:class="{'cur': priceChecked == index}">{{price.startPrice}} - {{price.endPrice}}</a>
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
                      <a href="#"><img v-lazy="`static/${item.productImage}`" alt=""></a>
                    </div>
                    <div class="main">
                      <div class="name">{{item.productName}}</div>
                      <div class="price">{{item.salePrice}}</div>
                      <div class="btn-area">
                        <a href="javascript:;" class="btn btn--m" @click="addCart(item.productId)">加入购物车</a>
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

                <p v-show="count" class="text-right">总计：<b>{{count}}</b>个商品</p>
                <pagination v-show="pages" v-bind:currentPage="currentPage" v-bind:getProducts="getProducts" v-bind:pageSize="pageSize" v-bind:priceRange="priceChecked" v-bind:sortByPrice="sortByPrice" v-bind:pages="pages"></pagination>

              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="md-overlay" v-show="overLayFlag" @click="closePop"></div>
      <modal v-bind:mdShow="addCartFail" v-bind:mark="'addCartFail'" @close="close(mark)">
        <p slot="message">请先登录，否则无法添加到购物车中！</p>
        <div slot="btnGroup">
          <a href="javascript:;" class="btn btn--m" @click="close('addCartFail')">关闭</a>
        </div>
      </modal>
      <modal v-bind:mdShow="addCartSucc" v-bind:mark="'addCartSucc'" @close="close(mark)">
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
    export default {
        name: "Products",
        data() {
          return {
            currProductNum: 0,
            addCartFail: false,
            addCartSucc: false,
            currentPage: 1,
            sortByPrice: 0,
            pageSize: 2,
            count: 0,
            sortByPrice: 0,
            pages: 0,
            products: [],
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
            priceChecked: -1,
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
          this.getProducts(this.pageSize, this.currentPage, this.priceChecked, this.sortByPrice);
        },
        methods: {
          getProducts(pageSize, pageNum, priceRange, sortByPrice) {
            axios.get(`/products/select?pageSize=${pageSize}&pageNum=${pageNum}&priceRange=${priceRange}&sortByPrice=${sortByPrice}`).then((obj) => {
              let data = obj.data;
              if(data.code == 0){
                this.count = data.result.count;
                this.pages = data.result.pages;
                this.products = data.result.products;
              }else{
                alert(data.msg);
              }
            });
          },
          showFilterPop() {
            this.filterBy = true;
            this.overLayFlag = true;
          },
          setPriceFilter(index) {
            if(this.priceChecked == index){

            }else{
              this.priceChecked = index;
              this.currentPage = 1;
              this.getProducts(this.pageSize, this.currentPage, this.priceChecked, this.sortByPrice);
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
            this.currentPage = 1;
            this.getProducts(this.pageSize, this.currentPage, this.priceChecked, this.sortByPrice);
          },
          addCart(str){
            let that = this;
            axios.post('products/addCart', {userName: this.$refs.navHeader.nickname, productId: str}).then(function(response){
              let res = response.data;
              if(res.code == 0){
                that.currProductNum = res.result;
                that.addCartSucc = true;
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
          }
        }
    }
</script>

<style>
  @import './../assets/css/base.css';
  @import './../assets/css/product.css';
</style>
<style scoped>

</style>
