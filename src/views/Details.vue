<template>
  <div>
    <Layout>
      <div class = "header">
        <Icon name = "cc"/>
        CC记账
      </div>
      <div class = "month">
        <el-date-picker
            class = "month-picker"
            v-model = "month1"
            size = "small"
            :editable = "false"
            :clearable = 'false'
            value-format = "yyyy-MM"
            :picker-options = "pickerOptions"
            type = "month"
            placeholder = "选择月">
        </el-date-picker>
      </div>
      <ol class = "type-bar">
        <li>
          <span class = "text">总计</span>
          <span class = "number">{{ beautifyTotal(this.amountTotal1) }}</span>
        </li>
        <li>
          <span class = "text">支出</span>
          <span class = "number">￥{{ Math.abs(this.expenseTotal1) }}</span>
        </li>
        <li>
          <span class = "text">收入</span>
          <span class = "number">￥{{ Math.abs(this.incomeTotal1) }}</span>
        </li>
      </ol>
      <div class = "details-wrapper">
        <ol class = "details" v-if = "groupList.length>0">
          <li v-for = "(group,index) in groupList" :key = "index">
            <h3 class = "title">{{ beautifyDate(group.title) }} <span>{{ beautifyAmount(group.total) }}</span></h3>
            <ol>
              <li v-for = "item in group.items" :key = "item.id"
                  class = "record">
                <span class = "tags">
                   <Icon class = "icon" :name = "tagString(item.tags)"/>
                   {{ tagString(item.tags) }}
                </span>
                <span class = "notes">{{ item.notes }} </span>
                <span class = "amount">￥{{ item.type }}{{ item.amount }} </span>
              </li>
            </ol>
          </li>
        </ol>
        <div v-else class = "nothing">
          暂无账目记录,快去记一笔吧~
          <Icon class = "icon-nothing" name = "暂无记录"/>
        </div>
      </div>
    </Layout>
  </div>
</template>

<script lang = "ts">
import Vue from 'vue'
import {Component} from "vue-property-decorator"
import Tabbar from "@/components/Tabbar.vue"
import recordTypeList from "@/constants/recordTypeList"
import dayjs from "dayjs"
import clone from "@/lib/clone"
import Nav from "@/components/Nav.vue"

@Component({
  components: {Tabbar}
})

export default class Details extends Vue {
  month1: string = dayjs().format('YYYY-MM')

  amountTotal1 = this.evalAmount(this.summaryList.totalList)

  expenseTotal1 = this.evalAmount(this.summaryList.expenseTotalList)
  incomeTotal1 = this.evalAmount(this.summaryList.incomeTotalList)

  pickerOptions = {
    disabledDate(time) {
      return time.getTime() > Date.now()
    },
  }

  beforeCreate() {
    this.$store.commit('fetchRecords')
  }

  evalAmount(arr: any[]) {
    const arrNew = arr.map(item => {
      return item.total
    })
    const num: number = eval(arrNew.join("+")).toFixed(2)
    return num
  }


  tagString(tags: Tag[]) {
    return tags.length === 0 ? '无' : tags.join(',')
  }

  toWeekday(value: number) {
    if (value >= 0 && value <= 6) {
      return [
        '星期天',
        '星期一',
        '星期二',
        '星期三',
        '星期四',
        '星期五',
        '星期六'
      ][value]
    }
  }

  beautifyTotal(number: number) {

    if (number <= 0) {
      return '-￥' + Math.abs(number).toFixed(2)
    } else {
      return '+￥' + Math.abs(number).toFixed(2)
    }
  }

  beautifyAmount(number: number) {
    if (number <= 0) {
      return '支出 ￥' + Math.abs(number).toFixed(2)
    } else {
      return '收入 ￥' + number.toFixed(2)
    }
  }

  beautifyDate(string: string) {
    const day = dayjs(string)
    const now = dayjs()

    if (day.isSame(now, 'day')) {
      return '今天 ' + this.toWeekday(day.day())
    } else if (day.isSame(now.subtract(1, 'day'), 'day')) {
      return '昨天 ' + this.toWeekday(day.day())
    } else if (day.isSame(now.subtract(2, 'day'), 'day')) {
      return '前天 ' + this.toWeekday(day.day())
    } else if (day.isSame(now, 'year')) {
      return day.format('M月D日 ' + this.toWeekday(day.day()))
    } else {
      return day.format('YYYY年M月D日 ' + this.toWeekday(day.day()))
    }
  }

  get recordList() {
    return (this.$store.state as RootState).recordList
  }

  get groupList() {
    const {recordList} = this
    const newList = clone(recordList)
        .sort((a, b) => dayjs(b.date + ' ' + b.time).valueOf() - dayjs(a.date + ' ' + a.time).valueOf())
    if (newList.length === 0) {return []}
    const monthList = clone(newList).filter(item => dayjs(item.date).format('YYYY-MM') === this.month1)
    if (monthList.length === 0) {return []}

    type Result = {
      title: string,
      total?: number,
      expenseTotal?: number,
      incomeTotal?: number,
      items: RecordItem[]
    }[]

    const result: Result = [{title: dayjs(monthList[0].date).format('YYYY-MM-DD'), items: [monthList[0]]}]

    for (let i = 1; i < monthList.length; i++) {
      const current = monthList[i]
      const last = result[result.length - 1]
      if (dayjs(last.title).isSame(dayjs(current.date), 'day')) {
        last.items.push(current)
      } else {
        result.push({title: dayjs(current.date).format('YYYY-MM-DD'), items: [current]})
      }
    }
    result.map(group => {
      group.total = group.items.reduce((sum, item) => {
        return eval(sum + (item.type + item.amount))
      }, 0)
    })

    result.map(group => {
      group.expenseTotal = group.items.filter(r => r.type === '-').reduce((sum, item) => {
        return eval(sum + (item.type + item.amount))
      }, 0)
      group.incomeTotal = group.items.filter(r => r.type === '+').reduce((sum, item) => {
        return eval(sum + (item.type + item.amount))
      }, 0)
    })

    return result
  }

  get summaryList() {
    type Summary = {
      expenseTotalList: any[],
      incomeTotalList: any[],
      totalList: any[],
    }
    const summary: Summary = {
      expenseTotalList: [],
      incomeTotalList: [],
      totalList: [],
    }
    this.groupList.map(group => {
      summary.totalList.push({total: group.total!, date: group.title})
      summary.expenseTotalList.push({total: group.expenseTotal!, date: group.title})
      summary.incomeTotalList.push({total: group.incomeTotal!, date: group.title})
    })
    return summary
  }


  type = '-'
  recordTypeList = recordTypeList
}
</script>

<style lang = "scss" scoped>
@import "~@/assets/style/helper.scss";

.header {
  color: black;
  font-family: $font-kai;
  font-size: larger;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px 16px;
  background-color: rgb(157, 225, 225);
}

.month {
  position: fixed;
  width: 100%;
  top: 76+8px;
  left: 0;
  z-index: 1;
  background-color: rgb(157, 225, 225);
  padding: 2px 0;

  .month-picker ::v-deep {
    .el-input__inner {
      border: none;
      border-radius: 0;
      width: 100vw;
      text-align: center;

    }
  }
}

.type-bar {
  position: fixed;
  top: 8px;
  left: 0;
  width: 100%;
  min-height: 76px;
  z-index: 1;
  background-color: rgb(157, 225, 225);
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding-bottom: 10px;

  li {
    width: 120px;
    display: flex;
    flex-direction: column;

    &:nth-child(1) {
      padding-right: 2px;
      border-right: 2px dotted;
    }

    &:nth-child(2) {
      border-right: 2px dotted;
    }

    span {
      padding-left: 14px;
    }

    .text {
      font-size: 14px;
    }

    .number {
      font-weight: bold;
    }
  }
}

.details-wrapper {
  margin-top: 76+36+10px;
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */
  overflow-x: hidden;
  overflow-y: auto;

}

.details-wrapper::-webkit-scrollbar {
  display: none;
}

.title {
  position: relative;
  border-bottom: rgb(157, 225, 225) 2px ridge;
  background-color: whitesmoke;
  padding: 2px 8px;
  line-height: 18px;
  display: flex;
  justify-content: space-between;
  align-content: center;

  span {
    font-weight: bold;
  }
}

.title ::after {
  position: absolute;
  top: 23px;
  right: 0;
  content: '';
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-top: 8px solid rgb(123, 176, 176);
}

.tags {
  white-space: nowrap;
  display: flex;
  align-items: center;

  .icon {
    margin-right: 4px;
  }
}

.record {
  padding: 2px 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  background: #f9f9f9;
}

.notes {
  display: flex;
  align-items: center;
  margin-top: 1px;
  margin-right: auto;
  margin-left: 16px;
  color: #999;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.amount {
  display: flex;
  align-items: center;
}

.nothing {
  color: #999;
  height: 50vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  font-size: 18px;

  .icon-nothing {
    margin-top: 10px;
    font-size: 100px;
  }
}

</style>
