<template>
  <div class = "tabs">
    <div class = "type" v-for = "item in dataSource" :key = "item.value"
         :class = 'liClass(item)' @click = "select(item)">{{ item.text }}
    </div>
  </div>
</template>

<script lang = "ts">
import Vue from 'vue'
import {Component, Prop} from 'vue-property-decorator'

type DataSourceItem = { text: string, value: string }

@Component
export default class Tabbar extends Vue {

  @Prop(String)
  readonly value!: string
  @Prop(String)
  classPrefix?: string
  @Prop({required: true, type: Array})
  dataSource!: DataSourceItem[]

  select(item: DataSourceItem) {
    this.$emit('update:value', item.value)
  }

  liClass(item:DataSourceItem){
    return{
      selected:item.value===this.value,
      [this.classPrefix+'-item']:this.classPrefix
    }
  }
}
</script>

<style lang = "scss" scoped>

.tabs {
  height: 54px;
  display: flex;
  text-align: center;
  align-items: center;
  background-color: rgb(157, 225, 225);
  justify-content: space-between;

  .type {
    //border: 1px solid;
    padding: 8px 20px;
    color: black;
    flex-grow: 1;
    font-size: 18px;
    line-height: 34px;
    display: flex;
    justify-content: center;
    border-bottom: transparent solid 2px;

    &.selected {
      border-bottom: #4a4a4a solid 2px;
    }
  }
}
</style>