<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="css">
  @import "./../node_modules/font-awesome/css/font-awesome.css";
  @import "./../node_modules/@neos21/bootstrap3-glyphicons/dist/css/bootstrap3-glyphicons.css";
  .left {
    width: 20%;
    border: 1px solid gray;
    float: left;
  }
</style>
