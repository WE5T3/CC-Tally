<template>
      <ul class = "tags">
        <li v-for = "tag in tagList" :key = "tag" :class = "{selected:selectedTags.indexOf(tag)>=0}" @click = "toggle(tag
    )">
          <Icon :name = 'tag'></Icon>
          {{ tag }}
        </li>
        <li v-if="dynamic" class = "new" @click = "add">
          <Icon name = "右"/>
          新增标签
        </li>
      </ul>

</template>

<script lang = "ts">
import Vue from "vue";
import {Component, Prop} from "vue-property-decorator";
import Icon from "@/components/Icon.vue";

@Component({
  components: {Icon}
})
export default class Tags extends Vue {
  @Prop({type: Boolean, default: false}) dynamic!: boolean;
  @Prop() readonly value!:string
  @Prop() readonly tagList: string[] | undefined
  selectedTags: string[] = []
  addTags: string[] = []

  toggle(tag: string) {

    const index = this.selectedTags.indexOf(tag)
    if (this.selectedTags.indexOf(tag) >= 0) {
      this.selectedTags.splice(index, 1)
    } else if (this.selectedTags.length >= 1) {
      this.selectedTags.splice(index, 1)
      this.selectedTags.push(tag)
    } else {
      this.selectedTags.push(tag)
    }
    this.$emit('update:value',this.selectedTags)

  }

  add() {
    // const name = window.prompt('请输入标签名')
    // if (name===''){
    //   window.alert('标签名不能为空')
    // }
    // else if(this.tagList && name!==null){
    //   console.log('name')
    //   this.$emit('update:tagList',[...this.tagList,name])
    // }
    this.$router.replace('/EditTags');
  }
}
</script>

<style lang = "scss" scoped>
@import "~@/assets/style/helper.scss";

.tags {
  flex-grow: 1;
  display: flex;
  margin: 10px 0;
  //padding-left: 3px;
  flex-direction: row;
  flex-wrap: wrap;
  overflow: auto;
  justify-content: center;


  li, .new {
    font-size: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 15%;
    margin: 3px 10px;
    padding-top: 3px;
    text-align: center;
    border: 1px solid #ced7d7;
    width: 6em;
    height: 4em;

    svg {
      color: rgb(72, 82, 82);
      width: 50px;
      height: 50px;
    }

    &.selected {
      transform: scale(1.05);
      box-shadow: 1px 2px 2px lightgray;
      background-color: rgb(157, 225, 225);

      svg {
        animation: shake 0.3s linear;
      }
    }
  }
}


@keyframes shake {
  0% {
    transform: rotate(0deg);
  }
  20% {
    transform: rotate(20deg);
  }
  40% {
    transform: rotate(0deg);
  }
  80% {
    transform: rotate(-20deg);
  }
  100% {
    transform: rotate(0deg);
  }
}
</style>