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

#nav {
  padding: 30px;

  a {
    text-decoration: none;
    border: #839494 1px solid;
    padding: 5px;
    margin: 10px;
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
