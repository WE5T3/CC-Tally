<template>
  <div>
    <Layout>
      <Chart :options = "x"/>
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
  get x() {
    return {
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },

      xAxis: {
        type: 'category',
        boundaryGap: false,
        // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        data: [
          '1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
          '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
          '21', '22', '23', '24', '25', '26', '27', '28', '29', '30',
        ]
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'Email',
          type: 'line',
          stack: 'Total',
          smooth: true,
          data: [
            120, 132, 101, 134, 90, 230, 210,
            120, 132, 101, 134, 90, 230, 210,
            120, 132, 101, 134, 90, 230, 210,
            120, 132, 101, 134, 90, 230, 210,
            230, 210]

        },
        {
          name: 'Direct',
          type: 'line',
          stack: 'Total',
          smooth: true,
          data: [
            320, 332, 301, 334, 390, 330, 320,
            320, 332, 301, 334, 390, 330, 320,
            320, 332, 301, 334, 390, 330, 320,
            320, 332, 301, 334, 390, 330, 320,
            320, 332
          ]
        },
        {
          name: 'Search Engine',
          type: 'line',
          stack: 'Total',
          smooth: true,
          data: [
            820, 932, 901, 934, 1290, 1330, 1320,
            820, 932, 901, 934, 1290, 1330, 1320,
            820, 932, 901, 934, 1290, 1330, 1320,
            820, 932, 901, 934, 1290, 1330, 1320,
            820, 932
          ]
        },

      ],


    }
  }

}
</script>

<style lang = "scss" scoped>
.echarts {
  max-width: 100%;
  height: 400px;
}
</style>