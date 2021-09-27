<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>


export default {
  name: "App",
  components: {}
};
</script>

<style lang="scss">
@import "~@/assets/style/reset.scss";
@import "~@/assets/style/helper.scss";

body{
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #515151;
  background-color: rgb(245,245,245);
  font-family: $font-hei;
  line-height: 1.5;
}


</style>
