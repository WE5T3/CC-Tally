<template>
  <div class = "types">
    <div class = "expense" :class="type==='-' && 'selected'"
         @click="selectType('-')">支出</div>
    <div class = "income"  :class="type==='+' && 'selected'"
         @click="selectType('+')">收入</div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component, Prop} from "vue-property-decorator";

@Component
export default class Types extends Vue{
  type='-' //'-'表示支出, '+'表示收入

  selectType(type: string) { //type只能是'-'和'+'中的一个
    if(type!=='-'&&type !=='+'){
      throw new Error('type is unknown')
    }
    this.type = type
    // console.log(type)
  }

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
    background-color: #dbe8e7;
  }

  .selected {
    background-color: $tfn2;
  }

}
</style>