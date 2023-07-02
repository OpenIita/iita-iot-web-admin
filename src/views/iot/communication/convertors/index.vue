<template>
  <div>
    <yt-crud
      ref="crudRef"
      :data="data"
      :column="column"
      v-model:page="state.page"
      v-model:query="state.query"
      :total="state.total"
      :loading="state.loading"
      :tableProps=" {
        selection: false,
        viewBtn: false,
        menuSlot: true,
        menuWidth: 300,
      }"
      @onLoad="getData"
      @delFun="onDelete"
      @saveFun="onSave"
    >
      <template #menuSlot="scope">
        <el-tooltip class="box-item" effect="dark" content="编辑转换脚本" placement="top">
          <el-button link type="primary" icon="Switch" @click="handleConversionScript(scope.row)"></el-button>
        </el-tooltip>
      </template>
    </yt-crud>
    <conversion-script title="转换脚本" ref="conversionScriptRef"></conversion-script>
  </div>
</template>
<script lang="ts" setup>
import { IColumn } from '@/components/common/types/tableCommon'

import ConversionScript from '../modules/conversionScript.vue'
import YtCrud from '@/components/common/yt-crud.vue'
import { getConvertorsList, IConvertorsVO, saveConvertors, deleteConvertors } from '../api/convertors.api'

// 转换脚本
const conversionScriptRef = ref()
const handleConversionScript = (row: any) => {
  conversionScriptRef.value.openDialog(row)
}

const column: IColumn[] = [{
  label: '名称',
  key: 'name',
  search: true,
  rules: [{ required: true, message: '名称不能为空' }],
}, {
  label: '说明',
  key: 'desc',
  componentProps: {
    rows: 4,
    type: 'textarea'
  }
}, {
  label: '创建时间',
  key: 'createAt',
  type: 'date',
  sortable: true,
  formHide: true,
}]

const data = ref<IConvertorsVO[]>([])
const state = reactive({
  total: 0,
  page: {
    pageSize: 10,
    pageNum: 1,
  },
  query: {},
  loading: false
})
const getData = () => {
  state.loading = true
  getConvertorsList({
    ...state.page,
    ...state.query,
  }).then(res => {
    data.value = res.data.rows || []
    state.total = res.data.total
  }).finally(() => {
    state.loading = false
  })
}
// 保存数据
const onSave = ({type, data, cancel}: any) => {
  state.loading = true
  saveConvertors(toRaw(data)).then(res => {
    ElMessage.success(type === 'add' ? '添加成功' : '编辑成功')
    cancel()
    getData()
  }).finally(() => {
    state.loading = false
  })

}
// 删除
const onDelete = async (row: any) => {
  state.loading = true
  deleteConvertors(row.id).then(res => {
    ElMessage.success('删除成功!')
    getData()
  }).finally(() => {
    state.loading = false
  })
}
</script>

<!-- <style lang="scss" scoped>

</style> -->
