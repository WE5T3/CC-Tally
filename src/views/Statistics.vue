<template>
  <div>
    <Layout>
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
      <div class = "chart-wrapper" ref = "chartWrapper">
        <Chart class = "chart" :options = "chartOptions"/>
      </div>
    </Layout>
  </div>
</template>

<script lang = "ts">
// import Vue from 'vue'
import {Component, Vue} from 'vue-property-decorator'
import Chart from '@/components/Chart.vue'
import _ from "lodash"
import dayjs from "dayjs"
import clone from "@/lib/clone"

@Component({
  components: {Chart},
})
export default class Statistics extends Vue {
  month1: string = dayjs().format('YYYY-MM')

  beforeCreate() {
    this.$store.commit('fetchRecords')
  }

  pickerOptions = {
    disabledDate(time) {
      return time.getTime() > Date.now()
    },
  }

  mounted() {
    const divChart = this.$refs.chartWrapper as HTMLDivElement
    divChart.scrollLeft = divChart.scrollWidth
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
      summary.expenseTotalList.push({total: Math.abs(group.expenseTotal!), date: group.title})
      summary.incomeTotalList.push({total: group.incomeTotal!, date: group.title})
    })
    return summary
  }

  get expenseAmountList() {
    const today = new Date()
    const array: any = []
    for (let i = 0; i <= 30; i++) {
      const dateString = dayjs(dayjs(this.month1 + '-01')).add(i, 'day').format('YYYY-MM-DD')
      const found = _.find(this.summaryList.expenseTotalList, {
        date: dateString
      })
      array.push(
          {
            date: dateString,
            total: found ? found.total : 0
          })
    }
    array.sort((a, b) => {
      if (a.date > b.date) {
        return 1
      } else if (a.date === b.date) {
        return 0
      } else {
        return -1
      }
    })
    return array
  }

  get incomeAmountList() {
    const today = new Date()
    const array: any = []
    for (let i = 0; i <= 30; i++) {
      const dateString = dayjs(dayjs(this.month1 + '-01')).add(i, 'day').format('YYYY-MM-DD')
      const found = _.find(this.summaryList.incomeTotalList, {
        date: dateString
      })
      array.push(
          {
            date: dateString,
            total: found ? found.total : 0
          })
    }
    array.sort((a, b) => {
      if (a.date > b.date) {
        return 1
      } else if (a.date === b.date) {
        return 0
      } else {
        return -1
      }
    })
    return array
  }

  get totalAmountList() {
    const today = new Date()
    const array: any = []
    for (let i = 0; i <= 30; i++) {
      const dateString = dayjs(dayjs(this.month1 + '-01')).add(i, 'day').format('YYYY-MM-DD')
      const found = _.find(this.groupList, {
        title: dateString
      })
      array.push(
          {
            date: dateString,
            total: found ? found.total : 0
          })
    }
    array.sort((a, b) => {
      if (a.date > b.date) {
        return 1
      } else if (a.date === b.date) {
        return 0
      } else {
        return -1
      }
    })
    return array
  }

  get chartOptions() {

    const keys = [
      '1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
      '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
      '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'
    ]
    const totalAmount = this.totalAmountList.map(item => item.total)
    const expenseAmount = this.expenseAmountList.map(item => item.total)
    const incomeAmount = this.incomeAmountList.map(item => item.total)
    return {
      tooltip: {
        trigger: 'axis',
        triggerOn: 'click',
        position: 'top',
      },
      legend: {
        data: ['收入', '支出', '合计']
        // data: ['合计']
      },
      grid: {

        left: "0",
        right: '20px',

        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        axisLine: {
          lineStyle: {
            // color:'rgb(102,102,102)'
          }
        },
        axisLabel: {
          interval: 1,
          fontSize: 12,
          // formatter: function (value: string, index: number) {
          //   if (value.substr(8)[0] === '0') {
          //     return value.substr(9)
          //   } else {
          //     return value.substr(8)
          //   }
          //
          // }
        },
        data: keys
      },
      yAxis: {
        // show: false,
        type: 'value'
      },
      series: [
        {
          name: '合计',
          type: 'line',
          stack: 'Total',
          smooth: true,
          symbol: 'circle',
          symbolSize: 6,
          itemStyle: {
            borderWidth: 1,
            color: 'rgb(68,204,156)'
          },
          markPoint: {
            data: [
              {type: 'max', name: '最大值'},
              {type: 'min', name: '最小值'}
            ],
            symbol: 'circle',
            symbolSize: 15,
          },
          data: totalAmount
        },
        {
          name: '支出',
          type: 'line',
          stack: 'Total',
          smooth: true,
          symbol: 'circle',
          symbolSize: 6,
          itemStyle: {
            borderWidth: 1,
            color: 'rgb(68,163,204)'
          },
          markPoint: {
            data: [
              {type: 'max', name: '最大值'},
              {type: 'min', name: '最小值'}
            ],
            symbol: 'circle',
            symbolSize: 15,
          },
          data: expenseAmount
        },
        {
          name: '收入',
          type: 'line',
          stack: 'Total',
          smooth: true,
          symbol: 'circle',
          symbolSize: 6,
          itemStyle: {
            borderWidth: 1,
            color: 'rgb(68,204,204)'
          },
          markPoint: {
            data: [
              {type: 'max', name: '最大值'},
              {type: 'min', name: '最小值'}
            ],
            symbol: 'circle',
            symbolSize: 15,
          },
          data: incomeAmount
        },
      ],
    }
  }
}
</script>

<style lang = "scss" scoped>

.month {

  margin-bottom: 2px;
  z-index: 1;
  border: 1px solid rgb(157, 225, 225);
  padding: 0;
  overflow: hidden;
  width: 100vw;

  .month-picker ::v-deep {
    .el-input__inner {
      border: none;
      border-radius: 0;
      height: 50px;
      width: 100vw;
      text-align: center;
      font-size: large;
    }
  }
}

.chart {
  width: 100%;
  height: 85vh;
}

.chart-wrapper::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}

.chart-wrapper {

  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */
  overflow-y: hidden;
  overflow-x: auto;
}
</style>