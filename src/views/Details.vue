<template>
  <div>
    <Layout>
<!--      <Types  class-prefix="xxx0" :value.sync="yyy"/>-->
      <Tabbar class-prefix="type" :data-source="typeList" :value.sync="type"/>
      <Tabbar class-prefix="interval" :data-source="intervalList" :value.sync="interval"/>
    </Layout>


  </div>
</template>

<script lang = "ts">
import Vue from 'vue'
import {Component} from "vue-property-decorator"
import Types from "@/components/Money/Types.vue";
import Tabbar from "@/components/Tabbar.vue";

@Component({
  components: {Tabbar, Types}
})
export default class Details extends Vue {
  type='-'
  interval='day'
  intervalList=[
      {text:'按天',value:'day'},
      {text:'按周',value:'week'},
      {text:'按月',value:'month'},
  ]
  typeList=[
    {text:'支出',value:'-'},
    {text:'收入',value:'+'},
  ]
}
</script>

<style lang = "scss" scoped>

::v-deep {
  .type-item{

  }
  .interval-item{

  }
}

</style>
