<template>
  <div id="app">
    Tally-App
    <hr>
    <router-view/>
    <hr>
  </div>
</template>

<script>
import Nav from "@/components/Nav"
export default {
  name: "App",
  components:{
    Nav
  }
};
</script>

<style lang="scss">
#app {
  text-align: center;
  color: #30794b;
}


</style>
