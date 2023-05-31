<template>
  <div>
    <el-tabs type="border-card">
      <el-tab-pane label="功能列表">
        <function-config></function-config>
      </el-tab-pane>
      <el-tab-pane label="TSL">
        <tsl></tsl>
      </el-tab-pane>
      <el-tab-pane label="型号配置">
        <model-number-config></model-number-config>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script lang="ts" setup>
import FunctionConfig from './functionConfig.vue'
import ModelNumberConfig from './modelNumberConfig.vue'
import Tsl from './tsl.vue'



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
