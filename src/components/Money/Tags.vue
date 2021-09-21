<template>
  <ul class = "tags">
    <li>
      <Icon name = "服饰"/>
      服饰
    </li>
    <li>
      <Icon name = "饮食"/>
      饮食
    </li>
    <li>
      <Icon name = "住房"/>
      住房
    </li>
    <li>
      <Icon name = "交通"/>
      交通
    </li>
    <li>
      <Icon name = "通讯"/>
      通讯
    </li>
    <li>
      <Icon name = "学习"/>
      学习
    </li>
    <li>
      <Icon name = "水电"/>
      水电
    </li>
    <li>
      <Icon name = "日用"/>
      日用
    </li>
    <li>
      <Icon name = "娱乐"/>
      娱乐
    </li>
    <li>
      <Icon name = "美容"/>
      美容
    </li>
    <li>
      <Icon name = "医疗"/>
      医疗
    </li>
    <div class = "new">
      <Icon name = "右"/>
      新增标签
    </div>
  </ul>

</template>

<script lang = "ts">
export default {
  name: "Tags"
}
</script>

<style lang = "scss" scoped>
@import "~@/assets/style/helper.scss";

.tags {
  flex-grow: 1;
  display: flex;
  margin: 10px 0;
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
    border: 1px solid #88dede;
    width: 6em;
    height: 4em;

    svg {
      width: 50px;
      height: 50px;
    }
  }
}

.tags li:hover, .new:hover {
  transform: scale(1.05);
  box-shadow: 1px 2px 2px lightgray;
  background-color: rgb(157,225,225);

  svg {
    animation: shake 0.3s linear;
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