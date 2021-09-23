<template>
  <div>
    <Layout class-prefix = "layout">
      <Types/>
      <Tags :tag-list = 'expenseTags'/>
<!--      <Tags :tag-list = 'incomeTags'/>-->
      <Date/>
      <Notes/>
      <NumberPad/>
    </Layout>
  </div>
</template>

<script lang = "ts">

import NumberPad from "@/components/Money/NumberPad.vue"
import Types from "@/components/Money/Types.vue"
import Tags from "@/components/Money/Tags.vue"
import Date from "@/components/Money/Date.vue"
import Notes from "@/components/Money/Notes.vue"

import Vue from 'vue'
import {Component} from "vue-property-decorator";

@Component({components: {Notes, Date, Tags, Types, NumberPad}}
)
export default class Money extends Vue {


  expenseTags: string[] = ['服饰', '饮食', '住房', '交通', '通讯', '学习', '水电', '日用', '娱乐', '美容', '医疗']
  incomeTags: string[] = ['生活费', '工资', '奖金', '副业', '报销', '借款', '投资', '租金', '分红']


}
</script>

<style lang = "scss">

</style>

<style lang = "scss" scoped>

</style>