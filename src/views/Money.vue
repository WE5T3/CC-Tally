<template>
  <div>
    <Layout content-class = "layout">
      <div class = "types">
        <div class = "expense">支出</div>
        <div class = "income">收入</div>
      </div>

      <ul class = "current">
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

      <div class = "date">
        日期
        <div class = "datePicker">2020-09-18</div>
      </div>
      <label class = "notes">
        <span class = "name">备注</span>
        <input class = "value" type = "text" placeholder = "#请添加备注#">
      </label>
      <div class = "amount">
        <div class = "tag">标签</div>
        <div class = "number">数额</div>
      </div>

      <div class = "numberPad">
        <div class = "buttons">
          <button>1</button>
          <button>2</button>
          <button>3</button>
          <button class="btnSvg"><Icon name = "退格"/></button>
          <button>4</button>
          <button>5</button>
          <button>6</button>
          <button class="btnSvg"><Icon name = "加号"/></button>
          <button>7</button>
          <button>8</button>
          <button>9</button>
          <button class="btnSvg"><Icon name = "减号"/></button>
          <button class="btnSvg"><Icon name = "小数点"/></button>
          <button>0</button>
          <button class="btnSvg"><Icon name = "日历"/></button>
          <button class="btnSvg"><Icon name = "确定"/></button>
        </div>
      </div>
    </Layout>
  </div>
</template>

<script lang = "ts">

export default {
  name: "Money",
}
</script>

<style lang = "scss">

.content {
  display: flex;
}

</style>

<style lang = "scss" scoped>

@import "~@/assets/style/helper.scss";

.types {
  display: flex;
  justify-content: center;
  background-color: $bottomColor;

  div {
    text-align: center;
    width: 100px;
    border-radius: 7px;
    margin: 0 1px;
    padding: 4px;
  }

  .expense {
    background-color: $tfn2;
  }

  .income {
    background-color: #cfd9d8;
  }

}

.current {
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
    svg{
      width:50px;
      height: 50px;
    }
  }
}
.current li:hover,.new:hover{
  transform: scale(1.05);
  box-shadow: 1px 2px 2px lightgray;
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
.date, .amount {
  padding: 8px;
  background-color: $bottomColor;
}

.date {
  display: flex;
  justify-content: space-between;
  @extend %innerShadow;
}

.notes {
  padding-left: 8px;
  background-color: $bottomColor;
  display: flex;
  align-items: center;

  input {
    text-align: right;
    line-height: 40px;
    width: 80%;
    font-size: 16px;
    flex-grow: 1;
    background-color: transparent;
    height: 40px;
    border: none;
    margin-right: 10px;
  }
}

.amount {
  @extend %innerShadow;
  display: flex;
  justify-content: space-between;
}

.btnSvg{
  font-size: 25px;
}

.numberPad {
  .buttons {
    @extend %clearFix;

    > button {
      width: 25%;
      height: 64px;
      float: left;
      background: transparent;
      border: none;


      $bg: #88dede;

      &:nth-child(1) {
        background: $bg;
      }

      &:nth-child(2), &:nth-child(5) {
        background: darken($bg, 4%);
      }

      &:nth-child(3), &:nth-child(6), &:nth-child(9) {
        background: darken($bg, 4*2.5%);
      }

      &:nth-child(4), &:nth-child(7), &:nth-child(10), &:nth-child(13) {
        background: darken($bg, 4*4%);
      }

      &:nth-child(8), &:nth-child(11), &:nth-child(14) {
        background: darken($bg, 4*5.5%);
      }

      &:nth-child(12), &:nth-child(15) {
        background: darken($bg, 4*6.5%);
      }

      &:nth-child(16) {
        background: darken($bg, 4*7.5%);
      }
    }
  }
}
</style>