<template>
  <div>
    <div class = "nfd">
      <span> 404 Not Found</span>
      <br>
      <span>当前页面不存在,请检查网址是否正确</span>
      <br>
      <br>
      <router-link to = "/">返回首页</router-link>
    </div>

  </div>
</template>

<script lang = "ts">
export default {
  name: "NotFound"
}
</script>

<style lang = "scss" scoped>

.nfd{
  margin-top: 40%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
a {
  text-decoration: none;
  border: #839494 1px solid;
  padding: 5px;
  margin: 10px;
  font-weight: bold;
  color: #555a5e;
}
</style>