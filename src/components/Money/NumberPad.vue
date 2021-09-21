<template>
  <div class = "numberPad">
    <div class = "amount">
      <div class = "tag">¥</div>
      <div class = "output">{{ output }}</div>
    </div>
    <div class = "buttons">
      <button @click = "inputContent">7</button>
      <button @click = "inputContent">8</button>
      <button @click = "inputContent">9</button>
      <button @click = "remove" class = "btnSvg">
        <Icon name = "退格"/>
      </button>
      <button @click = "inputContent">4</button>
      <button @click = "inputContent">5</button>
      <button @click = "inputContent">6</button>
      <button @click = "calculator" id = "+" class = "btnSvg">
        <Icon name = "加号"/>
      </button>
      <button @click = "inputContent">1</button>
      <button @click = "inputContent">2</button>
      <button @click = "inputContent">3</button>
      <button @click = "calculator" id = "-" class = "btnSvg">
        <Icon name = "减号"/>
      </button>
      <button @click = "inputContent" class = "point">.</button>
      <button @click = "inputContent">0</button>
      <button @click = "calender" class = "btnSvg">
        <Icon name = "日历"/>
      </button>
      <button @click = "ok" id = "ok" class = "btnSvg">
        <Icon name = "确定"/>
      </button>
    </div>
  </div>
</template>

<script lang = "ts">
import Vue from 'vue'
import {Component} from "vue-property-decorator";

@Component
export default class numberPad extends Vue {
  output: string = ''

  inputContent(event: MouseEvent) {
    const button = (event.target as HTMLButtonElement)
    // const input = button.textContent as string  //两种写法
    const input = button.textContent!
    const okButton = document.querySelector('#ok')!

    if (this.output.indexOf('+' || '-') < 0 && this.output.length >= 18) {
      alert('输入数值太大,放不下啦!')
      return;
    } else if (this.output.indexOf('+' || '-') >= 0 && this.output.length >= 21) {
      alert('输入算式太长,放不下啦!')
      return;
    }
    if (this.output.indexOf('+') >= 0 || this.output.indexOf('-') >= 0) {
      okButton.innerHTML = '<svg data-v-abc9f7ae="" data-v-6980a65b="" class="icon"><use data-v-abc9f7ae="" xlink:href="#等于"></use></svg>'
    } else {
      okButton.innerHTML = '<svg data-v-abc9f7ae="" data-v-6980a65b="" class="icon"><use data-v-abc9f7ae="" xlink:href="#确定"></use></svg>'
    }
    if (this.output === '0') {
      if ('0123456789'.indexOf(input) >= 0) {
        this.output = input
      } else {
        this.output += input
      }
      return
    }
    let number1 = this.output.split(/-|[+]/).pop() as string
    let number2 = number1.split('.').pop() as string
    if (number1[0] === '0' || '.') {
      if (number1.indexOf('.') >= 0) {
        if (number2.length >= 2) {
          return;
        }
      }
    }

    if (number1[0] === '0' && (number1.indexOf('.') < 0) && input !== '.') {
      this.output = this.output.slice(0, -1);
      this.output += input
      return;
    }
    if (number1.indexOf('.') >= 0 && input === '.') {
      return;
    }
    this.output += input

  }

  remove() {
    if (this.output.length === 1) {
      this.output = '0'
    } else {
      this.output = this.output.substring(0, this.output.length - 1)
    }
  }


  calculator(event: MouseEvent) {
    const button = (event.currentTarget as HTMLButtonElement)
    const input = button.id

    if (this.output.substr(-1, 1) === '+' && input === '+' || this.output.substr(-1, 1) === '-' && input === '-') {
      return;
    } else if (this.output.substr(-1, 1) === '+' && input === '-' || this.output.substr(-1, 1) === '-' && input === '+') {
      this.output = this.output.slice(0, -1);
      this.output += input
    } else if (this.output.substr(-1, 1) === '.' && (input === ('-') || input === ('+'))) {
      if (this.output.substr(-2, 1) === '+' || '-') {
        return;
      }
      // console.log(this.output.slice(0, -1))
      this.output = this.output.slice(0, -1);
      this.output += input
    } else {
      this.output += input
    }

  }


  calender() {
    console.log('calender')
  }

  ok() {

    this.output = eval(this.output).toFixed(2)
    console.log(eval(this.output).toFixed(2));
    console.log('ok');
  }
}

</script>

<style lang = "scss" scoped>
@import "~@/assets/style/helper.scss";

.numberPad {
  .amount {
    @extend %innerShadow;
    display: flex;
    justify-content: right;
    font-size: 24px;
    padding-right: 8px;
    height: 37px;
    font-family: Consolas, monospace;
    font-weight: lighter;
    background-color: $bottomColor;

    .tag {
      color: #50bebe;
      padding-right: 2px;
    }

    .output {
      font-weight: bolder;
    }
  }

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

.btnSvg, .point {
  font-size: 25px;
}
</style>


初步完成NumberPad组件,新增金额加减功能
