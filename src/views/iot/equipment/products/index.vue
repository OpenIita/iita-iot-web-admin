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
        selection: true,
        viewBtn: true,
        delBtn: true,
        customTable: layoutType === 'card',
        menuSlot: true,
        menuWidth: 300,
      }"
      :fun-props="{
        exportBtn: true,
        delBtn: false,
      }"
      @openBeforeFun="openBeforeFun"
      @delFun="handleDel"
      @exportFun="handleExport"
      @onLoad="getData"
      @saveFun="onSave"
    >
      <template #customTable>
        <el-row class="card-list flex">
          <el-col class="card-item" v-for="(item, index) in data" :key="index">
            <div class="text-box">
              <div class="title flex align-center">
                <div class="icon">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 12" class="design-iconfont" width="14" height="14">
                    <g clip-path="url(#j0mugonyr__clip0_251_330)">
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M6.95761 0.419307C6.44384 0.216676 5.61085 0.216676 5.09708 0.419307L1.14977 1.97613C0.37912 2.28007 0.379119 2.77286 1.14977 3.07681L5.09708 4.63363C5.61085 4.83626 6.44383 4.83626 6.9576 4.63363L10.9049 3.07681C11.6756 2.77287 11.6756 2.28007 10.9049 1.97613L6.95761 0.419307ZM4.71529 11.7889C4.81375 11.8261 4.9175 11.8449 5.01442 11.8449C5.39836 11.8449 5.68606 11.5502 5.68623 11.1445V6.40366C5.68623 5.91426 5.32209 5.39722 4.86887 5.22658L1.0909 3.80515C0.992271 3.76795 0.896713 3.74918 0.806615 3.74918C0.453732 3.74918 0.225586 4.02408 0.225586 4.44949V9.19038C0.225586 9.69786 0.555433 10.204 0.98937 10.3673L4.71529 11.7889ZM6.94351 11.7653H6.92337C6.94674 11.7653 6.97141 11.7667 6.99683 11.7681C7.07053 11.7722 7.15062 11.7767 7.22421 11.7491L10.9994 10.3675C11.4482 10.1987 11.8291 9.68148 11.8291 9.19038V4.44949C11.8291 4.03722 11.5383 3.74918 11.1564 3.74918C11.0481 3.74993 10.9407 3.76891 10.8387 3.80532L7.11859 5.22658C6.67936 5.39193 6.36862 5.89788 6.36862 6.40366V11.1445C6.36862 11.5633 6.58738 11.7653 6.94351 11.7653Z"
                        fill="url(#j0mugonyr__paint0_linear_251_330)"
                      ></path>
                    </g>
                    <defs>
                      <linearGradient
                        id="j0mugonyr__paint0_linear_251_330"
                        x1=".225586"
                        y1=".267334"
                        x2="11.8031"
                        y2="11.8708"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#1B3149"></stop>
                        <stop offset="1" stop-color="#717D8A"></stop>
                      </linearGradient>
                      <clipPath id="j0mugonyr__clip0_251_330">
                        <path fill="#fff" d="M0 0H12V12H0z"></path>
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                {{ item.name }}
              </div>
              <div class="text flex">
                <div class="txt">
                  <div class="txt-item">
                    <div class="label">所属分类</div>
                    <div class="value active">{{ getCateName(item.category) }}</div>
                  </div>
                  <div class="txt-item">
                    <div class="label">产品类型</div>
                    <div class="value">{{ getNodeTypeNmae(item.nodeType) }}</div>
                  </div>
                  <div class="txt-item">
                    <div class="label">透传设备</div>
                    <div class="value">
                      <span v-if="item.transparent">是</span>
                      <span v-if="!item.transparent">否</span>
                    </div>
                  </div>
                  <div class="txt-item">
                    <div class="label">设备定位</div>
                    <div class="value">{{ item.isOpenLocate ? item.locateUpdateType == 'manual' ? '手动' : '设备上报' : '关闭' }}</div>
                  </div>
                </div>
                <div class="img">
                  <img :src="item.img || defaultImg" alt="" />
                </div>
              </div>
            </div>
            <div class="btn-group">
              <el-button class="cu-btn" type="primary" icon="EditPen" plain @click="crudRef.handleUpdate(item)">编辑</el-button>
              <el-button class="cu-btn" type="warning" icon="View" plain @click="crudRef.handleView(item)">详情</el-button>
              <el-button class="cu-btn" type="success" icon="ScaleToOriginal" plain @click="openObjectModel(item)">物模型</el-button>
              <el-divider direction="vertical" />
              <el-popconfirm title="是否确认删除?" @confirm="handleDel(item)">
                <template #reference>
                  <el-button type="danger" icon="Delete" plain />
                </template>
              </el-popconfirm>
            </div>
          </el-col>
        </el-row>
      </template>
      <template #menuSlot="scope">
        <el-tooltip class="box-item" effect="dark" content="物模型" placement="top">
          <el-button link type="primary" icon="ScaleToOriginal" @click="openObjectModel(scope.row)" />
        </el-tooltip>
      </template>
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
    </yt-crud>
    <object-model ref="objectModelRef" />
  </div>
</template>

<script lang="ts" setup>
import defaultImg from '@/assets/images/pic_device.png'
import { IColumn } from '@/components/common/types/tableCommon'

import ObjectModel from './modules/objectModel.vue'
import YtCrud from '@/components/common/yt-crud.vue'
import { getProductsList, saveProducts, IProductsVO, deleteProduct } from '../api/products.api'
import { getCategoriesAll } from '../api/categories.api'
import { ElDivider } from 'element-plus'

const crudRef = ref()
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
const getNodeTypeNmae = (type) => {
  return nodeTypeOptions.find(f => f.value === type)?.label || ''
}
let cateOptions: any[] = []

const getCateName = (id: string) => {
  return cateOptions.find(f => f.id === id)?.name || ''
}
const data = ref<IProductsVO[]>([])
const randomString=(len:number)=> {
  len = len || 32
  var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
  var maxPos = $chars.length
  var pwd = ''
  for (var i = 0; i < len; i++) {
    pwd += $chars.charAt(Math.floor(Math.random() * maxPos))
  }
  if (data.value.findIndex(f => f.productKey === pwd) !== -1) {
    return randomString(len)
  }
  return pwd
}
const column = ref<IColumn[]>([{
  label: '产品密钥',
  key: 'productSecret',
  hide: true,
  addHide: true,
  editDisabled: true,
}, {
  label: '产品Key',
  key: 'productKey',
  search: true,
  editDisabled: true,
  addDisabled: true,
  rules: [{ required: true, message: '产品Key不能为空' }],
}, {
  label: '产品名称',
  key: 'name',
  search: true,
  rules: [{ required: true, message: '产品名称不能为空' }],
}, {
  label: '品类',
  key: 'category',
  type: 'select',
  tableWidth: 80,
  componentProps: {
    labelAlias: 'name',
    valueAlias: 'id',
  },
  rules: [{ required: true, message: '品类不能为空' }],
}, {
  label: '节点类型',
  key: 'nodeType',
  type: 'radio',
  componentProps: {
    defaultValue: 0,
    options: nodeTypeOptions,
  }
}, {
  label: '透传设备',
  key: 'transparent',
  type: 'radio',
  tableWidth: 80,
  componentProps: {
    defaultValue: true,
    options: [
      {
        value: true,
        label: '是',
      }, {
        value: false,
        label: '否',
      }
    ]
  }
}, {
  label: '设备定位',
  key: 'isOpenLocate',
  type: 'radio',
  tableWidth: 80,
  componentProps: {
    defaultValue: false,
    options: [
      {
        value: true,
        label: '开启',
      }, {
        value: false,
        label: '关闭',
      }
    ]
  },
  formWatch: (scope) => {
    scope.column.forEach((f: IColumn) => {
      if (f.key === 'locateUpdateType') {
        f.formHide = !scope.value
      }
    })
    column.value = scope.column
  }
}, {
  label: '定位方式',
  key: 'locateUpdateType',
  type: 'radio',
  tableWidth: 80,
  formHide:true,
  componentProps: {
    defaultValue: 'manual',
    options: [
      {
        value: 'manual',
        label: '手动定位',
      }, {
        value: 'device',
        label: '设备上报',
      }
    ]
  }
}, {
  label: '产品图片',
  key: 'img',
  type: 'image',
  componentProps: {
    uploadType: 'url',
  }
}, {
  label: '创建时间',
  key: 'createAt',
  type: 'date',
  sortable: true,
  formHide: true,
}])

const state = reactive({
  total: 0,
  page: {
    pageSize: 12,
    pageNum: 1,
  },
  query: {},
  loading: false
})
const layoutType = ref('card')
const getData = () => {
  state.loading = true
  getProductsList({
    ...state.page,
    ...state.query,
  }).then(res => {
    data.value = res.data.rows || []
    state.total = res.data.total
  }).finally(() => {
    state.loading = false
  })
}
// 获取字典
const getDict = () => {
  getCategoriesAll().then(res => {
    res = res || {}
    cateOptions = res.data || []
    column.value.forEach(item => {
      if (item.key === 'category') {
        item.componentProps.options = cateOptions
      }
    })
  })
}
// 导出
const handleExport = () => {
  ElMessage({
    type: 'warning',
    message: '功能尚未完善，请耐心等待哟'
  })
}
// 删除
const handleDel = (rows) => {
  console.log('rows', rows)
  let key = rows.productKey
  state.loading = true
  deleteProduct(key).then(res => {
    if (res.code === 200) {
      ElMessage({
        type: 'success',
        message: '删除成功'
      })
      getData()
    } else {
      ElMessage({
        type: 'error',
        message: res.message
      })
    }
  }).finally(() => {
    state.loading = false
  })
}
// 上传前置操作
const openBeforeFun = ({type, data}) => {
  if (type === 'add') {
    data.productKey = randomString(16)
  }
}
getDict()
// 保存数据
const onSave = ({type, data, cancel}: any) => {
  state.loading = true
  saveProducts(toRaw(data)).then(res => {
    ElMessage.success(type === 'add' ? '添加成功' : '编辑成功')
    cancel()
    getData()
  }).finally(() => {
    state.loading = false
  })

}



const objectModelRef = ref()
const openObjectModel = (row: any) => {
  objectModelRef.value.getInfo(row.productKey)
}
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
          }
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
