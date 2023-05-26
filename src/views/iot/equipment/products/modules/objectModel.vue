<template>
  <div>物模型呢</div>
</template>
<script lang="ts" setup>

console.log(111)
// 获取数据
const getInfo = (id: string) => {
  console.log(id)
}
defineExpose({
  getInfo,
})
</script>

<!-- <style lang="less" scoped>

</style> -->
