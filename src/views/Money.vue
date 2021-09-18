<template>
  <div>
    <Layout>
      <div class = "types">
        <div class = "income">收入</div>
        <div class = "expense">支出</div>
      </div>
      <div class = "tags">
        分类
        <ul class = "current">
          <li>衣</li>
          <li>食</li>
          <li>住</li>
          <li>行</li>
        </ul>
        <div class = "new">新增标签</div>
      </div>

      <div class = "date">日期</div>
      <div class = "notes">
        <label class = "note">
          <span class="name">备注</span>
        <input class="value" type = "text">
        </label>
      </div>

      <div class = "amount">
        <div class="tag">标签</div>
        <div class="number">数额</div>
      </div>
      <div class = "numberPad">
        <button>1</button>
        <button>2</button>
        <button>3</button>
        <button>删除</button>
        <button>4</button>
        <button>5</button>
        <button>6</button>
        <button>+</button>
        <button>7</button>
        <button>8</button>
        <button>9</button>
        <button>-</button>
        <button>.</button>
        <button>0</button>
        <button>清零</button>
        <button>OK</button>
      </div>
    </Layout>
  </div>
</template>

<script lang = "ts">

export default {
  name: "",
}
</script>

<style lang = "scss" scoped>

</style>