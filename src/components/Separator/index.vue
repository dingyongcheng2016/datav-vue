<template>
  <div class="separator" />
</template>

<script>
  export default {
    name: 'separator'
  }
</script>

<style lang="less" scoped>
  .separator {
    width: 100%;
    height: 10px;
    background: rgb(92, 88, 89);
    filter: blur(0px); // 高斯模糊
    backdrop-filter: blur(0px); // backdrop-filter:透过该层的底部元素模糊化
  }
</style>
