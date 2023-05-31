<template>
  <yt-table-fun @handle-add="handleAdd">
    <yt-table :selection="false" :page-hide="true" :column="column" :data="data" :view-btn="false" @handle-update="handleUpdate">
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

import ModelNumberDetail from './modeuls/modelNumberDetail.vue'
import YtTableFun from '@/components/common/yt-table-fun.vue'
import YtTable from '@/components/common/yt-table'

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
const data = ref([
  {
    "id": "M1",
    "model": null,
    "name": "型号1",
    "productKey": "AWcJnf7ymGSkaz5M",
    "type": "LuaScript",
    "script": "\nfunction decode(msg)\n   return {\n        ['identifier'] = 'report',\n        ['mid'] = '1',\n        ['type'] = 'property',\n        ['data'] ={\n            ['power']=string.sub(msg.data,3,3)\n        }\n    }\nend\n\nfunction encode(service)\n    return {\n\t['mid'] = 1,\n\t['model'] = 'M1',\n\t['mac'] = service.deviceName,\n\t['data'] = 'BB2'\n  }\nend\n",
    "state": "publish",
    "modifyAt": 1659872084000
  }
].map((m: any) => ({
  ...m,
  raw: m,
  model: m.model || {
    properties: [],
    events: [],
    services: [],
  }
})))
console.log(data.value)
// 获取数据
const getInfo = (id: string) => {
  console.log(id)
}
defineExpose({
  getInfo,
})
</script>

<!-- <style lang="scss" scoped>

</style> -->
