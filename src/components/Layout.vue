<template>
  <div class = "nav-wrapper">
    <div class = "content">
      <slot/>
    </div>
    <Nav/>
  </div>
</template>

<script lang = "ts">
export default {
  name: "Layout"
}
</script>

<style lang = "scss" scoped>
.nav-wrapper {
  //border: 1px solid green;
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.content {
  display: flex;
  align-items: center;
  justify-content: center;
  //border: 1px solid blue;
  overflow: auto;
  flex-grow: 1;
}

</style>