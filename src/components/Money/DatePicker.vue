<template>
  <div class = "date">
    <span >日期</span>
    <!--    <a-date-picker class = "datePicker"-->
    <!--                   placeholder="请选择日期"-->
    <!--                   :defaultValue="currentTime"-->
    <!--                   valueFormat="YYYY-MM-DD"-->
    <!--                   :inputReadOnly = 'true'-->
    <!--                   @change = "onChange"-->
    <!--    />-->
    <el-date-picker
        class = "datePicker"
        v-model = "value"
        align = "right"
        type = "date"
        size="small"
        :editable="false"
        format="yyyy-MM-dd"
        value-format="yyyy-MM-dd"
        placeholder = "请选择日期"
        @change = "onChange"
        >
    </el-date-picker>

  </div>

</template>
<script lang = "ts">

import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import moment from 'moment';
import 'moment/locale/zh-cn';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
@Component
export default class DateSelector extends Vue {

  onChange(date) {
    this.$emit('update:value', date)
    console.log(date)
  }


  value = ''

  pickerOptions = {
    disabledDate(time) {
      return time.getTime() > Date.now();
    },
    shortcuts: [{
      text: '今天',
      onClick(picker) {
        picker.$emit('pick', new Date());
      }
    }, {
      text: '昨天',
      onClick(picker) {
        const date = new Date();
        date.setTime(date.getTime() - 3600 * 1000 * 24);
        picker.$emit('pick', date);
      }
    }, {
      text: '一周前',
      onClick(picker) {
        const date = new Date();
        date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
        picker.$emit('pick', date);
      }
    }]
  }


}
</script>

<style lang = "scss" scoped>
@import "~@/assets/style/helper.scss";

.el-date-editor.el-input, .el-date-editor.el-input__inner {
  width: 220px;
}
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
    width: 38%;

  }
}
</style>