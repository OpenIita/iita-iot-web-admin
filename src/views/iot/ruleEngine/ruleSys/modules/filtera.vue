<template>
  <div>
    <div class="list-box">
      <el-collapse v-model="activeName">
        <el-collapse-item :name="index" v-for="(item, index) in list" :key="index">
          <template #title>
            <div class="flex" style="justify-content: space-between;width: 100%;">
              <div class="cu-title" @click.stop>
                <el-radio-group style="margin-right: 20px;" model-value="1" class="ml-4">
                  <el-radio label="1" size="large">设备数据过滤</el-radio>
                </el-radio-group>
                <div class="item">
                  <el-radio-group v-model="item.deviceRadio">
                    <el-radio-button label="指定设备" />
                    <el-radio-button label="使用当前设备" />
                  </el-radio-group>
                </div>
                <div class="item" v-if="item.deviceRadio === '指定设备'">
                  <select-device
                    v-model:dn="item.deviceDn"
                    placeholder="选择设备"
                    @on-select="(row) => hadnleSelectDevice(row, item)"
                  ></select-device>
                </div>
              </div>
              <div style="padding-right: 10px;">
                <el-button @click="removeListener(index)">删除</el-button>
              </div>
            </div>
          </template>
          <div class="condition-box" v-if="item.deviceDn || item.deviceRadio === '使用当前设备'">
            <div class="main">
              <div class="title">条件</div>
              <div class="main-box">
                <div class="box" v-for="(cond, condIndex) in item.conditions" :key="condIndex">
                  <div class="item">
                    <el-row style="width: 100%;">
                      <el-col :span="7">
                        <el-select v-if="item.deviceRadio !== '使用当前设备'" v-model="cond.identifier">
                          <el-option-group v-for="group in stateMap.get(item.pk)" :key="group.name" :label="group.name">
                            <el-option v-for="pro in group.items" :label="pro.name" :value="pro.identifier" :key="pro.identifier"></el-option>
                          </el-option-group>
                        </el-select>
                        <el-select v-else v-model="cond.type">
                          <el-option label="设备属性" value="property" key="property"></el-option>
                          <el-option label="设备标签" value="tag" key="tag"></el-option>
                        </el-select>
                      </el-col>
                      <el-col :span="5" v-if="item.deviceRadio === '使用当前设备'">
                        <el-input v-model="cond.identifier" auto-complete="off"></el-input>
                      </el-col>
                      <el-col :span="10">
                        <el-row class="param-item">
                          <el-col :span="8">
                            <el-select v-model="cond.comparator">
                              <el-option v-for="cp in comparators" :label="cp.name" :value="cp.value" :key="cp.value"></el-option>
                            </el-select>
                          </el-col>
                          <el-col :span="10">
                            <el-input v-model="cond.value" auto-complete="off"></el-input>
                          </el-col>
                        </el-row>
                      </el-col>
                    </el-row>
                  </div>
                  <el-button
                    type="danger"
                    size="small"
                    icon="Delete"
                    style="margin-left: 10px;"
                    @click="handleRemoveCondition(item, condIndex)"
                  ></el-button>
                </div>
              </div>
            </div>
            <el-button type="primary" size="small" style="margin-top: 12px;" @click="handleAddCondition(item)">新增条件</el-button>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
    <el-button style="margin-top: 10px;" @click="handleAdd">新增过滤器</el-button>
  </div>
</template>
<script lang="ts" setup>
import { propTypes } from '@/utils/propTypes'
import { getObjectModel } from '@/views/iot/equipment/api/products.api'

import SelectDevice from '@/components/YtSelect/select-device.vue'

const props = defineProps({
  filters: propTypes.array.def([]),
})
const emits = defineEmits(['update:filters'])
const arr: number[] = []
for (let i = 0; i < 100; i++) {
  arr.push(i)
}
const activeName = ref<number[]>(arr)
const list = ref<any[]>(props.filters || [])

const hadnleSelectDevice = (device, row) => {
  if (!device.productKey) return
  row.pk = device.productKey
  getProductObjectModel(device.productKey)
}
const getProductObjectModel = (pk) => {
  getObjectModel(pk).then(res => {
    const data = res.data || {}
    initThingModel(pk, data)
  })
}

const stateMap = ref(new Map())
const initThingModel = (pk, res) => {
  const modelItems: any[] = []
  let items: any[] = []
  modelItems.push({
    name: '属性',
    items: items,
  })
  res?.model?.properties && res.model.properties.forEach((p) => {
    items.push({
      type: 'property',
      identifier: p.identifier,
      name: p.name,
    })
  })

  modelItems.push({
    name: '状态',
    items: [
      {
        type: 'state',
        identifier: 'online',
        name: '是否在线',
      },
    ],
  })
  stateMap.value.set(pk, modelItems)
}

watch(() => list.value.length, (newV) => {
  const arr = toRaw(list.value).map(m => {
    if (m.config) {
      const obj = JSON.parse(m.config || '{}')
      if (obj.conditions[0]) {
        const firstObj = obj.conditions[0].device ? obj.conditions[0].device.split('/') : ''
        if (firstObj) {
          obj.pk = firstObj[0] || ''
          obj.deviceDn = firstObj[1] === '#' ? '' : firstObj[1]
        }
      }
      if (!stateMap.value.has(obj.pk)) getProductObjectModel(obj.pk)
      return {
        ...obj,
      }
    }
    return {
      ...m,
      device: `${m.pk}/${m.deviceDn || '#'}`
    }
  })
  list.value = arr
  emits('update:filters', arr)
}, {
  immediate: true,
  // deep: true,
})
// 新增监听器
const handleAdd = () => {
  console.log(list.value)
  list.value.push({
    deviceRadio: '指定设备',
    conditions: [{
      parameters: [],
    }],
  })
}

// 删除监听器
const removeListener = (index: number) => {
  list.value.splice(index, 1)
}
// 条件
const comparators = ref([
  {
    name: '大于',
    value: '>',
  },
  {
    name: '等于',
    value: '==',
  },
  {
    name: '小于',
    value: '<',
  },
  {
    name: '不等于',
    value: '!=',
  },
  {
    name: '包含',
    value: 'in',
  },
  {
    name: '不包含',
    value: 'notin',
  },
  {
    name: '相似',
    value: 'like',
  },
  {
    name: '任意',
    value: '*',
  },
])


// 新增条件
const handleAddCondition = (item: any) => {
  if (!item.conditions) item.conditions = []
  item.conditions.push({})
}
// 删除条件
const handleRemoveCondition = (item: any, index: number) => {
  item.conditions.splice(index, 1)
}

// 新增参数
const addParmeter = (cond: any) => {
  if (!cond.parameters) cond.parameters = []
  cond.parameters.push({})
}
// 删除参数
const removeParmeter = (index: number, cond: any) => {
  cond.parameters.splice(index, 1)
}
onUnmounted(() => {
  list.value = []
})
</script>

<style lang="scss" scoped>
.list-box {
  margin-top: 10px;
  .cu-title {
    width: calc(100% - 30px);
    cursor: auto;
    display: flex;
    align-items: center;
    .item {
      width: 250px;
      margin-right: 10px;
    }
  }
}
::v-deep(.el-collapse-item__header) {
  background-color: #f2f2f2;
  padding: 0 12px;
}
.condition-box {
  background-color: #f2f2f2;
  padding: 15px;
  border-top: 1px solid #d9d9d9;
  .main {
    border: 2px dashed rgb(217, 217, 217);
    .title {
      padding: 12px;
      color: #333;
      font-weight: 600;
      border-bottom: 1px solid rgb(217, 217, 217);
    }
    .main-box {
      padding: 10px;
      .box {
        display: flex;
        align-items: center;
        .item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 0px;
          flex: 1;
          .param-item {
            margin-bottom: 8px;
          }
        }
        // .el-button {
        //   width: 50px;
        // }
      }
    }
  }

}
</style>
