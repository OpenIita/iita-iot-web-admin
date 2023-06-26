<template>
  <div>
    <yt-crud
      v-bind="options"
      @onLoad="getData"
      :loading="state.loading"
      :total="state.total"
      v-model:page="state.page"
      v-model:query="state.query"
      @saveFun="onSave"
    >
      <template #state="scope">
        <el-tag v-if="scope.row.state.online" type="success" size="mini">在线</el-tag>
        <el-tag v-else type="danger" size="mini">离线</el-tag>
      </template>
      <template #menuSlot="scope">
        <!-- TODO: 没接口,nodeType无法获取，得改成 ！= 0 -->
        <el-button link icon="Box" :disabled="scope.row.nodeType == 0" @click="showChidrenDevices(scope.row)">子设备</el-button>
        <el-button link type="primary" icon="View" @click="handleView(scope.row.id)">详情</el-button>
        <el-popconfirm title="是否确认删除该数据" @confirm="handleDelete(scope.row)">
          <template #reference>
            <el-button link type="danger" icon="Delete">删除</el-button>
          </template>
        </el-popconfirm>
      </template>
    </yt-crud>
    <children-dialog ref="childrenDialogRef"></children-dialog>
  </div>
</template>
<script lang="ts" setup>
import { IColumn } from '@/components/common/types/tableCommon'
import { getDevicesList, deleteDevices, saveDevices } from '../api/devices.api'
import { getProductsList } from '../api/products.api'

import ChildrenDialog from './modules/childrenDialog.vue'
import YtCrud from '@/components/common/yt-crud.vue'
import { ElPopconfirm } from 'element-plus'


const state = reactive({
  page: {
    pageSize: 10,
    pageNum: 1,
  },
  total: 0,
  loading: false,
  query: {},
})

// 查看详情
const router = useRouter()
const handleView = (id: string) => {
  if (!id) return
  router.push(`devicesDetail/${id}`)
}

// 打开子设备
const childrenDialogRef = ref()
const showChidrenDevices = (row: any) => {
  childrenDialogRef.value.openDialog(row)
}

// 产品字典
const productOptions = ref([])
// 组列表
const groupOptions = [
  {
    'id': 'g3',
    'name': '组3',
    'uid': 'fa1c5eaa-de6e-48b6-805e-8f091c7bb831',
    'remark': '2223333',
    'deviceQty': 17,
    'createAt': 1659872082792
  },
  {
    'id': 'g2',
    'name': '组2',
    'uid': 'fa1c5eaa-de6e-48b6-805e-8f091c7bb831',
    'remark': '222',
    'deviceQty': 21,
    'createAt': 1659872082803
  },
  {
    'id': 'g1',
    'name': '分组1',
    'uid': 'fa1c5eaa-de6e-48b6-805e-8f091c7bb831',
    'remark': '1111',
    'deviceQty': 10,
    'createAt': 1659872082805
  }
]
const column = ref<IColumn[]>([{
  label: '设备ID',
  key: 'deviceId',
  formHide: true,
  rules: [{ required: true, message: 'ProductKey不能为空' }],
}, {
  label: '产品',
  key: 'productKey',
  type: 'select',
  search: true,
  tableWidth: 120,
  editDisabled: true,
  componentProps: {
    labelAlias: 'name',
    valueAlias: 'productKey',
    options: [],
  },
  rules: [{ required: true, message: '产品名称不能为空' }],
}, {
  label: '设备DN',
  key: 'deviceName',
  tableWidth: 240,
  componentProps: {
    placeholder: '一般为设备mac'
  },
  rules: [{ required: true, message: '设备DN不能为空' }],
  }
// , {
//     label: '分组',
//     key: 'group',
//     type: 'select',
//     componentProps: {
//       labelAlias: 'name',
//       valueAlias: 'id',
//       options: groupOptions,
//     },
//   }
  , {
  label: '状态',
  key: 'state',
  search: true,
  formHide: true,
  tableWidth: 80,
  slot: true,
}, {
  label: '关键字',
  key: 'key',
  search: true,
  hide: true,
  formHide: true,
}, {
  label: '创建时间',
  key: 'createAt',
  tableWidth: 180,
  type: 'date',
  formHide: true,
}])

const data = ref([])
const getData =  () => {
  state.loading = true
  getDevicesList({
    ...state.page,
    ...state.query,
  }).then((res) => {
    data.value = res.data.rows
    state.total = res.data.total
  }).finally(() => {
    state.loading = false
  })
}

const getDict = () => {
  getProductsList({
    pageNum: 1,
    pageSize: 99999,
  }).then(res => {
    column.value.forEach(item => {
      if (item.key === 'productKey') {
        item.componentProps.options = res.data.rows
      }
    })
  })
}
getDict()
// 保存数据
const onSave = async ({type, data, cancel}: any) => {
  state.loading = true
  await saveDevices(toRaw(data))

  state.loading = false
  cancel()
  getData()
}
// 删除
const handleDelete = async (row: any) => {
  state.loading = true
  await deleteDevices(row.id)
  ElMessage.success('删除成功!')
  state.loading = false
  getData()
}
const options = reactive({
  ref: 'crudRef',
  tableProps: {
    selection: false,
    delBtn: false,
    viewBtn: false,
    editBtn: true,
    menuSlot: true,
    menuWidth: 300,
  },
  data,
  column,
})
</script>

<!-- <style lang="scss" scoped>

</style> -->
