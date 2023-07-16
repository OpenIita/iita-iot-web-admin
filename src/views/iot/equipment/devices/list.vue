<template>
  <div>
    <yt-crud
      v-bind="options"
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
            <svg
              t="1687588130934"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="2471"
              width="14"
              height="14"
            >
              <path
                d="M122.065592 200.99371m-51.776224 0a50.597 50.597 0 1 0 103.552447 0 50.597 50.597 0 1 0-103.552447 0Z"
                fill="#333333"
                p-id="2472"
              ></path>
              <path
                d="M122.065592 459.888132c-28.593222 0-51.776224 23.171746-51.776224 51.763944 0 28.605501 23.183002 51.774177 51.776224 51.774177 28.593222 0 51.777247-23.167652 51.777247-51.774177C173.841815 483.059877 150.658813 459.888132 122.065592 459.888132z"
                fill="#333333"
                p-id="2473"
              ></path>
              <path
                d="M122.065592 770.535241c-28.593222 0-51.776224 23.183002-51.776224 51.776224 0 28.609595 23.183002 51.788503 51.776224 51.788503 28.593222 0 51.777247-23.178909 51.777247-51.788503C173.841815 793.718243 150.658813 770.535241 122.065592 770.535241z"
                fill="#333333"
                p-id="2474"
              ></path>
              <path d="M251.505639 796.424888l698.980555 0 0 51.776224-698.980555 0 0-51.776224Z" fill="#333333" p-id="2475"></path>
              <path d="M251.505639 485.765499l698.980555 0 0 51.7752-698.980555 0 0-51.7752Z" fill="#333333" p-id="2476"></path>
              <path d="M251.505639 175.105087l698.980555 0 0 51.777247-698.980555 0 0-51.777247Z" fill="#333333" p-id="2477"></path>
            </svg>
          </el-radio-button>
          <el-radio-button label="card">
            <svg
              t="1687588249311"
              class="icon"
              viewBox="0 0 1026 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="2793"
              width="14"
              height="14"
            >
              <path
                d="M931.571183 1023.943658 641.471385 1023.943658c-51.60138 0-93.398472-65.628416-93.398472-117.229796L548.072913 641.506393c0-51.572603 41.797092-93.403477 93.398472-93.403477l290.098547 0c51.537569 0 93.398472 41.832125 93.398472 93.403477l0 289.038793C1024.969655 982.146566 983.108752 1023.943658 931.571183 1023.943658L931.571183 1023.943658zM976.990457 644.869579c0-26.32869-21.362736-47.662649-47.662649-47.662649L643.393205 597.206931c-26.294908 0-47.662649 21.333959-47.662649 47.662649l0 285.934603c0 26.294908 21.367741 47.657644 47.662649 47.657644l285.934603 0c26.299913 0 47.662649-21.362736 47.662649-47.657644L976.990457 644.869579 976.990457 644.869579zM931.571183 475.904526 641.471385 475.904526c-51.60138 0-93.398472-65.657194-93.398472-117.258574L548.072913 93.43348c0-51.567598 41.797092-93.433505 93.398472-93.433505l290.098547 0c51.537569 0 93.398472 41.865907 93.398472 93.433505l0 289.043798C1024.969655 434.073652 983.108752 475.904526 931.571183 475.904526L931.571183 475.904526zM976.990457 96.795414c0-26.298662-21.362736-47.661398-47.662649-47.661398L643.393205 49.134018c-26.294908 0-47.662649 21.362736-47.662649 47.661398l0 285.935854c0 26.32869 21.367741 47.661398 47.662649 47.661398l285.934603 0c26.299913 0 47.662649-21.332708 47.662649-47.661398L976.990457 96.795414 976.990457 96.795414zM383.49827 1023.943658 93.433505 1023.943658C41.797092 1023.943658 0 958.315242 0 906.713862L0 641.506393c0-51.572603 41.797092-93.403477 93.433505-93.403477l290.064764 0c51.572603 0 93.433505 41.832125 93.433505 93.403477l0 289.038793C476.901746 982.146566 435.070872 1023.943658 383.49827 1023.943658L383.49827 1023.943658zM428.917544 644.869579c0-26.32869-21.328954-47.662649-47.657644-47.662649L95.325297 597.206931c-26.299913 0-47.662649 21.333959-47.662649 47.662649l0 285.934603c0 26.294908 21.362736 47.657644 47.662649 47.657644l285.934603 0c26.32869 0 47.657644-21.362736 47.657644-47.657644L428.917544 644.869579 428.917544 644.869579zM383.49827 475.904526 93.433505 475.904526C41.797092 475.904526 0 410.247332 0 358.645953L0 93.43348c0-51.567598 41.797092-93.433505 93.433505-93.433505l290.064764 0c51.572603 0 93.433505 41.832125 93.433505 93.433505l0 289.043798C476.901746 434.073652 435.070872 475.904526 383.49827 475.904526L383.49827 475.904526zM428.917544 96.795414c0-26.298662-21.328954-47.661398-47.657644-47.661398L95.325297 49.134018c-26.299913 0-47.662649 21.362736-47.662649 47.661398l0 285.935854c0 26.32869 21.362736 47.661398 47.662649 47.661398l285.934603 0c26.32869 0 47.657644-21.332708 47.657644-47.661398L428.917544 96.795414 428.917544 96.795414zM428.917544 96.795414"
                fill="#333333"
                p-id="2794"
              ></path>
            </svg>
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
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 12" class="design-iconfont" width="14" height="14">
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M1 0C0.447715 0 0 0.447714 0 0.999999V4.53846C0 5.09075 0.447714 5.53846 0.999999 5.53846H4.53846C5.09075 5.53846 5.53846 5.09075 5.53846 4.53846V1C5.53846 0.447715 5.09075 0 4.53846 0H1ZM1 6.46154C0.447715 6.46154 0 6.90925 0 7.46154V11C0 11.5523 0.447714 12 0.999999 12H4.53846C5.09075 12 5.53846 11.5523 5.53846 11V7.46154C5.53846 6.90925 5.09075 6.46154 4.53846 6.46154H1ZM6.46154 0.999999C6.46154 0.447714 6.90925 0 7.46154 0H11C11.5523 0 12 0.447715 12 1V4.53846C12 5.09075 11.5523 5.53846 11 5.53846H7.46154C6.90925 5.53846 6.46154 5.09075 6.46154 4.53846V0.999999ZM7.46154 6.46154C6.90925 6.46154 6.46154 6.90925 6.46154 7.46154V11C6.46154 11.5523 6.90925 12 7.46154 12H11C11.5523 12 12 11.5523 12 11V7.46154C12 6.90925 11.5523 6.46154 11 6.46154H7.46154Z"
                        fill="url(#o8x0d8zjr__paint0_linear_243_8228)"
                      ></path>
                      <defs>
                        <linearGradient id="o8x0d8zjr__paint0_linear_243_8228" x1="0" y1="0" x2="12" y2="12" gradientUnits="userSpaceOnUse">
                          <stop stop-color="#1B3149"></stop>
                          <stop offset="1" stop-color="#717D8A"></stop>
                        </linearGradient>
                      </defs>
                    </svg>
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
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" class="1tt41pxu6__design-iconfont" width="14" height="14">
                        <g clip-path="url(#1tt41pxu6__wj8s3wc33__clip0_243_7474)">
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M3.75 1.95312C3.75 1.84094 3.84094 1.75 3.95312 1.75H10.0469C10.1591 1.75 10.25 1.84094 10.25 1.95312V8.04688C10.25 8.15906 10.1591 8.25 10.0469 8.25H9.25V3.95312C9.25 3.28866 8.71134 2.75 8.04688 2.75H3.75V1.95312ZM2.75 2.75V1.95312C2.75 1.28866 3.28866 0.75 3.95312 0.75H10.0469C10.7113 0.75 11.25 1.28866 11.25 1.95312V8.04688C11.25 8.71134 10.7113 9.25 10.0469 9.25H9.25V10.0469C9.25 10.7113 8.71134 11.25 8.04688 11.25H1.95312C1.28866 11.25 0.75 10.7113 0.75 10.0469V3.95312C0.75 3.28866 1.28866 2.75 1.95312 2.75H2.75ZM1.75 3.95312C1.75 3.84094 1.84094 3.75 1.95312 3.75H8.04688C8.15906 3.75 8.25 3.84094 8.25 3.95312V10.0469C8.25 10.1591 8.15906 10.25 8.04688 10.25H1.95312C1.84094 10.25 1.75 10.1591 1.75 10.0469V3.95312Z"
                            fill="#FF7D00"
                          ></path>
                        </g>
                        <defs>
                          <clipPath id="1tt41pxu6__wj8s3wc33__clip0_243_7474">
                            <path d="M0 0H12V12H0z" fill="#FF7D00"></path>
                          </clipPath>
                        </defs>
                      </svg>
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
              <el-button class="cu-btn" type="success" icon="Box" plain @click="showChidrenDevices(item)">子设备</el-button>
              <el-button class="cu-btn" type="primary" icon="EditPen" plain @click="crudRef.handleUpdate(item)">编辑</el-button>
              <el-button class="cu-btn" type="warning" icon="View" plain @click="handleView(item)">详情</el-button>
              <el-divider direction="vertical" />
              <el-popconfirm title="是否确认删除?" @confirm="handleDelete(item)">
                <template #reference>
                  <el-button type="danger" icon="Delete" plain></el-button>
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
          <el-button link icon="Box" :disabled="scope.row.nodeType == 0" @click="showChidrenDevices(scope.row)"></el-button>
        </el-tooltip>
        <el-divider direction="vertical" />
        <el-tooltip class="box-item" effect="dark" content="详情" placement="top">
          <el-button link type="primary" icon="View" @click="handleView(scope.row)"></el-button>
        </el-tooltip>
        <el-divider direction="vertical" />
        <el-tooltip class="box-item" effect="dark" content="删除" placement="top">
          <el-popconfirm title="是否确认删除该数据" @confirm="handleDelete(scope.row)">
            <template #reference>
              <el-button link type="danger" icon="Delete"></el-button>
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
    <children-dialog ref="childrenDialogRef"></children-dialog>
  </div>
</template>
<script lang="ts" setup>
import defaultImg from '@/assets/images/pic_device.png'
import { IColumn } from '@/components/common/types/tableCommon'
import { ComponentInternalInstance } from 'vue'
import { getDevicesList, deleteDevices, saveDevices,getParentDevices, deleteBatchDevices } from '../api/devices.api'
import { getProductsList,IProductsVO } from '../api/products.api'
import { formatDate } from '@/utils/formatTime'

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
