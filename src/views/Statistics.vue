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

@Component({
  components: {Chart},
})
export default class Statistics extends Vue {

  mounted() {
    (this.$refs.chartWrapper as HTMLDivElement).scrollLeft = 9999

  }

  get x() {
    return {
      tooltip: {
        trigger: 'axis',
        triggerOn: 'click',
        position: 'top',
      },
      legend: {
        data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
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
        data: [
          '1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
          '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
          '21', '22', '23', '24', '25', '26', '27', '28', '29', '30',
        ]
      },
      yAxis: {
        show: false,
        type: 'value'
      },
      series: [
        {
          name: 'Email',
          type: 'line',
          stack: 'Total',
          smooth: true,
          symbol: 'circle',     //折点设定为实心点
          symbolSize: 10,
          itemStyle: {
            borderWidth: 1,
            color: 'rgb(68,204,156)'
          },
          markPoint: {     //显示一定区域内的最大值和最小值
            data: [
              {type: 'max', name: '最大值'},
              {type: 'min', name: '最小值'}
            ],
            symbol: 'circle',
            symbolSize: 20,
          },
          data: [
            120, 132, 101, 134, 90, 230, 210,
            120, 132, 101, 134, 90, 230, 210,
            120, 132, 101, 134, 90, 230, 210,
            120, 132, 101, 134, 90, 230, 210,
            240, 210],
        },
        {
          name: 'Direct',
          type: 'line',
          stack: 'Total',
          smooth: true,
          symbol: 'circle',     //折点设定为实心点
          symbolSize: 10,
          itemStyle: {
            borderWidth: 1,
            color: 'rgb(68,163,204)'
          },
          markPoint: {     //显示一定区域内的最大值和最小值
            data: [
              {type: 'max', name: '最大值'},
              {type: 'min', name: '最小值'}
            ],
            symbol: 'circle',
            symbolSize: 20,
          },
          data: [
            320, 332, 301, 334, 390, 330, 320,
            320, 332, 301, 334, 390, 330, 320,
            320, 332, 301, 334, 390, 330, 320,
            320, 332, 301, 334, 390, 330, 320,
            391, 332
          ]
        },
        {
          name: 'Search Engine',
          type: 'line',
          stack: 'Total',
          smooth: true,
          symbol: 'circle',     //折点设定为实心点
          symbolSize: 10,
          itemStyle: {
            borderWidth: 1,
            color: 'rgb(68,204,204)'
          },
          markPoint: {     //显示一定区域内的最大值和最小值
            data: [
              {type: 'max', name: '最大值'},
              {type: 'min', name: '最小值'}
            ],
            symbol: 'circle',
            symbolSize: 20,
          },
          data: [
            820, 932, 901, 934, 1290, 1330, 1320,
            820, 932, 901, 934, 1290, 1330, 1320,
            820, 932, 901, 934, 1290, 1330, 1320,
            820, 932, 901, 934, 1290, 1330, 1320,
            1340, 932
          ]
        },
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