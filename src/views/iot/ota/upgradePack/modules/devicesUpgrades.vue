<template>
  <el-dialog title="设备升级" width="800" v-model="state.visible" :before-close="beforeClose" v-loading="state.loading">
    <el-transfer
      v-model="value"
      :props="{
        key: 'id',
        label: 'deviceName',
      }"
      :titles="['可选择设备', '已选择设备']"
      filterable
      :filter-method="filterMethod"
      filter-placeholder="搜索DN"
      :data="data"
    />
    <template #footer>
      <el-button>取消</el-button>
      <el-button type="primary">上传</el-button>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { getDevices } from '../../api/upgradePack.api'

const state = reactive({
  visible: false,
  id: '',
  loading: false,
})

const data = ref<any[]>([])
const value = ref([])
const getData = () => {
  state.loading = true
  getDevices({
    productKey: 'xpsYHExTKPFaQMS7',
  }).then(res => {
    data.value = res.data.rows || []
  }).finally(() => {
    state.loading = false
  })
}
const filterMethod = (query, item) => {
  return item.deviceName.toLowerCase().includes(query.toLowerCase())
}

const openDialog = (id: string) => {
  if (!id) return ElMessage.error('id为空')
  state.visible = true
  state.id = id
  getData()
}
const beforeClose = (done: () => void) => {
  data.value = []
  value.value = []
  done()
}
defineExpose({
  openDialog,
})
</script>

<style lang="scss" scoped>
:deep(.el-transfer-panel) {
  width: 300px;
}
:deep(.el-transfer-panel__filter) {
  width: 250px;
}
.el-transfer {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
