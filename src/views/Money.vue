<template>
  <div class = "money">
    {{record}}
    <Types :value.sync="record.type" />
    <Tags :tag-list.sync = 'expenseTags' @update:value = "onUpdateTags"/>
    <!--      <Tags :tag-list = 'incomeTags'/>-->
    <Date @update:value = "onUpdateDate"/>
    <Notes @update:value = "onUpdateNotes"/>
    <NumberPad :value.sync="record.amount" />

  </div>
</template>

<script lang = "ts">

import Vue from 'vue'
import NumberPad from "@/components/Money/NumberPad.vue"
import Types from "@/components/Money/Types.vue"
import Tags from "@/components/Money/Tags.vue"
import Date from "@/components/Money/Date.vue"
import Notes from "@/components/Money/Notes.vue"

import {Component} from "vue-property-decorator";

type Record = {
  tags: string[]
  notes: string
  type: string
  amount: number
  date: string
}
@Component({components: {Notes, Date, Tags, Types, NumberPad}}
)
export default class Money extends Vue {
  record: Record = {tags: [], notes: '', type: '-', amount: 0, date: ''}
  expenseTags: string[] = ['服饰', '饮食', '住房', '交通', '通讯', '学习', '水电', '日用', '娱乐', '美容', '医疗']
  incomeTags: string[] = ['生活费', '工资', '奖金', '副业', '报销', '借款', '投资', '租金', '分红']

  onUpdateTags(value: string[]) {
    this.record.tags=value
    console.log(value)
  }

  onUpdateNotes(value: string) {
    this.record.notes=value
    console.log(value)
  }


  onUpdateDate(value: string) {
    this.record.date=value
    console.log(value)
  }
}
</script>

<style lang = "scss">

</style>

<style lang = "scss" scoped>

.money {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

</style>