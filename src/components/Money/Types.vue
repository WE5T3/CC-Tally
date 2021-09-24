<template>
  <div class = "types">
    <button class = "back" @click = "back">
      <Icon name = "左"/>
    </button>
    <div class = "type">
      <div class = "expense" :class = "value==='-' && 'selected'"
           @click = "selectType('-')">支出
      </div>
      <div class = "income" :class = "value==='+' && 'selected'"
           @click = "selectType('+')">收入
      </div>
    </div>

  </div>
</template>

<script lang = "ts">
import Vue from 'vue'
import {Component,Prop,Watch} from "vue-property-decorator";

@Component
export default class Types extends Vue {

  @Prop() readonly value!:string
  back() {
    this.$router.replace('/labels');
  }

  selectType(type: string) { //type只能是'-'和'+'中的一个
    if (type !== '-' && type !== '+') {
      throw new Error('type is unknown')
    }
    this.$emit('update:value',type)
  }

}

</script>

<style lang = "scss" scoped>
@import "~@/assets/style/helper.scss";


.types {
  display: flex;
  position: relative;
  background-color: $bottomColor;

  .back {
    background-color: transparent;
    border: none;
    height: 29px;
    position: absolute;
    left: 6px;
    bottom: 2px;

    svg {
      font-size: xx-large;
      color: #000;
    }
  }

  .type {
    display: flex;
    justify-content: center;
    flex-grow: 1;
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


}
</style>