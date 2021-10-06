<template>
  <div>
    <Layout>
      <Tabbar class-prefix = "type" :data-source = "recordTypeList" :value.sync = "type"/>
      <Tabbar class-prefix = "interval" :data-source = "intervalList" :value.sync = "interval"/>
      <div>
      </div>
      <div>
        <ol>
          <li v-for = "(group,index) in result" :key = "index">
            <h3 class = "title">{{ group.title }}</h3>
            <ol>
              <li v-for = "item in group.items" :key = "item.id"
                  class = "record">
                <span class = "tags">
                   <Icon :name = "tagString(item.tags)"/>
                    {{ tagString(item.tags) }}
                </span>
                <span class = "notes">{{ item.notes }} </span>
                <span class = "amount">￥{{ item.amount }} </span>
              </li>
            </ol>
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
  tagString(tags: Tag[]) {
    return tags.length === 0 ? '无' : tags.join(',');
  }

  get recordList() {
    return (this.$store.state as RootState).recordList
  }

  get result() {
    const {recordList} = this
    type HashTableValue = { title: string, items }
    const hashTable: { [key: string]: HashTableValue } = {}
    for (let i = 0; i < recordList.length; i++) {
      const [date, time] = recordList[i].date!.split(' ')
      hashTable[date] = hashTable[date] || {title: date, items: []}
      hashTable[date].items.push(recordList[i])
    }
    console.log(hashTable)
    return hashTable
  }

  created() {
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

.title {
  background-color: darken(rgb(157, 225, 225), 10%);
  padding: 2px 4px;
  line-height: 18px;
  display: flex;
  justify-content: space-between;
  align-content: center;
}

.tags {
  white-space: nowrap;
  display: flex;
  align-items: center;
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
</style>
