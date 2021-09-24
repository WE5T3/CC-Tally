<template>
  <div class = "date">
    <span>日期</span>
     <a-date-picker class="datePicker" @change="onChange" placeholder="选择日期"/>
  </div>

</template>
<script lang="ts">
import Vue from 'vue';
import { DatePicker} from 'ant-design-vue';
import {Component,Watch} from 'vue-property-decorator';
import dayjs from 'dayjs';
Vue.use(DatePicker);
@Component({
  components: {
    DatePicker
  }
})
export default class Date extends Vue {

  onChange(date: any, dateString: any) {
    this.$emit('update:value',dateString)
  }

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

  .datePicker{
    width: 31%;

  }
}
</style>