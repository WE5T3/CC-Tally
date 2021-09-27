<template>
<div>
  <span>编辑标签</span>
  <header>
    <button class = "back" @click = "back">
      返回
    </button>
    <button class = "ok" @click = "ok">
      完成
    </button>

  </header>

</div>
</template>

<script lang = "ts">
import Vue from 'vue'
import {Component} from 'vue-property-decorator'
import {tagListModel} from "@/models/tagListModel";
import Tags from '@/components/Money/Tags.vue';

@Component({
  components: {Tags}
})
export default class EditLabel extends Vue {
  created(){
    const id = this.$route.params.id
    const tags = tagListModel.data
    const tag=tags.filter(t=>t.id===id)[0]
    if(tag){
      console.log(tag)
    }else{
      this.$router.replace('/404')
    }
  }

  back() {
    this.$router.replace('/edittags');
  }

  ok() {
    this.$router.replace('/money');
  }
}
</script>

<style lang = "scss" scoped>

</style>