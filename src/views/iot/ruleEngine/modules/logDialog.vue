<template>
  <el-dialog ref="logDialogRef" width="70%" :title="title" v-model="dialog">
    <div class="mb10">
      <el-button type="primary" plain icon="Refresh">刷新</el-button>
      <ElPopconfirm title="是否确认删除该规则所有日志？">
        <template #reference>
          <el-button type="danger" plain icon="Delete" :disabled="false">删除该规则所有日志</el-button>
        </template>
      </ElPopconfirm>
    </div>
    <yt-table :data="data" :column="column" :menu="false" :selection="false">
      <template #state="scope">
        {{ getStateName(scope.row.state) }}
      </template>
      <template #success="scope">
        {{ scope.row.success ? "成功" : "失败" }}
      </template>
    </yt-table>
  </el-dialog>
</template>
<script lang="ts" setup>
import { propTypes } from '@/utils/propTypes'

import ytTable from '@/components/common/yt-table'
import { IColumn } from '@/components/common/types/tableCommon'
const props = defineProps({
  title: propTypes.string.def('日志'),
  gutter: propTypes.number.def(12),
  span: propTypes.number.def(4)
})
const getStateName = (state: string) => {
  console.log(state)
  switch (state) {
    case 'matched_listener':
      return '匹配到监听器,过滤器执行失败'
    case 'matched_filter':
      return '过滤器执行通过,动作执行失败'
    case 'unmatched_filter':
      return '过滤器执行未通过'
    case 'executed_action':
      return '动作执行完成'
  }
  return ''
}

const data = ref([
  {
    'id': '74999c3d-4dfa-400b-a4e7-48c3de07804b',
    'ruleId': '6b253651-f4f9-44b9-a802-115b668b68e1',
    'state': 'unmatched_filter',
    'content': null,
    'success': null,
    'logAt': 1678102652147
  },
  {
    'id': '7247e6ef-267a-40d1-bb8c-7d42b921c5f4',
    'ruleId': '6b253651-f4f9-44b9-a802-115b668b68e1',
    'state': 'unmatched_filter',
    'content': null,
    'success': null,
    'logAt': 1678102652248
  },
  {
    'id': 'd8b625f5-79a5-44e0-b3d8-0e8b1b7909b3',
    'ruleId': '6b253651-f4f9-44b9-a802-115b668b68e1',
    'state': 'unmatched_filter',
    'content': null,
    'success': null,
    'logAt': 1678102652586
  },
  {
    'id': '9c712cec-5ea6-4835-bed6-0190edbb669c',
    'ruleId': '6b253651-f4f9-44b9-a802-115b668b68e1',
    'state': 'unmatched_filter',
    'content': null,
    'success': null,
    'logAt': 1678102652552
  },
  {
    'id': 'bc6628b9-a524-4ca2-a517-6527a3c670bf',
    'ruleId': '6b253651-f4f9-44b9-a802-115b668b68e1',
    'state': 'unmatched_filter',
    'content': null,
    'success': null,
    'logAt': 1678102652623
  },
  {
    'id': '3385fcbe-9d8c-4030-b2a9-aabd5c7115d6',
    'ruleId': '6b253651-f4f9-44b9-a802-115b668b68e1',
    'state': 'unmatched_filter',
    'content': null,
    'success': null,
    'logAt': 1678102652657
  },
  {
    'id': '5ede6b6a-0627-4d98-96fd-75763ae45f14',
    'ruleId': '6b253651-f4f9-44b9-a802-115b668b68e1',
    'state': 'unmatched_filter',
    'content': null,
    'success': null,
    'logAt': 1678102652596
  },
  {
    'id': 'ebe49358-f788-4481-8792-e713d153be78',
    'ruleId': '6b253651-f4f9-44b9-a802-115b668b68e1',
    'state': 'unmatched_filter',
    'content': null,
    'success': null,
    'logAt': 1678102652631
  },
  {
    'id': '492f3422-46e3-4516-9d35-cbc3fdd841f2',
    'ruleId': '6b253651-f4f9-44b9-a802-115b668b68e1',
    'state': 'unmatched_filter',
    'content': null,
    'success': null,
    'logAt': 1678102662687
  },
  {
    'id': '659fc74a-bd79-4ee4-a676-e675d7ef3606',
    'ruleId': '6b253651-f4f9-44b9-a802-115b668b68e1',
    'state': 'unmatched_filter',
    'content': null,
    'success': null,
    'logAt': 1678102662752
  }
])
const column = ref<IColumn[]>([{
  label: '状态',
  key: 'state',
  slot: true,
}, {
  label: '执行结果',
  key: 'success',
  slot: true,
}, {
  label: '详细信息',
  key: 'content',
  }, {
  label: '执行时间',
  key: 'logAt',
  type: 'date',
}])

const dialog = ref(false)
const logDialogRef = ref()
// 打开日志
const openDialog = (id: string) => {
  dialog.value = true
}
defineExpose({
  openDialog,
})
</script>
