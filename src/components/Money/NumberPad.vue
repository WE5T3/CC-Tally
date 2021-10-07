<template>
  <div class = "numberPad">
    <div class = "amount">
      <div class = "rmb">¥</div>
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
      <button @click = "clearAll" class = "btnSvg">
        <Icon name = "清空"/>
      </button>
      <button @click = "ok" id = "ok" class = "btnSvg">
        <Icon name = "确定"/>
      </button>
    </div>
  </div>
</template>

<script lang = "ts">
import Vue from 'vue'
import {Component, Prop} from "vue-property-decorator";

@Component
export default class numberPad extends Vue {
  @Prop(Number) readonly value!: number
  computing: boolean = false
  output: string = this.value.toString()
  svgEqual = '<svg data-v-abc9f7ae="" data-v-6980a65b="" class="icon"><use data-v-abc9f7ae="" xlink:href="#等于"></use></svg>'
  svgSubmit = '<svg data-v-abc9f7ae="" data-v-6980a65b="" class="icon"><use data-v-abc9f7ae="" xlink:href="#确定"></use></svg>'

  inputContent(event: MouseEvent) {
    const button = (event.target as HTMLButtonElement)
    // const input = button.textContent as string  //两种写法
    const input = button.textContent!

    //长度判断
    if (this.output.indexOf('+' || '-') < 0 && this.output.length >= 18) {
      alert('输入数值太大,放不下啦!')
      return;
    } else if (this.output.indexOf('+' || '-') >= 0 && this.output.length >= 21) {
      alert('输入算式太长,放不下啦!')
      return;
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

    //限制小数点后两位
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
    const okButton = document.querySelector('#ok')!
    if (this.output.length === 1) {
      this.output = '0'
    } else {
      this.output = this.output.substring(0, this.output.length - 1)
    }
    if (this.output.indexOf('+' || '-') < 0) {
      okButton.innerHTML = '<svg data-v-abc9f7ae="" data-v-6980a65b="" class="icon"><use data-v-abc9f7ae="" xlink:href="#确定"></use></svg>'
    }
  }

  clearAll() {
    this.output = '0'
  }

  calculator(event: MouseEvent) {
    const button = (event.currentTarget as HTMLButtonElement)
    const input = button.id
    const okButton = document.querySelector('#ok')!

    // √和= 切换
    if (input === '-' || '+') {
      if (this.output.indexOf('+' || '-') < 0) {
        okButton.innerHTML = this.svgEqual
      }
    }
    this.computing = okButton.innerHTML === this.svgEqual;
    if (this.output.substr(-1, 1) === '+' && input === '+' || this.output.substr(-1, 1) === '-' && input === '-') {
      return;
    } else if (this.output.substr(-1, 1) === '+' && input === '-' || this.output.substr(-1, 1) === '-' && input === '+') {
      this.output = this.output.slice(0, -1);
      this.output += input
    } else if (this.output.substr(-1, 1) === '.' && (input === ('-') || input === ('+'))) {
      if ('+-'.indexOf(this.output.substr(-2, 1)) >= 0) {
        return;
      }
      this.output = this.output.slice(0, -1);
      this.output += input
    } else {
      this.output += input
    }
  }

  ok() {
    const okButton = document.querySelector('#ok')!
    okButton.innerHTML = this.svgSubmit

    if ('+-'.indexOf(this.output.substr(-1, 1)) >= 0) {
      this.output = this.output.slice(0, -1);
    } else if (this.output.substr(-1, 1) === '.' && '+-'.indexOf(this.output.substr(-2, 1)) >= 0) {
      this.output = this.output.slice(0, -2);
    }

    if (!this.computing) {
      this.output = eval(this.output).toFixed(2)
      const number = parseFloat(this.output)
      this.$emit('update:value', number)
      this.$emit('submit', number)
      this.output = '0'
    } else {
      this.output = eval(this.output).toFixed(2)
      this.computing = false
    }
  }


}

</script>

<style lang = "scss" scoped>
@import "~@/assets/style/helper.scss";

.numberPad {
  .amount {
    @extend %innerShadow;
    display: flex;
    justify-content: flex-end;
    font-size: 24px;
    padding-right: 8px;
    height: 37px;
    font-family: Consolas, monospace;
    font-weight: lighter;
    background-color: $bottomColor;

    .rmb {
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
      font-weight: bold;
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
