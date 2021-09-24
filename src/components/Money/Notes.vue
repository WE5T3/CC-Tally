<template>
  <label class = "notes">
    <span class = "name">备注</span>
    <input type = "text"
           v-model="value"
           placeholder = "#请添加备注#" >
  </label>
</template>

<script lang = "ts">

import Vue from 'vue'
import {Component,Watch} from "vue-property-decorator";

@Component
export default class Notes extends Vue{
  value = ''
  @Watch('value')
  onValueChanged(value:string,oldValue:string){
    this.$emit('update:value',value)
  }
}
</script>

<style lang = "scss" scoped>
@import "~@/assets/style/helper.scss";

.notes {
  @extend %innerShadow;
  font-size: 14px;
  padding-left: 8px;
  background-color: $bottomColor;
  display: flex;
  align-items: center;


  input {
    font-size: 14px;
    text-align: right;
    line-height:37px;
    flex-grow: 1;
    background-color: transparent;
    height: 37px;
    border: none;
    margin-right: 10px;
  }
}
</style>