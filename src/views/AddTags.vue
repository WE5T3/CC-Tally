<template>
  <div class = "tags">
    <div class = "fixed">
      <header class = "header">
        <div class = "title">
          <button class = "back" @click = "back">
            返回
          </button>
          <span>添加支出类别</span>
        </div>
        <button class = "ok" @click = "ok">完成</button>
      </header>
      <div class = "current">
        <div class = "label">
          <span>选中标签: </span>
          <div class = "icon">
            <!--            <Icon :name="tag.name"/>-->
          </div>
        </div>
        <span>{{addTag}}</span>
      </div>
    </div>
    <div class = "content">
      <div class = "daily">
        <div class = "kind-name" >
          日常
        </div>
        <Tags :tag-list = 'dailyTags'/>
      </div>
      <div class = "shopping">
        <div class = "kind-name">
          购物
        </div>
        <Tags :tag-list = 'shoppingTags' />
      </div>

      <div class = "transport">
        <div class = "kind-name">
          交通
        </div>
        <Tags :tag-list = 'transportTags'/>
      </div>

      <div class = "entertainment">
        <div class = "kind-name">
          娱乐
        </div>
        <Tags :tag-list = 'entertainmentTags'/>
      </div>

      <div class = "medical">
        <div class = "kind-name">
          医疗
        </div>
        <Tags :tag-list = 'medicalTags'/>
      </div>
      <div class = "finance">
        <div class = "kind-name">
          财政
        </div>
        <Tags :tag-list = 'financeTags'/>

      </div>

    </div>
  </div>
</template>

<script lang = "ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';
import Tags from '@/components/Money/Tags.vue';
import Icon from '@/components/Icon.vue';

@Component({
  components: {Icon, Tags}
})
export default class AddTags extends Vue {
  @Prop() readonly tagList: string[] | undefined

  selectedAddTags: string[] = []
  addTag: string[] = []
  shoppingTags: string[] = ['装修', '水果', '饮料', '零食', '电子']
  dailyTags: string[] = ['饭卡', '礼金', '网费', '图书', '理发', '宠物-猫', '宠物-狗',]
  transportTags: string[] = ['油费', 'ETC', '停车', '洗车', '修车', '出租', '网约车', '地铁', '公交', '飞机', '高铁', '火车', '轮船', '罚款',]
  entertainmentTags: string[] = [
    '玩具', 'K歌', '电影', '门票', '棋牌', '健身', '旅游'
  ]
  medicalTags: string[] = [
    '药品', '器材', '手术'
  ]
  financeTags: string[] = [
    '花呗', '信用卡', '房贷', '车贷'
  ]

  toggle(tag: string) {

    const index = this.selectedAddTags.indexOf(tag)
    if (this.selectedAddTags.indexOf(tag) >= 0) {
      this.selectedAddTags.splice(index, 1)
    } else if (this.selectedAddTags.length >= 1) {
      this.selectedAddTags.splice(index, 1)
      this.selectedAddTags.push(tag)
    } else {
      this.selectedAddTags.push(tag)
    }
    // this.$emit('update:value',this.selectedTags)

  }
  // get tagList() {
  // return this.$store.state.tagList;
  // }
  back() {
    this.$router.replace('/money');
  }

  ok() {
    // this.$store.commit('insertTag', clone(this.tag));
    if (this.$store.state.tagListError === 'duplicate') {
      window.alert('不可添加同名的标签类别');
    } else {
      this.$router.replace('/money');
    }
  }

}
</script>

<style lang = "scss" scoped>



.fixed {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1;
  background: white;
}

.header {
  background: #9ee1e1;
  font-size: 20px;
  line-height: 24px;
  padding: 12px 16px;
  border-bottom: 1px solid #dddddd;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .title {
    display: flex;
    align-items: center;

    .back {
      svg {
        width: 24px;
        height: 24px;
      }

      background: inherit;
      border: none;
      margin-right: 8px;
    }
  }

  .ok {
    font-size: 20px;
    //font-weight: bolder;
    color: #524a4a;
    border: none;
    background: inherit;
  }
}

.current {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 12px;
  box-shadow: inset 0 -1px 1px -1px rgba(0, 0, 0, 0.3);

  .label {
    display: flex;
    align-items: center;

    .icon {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      color: #f7d680;
      border: 1px solid #f7d680;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: 8px;

      svg {
        width: 24px;
        height: 24px;
      }
    }
  }
}

.content {
  padding-top: 120px;
}

.kind-name {
  font-size: 14px;
  color: #999999;
}
</style>