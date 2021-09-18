<template>
  <div class = "date">
    日期
    <div class = "datePicker">2020-09-18</div>
  </div>
</template>

<script lang = "ts">
export default {
  name: "Date"
}
</script>

<style lang = "scss" scoped>
@import "~@/assets/style/helper.scss";

.date {
  font-size: 14px;
  padding: 8px;
  background-color: $bottomColor;
  display: flex;
  justify-content: space-between;
  @extend %innerShadow;
}
</style>