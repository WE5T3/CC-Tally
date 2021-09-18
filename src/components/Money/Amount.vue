<template>
  <div class = "amount">
    <div class = "tag">标签</div>
    <div class = "number">数额</div>
  </div>
</template>

<script lang = "ts">
export default {
  name: "Amount"
}
</script>

<style lang = "scss" scoped>
@import "~@/assets/style/helper.scss";

.amount {
  @extend %innerShadow;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  padding: 8px;
  background-color: $bottomColor;
}
</style>