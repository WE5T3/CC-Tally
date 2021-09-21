<template>
  <div>
<!--    <Layout content-class = "layout">-->
    <Layout class-prefix= "layout">
      <Types/>
      <Tags/>
      <Date/>
      <Notes/>
      <NumberPad/>
    </Layout>
  </div>
</template>

<script lang = "ts">

import NumberPad from "@/components/Money/NumberPad.vue";
import Types from "@/components/Money/Types.vue";
import Tags from "@/components/Money/Tags.vue";
import Date from "@/components/Money/Date.vue";
import Notes from "@/components/Money/Notes.vue";

export default {
  name: "Money",
  components: {Notes, Date, Tags, Types, NumberPad},
}
</script>

<style lang = "scss">

</style>

<style lang = "scss" scoped>

</style>