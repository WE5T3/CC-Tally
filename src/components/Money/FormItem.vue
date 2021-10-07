<template>
  <label class = "form-item">
    <input type = "text"
           :value = "value"
           @input = "onValueChanged($event.target.value)"
           :placeholder = "placeholder">
    <span class = "name">{{ this.fieldName }}</span>
  </label>
</template>

<script lang = "ts">

import Vue from 'vue'
import {Component, Prop} from "vue-property-decorator";

@Component
export default class FormItem extends Vue {

  @Prop({default: ''}) readonly value!: string
  @Prop({required: true}) fieldName!: string
  @Prop() placeholder?: string

  onValueChanged(value: string) {
    this.$emit('update:value', value)
  }
}
</script>

<style lang = "scss" scoped>
@import "~@/assets/style/helper.scss";

.form-item {
  font-size: 14px;
  padding: 0 8px;
  background-color: $bottomColor;
  display: flex;
  align-items: center;

  input {
    font-size: 14px;
    line-height: 37px;
    flex-grow: 1;
    background-color: transparent;
    height: 37px;
    border: none;
    margin-left: 10px;
  }
}
</style>