<template>
  <div class = "money">
    {{ record }}
    <div class="type">
      <Icon class = "back-icon" @click.native = "back" name = "left"/>
      <Tabbar class="type-bar" :data-source = "recordTypeList" :value.sync = "record.type"/>
      <div class = "gap"></div>
    </div>
<!--    {{ recordList }}-->
    <Tags v-if = "record.type === '-'" @update:value = "onUpdateTags" :dynamic = "true"/>
    <Tags v-else-if = "record.type === '+'" @update:value = "onUpdateTags"
          :dynamic = "true"/>
    <DatePicker @update:value = "onUpdateDate"/>
    <FormItem field-name = "备注" placeholder = "#请输入备注#" v-model = "record.notes" @update:value = "onUpdateNotes"/>
    <NumberPad :value.sync = "record.amount" @submit = "saveRecord"/>

  </div>
</template>

<script lang = "ts">

import Vue from 'vue'
import NumberPad from "@/components/Money/NumberPad.vue"
import Tags from "@/components/Money/Tags.vue"
import DatePicker from "@/components/Money/DatePicker.vue"
import FormItem from "@/components/Money/FormItem.vue"
import {Component} from "vue-property-decorator"
import Tabbar from "@/components/Tabbar.vue";
import recordTypeList from "@/constants/recordTypeList";


const version = window.localStorage.getItem('version') || '0'

@Component({
  components: {Tabbar, FormItem, DatePicker, Tags, NumberPad},
})
export default class Money extends Vue {
  recordTypeList= recordTypeList
  get recordList() {
    return this.$store.state.recordList
  }

  record: RecordItem = {type: '-', tags: [], date: '', notes: '', amount: 0,}
  // expenseTags: string[] = ['服饰', '饮食', '住房', '交通', '通讯', '学习', '水电', '日用', '娱乐', '美容', '医疗']
  // incomeTags: string[] = ['生活费', '工资', '奖金', '副业', '报销', '借款', '投资', '租金', '分红']

  created() {
    this.$store.commit('fetchRecords')
  }

  onUpdateTags(value: Tag[]) {
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
    if (this.record.date === '' || this.record.date === null) {
      let dateStr = new Date(+new Date(new Date().toJSON()) + 8 * 3600 * 1000)
      // 使用split方法
      // this.record.date = dateStr.toISOString().split('T')[0]+" "+dateStr.toISOString().split('T')[1].split('.')[0]

      //使用正则
      this.record.date = dateStr.toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
      // console.log(this.record.date)
    }

    this.$store.commit('createRecord', this.record)
    window.alert('记账成功')
    this.record.notes = ''
  }
  back(){
    this.$router.replace('/details')
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