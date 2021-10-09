<template>
  <div class = "money">
<!--        {{ record }}-->
    <div class = "type">
      <Icon class = "back-icon" @click.native = "back" name = "left"/>
      <Tabbar class = "type-bar" :data-source = "recordTypeList" :value.sync = "record.type"/>
      <div class = "gap"></div>
    </div>
    <!--    {{ recordList }}-->
    <Tags type = "-" :TagList = "tagList" v-if = "record.type === '-'" :value.sync = "record.tags" :dynamic = "true"/>
    <Tags type = "-" :TagList = "incomeTags" v-else-if = "record.type === '+'" :value.sync = "record.tags"
          :dynamic = "false"/>
    <DatePicker @update:value = "onUpdateDate"/>
    <FormItem field-name = "备注" placeholder = "#请输入备注#" :value.sync = "record.notes"/>
    <NumberPad :value.sync = "record.amount" @submit = "saveRecord"/>

  </div>
</template>

<script lang = "ts">

import Vue from 'vue'
import NumberPad from "@/components/Money/NumberPad.vue"
import Tags from "@/components/Money/Tags.vue"
import DatePicker from "@/components/Money/DatePicker.vue"
import FormItem from "@/components/Money/FormItem.vue"
import {Component, Watch} from "vue-property-decorator"
import Tabbar from "@/components/Tabbar.vue"
import recordTypeList from "@/constants/recordTypeList"
import {defaultExpenseTags, defaultIncomeTags} from "@/constants/defaultTagList"
import dayjs from "dayjs"


const version = window.localStorage.getItem('version') || '0'

@Component({
  components: {Tabbar, FormItem, DatePicker, Tags, NumberPad},
})
export default class Money extends Vue {
  recordTypeList = recordTypeList
  incomeTags = defaultIncomeTags
  expenseTags = defaultExpenseTags

  get recordList() {
    return this.$store.state.recordList
  }

  get tagList(): Tag[] {
    return this.$store.state.tagList
  }

  record: RecordItem = {type: '-', tags: [], date: '', time: '', notes: '', amount: 0,}

  created() {
    this.$store.commit('fetchRecords')
  }

  onUpdateDate(value: string) {
    this.record.date = value
    // console.log(value)
  }

  saveRecord() {
    if (!this.record.tags || this.record.tags.length === 0) {
      return window.alert('请选择一个标签')
    }
    if (this.record.amount === 0) {
      return window.alert('金额不能为0')
    }
    if (this.record.date === '' || this.record.date === null) {
      this.record.date = dayjs(new Date()).format('YYYY-MM-DD')
    }
    if (this.record.time === '' || this.record.time === null) {
      this.record.time = dayjs(new Date(new Date().toJSON())).format('HH:mm:ss')
    }
    this.$store.commit('createRecord', this.record)
    window.alert('记账成功')
    this.record.notes = ''
    this.record.time = ''
    this.record.date = ''
    // this.$router.replace('/details')
  }

  back() {
    this.$router.replace('/details')
  }

  @Watch('record.type')
  onTypeChange(type: string) {

    if (type === '+') {
      this.record.tags[0] = '工资'
    } else if (type === '-') {
      this.record.tags[0] = '饮食'
    }
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
.type{
  padding: 0px 8px;
  display: flex;
  justify-content: center;
  align-items:center;
  background-color: rgb(157, 225, 225);
  .type-bar{
    flex-grow: 1;
  }
  .back-icon {
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