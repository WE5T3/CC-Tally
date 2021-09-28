<template>
  <div class = "money">
<!--    {{ recordList }}-->
    {{record}}
    <Types :value.sync = "record.type"/>
    <Tags  v-if="record.type === '-'"   :tag-list.sync = 'expenseTags'  @update:value = "onUpdateTags" :dynamic="true"/>
    <Tags  v-else-if="record.type === '+'" :tag-list.sync = 'incomeTags'  @update:value = "onUpdateTags" :dynamic="true"/>
<!--        <DatePicker @update:value = "onUpdateDate"/>-->
    <FormItem field-name="备注" placeholder="#请输入备注#" @update:value = "onUpdateNotes"/>

    <NumberPad :value.sync = "record.amount" @submit = "saveRecord"/>

  </div>
</template>

<script lang = "ts">

import Vue from 'vue'
import NumberPad from "@/components/Money/NumberPad.vue"
import Types from "@/components/Money/Types.vue"
import Tags from "@/components/Money/Tags.vue"
import DatePicker from "@/components/Money/DatePicker.vue"
import FormItem from "@/components/Money/FormItem.vue"
import {recordListModel} from "@/models/recordListModel"
import {Component, Watch} from "vue-property-decorator"
import {tagListModel} from "@/models/tagListModel";

const recordList = recordListModel.fetch()
const tagList= tagListModel.fetch()
const version = window.localStorage.getItem('version')||'0'


type RecordItem = {
  type: string
  tags: string[]
  date: string
  notes: string
  amount: number
  createdAt?: Date | string
}
@Component({components: {FormItem, DatePicker, Tags, Types, NumberPad}}
)
export default class Money extends Vue {
  recordList: RecordItem[] =  recordList
  record: RecordItem = {type: '-', tags: [], date: '', notes: '', amount: 0,}
  // expenseTags: string[] = ['服饰', '饮食', '住房', '交通', '通讯', '学习', '水电', '日用', '娱乐', '美容', '医疗']
  expenseTags= tagList
  // incomeTags: string[] = ['生活费', '工资', '奖金', '副业', '报销', '借款', '投资', '租金', '分红']
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
    const record2: RecordItem = recordListModel.clone(this.record)
    record2.createdAt = new Date().toLocaleDateString()
    this.recordList.push(record2)
    console.log(this.recordList)
  }


  @Watch('recordList')
  onRecordListChange() {
    recordListModel.save(this.recordList)
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