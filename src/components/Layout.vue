<template>
  <div class = "layout-wrapper"  :class="classPrefix && `${classPrefix}-wrapper ` ">
    <div class = "content" :class="classPrefix && `${classPrefix}-content ` ">
      <slot/>
    </div>
    <Nav class = "nav"/>
  </div>
</template>

<script lang = "ts">
export default {
  props:[
      'classPrefix'
  ],
  name: "Layout"
}
</script>

<style lang = "scss" scoped>

.nav {
  box-shadow: 0 0 3px rgba(20, 20, 20, 0.25);
  z-index: 1;
}

.layout-wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: whitesmoke;
}

.content {
  display: flex;
  flex-grow:  1;
  flex-direction: column;
  overflow: auto;
}

</style>