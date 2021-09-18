<template>
  <label class = "notes">
    <span class = "name">备注</span>
    <input class = "value" type = "text" placeholder = "#请添加备注#">
  </label>
</template>

<script lang = "ts">
export default {
  name: "Notes"
}
</script>

<style lang = "scss" scoped>
@import "~@/assets/style/helper.scss";

.notes {
  font-size: 14px;
  padding-left: 8px;
  background-color: $bottomColor;
  display: flex;
  align-items: center;

  input {
    font-size: 14px;
    text-align: right;
    line-height: 40px;
    width: 80%;
    flex-grow: 1;
    background-color: transparent;
    height: 40px;
    border: none;
    margin-right: 10px;
  }
}
</style>