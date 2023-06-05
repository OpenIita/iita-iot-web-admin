<template>
  <div>
    <yt-crud
      ref="crudRef"
      :data="data"
      :column="column"
      :fun-props="{
        addBtn: false,
      }"
      :table-props="{
        Selection: false,
      }"
    ></yt-crud>
  </div>
</template>
<script lang="ts" setup>
import { IColumn } from '@/components/common/types/tableCommon'

import YtCrud from '@/components/common/yt-crud.vue'

const column: IColumn[] = [{
  label: '名称',
  key: 'name',
  search: true,
  rules: [{ required: true, message: '告警名称不能为空' }],
}, {
  label: '告警等级',
  key: 'level',
  tableWidth: 120,
  search: true,
  type: 'select',
  rules: [{ required: true, message: '请选择告警等级' }],
  componentProps: {
    options: [{
      label: 1,
      value: 1,
    }, {
      label: 2,
      value: 2,
    }, {
      label: 3,
      value: 3,
    }, {
      label: 4,
      value: 4,
    }, {
      label: 5,
      value: 5,
    }],
  }
}, {
  label: '是否已读',
  key: 'read',
  tableWidth: 120,
  type: 'switch',
}, {
  label: '告警时间',
  key: 'alertTime',
  type: 'date',
  tableWidth: 180,
}, {
  label: '告警内容',
  key: 'details',
  tableWidth: 250,
  componentProps: {
    type: 'textarea',
    rows: 4,
  }
}]


const data = ref([])
</script>

<!-- <style lang="scss" scoped>

</style> -->
