<template>
  <label class = "form-item">
    <span class = "name">{{this.fieldName}}</span>
    <input type = "text"
           v-model="value"
           :placeholder = "this.placeholder" >
  </label>
</template>

<script lang = "ts">

import Vue from 'vue'
import {Component,Watch,Prop} from "vue-property-decorator";

@Component
export default class FormItem extends Vue{
  value = ''

  @Prop({required:true})fieldName!:string
  @Prop()placeholder?:string

  @Watch('value')
  onValueChanged(value:string,oldValue:string){
    this.$emit('update:value',value)
  }
}
</script>

<style lang = "scss" scoped>
@import "~@/assets/style/helper.scss";

.form-item {
  //@extend %innerShadow;
  font-size: 14px;
  padding-left: 8px;
  background-color: $bottomColor;
  //background-color: transparent;
  display: flex;
  align-items:center;

  input {
    font-size: 14px;
    text-align: right;
    line-height:37px;
    flex-grow: 1;
    background-color: transparent;
    height: 37px;
    border: none;
    margin-right:10px;
  }
}
</style>