<template>
  <el-dialog title="产品物模型" width="70%" v-model="state.visible" append-to-body top="20px">
    <div v-loading="state.loading">
      <el-tabs type="border-card">
        <el-tab-pane label="功能列表">
          <function-config :id="state.id" :model="state.model"></function-config>
        </el-tab-pane>
        <el-tab-pane label="TSL">
          <tsl :id="state.id" :model="state.model"></tsl>
        </el-tab-pane>
        <el-tab-pane label="型号配置">
          <model-number-config :id="state.id"></model-number-config>
        </el-tab-pane>
      </el-tabs>
    </div>
  </el-dialog>
</template>
<script lang="ts" setup>
import { useEmitt } from '@/hooks/web/useEmitt'
import { getObjectModel } from '../../api/products.api'

import FunctionConfig from './functionConfig.vue'
import ModelNumberConfig from './modelNumberConfig.vue'
import Tsl from './tsl.vue'
const state = reactive({
  loading: false,
  visible: false,
  id: '',
  model: {
    services: [],
    properties: [],
    events: [],
  } as any,
})
// 获取数据
const getInfo = (key: string) => {
  state.visible = true
  state.loading = true
  state.id = key
  getData()
}
const { emitter } = useEmitt({
  name: 'updateObjectModel',
  callback: () => getData()
})
const getData = () => {
  getObjectModel(state.id).then(res => {
    const data = res.data || {}
    state.model = data.model || {
      services: [],
      properties: [],
      events: [],
    }
  }).finally(() => {
    state.loading = false
  })
}
defineExpose({
  getInfo,
})
</script>

<!-- <style lang="less" scoped>

</style> -->
