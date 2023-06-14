<template>
  <div>
    <div class="list-box">
      <el-collapse v-model="activeName">
        <el-collapse-item :name="index" v-for="(item, index) in list" :key="index">
          <template #title>
            <div class="flex" style="justify-content: space-between;width: 100%;">
              <div class="cu-title" @click.stop>
                <el-radio-group style="margin-right: 20px;" model-value="1" class="ml-4">
                  <el-radio label="1" size="large">设备监听</el-radio>
                </el-radio-group>
                <div class="item">
                  <select-product v-model:id="data.id"></select-product>
                </div>
                <div class="item">
                  <select-device placeholder="默认全部设备" product-id="11111"></select-device>
                </div>
              </div>
              <div style="padding-right: 10px;">
                <el-button @click="removeListener(index)">删除</el-button>
              </div>
            </div>
          </template>
          <div class="condition-box" v-if="data.id">
            <div class="main">
              <div class="title">条件</div>
              <div class="main-box">
                <div class="box" v-for="(cond, condIndex) in item.conditions" :key="condIndex">
                  <div class="item">
                    <el-row style="width: 100%;">
                      <el-col :span="7">
                        <el-select v-model="cond.identifier" @change="typeChanged">
                          <el-option-group v-for="group in types" :key="group.name" :label="group.name">
                            <el-option v-for="pro in group.items" :label="pro.name" :value="pro.identifier" :key="pro.identifier"></el-option>
                          </el-option-group>
                        </el-select>
                      </el-col>
                      <el-col :span="15" v-if="!cond?.identifier?.endsWith(':*')">
                        <el-row class="param-item" v-for="(param, paramIndex) in cond.parameters" :key="param.identifier">
                          <el-col :span="10" v-if="cond.identifier == 'report'">
                            <el-select v-model="param.identifier" style="width: 100%;">
                              <el-option v-for="p in data.model.properties" :label="p.name" :value="p.identifier" :key="p.identifier"></el-option>
                            </el-select>
                          </el-col>
                          <el-col :span="6">
                            <el-select v-model="param.comparator">
                              <el-option v-for="cp in comparators" :label="cp.name" :value="cp.value" :key="cp.value"></el-option>
                            </el-select>
                          </el-col>
                          <el-col :span="5">
                            <el-input v-model="param.value" auto-complete="off"></el-input>
                          </el-col>
                          <el-col :span="1">
                            <el-button
                              style="margin-left: 6px;"
                              type="danger"
                              icon="Delete"
                              size="small"
                              circle
                              @click="removeParmeter(paramIndex, cond)"
                            />
                          </el-col>
                        </el-row>
                      </el-col>
                      <el-col :span="2" v-if="!cond?.identifier?.endsWith(':*') && cond.identifier">
                        <el-button type="danger" size="small" icon="Plus" circle @click="addParmeter(cond)" />
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
    <el-button style="margin-top: 10px;" @click="handleAdd">新增监听器</el-button>
  </div>
</template>
<script lang="ts" setup>
import { propTypes } from '@/utils/propTypes'

import SelectProduct from '@/components/YtSelect/select-product.vue'
import SelectDevice from '@/components/YtSelect/select-device.vue'

const props = defineProps({
  listeners: propTypes.object.def({}),
})
const arr: number[] = []
for (let i = 0; i < 100; i++) {
  arr.push(i)
}
const activeName = ref<number[]>(arr)
const list = ref<any[]>([])

// 新增监听器
const handleAdd = () => {
  list.value.push({
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
const data = ref(toRaw(props.listeners))
data.value.model = {
  properties: [
    {
      'identifier': 'powerstate',
      'dataType': {
        'type': 'enum',
        'specs': {
          '0': '关',
          '1': '开'
        }
      },
      'name': '开关',
      'accessMode': 'rw'
    },
    {
      'identifier': 'brightness',
      'dataType': {
        'type': 'int32',
        'specs': {
          'min': '1',
          'max': '100'
        }
      },
      'name': '亮度',
      'accessMode': 'rw'
    }
  ],
  'services': [
    {
      'identifier': 'open',
      'inputData': [
        {
          'identifier': 'bujian',
          'dataType': {
            'type': 'text',
            'specs': {}
          },
          'name': '部件',
          'required': false
        }
      ],
      'outputData': [
        {
          'identifier': 'result',
          'dataType': {
            'type': 'bool',
            'specs': {
              '0': '成功',
              '1': '失败'
            }
          },
          'name': '执行结果',
          'required': false
        }
      ],
      'name': '打开设备'
    },
    {
      'identifier': 'alarm',
      'inputData': [
        {
          'identifier': 'event',
          'dataType': {
            'type': 'enum',
            'specs': {
              '0': '发生水灾',
              '1': '发生火灾',
              '2': '发生水火灾'
            }
          },
          'name': '报警事件',
          'required': false
        }
      ],
      'outputData': [],
      'name': '报警'
    }
  ],
  'events': []
}
const types = ref([{
  name: '通配',
  items: [
    {
      type: 'state',
      identifier: 'state:*',
      name: '设备上下线',
    },
    {
      type: 'event',
      identifier: 'event:*',
      name: '任意事件上报',
    },
    {
      type: 'service_reply',
      identifier: 'service_reply:*',
      name: '任意服务回复',
    },
  ],
}, {
  name: '精确匹配',
  items: [{
    type: 'property',
    identifier: 'report',
    name: '属性上报',
  },
  ...(data.value?.model?.events || []).map((m: any) => ({
    type: 'event',
    identifier: m.identifier,
    name: m.name,
  })),
  ...(data.value?.model?.services || []).map((m: any) => ({
    type: 'service',
    identifier: m.identifier,
    name: m.name,
  }))
  ],
}])
const typeChanged = () => {
  types.value.forEach((t) => {
    t.items.forEach((item) => {
      if (item.identifier == data.value.identifier) {
        data.value.type = item.type
        return
      }
    })
  })
}
onUnmounted(() => {
  console.log('onUnmounted')
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
          border: 2px dashed rgb(217, 217, 217);
          padding: 6px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 10px;
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
