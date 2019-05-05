<template>
  <div class="text-center">
    <ul class="pagination">
      <li><a href="javascript:;" @click="requestFirstPage">首页</a></li>
      <li v-bind:class="{'disabled': currentPage == 1}"><a href="javascript:;" @click="prevPage">&laquo;<!--&laquo; ==> <<--></a></li>
      <li v-if="pages > defaultPages && currentPage > 1 + Math.floor(defaultPages / 2)"><a href="javascript:;">...</a></li>
      <li v-for="i in pages" v-if="(currentPage <= Math.floor(defaultPages / 2) && i <= currentPage + Math.floor(defaultPages / 2) + Math.floor(defaultPages / 2) - currentPage + 1) || ((currentPage >= pages - Math.floor(defaultPages / 2) && i >= currentPage - Math.floor(defaultPages / 2) - 2 + (pages - currentPage))) || (currentPage - Math.floor(defaultPages / 2) <= i && i <= currentPage + Math.floor(defaultPages / 2))" v-bind:class="{'active': i == currentPage}"><a href="javascript:;" @click="requertPage(i)">{{i}}</a></li>
      <li v-if="pages > defaultPages && currentPage < pages - Math.floor(defaultPages / 2)"><a href="javascript:;">...</a></li>
      <li v-bind:class="{'disabled': currentPage == pages}"><a href="javascript:;" @click="nextPage">&raquo;<!--&raquo; ==> >>--></a></li>
      <li><a href="javascript:;" @click="requestLastPage">尾页</a></li>
    </ul>
  </div>
</template>

<script>
    export default {
        name: "Pagination",
        data() {
          return {
            defaultPages: 5
          };
        },
      props: ['currentPage','getProducts','pageSize','priceRange', 'sortByPrice', 'pages'],
      methods: {
        requestFirstPage() {
          if(this.currentPage == 1){
            return;
          }
          this.$parent.currentPage = 1;
          this.getProducts(this.pageSize, 1, this.priceRange, this.sortByPrice);
        },
        requestLastPage() {
          if(this.currentPage == this.pages) {
            return;
          }
          this.$parent.currentPage = this.pages;
          this.getProducts(this.pageSize, this.pages, this.priceRange, this.sortByPrice);
        },
        requertPage(num) {
          if(this.currentPage == num) {
            return;
          }
          this.$parent.currentPage = num;
          this.getProducts(this.pageSize, num, this.priceRange, this.sortByPrice);
        },
        prevPage() {
          if(this.currentPage == 1){
            return;
          }
          this.$parent.currentPage--;
          this.getProducts(this.pageSize, this.currentPage, this.priceRange, this.sortByPrice);
        },
        nextPage() {
          if(this.currentPage == this.pages){
            return;
          }
          this.$parent.currentPage++;
          this.getProducts(this.pageSize, this.currentPage, this.priceRange, this.sortByPrice);
        }
      }
    }
</script>

<style scoped lang="less">
  @import './../../node_modules/bootstrap/less/variables.less';
  @import './../../node_modules/bootstrap/less/mixins.less';
  @import './../../node_modules/bootstrap/less/pagination.less';
</style>
