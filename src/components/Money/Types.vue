<template>
  <div class = "header">
    <Icon class = "backIcon" @click.native = "back" name = "left"/>
    <div class = "title">
      <div class="type"
          :class = "{
              selected:value==='-',
              [classPrefix+'-type']:classPrefix
           }"
           @click = "selectType('-')">支出
      </div>
      <div class="type"
          :class = "{
              selected:value==='+',
              [classPrefix+'-type']:classPrefix
           }"
           @click = "selectType('+')">收入
      </div>
    </div>
    <div class = "gap"></div>
  </div>
</template>

<script lang = "ts">
import Vue from 'vue'
import {Component, Prop} from "vue-property-decorator";

@Component
export default class Types extends Vue {

  @Prop(String) readonly value!: string
  @Prop(String) classPrefix?: string
  back() {
    this.$router.replace('/details');
  }

  selectType(type: string) { //type只能是'-'和'+'中的一个
    if (type !== '-' && type !== '+') {
      throw new Error('type is unknown')
    }
    this.$emit('update:value', type)
  }

}

</script>

<style lang = "scss" scoped>
@import "~@/assets/style/helper.scss";


.header {
  height: 54px;
  display: flex;
  text-align: center;
  padding: 12px 8px;
  align-items: center;
  background-color: rgb(157, 225, 225);
  justify-content: space-between;

  .title {
    color: black;
    flex-grow: 1;
    font-size: 18px;
    line-height: 34px;
    display: flex;
    justify-content: space-evenly;

    .type {
      flex-grow: 0.5;
      padding: 8px 20px;
      display: flex;
      justify-content: center;
      border-bottom: transparent solid 2px;
    }
    .selected {
      border-bottom: #4a4a4a solid 2px;
    }

  }

  .backIcon {
    color: black;
    font-weight: bold;
    font-size: 14px;
    border-radius: 4px;
    border: none;
    height: 30px;
    width: 24px;
  }

  .gap {
    width: 24px;
    height: 24px;
  }
}

</style>