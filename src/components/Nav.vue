<template>
  <nav id = "nav">
    <router-link to = "/details" class="item">
      <Icon name = "detail"/>
      明细
    </router-link>
    <router-link to = "/money" class="item">
      <Icon name = "money"/>
      记账
    </router-link>
    <router-link to = "/statistics" class="item">
      <Icon name = "chart"/>
      图表
    </router-link>
  </nav>
</template>

<script lang = "ts">
export default {
  name: "nav",
}
</script>

<style lang = "scss" scoped>
@import "~@/assets/style/helper.scss";
nav {

  display: flex;
  flex-direction: row;
  background-color: $bottomColor;
  justify-content: space-between;
  //box-shadow: 0 0 3px rgba(20, 20, 20, 0.25);
  >.item{
    padding: 8px 0 4px;
    width: 33.33333%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    svg{
      width: 32px;
      height: 32px;
    }
    p{
      margin: 4px 0;
    }
    text-decoration: none;
    font-weight: bold;
    color: $tfn2;

    &.router-link-exact-active {
      color: $tfn1;
    }
  }
}
</style>