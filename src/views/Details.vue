<template>
  <div>
    <Layout>
      <Tabbar class-prefix = "type" :data-source = "recordTypeList" :value.sync = "type"/>
      <Tabbar class-prefix = "interval" :data-source = "intervalList" :value.sync = "interval"/>
      <div>
        type:{{ type }}
        <br>
        interval:{{ interval }}
      </div>
      <div>
        <ol>
          <li v-for="item in result" :key="item.id">
            {{ item }}
          </li>
        </ol>
      </div>
    </Layout>
  </div>
</template>

<script lang = "ts">
import Vue from 'vue'
import {Component} from "vue-property-decorator"
import Tabbar from "@/components/Tabbar.vue";
import intervalList from "@/constants/intervalList";
import recordTypeList from "@/constants/recordTypeList";

@Component({
  components: {Tabbar}
})
export default class Details extends Vue {
  get recordList() {
    return this.$store.state.recordList
  }
  get result() {
    return this.recordList
  }
  created(){
    this.$store.commit('fetchRecords')
  }
  type = '-'
  interval = 'day'
  intervalList = intervalList
  recordTypeList = recordTypeList
}
</script>

<style lang = "scss" scoped>

::v-deep {
  .interval-tabs {
    background-color: darken(rgb(157, 225, 225), 6%);
    height: 36px;
  }

  .interval-item {
    align-items: center;
    height: 36px;
  }
}

</style>
