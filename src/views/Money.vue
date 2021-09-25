<template>
  <div class = "money">
    {{ recordList }}
    <Types :value.sync = "record.type"/>
    <Tags :tag-list.sync = 'expenseTags' @update:value = "onUpdateTags"/>
    <!--      <Tags :tag-list = 'incomeTags'/>-->
    <DatePicker @update:value = "onUpdateDate"/>
    <Notes @update:value = "onUpdateNotes"/>
    <NumberPad :value.sync = "record.amount" @submit = "saveRecord"/>

  </div>
</template>

<script lang = "ts">

import Vue from 'vue'
import NumberPad from "@/components/Money/NumberPad.vue"
import Types from "@/components/Money/Types.vue"
import Tags from "@/components/Money/Tags.vue"
import DatePicker from "@/components/Money/DatePicker.vue"
import Notes from "@/components/Money/Notes.vue"

import {Component, Watch} from "vue-property-decorator";

const version = window.localStorage.getItem('version')||'0'
const recordList: Record[] = JSON.parse(window.localStorage.getItem('recordList') || '[]')
// if (version < '0.0.2') {
//   // 数据库升级 数据迁移
//   if (version === '0.0.1') {
//     recordList.forEach(record => {
//       record.createdAt = new Date(2020, 0, 1)
//     })
//   }
//   //保存数据
//   window.localStorage.setItem('recordList', JSON.stringify(this.recordList))
// }
// window.localStorage.setItem('version', '0.0.2')

type Record = {
  type: string
  tags: string[]
  date: string
  notes: string
  amount: number
  createdAt?: Date | string
}
@Component({components: {Notes, DatePicker, Tags, Types, NumberPad}}
)
export default class Money extends Vue {
  recordList: Record[] =  recordList
  record: Record = {type: '-', tags: [], date: '', notes: '', amount: 0,}
  expenseTags: string[] = ['服饰', '饮食', '住房', '交通', '通讯', '学习', '水电', '日用', '娱乐', '美容', '医疗']
  incomeTags: string[] = ['生活费', '工资', '奖金', '副业', '报销', '借款', '投资', '租金', '分红']

  onUpdateTags(value: string[]) {
    this.record.tags = value
    // console.log(value)
  }

  onUpdateNotes(value: string) {
    this.record.notes = value
    // console.log(value)
  }


  onUpdateDate(value: string) {
    this.record.date = value
    // console.log(value)
  }

  saveRecord() {
    const record2: Record = JSON.parse(JSON.stringify(this.record))
    record2.createdAt = new Date().toLocaleDateString()
    this.recordList.push(record2)
    console.log(this.recordList)
  }


  @Watch('recordList')
  onRecordListChange() {
    localStorage.setItem('recordList', JSON.stringify(this.recordList))
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