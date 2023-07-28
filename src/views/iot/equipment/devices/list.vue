<template>
  <div>
    <yt-crud
      v-bind="options"
      ref="crudRef"
      @onLoad="getData"
      :fun-props="{
        exportBtn: true,
        delBtn: layoutType !== 'card',
      }"
      :table-props="{
        selection: true,
        delBtn: false,
        viewBtn: false,
        editBtn: true,
        customTable: layoutType === 'card',
        menuSlot: true,
        menuWidth: 300,
      }"
      :loading="state.loading"
      :total="state.total"
      v-model:page="state.page"
      v-model:query="state.query"
      @delFun="handleDelete"
      @saveFun="onSave"
      @openBeforeFun="openBeforeFun"
    >
      <template #rightToolbar>
        <el-radio-group v-model="layoutType">
          <el-radio-button label="table">
            <svg-icon icon-class="table2" />
          </el-radio-button>
          <el-radio-button label="card">
            <svg-icon icon-class="card" />
          </el-radio-button>
        </el-radio-group>
      </template>
      <template #customTable>
        <el-row class="card-list flex">
          <el-col class="card-item" v-for="(item, index) in data" :key="index" :class="item.state.online ? 'success-box' : 'error-box'">
            <div class="text-box">
              <div class="title flex align-center">
                <div class="title-l">
                  <div class="icon">
                    <svg-icon icon-class="card2" />
                  </div>
                  {{ item.deviceName }}
                </div>
                <div class="title-r">
                  <status-tag :type="item.state.online ? 'success' : 'danger'" :text="item.state.online ? '在线' : '离线'" />
                </div>
              </div>
              <div class="text flex">
                <div class="txt">
                  <div class="txt-item">
                    <div class="label">所属产品</div>
                    <div class="value active">{{ getProductName(item.productKey) }}</div>
                  </div>
                  <div class="txt-item">
                    <div class="label">设备类型</div>
                    <div class="value">{{ getNodeTypeName(item.productKey) }}</div>
                  </div>
                  <div class="txt-item">
                    <div class="copy-tag" v-copyText="item.deviceId" v-copyText:callback="copyIdSuccess">
                      <svg-icon icon-class="copy" />
                      设备ID
                    </div>
                  </div>
                </div>
                <div class="img">
                  <img :src="defaultImg" alt="" />
                </div>
              </div>
            </div>
            <div class="btn-group">
              <el-button
                v-if="item.productKey === 'openiitagateway01'"
                class="cu-btn"
                type="success"
                icon="Box"
                plain
                @click="showChidrenDevices(item)"
                >子设备</el-button
              >
              <el-button class="cu-btn" type="primary" icon="EditPen" plain @click="crudRef.handleUpdate(item)">编辑</el-button>
              <el-button class="cu-btn" type="warning" icon="View" plain @click="handleView(item)">详情</el-button>
              <el-divider direction="vertical" />
              <el-popconfirm title="是否确认删除?" @confirm="handleDelete(item)">
                <template #reference>
                  <el-button type="danger" icon="Delete" plain />
                </template>
              </el-popconfirm>
            </div>
          </el-col>
        </el-row>
      </template>
      <template #state="scope">
        <el-tag v-if="scope.row.state.online" type="success" size="small">在线</el-tag>
        <el-tag v-else type="danger" size="small">离线</el-tag>
      </template>
      <template #menuSlot="scope">
        <!-- TODO: 没接口,nodeType无法获取，得改成 ！= 0 -->
        <el-tooltip class="box-item" effect="dark" content="子设备" placement="top">
          <el-button link icon="Box" :disabled="scope.row.nodeType == 0" @click="showChidrenDevices(scope.row)" />
        </el-tooltip>
        <el-divider direction="vertical" />
        <el-tooltip class="box-item" effect="dark" content="详情" placement="top">
          <el-button link type="primary" icon="View" @click="handleView(scope.row)" />
        </el-tooltip>
        <el-divider direction="vertical" />
        <el-tooltip class="box-item" effect="dark" content="删除" placement="top">
          <el-popconfirm title="是否确认删除该数据" @confirm="handleDelete(scope.row)">
            <template #reference>
              <el-button link type="danger" icon="Delete" />
            </template>
          </el-popconfirm>
        </el-tooltip>
      </template>
      <template #type="{ row }">{{ getNodeTypeName(row.productKey) }}</template>
      <template #deviceMapFormItem="{ row }">
        <div v-if="state.showDeviceMap">
          <Map :clickMap="true" @locateChange="(lnglat) => locateChange(lnglat, row)" :isWrite="true" v-model:center="state.mapLnglat" />
        </div>
      </template>
    </yt-crud>
    <children-dialog ref="childrenDialogRef" />
  </div>
</template>

<script lang="ts" setup>
import defaultImg from '@/assets/images/pic_device.png'
import { IColumn } from '@/components/common/types/tableCommon'
import { ComponentInternalInstance } from 'vue'
import { getDevicesList, deleteDevices, saveDevices,getParentDevices, deleteBatchDevices } from '../api/devices.api'
import { getProductsList,IProductsVO } from '../api/products.api'

import Map from '@/components/Map/index.vue'
import ChildrenDialog from './modules/childrenDialog.vue'
import YtCrud from '@/components/common/yt-crud.vue'
import { ElPopconfirm } from 'element-plus'
import StatusTag from '@/components/StatusTag/index.vue'

const { proxy } = getCurrentInstance() as ComponentInternalInstance
const state = reactive({
  page: {
    pageSize: 12,
    pageNum: 1,
  },
  total: 0,
  loading: false,
  showDeviceMap: false,
  mapLnglat: '' as any,
  query: {},
})
const layoutType = ref('card')

// 查看详情
const router = useRouter()
const handleView = (row: any) => {
  if (!row.id) return
  let showMap=false
  productOptions.value.forEach((p) => {
    if (p.productKey == row.productKey ) {
      showMap=p.isOpenLocate
    }
  })
  router.push(`devicesDetail/${row.id}?showMap=${showMap}`)
}
const nodeTypeOptions =  [
  {
    value: 0,
    label: '网关设备',
  }, {
    value: 1,
    label: '网关子设备',
  }, {
    value: 2,
    label: '直连设备',
  },
]

// 打开子设备
const childrenDialogRef = ref()
const showChidrenDevices = (row: any) => {
  childrenDialogRef.value.openDialog(row)
}

// 复制ID
const copyIdSuccess = () => {
  proxy?.$modal.msgSuccess('复制成功')
}

// 产品字典
const productOptions = ref<IProductsVO[]>([])

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
  colSpan:12,
  tableWidth: 120,
  editDisabled: true,
  componentProps: {
    labelAlias: 'name',
    valueAlias: 'productKey',
    options: [],
  },
  rules: [{ required: true, message: '产品名称不能为空' }],
  formWatch: (scope) => {
    scope.column.forEach((f: IColumn) => {
      if (['parentId', 'longitude', 'latitude'].includes(f.key)) {
        if (!scope.value) {
          f.formHide = true
          state.showDeviceMap = false
          return
        }
        productOptions.value.forEach((p)=>{
          if (p.productKey == scope.value ) {
            if (f.key === 'parentId') {
              f.formHide = p.nodeType !== 1
            } else {
              const flag = p.isOpenLocate && 'manual' == p.locateUpdateType
              state.showDeviceMap = flag
              f.formHide = !flag
            }

          }
        })
      }
    })
    column.value = scope.column
  }
}, {
  label: '设备类型',
  key: 'type',
  slot: true,
  formHide: true,
}, {
  label: '网关设备',
  key: 'parentId',
  type: 'select',
  colSpan: 12,
  tableWidth: 120,
  hide: true,
  formHide: true,
  componentProps: {
    labelAlias: 'deviceName',
    valueAlias: 'id',
    options: [],
    placeholder: '子设备可选择父设备'
  },
}, {
  label: '设备DN',
  key: 'deviceName',
  tableWidth: 240,
  componentProps: {
    placeholder: '一般为设备mac'
  },
  rules: [{ required: true, message: '设备DN不能为空' }],
  },
  {
    label: '设备经度',
    key: 'longitude',
    hide: true,
    formHide: true,
    colSpan: 12,
  },
  {
    label: '设备纬度',
    key: 'latitude',
    hide: true,
    formHide: true,
    colSpan: 12,
  },
  {
    label: '设备地图',
    key: 'deviceMap',
    hide: true,
    formItemSlot: true,
  },
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
{
  label: '状态',
  key: 'state',
  type: 'select',
  componentProps: {
    options: [
      {
        label: '在线',
        value: 'online',
      },
      {
        label: '离线',
        value: 'offline',
      }
    ]
  },
  search: true,
  formHide: true,
  tableWidth: 80,
  slot: true,
}, {
  label: '关键字',
  key: 'keyword',
  search: true,
  hide: true,
  formHide: true,
}, {
  label: '创建时间',
  key: 'createAt',
  tableWidth: 180,
  sortable: true,
  type: 'date',
  formHide: true,
}])
const crudRef = ref()
const data = ref<any[]>([])
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
    productOptions.value = res.data.rows || []
    column.value.forEach(item => {
      if (item.key === 'productKey') {
        item.componentProps.options = productOptions.value
      }
    })
  })
}
getDict()
const getProductName = (key: string) => {
  return productOptions.value.find(f => f.productKey === key)?.name || ''
}
const getNodeTypeName = (key) => {
  const type = productOptions.value.find(f => f.productKey === key)?.nodeType
  return nodeTypeOptions.find(f => f.value === type)?.label || ''
}
// 保存数据
const onSave = async ({type, data, cancel}: any) => {
  state.loading = true
  await saveDevices(toRaw(data))

  state.loading = false
  cancel()
  getData()
}
// 弹窗前置操作
const openBeforeFun = ({type, data}) => {
  if (type === 'add') {
    state.mapLnglat=''
  } else if (type === 'update') {
    const latitude = data?.locate?.latitude || ''
    const longitude = data?.locate?.longitude || ''
    state.mapLnglat = longitude + ',' + latitude
  }
}
const parentDevices = async () => {
  let data = await getParentDevices()
  column.value.forEach(item => {
    if (item.key === 'parentId') {
      item.componentProps.options = data.data
    }
  })
}
parentDevices()
// 删除
const handleDelete = async (row: any) => {
  state.loading = true
  if (row instanceof Array) {
    await deleteBatchDevices(row.map(m => m.id))
  } else {
    await deleteDevices(row.id)
  }
  ElMessage.success('删除成功!')
  state.loading = false
  getData()
}
const locateChange=(e, row)=> {
  if (!e) return
  row.longitude = e[0] || ''
  row.latitude = e[1] || ''
}
const options = reactive({
  ref: 'crudRef',
  data,
  column,
})
</script>

<style lang="scss" scoped>
  ::v-deep(.el-radio-button__inner) {
  padding: 8px;
}
::v-deep(.el-radio-button__original-radio:checked+.el-radio-button__inner) {
  border: 1px solid #0070ffff;
  background: #0070ff1a;
  box-shadow: none;
  svg {
    path {
      fill: #0070ffff;
    }
  }
}
.card-list {
  .card-item {
    border: 1px solid #d8dee5;
    border-radius: 3px;
    margin-right: 16px;
    margin-bottom: 16px;
    flex: 0 0 calc(25% - 12px);
    width: calc(25% - 12px);
    &.success-box {
      .text-box {
        background: linear-gradient(141.6deg, rgb(238, 250, 255) 0%, rgba(255, 255, 255, 0) 80%);
      }
    }
    &.error-box {
      .text-box {
        background: linear-gradient(141.6deg, rgb(255, 241, 241) 0%, rgba(255, 255, 255, 0) 80%);
      }
    }
    &:nth-child(4n) {
      margin-right: 0;
    }
    .text-box {
      padding: 16px;
      .title {
        font-size: 16px;
        font-weight: 600;
        align-items: center;
        margin-bottom: 12px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .title-l {
          display: flex;
          align-items: center;
        }
        .icon {
          margin-right: 10px;
          display: flex;
          align-items: center;
        }
      }
      .text {
        align-items: center;
        font-size: 14px;
        .txt {
          flex: 1;
          .txt-item {
            margin-bottom: 10px;
            &:last-child {
              margin-bottom: 0;
            }
            .copy-tag {
              padding: 4px 8px;
              background-color: #FFF7EF;
              color: #FF7D00;
              display: inline-flex;
              align-items: center;
              transition: 0.3s ease;
              cursor: pointer;
              &:hover {
                opacity: 0.8;
                transform: translateY(-2px);
              }
              svg {
                margin-right: 8px;
              }

            }
          }
          border-radius: 2px;
          .label {
            display: inline-block;
            margin-right: 10px;
            color: #717C8E;
          }
          .value {
            display: inline-block;
            color: #0B1D30;
            &.active {
              color: #0070FF;
            }
          }
        }
        .img {
          width: 100px;
          height: 100px;
          img {
            width: 100%;
            height: auto;
          }
        }
      }
    }
    .btn-group {
      padding: 12px 16px;
      border-top: 1px solid #DCDFE1;
      .cu-btn {
        width: calc((100% - 73px) / 3);
      }
      .el-button {
        padding: 8px;
      }
    }
  }
}

@media screen and (max-width: 1560px) {
  .card-list .card-item .btn-group {
    padding: 12px;
    .el-button {
      font-size: 12px;
    }
    .cu-btn {
      width: calc((100% - 59px) / 3);
    }
    .el-button+.el-button {
      margin-left: 6px;
    }
  }
}
@media screen and (max-width: 1400px) {
  .card-list .card-item {
    width: calc(100% / 3 - 8px);
    flex: 0 0 calc(100% / 3 - 8px);
    margin-right: 12px;
    &:nth-child(4n) {
      margin-right: 12px;
    }
    &:nth-child(3n) {
      margin-right: 0;
    }
  }
}
</style>
