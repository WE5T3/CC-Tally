<template>
  <ul class = "tags">
    <li v-for = "tag in tags" :key = "tag.id" :class = "{selected:selectedTags.indexOf(tag.name)>=0}" @click = "toggle(tag.name
    )">
      <Icon :name = 'tag.name'></Icon>
      {{ tag.name }}
    </li>
    <li v-if = "dynamic" class = "edit" @click = "edit">
      <Icon name = "右"/>
      编辑
    </li>
  </ul>

</template>

<script lang = "ts">
import Vue from "vue";
import {Component, Prop} from "vue-property-decorator";
import Icon from "@/components/Icon.vue";
import {mixins} from "vue-class-component";
import TagHelper from "@/mixins/TagHelper";

@Component({
  components: {Icon},

})
export default class Tags extends mixins(TagHelper) {
  // tags = store.fetchTags()
  @Prop({type: Boolean, default: false}) dynamic!: boolean;

  selectedTags: string[] = []
  get TagList(){
    return this.$store.state.tagList
  }


  created() {
    this.$store.commit('fetchTags')
  }

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
    this.$emit('update:value', this.selectedTags)

  }

  edit() {
    this.$router.replace('/edittags');
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


  li, .edit {
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