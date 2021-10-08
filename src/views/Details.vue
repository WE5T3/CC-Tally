<template>
  <div>
    <Layout>
      <div class = "type-bar">
        本月总计:{{ beautifyAmount(this.amountTotal1) }}
        纯支出:￥{{ Math.abs(this.expenseTotal1) }}
        纯收入:￥{{ this.incomeTotal1 }}
        <el-date-picker
            class = "datePicker"
            v-model = "month1"
            size = "small"
            :editable = "false"
            value-format = "yyyy-MM"
            :picker-options = "pickerOptions"
            type = "month"
            placeholder = "选择月">
        </el-date-picker>
      </div>
      <div>
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

@Component({
  components: {Tabbar}
})


export default class Details extends Vue {
  month1: string = dayjs().format('YYYY-MM')
  expenseTotal1: number = 0
  incomeTotal1: number = 0
  amountTotal1: number = 0
  pickerOptions = {
    disabledDate(time) {
      return time.getTime() > Date.now()
    },
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

  beautifyAmount(number: number) {
    if (number <= 0) {
      return '支出 ￥' + (0 - number)
    } else {
      return '收入 ￥' + number
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
        .sort((a, b) => dayjs(b.date).valueOf() - dayjs(a.date).valueOf())
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

    type Summary = {
      expenseTotalList: number[],
      incomeTotalList: number[],
      totalList: number[],
    }
    const summary: Summary = {
      expenseTotalList: [],
      incomeTotalList: [],
      totalList: [],
    }


    result.map(group => {
      group.expenseTotal = group.items.filter(r => r.type === '-').reduce((sum, item) => {
        return eval(sum + (item.type + item.amount))
      }, 0)
    })
    result.map(group => {
      group.incomeTotal = group.items.filter(r => r.type === '+').reduce((sum, item) => {
        return eval(sum + (item.type + item.amount))
      }, 0)
    })
    result.map(group => {
      summary.totalList.push(group.total!)
    })
    this.amountTotal1 = eval(summary.totalList.join("+")).toFixed(2)

    result.map(group => {
      summary.expenseTotalList.push(group.expenseTotal!)
    })
    this.expenseTotal1 = eval(summary.expenseTotalList.join("+")).toFixed(2)

    result.map(group => {
      summary.incomeTotalList.push(group.incomeTotal!)
    })
    this.incomeTotal1 = eval(summary.incomeTotalList.join("+")).toFixed(2)
    return result
  }

  beforeCreate() {
    this.$store.commit('fetchRecords')
  }

  type = '-'
  recordTypeList = recordTypeList
}
</script>

<style lang = "scss" scoped>
@import "~@/assets/style/helper.scss";

.type-bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 54px;
  z-index: 1;
  background-color: rgb(157, 225, 225);
  display: flex;
  justify-content: center;
  align-items: center;

}

.details {
  margin-top: 54px;
}

.title {
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
