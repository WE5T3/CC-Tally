<template>
  <div id="app">
    Tally-App
    <hr>
    <router-view/>
    <hr>
    <div id="nav">
      <router-link to = "/money">记账</router-link>
      <router-link to = "/labels">标签</router-link>
      <router-link to = "/statistics">统计</router-link>

    </div>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
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
