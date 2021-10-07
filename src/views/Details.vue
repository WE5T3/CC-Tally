<template>
  <div>
    <Layout>
      <Tabbar class-prefix = "type" :data-source = "recordTypeList" :value.sync = "type"/>
      <div>
      </div>
      <div>
        <ol>
          <li v-for = "(group,index) in groupList" :key = "index">
            <h3 class = "title">{{ beautify(group.title) }} <span>￥{{ group.total }}</span></h3>
            <ol>
              <li v-for = "item in group.items" :key = "item.id"
                  class = "record">
                <span class = "tags">
                   <Icon class = "icon" :name = "tagString(item.tags)"/>
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
import Tabbar from "@/components/Tabbar.vue"
import recordTypeList from "@/constants/recordTypeList"
import dayjs from "dayjs"
import clone from "@/lib/clone"

@Component({
  components: {Tabbar}
})
export default class Details extends Vue {

  tagString(tags: Tag[]) {
    return tags.length === 0 ? '无' : tags.join(',')
  }

  beautify(string: string) {
    const day = dayjs(string)
    const now = dayjs()
    if (day.isSame(now, 'day')) {
      return '今天'
    } else if (day.isSame(now.subtract(1, 'day'), 'day')) {
      return '昨天'
    } else if (day.isSame(now.subtract(2, 'day'), 'day')) {
      return '前天'
    } else if (day.isSame(now, 'year')) {
      return day.format('M月D日')
    } else {
      return day.format('YYYY年M月D日')
    }
  }

  get recordList() {
    return (this.$store.state as RootState).recordList
  }

  get groupList() {

    const {recordList} = this
    const newList = clone(recordList)
        .filter(r => r.type === this.type)
        .sort((a, b) => dayjs(b.date).valueOf() - dayjs(a.date).valueOf())

    if (newList.length === 0) {return []}

    type Result = {
      title: string,
      total?: number,
      items: RecordItem[]
    }[]

    const result: Result = [{title: dayjs(newList[0].date).format('YYYY-MM-DD'), items: [newList[0]]}]

    for (let i = 1; i < newList.length; i++) {
      const current = newList[i]
      const last = result[result.length - 1]

      if (dayjs(last.title).isSame(dayjs(current.date), 'day')) {
        last.items.push(current)
      } else {
        result.push({title: dayjs(current.date).format('YYYY-MM-DD'), items: [current]})
      }
    }
    result.map(group => {
      group.total = group.items.reduce((sum, item) => {
        return sum + item.amount
      }, 0)
    })

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
</style>
