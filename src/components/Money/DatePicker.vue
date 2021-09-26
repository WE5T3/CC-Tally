<template>
  <div class = "date">
    <span @click = "span">日期</span>
    <a-date-picker class = "datePicker"
                   placeholder="请选择日期"
                   :defaultValue="currentTime"
                   valueFormat="YYYY-MM-DD"
                   :inputReadOnly = 'true'
                   @change = "onChange"
    />

  </div>

</template>
<script lang = "ts">
import Vue from 'vue';
import {DatePicker} from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import {Component} from 'vue-property-decorator';
import moment from 'moment';
import 'moment/locale/zh-cn';

Vue.use(DatePicker);
@Component
export default class DateSelector extends Vue {

  onChange(date: any, dateString: any) {
    this.$emit('update:value', dateString)
    console.log(dateString)
  }

  span() {
    console.log(moment(new Date().toLocaleString()))
    console.log(moment(new Date().toLocaleString(), 'YYYY-MM-DD'))

  }

  currentTime=moment(new Date()).format('YYYY-MM-DD')
}
</script>

<style lang = "scss" scoped>
@import "~@/assets/style/helper.scss";


.date {
  height: 37px;
  font-size: 14px;
  padding: 8px;
  background-color: $bottomColor;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @extend %innerShadow;

  .datePicker {
    width: 31%;

  }
}
</style>