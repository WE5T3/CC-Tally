<template>
  <div id = "nav">
    <router-link to = "/labels">
      <Icon name = "detail"/>
      标签
    </router-link>
    <router-link to = "/money">
      <Icon name = "money"/>
      记账
    </router-link>
    <router-link to = "/statistics">
      <Icon name = "chart"/>
      统计
    </router-link>
  </div>
</template>

<script lang = "ts">
export default {
  name: "nav",
}
</script>

<style lang = "scss" scoped>
#nav {
  padding: 30px;
  display: flex;
  justify-content: center;

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