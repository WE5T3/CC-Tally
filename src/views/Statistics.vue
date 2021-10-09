<template>
  <div>
    <Layout>
      <div class = "chart-wrapper" ref = "chartWrapper">
        <Chart class = "chart" :options = "chartOptions"/>
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
    return result
  }


  get keyValueList() {
    const today = new Date()
    const dataList = this.groupList.map(r => _.pick(r, ['title', 'total']))
    // console.log(this.groupList)
    // console.log(dataList)
    const array: any = []
    for (let i = 0; i <= 29; i++) {
      const dateString = dayjs(today).subtract(i, 'day').format('YYYY-MM-DD')
      const found = _.find(this.groupList, {
        title: dateString
      })
      // console.log(found)
      array.push(
          {
            date: dateString,
            // type: found ? found.type : 0,
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
    const keys = this.keyValueList.map(item => item.date)
    const amount = this.keyValueList.map(item => item.total)
    return {
      tooltip: {
        trigger: 'axis',
        triggerOn: 'click',
        position: 'top',
      },
      legend: {
        data: ['收入', '支出', '合计']
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
          formatter: function (value: string, index: number) {
            return value.substr(5)
          }
        },
        data: keys
      },
      yAxis: {
        show: false,
        type: 'value'
      },
      series: [
        {
          name: '收入',
          type: 'line',
          stack: 'Total',
          smooth: true,
          symbol: 'circle',
          symbolSize: 10,
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
            symbolSize: 20,
          },
          data: amount
        },
        // {
        //   name: '支出',
        //   type: 'line',
        //   stack: 'Total',
        //   smooth: true,
        //   symbol: 'circle',
        //   symbolSize: 10,
        //   itemStyle: {
        //     borderWidth: 1,
        //     color: 'rgb(68,163,204)'
        //   },
        //   markPoint: {
        //     data: [
        //       {type: 'max', name: '最大值'},
        //       {type: 'min', name: '最小值'}
        //     ],
        //     symbol: 'circle',
        //     symbolSize: 20,
        //   },
        //   data: [
        //     320, 332, 301, 334, 390, 330, 320,
        //     320, 332, 301, 334, 390, 330, 320,
        //     320, 332, 301, 334, 390, 330, 320,
        //     320, 332, 301, 334, 390, 330, 320,
        //     391, 332
        //   ]
        // },
        // {
        //   name: '合计',
        //   type: 'line',
        //   stack: 'Total',
        //   smooth: true,
        //   symbol: 'circle',
        //   symbolSize: 10,
        //   itemStyle: {
        //     borderWidth: 1,
        //     color: 'rgb(68,204,204)'
        //   },
        //   markPoint: {
        //     data: [
        //       {type: 'max', name: '最大值'},
        //       {type: 'min', name: '最小值'}
        //     ],
        //     symbol: 'circle',
        //     symbolSize: 20,
        //   },
        //   data: [
        //     820, 932, 901, 934, 1290, 1330, 1320,
        //     820, 932, 901, 934, 1290, 1330, 1320,
        //     820, 932, 901, 934, 1290, 1330, 1320,
        //     820, 932, 901, 934, 1290, 1330, 1320,
        //     1340, 932
        //   ]
        // },
      ],
    }
  }
}
</script>

<style lang = "scss" scoped>
.chart {
  width: 430%;
  height: 400px;
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