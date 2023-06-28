<template>
  <yt-crud
    ref="crudRef"
    :data="data"
    :loading="state.loading"
    :total="state.total"
    v-model:page="state.page"
    v-model:query="state.query"
    @on-load="getData"
    @saveFun="onSave"
    :column="column"
  >
  </yt-crud>
</template>
<script lang="ts" setup>
import { IColumn } from '@/components/common/types/tableCommon'
import { getUpgradePack, addUpgradePack } from '../api/upgradePack.api'
const column: IColumn[] = [
  {
    label: 'ID',
    key: 'id',
    formHide: true,
  },
  // {
  //   label: 'URL',
  //   key: 'url',
  // },
  {
    label: '升级包',
    key: 'url',
    type: 'upload',
    componentProps: {
      isShowTip: false,
      fileSize: 10000000,
      fileType: [],
      uploadFileUrl: '/ota/package/upload'
    }
  },
  {
    label: '是否分包',
    key: 'isDiff',
    type: 'switch',
  },
  {
    label: '签名方式',
    key: 'signMethod',
  },
  {
    label: '签名',
    key: 'versions',
  },
  {
    label: '版本',
    key: 'version',
  },
  {
    label: '模块',
    key: 'module',
  },
  {
    label: '包大小',
    key: 'module',
  },
  {
    label: '描述',
    key: 'modules',
    hide: true,
    componentProps: {
      type: 'textarea',
      rows: 4,
    }
  },
]

const data = ref()
const state = reactive({
  page: {
    pageSize: 10,
    pageNum: 1,
  },
  total: 0,
  loading: false,
  query: {},
})
const onSave = ({ type, data, cancel }: any) => {
  addUpgradePack(toRaw(data)).then(res => {
    ElMessage.success('新增成功')
    cancel()
    getData()
  })
}
const getData = () => {
  state.loading = true
  getUpgradePack({
    ...state.page,
  }).then((res) => {
    data.value = res.data.rows
    state.total = res.data.total
  })
  state.loading = false
}
</script>

<style lang="scss" scoped></style>
