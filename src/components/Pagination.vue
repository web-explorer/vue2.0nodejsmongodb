<template>
  <!--Pagination组件对外表现为一个行内块元素-->
  <ul class="pagination">
    <li v-bind:class="{'disabled': pages == 0}"><a href="javascript:;" @click="requestFirstPage">首页</a></li>
    <li v-bind:class="{'disabled': pages == 0 || page == 1}"><a href="javascript:;" @click="prevPage">&laquo;<!--&laquo; ==> <<--></a></li>
    <li v-if="pages > defaultPages && page > 1 + Math.floor(defaultPages / 2)"><a href="javascript:;">...</a></li>
    <li v-for="i in pages" v-if="(page <= Math.floor(defaultPages / 2) && i <= page + Math.floor(defaultPages / 2) + Math.floor(defaultPages / 2) - page + 1) || ((page >= pages - Math.floor(defaultPages / 2) && i >= page - Math.floor(defaultPages / 2) - 2 + (pages - page))) || (page - Math.floor(defaultPages / 2) <= i && i <= page + Math.floor(defaultPages / 2))" v-bind:class="{'active': i == page}"><a href="javascript:;" @click="requertPage(i)">{{i}}</a></li>
    <li v-if="pages > defaultPages && page < pages - Math.floor(defaultPages / 2)"><a href="javascript:;">...</a></li>
    <li v-bind:class="{'disabled': pages == 0 || page == pages}"><a href="javascript:;" @click="nextPage">&raquo;<!--&raquo; ==> >>--></a></li>
    <li v-bind:class="{'disabled': pages == 0}"><a href="javascript:;" @click="requestLastPage">尾页</a></li>
  </ul>
</template>

<script>
    export default {
        name: "Pagination",
        data() {
          return {

          };
        },
      // props: ['page','getProducts','pageSize','priceRange', 'sortByPrice', 'pages', 'defaultPages'],
      props: {
          defaultPages: {
            type: Number,
            default: 5
          },
          pages: {
            type: Number,
            default: 0
          },
          page: {
            type: Number,
            default: 1
          }
      },
      methods: {
        requestFirstPage() {
          if(this.page == 1){
            return;
          }
          this.$emit('turnTo', 1);
         /* this.$parent.page = 1;
          this.getProducts(this.pageSize, 1, this.priceRange, this.sortByPrice);*/
        },
        requestLastPage() {
          if(this.page == this.pages) {
            return;
          }
          this.$emit('turnTo', this.pages);
          /*this.$parent.page = this.pages;
          this.getProducts(this.pageSize, this.pages, this.priceRange, this.sortByPrice);*/
        },
        requertPage(num) {
          if(this.page == num) {
            return;
          }
          this.$emit('turnTo', num);
          /*this.$parent.page = num;
          this.getProducts(this.pageSize, num, this.priceRange, this.sortByPrice);*/
        },
        prevPage() {
          if(this.page == 1){
            return;
          }
          this.$emit('turnTo', this.page - 1);
          /*this.$parent.page--;
          this.getProducts(this.pageSize, this.page, this.priceRange, this.sortByPrice);*/
        },
        nextPage() {
          if(this.page == this.pages){
            return;
          }
          this.$emit('turnTo', this.page + 1);
         /* this.$parent.page++;
          this.getProducts(this.pageSize, this.page, this.priceRange, this.sortByPrice);*/
        }
      }
    }
</script>

<style scoped lang="less">
  @import './../../node_modules/bootstrap/less/variables.less';
  @import './../../node_modules/bootstrap/less/mixins.less';
  @import './../../node_modules/bootstrap/less/pagination.less';
</style>
