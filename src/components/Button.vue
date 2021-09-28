<template>
  <button class = "button">
    <slot/>
  </button>
</template>

<script lang = "ts">
import Vue from 'vue'
import {Component} from 'vue-property-decorator'

export default class Button extends Vue {

}
</script>

<style lang = "scss" scoped>
.button {
  background-color: rgb(157, 225, 225);
  color: black;
  font-size: 14px;
  border-radius: 4px;
  border: none;
  height: 40px;
  padding: 0 16px;
}
</style>

