<template>
<div>
  404 Not Found
  <br>
  <span>当前页面不存在,请检查网址是否正确</span>
  <br>
  <br>
  <router-link to = "/">返回首页</router-link>
</div>
</template>

<script lang = "ts">
export default {
  name: ""
}
</script>

<style lang = "scss" scoped>
a {
  text-decoration: none;
  border: #839494 1px solid;
  padding: 5px;
  margin: 10px;
  font-weight: bold;
  color: #2c3e50;}
</style>