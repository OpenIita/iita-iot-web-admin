<template>
  <yt-crud ref="crudRef" :data="data" :column="column" :selection="false">
    <template #sloo="scope">
      <el-input v-model="scope.row.sloo"></el-input>
    </template>
    <template #slots3Form="scope">
      <el-input v-model="scope.row.sloo"></el-input>
    </template>
    <template #slots2Search="scope">
      <el-input v-model="scope.row.sloo"></el-input>
    </template>
  </yt-crud>
</template>
<script lang="ts" setup>
import { IColumn } from '@/components/common/types/tableCommon'

import YtCrud from '@/components/common/yt-crud.vue'

const column: IColumn[] = [{
  label: 'id',
  key: 'id',
  rules: [{ required: true, message: 'id不能为空' }],
}, {
  label: '名称',
  key: 'name',
  rules: [{ required: true, message: '名称不能为空' }],
}, {
  label: '添加日期',
  key: 'createAt',
  type: 'date',
  formHide: true,
}]

const data = ref([
  {
    id: 'switch',
    name: '开关',
    createAt: 1647599367057
  },
  {
    id: 'sensor',
    name: '传感器',
    createAt: 1649743382683
  },
  {
    id: 'meter',
    name: '表计',
    createAt: 1654237582120
  },
  {
    id: 'light',
    name: '灯',
    createAt: 1650174762755
  },
  {
    id: 'gateway',
    name: '网关',
    createAt: 1646637047902
  },
  {
    id: 'fan',
    name: '风扇',
    createAt: 1646630215889
  },
  {
    id: 'door',
    name: '门磁',
    createAt: 1650173898298
  },
  {
    id: 'SmartPlug',
    name: '智能插座',
    createAt: 1645409421118
  },
  {
    id: 'T100',
    name: 'T100',
    createAt: 1681807566413
  }
])
</script>

<!-- <style lang="scss" scoped>

</style> -->
