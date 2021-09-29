<template>
  <div class = "edit">
    <header>
      <Icon class= "backIcon"  name="left" @click.native="back"/>
      <span class = "title">选择标签</span>
      <span class = "gap"></span>
    </header>
    <div class = "tags">
      <router-link class = "item" v-for = "tag in tags" :key = "tag.id" :to = "`/edittags/editlabel/${tag.id}`">
        <div class = "icon-wrapper">
          <Icon :name = "tag.name"/>
          <span>{{ tag.name }}</span>
        </div>
        <Icon name = "right"/>
      </router-link>

    </div>
    <div class = "newTag-wrapper">
      <Button class = "newTag" @click.native = "createTag">
        新建标签
      </Button>
    </div>
  </div>
</template>

<script lang = "ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Button from "@/components/Button.vue";

@Component({
  components:{Button}
})
export default class EditTags extends Vue {
  //TODO
  tags =[]//store.tagList

  createTag() {
    const name = window.prompt('请输入标签名')
   if(name){
     //TODO
     // store.createTag(name)
   }
    // this.$router.replace('/edittags/addtags');
  }
  back() {
    this.$router.replace('/money');
  }

  ok() {
    this.$router.replace('/money');
  }

}
</script>

<style lang = "scss" scoped>

.edit {
  height: 100vh;
  background-color: rgb(245, 245, 245);
}

header {

  display: flex;
  text-align: center;
  padding: 12px 16px;
  align-items: center;
  background-color:rgb(157,225,225);
  justify-content: space-between;

  .title {
    font-weight: bold;
    font-size: 16px;
    line-height: 30px;
  }

  .backIcon {
    color: black;
    font-weight: bold;
    font-size: 14px;
    border-radius: 4px;
    border: none;
    height: 30px;
    width: 24px;
  }
  .gap{
    width: 24px;
    height: 24px;
  }

}

.tags {
  margin-top: 8px;
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

    .icon-wrapper{
      display: flex;
      align-items: center;

    }
    svg {
      width: 20px;
      height: 20px;
      color: #282828;
      margin-right: 4px;
    }
  }
}

.newTag {

  background-color: rgb(157, 225, 225);
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

