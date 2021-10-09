<template>
  <div class = "date">
    <el-date-picker
        class = "datePicker"
        v-model = "value1"
        type = "date"
        size = "small"
        :editable = "false"
        format = "yyyy-MM-dd"
        value-format = "yyyy-MM-dd"
        placeholder = "请选择日期"
        @change = "onChange"
        @focus = 'preventPop'
        :picker-options = "pickerOptions"
    >
    </el-date-picker>
    <span>日期</span>
  </div>

</template>

<script lang = "ts">

import Vue from 'vue';
import {Component} from 'vue-property-decorator';

import {DatePicker} from 'element-ui';
import '@/assets/style/element-variables.scss';

Vue.use(DatePicker);


@Component
export default class DateSelector extends Vue {

  value1 = new Date()

  preventPop() {
    this.$nextTick(() => {
      let inputTime = document.querySelectorAll('.el-input__inner')
      inputTime.forEach(item => {
        item.addEventListener('focus', () => {
          if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur()
          }
        })
      })
    })
  }

  onChange(date) {
    this.$emit('update:value', date)
    console.log(date)
  }

  pickerOptions = {
    disabledDate(time) {
      return time.getTime() > Date.now();
    },
  }


}
</script>

<style lang = "scss" scoped>
@import "~@/assets/style/helper.scss";

.el-date-editor.el-input, .el-date-editor.el-input__inner {
  //width: 50%;
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


}
</style>