<template>
  <div class = "types">
    <div class = "expense">支出</div>
    <div class = "income">收入</div>
  </div>
</template>

<script lang = "ts">
export default {
  name: "Types"
}
</script>

<style lang = "scss" scoped>
@import "~@/assets/style/helper.scss";

.types {
  display: flex;
  justify-content: center;
  background-color: $bottomColor;

  div {
    font-size: 14px;
    font-weight: bold;
    text-align: center;
    width: 100px;
    border-radius: 7px;
    margin: 0 1px;
    padding: 4px;
  }

  .expense {
    background-color: $tfn2;
  }

  .income {
    background-color: #cfd9d8;
  }

}
</style>