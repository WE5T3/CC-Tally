<template>
  <div id="nav">
    <router-link to = "/money">记账</router-link>
    <router-link to = "/labels">标签</router-link>
    <router-link to = "/statistics">统计</router-link>
  </div>
</template>

<script lang = "ts">
export default {
  name: "nav"
}
</script>

<style lang = "scss" scoped>
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