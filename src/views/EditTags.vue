<template>
  <div class = "edit">
      <header>
        <button class = "back" @click = "back">
          返回
        </button>
        <button class = "ok" @click = "ok">
          完成
        </button>
      </header>
      <div class = "tags">
        <router-link class="item" v-for = "tag in tags" :key = "tag.id" :to="`/edittags/editlabel/${tag.id}`" >
          <span>{{ tag.name }}</span>
          <Icon name = "tag"/>
          <Icon name = "right"/>
        </router-link>

      </div>
      <div class = "newTag-wrapper">
        <button class = "newTag" @click = "createTag">
          新建标签
        </button>
      </div>
  </div>
</template>

<script lang = "ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Tags from '@/components/Money/Tags.vue';
import {tagListModel} from "@/models/tagListModel";

tagListModel.fetch()
@Component({
  components: {Tags}
})
export default class EditTags extends Vue {
  tags = tagListModel.data

  back() {
    this.$router.replace('/money');
  }

  createTag() {
    const name = window.prompt('请输入标签名')
    if (name) {
      const message = tagListModel.create(name)
      if (message==='duplicated'){
        window.alert('标签名重复')
      }else if (message === 'success'){
        window.alert('标签添加成功')
      }else if (message==='blank'){
        window.alert('标签名不能含有空格')
      }
    }
    // this.$router.replace('/edittags/addtags');
  }

  ok() {
    this.$router.replace('/money');
  }

}
</script>

<style lang = "scss" scoped>

.edit{
  height: 100vh;
  background-color: rgb(245, 245, 245);
}
header {
  display: flex;
  background-color: rgb(245,245,245);
  justify-content: space-between;

  button {
    background-color: rgb(157,225,225);
    color: black;
    font-weight: bold;
    font-size: 14px;
    border-radius: 4px;
    border: none;
    height: 30px;
    padding: 0 16px;
  }
}

.tags {
  background-color: white;
  font-size: 14px;
  padding-left: 16px;

  > .item {
    text-decoration: none;
    color: black;
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #e6e6e6;

    svg {
      width: 18px;
      height: 18px;
      color: #666666;
      margin-right: 16px;
    }
  }
}

.newTag {

  background-color: rgb(157,225,225);
  color: black;
  font-size: 14px;
  border-radius: 4px;
  border: none;
  height: 40px;
  padding: 0 16px;

  &-wrapper {
    text-align: center;
    padding: 16px;
    margin-top: 44-16px;
  }

}

</style>

