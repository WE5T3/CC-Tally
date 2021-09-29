<template>
  <div id="app">
      <router-view/>
  </div>
</template>

<script>
import store from '@/store/index2'

export default {
  name: "App",
  data(){
    return{
      store:store
    }
  }
}
</script>

<style lang="scss">
@import "~@/assets/style/reset.scss";
@import "~@/assets/style/helper.scss";

body{
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #515151;
  font-family: $font-hei;
  line-height: 1.5;
}

</style>
