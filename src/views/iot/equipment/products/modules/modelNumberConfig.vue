<template>
  <yt-table-fun @handle-add="handleAdd">
    <yt-table :selection="false" :page-hide="true" :column="column" :data="data" :view-btn="false" @handle-update="handleUpdate">
      <template #model="{ row }">
        <div>{{ row.model.endsWith("_default") ? "默认" : row.model }}</div>
      </template>
      <template #type="{ row }">
        <div>{{ JSON.stringify(row.dataType.type) || '-' }}</div>
      </template>
      <template #specs="{ row }">
        <div>{{ JSON.stringify(row.dataType.specs) || '-' }}</div>
      </template>
    </yt-table>
  </yt-table-fun>
  <modelNumber-detail ref="modelNumberDetailRef"></modelNumber-detail>
</template>
<script lang="ts" setup>
import { IColumn } from '@/components/common/types/tableCommon'
import { propTypes } from '@/utils/propTypes'
import { getProductModelList, saveProductModel } from '../../api/products.api'

import ModelNumberDetail from './modeuls/modelNumberDetail.vue'
import YtTableFun from '@/components/common/yt-table-fun.vue'
import YtTable from '@/components/common/yt-table'

const props = defineProps({
  id: propTypes.string.def(''),
})
const modelNumberDetailRef = ref()
const handleAdd = () => {
  modelNumberDetailRef.value.openDialog()
}
const handleUpdate = (row: any) => {
  modelNumberDetailRef.value.openDialog(toRaw(row))
}
const column = ref<IColumn[]>([
  {
    label: '型号',
    key: 'model',
  },
  {
    label: '名称',
    key: 'name',
  },
  {
    label: '脚本状态',
    key: 'state',
  },
  {
    label: '修改时间',
    key: 'modifyAt',
    type: 'date',
  },
])
const data = ref([])
const loading = ref(false)
const getData = (key: string) => {
  loading.value = true
  getProductModelList(key).then((res) => {
    if (res.code === 200) {
      data.value = res.data
    }
    console.log(res)
  }).finally(() => {
    loading.value = false
  })
}
watch(() => props.id, (newV) => {
  if (newV) getData(newV)
}, {
  immediate: true,
})
</script>

<!-- <style lang="scss" scoped>

</style> -->
