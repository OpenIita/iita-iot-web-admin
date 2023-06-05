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
        editBtn: false,
        delBtn: false,
      }"
    >
      <template #status="{ row }">
        <el-switch v-model="row.status" disabled></el-switch>
      </template>
    </yt-crud>
  </div>
</template>
<script lang="ts" setup>
import { IColumn } from '@/components/common/types/tableCommon'

import YtCrud from '@/components/common/yt-crud.vue'

const column: IColumn[] = [{
  label: '消息类型',
  key: 'messageType',
}, {
  label: '消息内容',
  key: 'content',
  type: 'string',
  componentProps: {
    type: 'textarea',
    rows: 4,
  }
}, {
  label: '状态',
  key: 'status',
  type: 'switch',
  slot: true,
}, {
  label: '发送日期',
  key: 'createAt',
  type: 'date',
}]

const data = ref([
  {
    "id": "fa1c5eaa-de6e-48b6-805e-8f091c7bb831",
    "content": "你的设备【热水器】温度过高",
    "messageType": "alert",
    "status": true,
    "createAt": 1684824055058,
    "updateAt": 1684824055058
  },
  {
    "id": "fa1c5eaa-de6e-48b6-805e-8f091c7bb832",
    "content": "你的设备【热水器】温度过高",
    "messageType": "alert",
    "status": true,
    "createAt": 1684824055061,
    "updateAt": 1684824055061
  },
  {
    "id": "fa1c5eaa-de6e-48b6-805e-8f091c7bb833",
    "content": "你的设备【热水器】温度过高",
    "messageType": "alert",
    "status": false,
    "createAt": 1684824055061,
    "updateAt": 1684824055061
  },
  {
    "id": "fa1c5eaa-de6e-48b6-805e-8f091c7bb834",
    "content": "你的设备【热水器】温度过高",
    "messageType": "alert",
    "status": true,
    "createAt": 1684824055061,
    "updateAt": 1684824055061
  },
  {
    "id": "fa1c5eaa-de6e-48b6-805e-8f091c7bb835",
    "content": "你的设备【热水器】温度过高",
    "messageType": "alert",
    "status": false,
    "createAt": 1684824055062,
    "updateAt": 1684824055062
  },
  {
    "id": "fa1c5eaa-de6e-48b6-805e-8f091c7bb836",
    "content": "你的设备【热水器】温度过高",
    "messageType": "alert",
    "status": true,
    "createAt": 1684824055062,
    "updateAt": 1684824055062
  },
  {
    "id": "fa1c5eaa-de6e-48b6-805e-8f091c7bb837",
    "content": "你的设备【热水器】温度过高",
    "messageType": "alert",
    "status": true,
    "createAt": 1684824055062,
    "updateAt": 1684824055062
  },
  {
    "id": "fa1c5eaa-de6e-48b6-805e-8f091c7bb838",
    "content": "你的设备【热水器】温度过高",
    "messageType": "alert",
    "status": true,
    "createAt": 1684824055062,
    "updateAt": 1684824055062
  },
  {
    "id": "fa1c5eaa-de6e-48b6-805e-8f091c7bb839",
    "content": "你的设备【热水器】温度过高",
    "messageType": "alert",
    "status": false,
    "createAt": 1684824055063,
    "updateAt": 1684824055063
  },
  {
    "id": "fa1c5eaa-de6e-48b6-805e-8f091c7bb840",
    "content": "你的设备【热水器】温度过高",
    "messageType": "alert",
    "status": true,
    "createAt": 1684824055063,
    "updateAt": 1684824055063
  }
])
</script>

<!-- <style lang="scss" scoped>

</style> -->
