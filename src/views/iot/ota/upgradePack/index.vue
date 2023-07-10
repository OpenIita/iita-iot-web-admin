<template>
  <yt-crud
    ref="crudRef"
    :data="data"
    :loading="state.loading"
    :total="state.total"
    v-model:page="state.page"
    v-model:query="state.query"
    :tableProps="{
      editBtn: false,
    }"
    @on-load="getData"
    @saveFun="onSave"
    @delFun="onDelete"
    :column="column"
  >
    <template #urlForm="{ row }">
      <file-upload
        v-model="row.url"
        :is-show-tip="false"
        :file-size="10000"
        :limit="1"
        :file-type="[]"
        uploadUrl="/ota/package/upload"
        uploadType="url"
        @uploadSuccess="(list) => uploadSuccess(row, list)"
      ></file-upload>
    </template>
  </yt-crud>
</template>
<script lang="ts" setup>
import { IColumn } from '@/components/common/types/tableCommon'
import { getUpgradePack, addUpgradePack, delUpgradePack } from '../api/upgradePack.api'

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
    formSlot: true,
    componentProps: {

    },
    rules: [{
      required: true, message: '请上传升级包',
    }]
  },
  {
    label: '是否分包',
    key: 'isDiff',
    type: 'switch',
    componentProps: {
      defaultValue: false,
    }
  },
  {
    label: '签名方式',
    key: 'signMethod',
    type: 'select',
    componentProps: {
      defaultValue: 'md5',
      options: [{
        label: 'md5',
        value: 'md5',
      }]
    }
  },
  {
    label: '签名',
    key: 'sign',
    rules: [{
      required: true, message: '请输入签名',
    }]
  },
  {
    label: '版本',
    key: 'version',
    rules: [{
      required: true, message: '请输入版本',
    }]
  },
  {
    label: '模块',
    key: 'module',
    rules: [{
      required: true, message: '请输入模块',
    }]
  },
  {
    label: '包大小(KB)',
    key: 'size',
  },
  {
    label: '描述',
    key: 'desc',
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
const uploadSuccess = (row, list) => {
  console.log(row, list)
  if (list?.length > 0) {
    row.size = parseInt((list[0].size / 1024).toString())
  }
}
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
const onDelete = (row) => {
  state.loading = true
  delUpgradePack(row.id).then(res => {
    ElMessage.success('删除成功!')
    getData()
  }).finally(() => {
    state.loading = false
  })
}
</script>

<style lang="scss" scoped></style>
