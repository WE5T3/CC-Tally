<template>
  <div class = "single">
    <header>
      <Icon class = "backIcon" name = "left" @click.native = "back"/>
      <span class = "title">编辑标签</span>
      <span class = "gap"></span>
    </header>
    <div class = "form-wrapper">
      <FormItem :value = "tag.name"
                @update:value = "updateLabel"
                field-name = "标签名" placeholder = "请输入标签名"/>
    </div>
    <div class = "button-wrapper">
      <Button @click.native = "removeLabel">删除标签</Button>
      <Button @click.native = "cd">确定</Button>
    </div>
  </div>
</template>

<script lang = "ts">
import Vue from 'vue'
import {Component} from 'vue-property-decorator'
import {tagListModel} from "@/models/tagListModel";
import Tags from '@/components/Money/Tags.vue';
import FormItem from "@/components/Money/FormItem.vue";
import Button from "@/components/Button.vue";

@Component({
  components: {Button, FormItem, Tags}
})
export default class EditLabel extends Vue {
  tags = tagListModel.data
  tag?: { id: string, name: string } = undefined
  tag1?: { id: string, name: string } = undefined

  cd() {
    if (this.tag1) {
      console.log(this.tag1.name)
    }
    // this.$router.replace('/edittags')
  }

  created() {
    const id = this.$route.params.id
    const tag = this.tags.filter(t => t.id === id)[0]
    if (tag) {
      this.tag = tag
    } else {
      this.$router.replace('/404')
    }
  }


  updateLabel(name: string) {
    if (this.tag) {
      tagListModel.update(this.tag.id, name)
      // if(tagListModel.update(this.tag.id, name)===)
    }
  }

  removeLabel() {
    if (this.tag) {
      tagListModel.remove(this.tag.id)
    }
    this.$router.replace('/edittags')


  }

  back() {
    // this.tag.name=this.tag1
    this.$router.replace('/edittags');
  }

  ok() {
    this.$router.replace('/money');
  }
}
</script>

<style lang = "scss" scoped>
.single {
  height: 100vh;
  //background-color: whitesmoke;
}

header {
  display: flex;
  text-align: center;
  padding: 12px 16px;
  align-items: center;
  background-color: rgb(157, 225, 225);
  justify-content: space-between;

  .title {
    font-weight: bold;
    font-size: 16px;
    line-height: 30px;
  }

  .backIcon {
    font-weight: bold;
    font-size: 14px;
    border-radius: 4px;
    border: none;
    height: 30px;
    width: 24px;
  }

  .gap {
    width: 24px;
    height: 24px;
  }
}

.form-wrapper {
  align-items: center;
  height: 44px;
  margin-top: 8px;
  background-color: white;
}

.button-wrapper {
  display: flex;
  justify-content: space-around;
  text-align: center;
  padding: 44-16px;
}
</style>