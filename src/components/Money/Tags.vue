<template>
  <div class = "tags-wrapper">
    <ul class = "tags">
      <li v-for = "tag in TagList" :key = "tag.id" :class = "{selected:selectedTags.indexOf(tag.name)>=0}"
          @click = "toggle(tag.name)">
        <Icon :name = 'tag.value'></Icon>
        {{ tag.name }}
      </li>
      <li v-if = "dynamic" class = "edit" @click = "edit">
        <Icon name = "right"/>
        编辑
      </li>
    </ul>
  </div>

</template>

<script lang = "ts">
import {Component, Prop} from "vue-property-decorator"
import Icon from "@/components/Icon.vue"
import {mixins} from "vue-class-component"
import TagHelper from "@/mixins/TagHelper"

@Component({
  components: {Icon},

})
export default class Tags extends mixins(TagHelper) {
  // tags = store.fetchTags()
  @Prop({type: Boolean, default: false}) dynamic!: boolean
  @Prop() type!: string
  @Prop() TagList!: Tag[]

  selectedTags: string[] = []

  mounted() {
    if (this.type === '-') {
      this.selectedTags = ['饮食']
    } else {
      this.selectedTags = ['工资']
    }
    this.$emit('update:value', this.selectedTags)
  }

  beforeCreate() {
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
    this.$router.replace('/edittags')
  }

}
</script>

<style lang = "scss" scoped>
@import "~@/assets/style/helper.scss";

@media (max-width: 364px) {
  .tags-wrapper {
    width: 72*3+20*2+20px;
  }
}

@media (min-width: 364px) and (max-width: 460px) {
  .tags-wrapper {
    width: 72*4+20*3+20px;
  }
}

@media (min-width: 460px) {
  .tags-wrapper {
    width: 72*5+20*4+20px;
  }
}

.tags-wrapper {
  flex-grow: 1;
  margin: 0 auto;
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */
  overflow-x: hidden;
  overflow-y: auto;
  display: flex;
  justify-content: center;
}

.tags-wrapper::-webkit-scrollbar {
  display: none;
}

.tags {
  display: flex;
  margin: 10px auto;
  flex-direction: row;
  flex-wrap: wrap;

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