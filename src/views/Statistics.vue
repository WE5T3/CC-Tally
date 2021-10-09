<template>
  <div>
    <Layout>
      <div class = "chart-wrapper" ref = "chartWrapper">
        <Chart class = "chart" :options = "x"/>
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

@Component({
  components: {Chart},
})
export default class Statistics extends Vue {

  beforeCreate() {
    this.$store.commit('fetchRecords')
  }

  mounted() {
    const divChart = this.$refs.chartWrapper as HTMLDivElement
    divChart.scrollLeft = divChart.scrollWidth
  }

  get recordList() {
    return (this.$store.state as RootState).recordList
  }

  get y() {
    const today = new Date()
    const dataList = this.recordList.map(r => _.pick(r, ['date', 'type', 'amount']))
    // console.log(dataList)
    const array: any = []
    for (let i = 0; i <= 29; i++) {
      const date0 = dayjs(today).subtract(i, 'day').format('YYYY-MM-DD')
      const found = _.find(this.recordList, {
        date: date0
      })
      array.push(
          {
            date: date0,
            type: found ? found.type : 0,
            amount: found ? found.amount : 0
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

  get x() {
    const keys = this.y.map(item => item.date)
    const amount = this.y.map(item => item.amount)
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