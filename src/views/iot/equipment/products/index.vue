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
        viewBtn: true,
        delBtn: true,
        customTable: layoutType === 'card',
        menuSlot: true,
        menuWidth: 300,
      }"
      @onLoad="getData"
      @saveFun="onSave"
    >
      <template #customTable>
        <el-row class="card-list flex">
          <el-col class="card-item" v-for="(item, index) in data" :key="index">
            <div class="text-box">
              <div class="title flex align-center">
                <div class="icon">
                  <svg
                    t="1687592438893"
                    class="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="16075"
                    width="16"
                    height="16"
                  >
                    <path
                      d="M887.466667 759.466667l-271.36 157.013333c-20.48 11.946667-44.373333 11.946667-63.146667 0l-269.653333-157.013333c-18.773333-11.946667-30.72-32.426667-30.72-54.613334V392.533333c0-22.186667 11.946667-42.666667 30.72-54.613333l269.653333-157.013333c20.48-11.946667 44.373333-11.946667 63.146667 0l273.066666 157.013333c20.48 11.946667 32.426667 32.426667 32.426667 54.613333l-1.706667 312.32c0 22.186667-11.946667 44.373333-32.426666 54.613334z"
                      fill="#333333"
                      opacity=".3"
                      p-id="16076"
                    ></path>
                    <path
                      d="M510.293333 989.866667c-17.066667 0-35.84-5.12-51.2-13.653334l-324.266666-187.733333c-30.72-18.773333-51.2-51.2-51.2-88.746667V324.266667c0-35.84 18.773333-69.973333 51.2-88.746667l324.266666-189.44c30.72-18.773333 69.973333-18.773333 102.4 0l327.68 189.44c32.426667 18.773333 51.2 52.906667 51.2 88.746667L938.666667 699.733333c0 35.84-18.773333 69.973333-51.2 87.04L563.2 976.213333c-17.066667 8.533333-34.133333 13.653333-52.906667 13.653334z m0-904.533334c-8.533333 0-17.066667 1.706667-25.6 6.826667l-324.266666 189.44C145.066667 290.133333 134.826667 307.2 134.826667 324.266667v375.466666c0 18.773333 10.24 34.133333 25.6 44.373334l324.266666 187.733333c15.36 8.533333 35.84 8.533333 51.2 0l324.266667-189.44c15.36-8.533333 25.6-25.6 25.6-42.666667l1.706667-375.466666c0-18.773333-10.24-35.84-25.6-44.373334l-325.973334-187.733333c-6.826667-5.12-17.066667-6.826667-25.6-6.826667z"
                      fill="#333333"
                      p-id="16077"
                    ></path>
                    <path
                      d="M515.413333 537.6c-5.12 0-8.533333-1.706667-13.653333-3.413333l-266.24-153.6c-11.946667-6.826667-17.066667-22.186667-8.533333-34.133334 6.826667-11.946667 22.186667-17.066667 34.133333-8.533333l254.293333 146.773333 254.293334-150.186666c11.946667-6.826667 27.306667-3.413333 35.84 8.533333 6.826667 11.946667 3.413333 27.306667-8.533334 35.84L529.066667 534.186667c-3.413333 1.706667-8.533333 3.413333-13.653334 3.413333z"
                      fill="#333333"
                      p-id="16078"
                    ></path>
                    <path
                      d="M515.413333 829.44c-13.653333 0-25.6-11.946667-25.6-25.6V512c0-13.653333 11.946667-25.6 25.6-25.6s25.6 11.946667 25.6 25.6v291.84c0 13.653333-10.24 25.6-25.6 25.6z"
                      fill="#333333"
                      p-id="16079"
                    ></path>
                  </svg>
                  {{ item.name }}
                </div>
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
                    <div class="value">{{ item.transparent ? '是' : '否' }}</div>
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
              <el-popconfirm title="是否确认删除?" @confirm="crudRef.handleDelete(item)">
                <template #reference>
                  <el-button type="danger" icon="Delete" plain></el-button>
                </template>
              </el-popconfirm>
            </div>
          </el-col>
        </el-row>
      </template>
      <template #menuSlot="scope">
        <el-button link type="primary" icon="ScaleToOriginal" @click="openObjectModel(scope.row)">物模型</el-button>
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
    <object-model ref="objectModelRef"></object-model>
  </div>
</template>
<script lang="ts" setup>
import defaultImg from '@/assets/images/pic_device.png'
import { IColumn } from '@/components/common/types/tableCommon'

import ObjectModel from './modules/objectModel.vue'
import YtCrud from '@/components/common/yt-crud.vue'
import { getProductsList, saveProducts, IProductsVO } from '../api/products.api'
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
  return cateOptions.find(f => f.id === id).name || ''
}
const column = ref<IColumn[]>([{
  label: '产品Key',
  key: 'productKey',
  search: true,
  editDisabled: true,
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
  label: '节点类型',
  key: 'nodeType',
  type: 'select',
  search: true,
  hide: true,
  formHide: true,
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
        value: 'true',
        label: '是',
      }, {
        value: 'false',
        label: '否',
      }
    ]
  }
}, {
  label: '产品图片',
  key: 'pic',
  type: 'image',
}, {
  label: '修改日期',
  key: 'createAt',
  type: 'date',
  formHide: true,
}])
const data = ref<IProductsVO[]>([])
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
    cateOptions = res.data || []
    column.value.forEach(item => {
      if (item.key === 'category') {
        item.componentProps.options = cateOptions
      }
    })
  })
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
          margin-right: 6px;
        }
      }
      .text {
        align-items: center;
        font-size: 14px;
        .txt {
          flex: 1;
          .txt-item {
            margin-bottom: 8px;
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
</style>
