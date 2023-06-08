<template>
  <div>
    <div class="list-box">
      <el-collapse accordion v-model="activeName">
        <el-collapse-item :name="index" v-for="(item, index) in list" :key="index">
          <template #title>
            <div class="cu-title" @click.stop>
              <div class="item">
                <select-product></select-product>
              </div>
              <div class="item">
                <select-device placeholder="默认全部设备" product-id="11111"></select-device>
              </div>
            </div>
          </template>
          <div class="condition-box">
            <div class="main">
              <div class="title">条件筛选</div>
              <div class="main-box">
                <div class="item">
                  <div>
                    <el-select v-model="data.identifier" @change="typeChanged">
                      <el-option-group v-for="group in types" :key="group.name" :label="group.name">
                        <el-option v-for="pro in group.items" :label="pro.name" :value="pro.identifier" :key="pro.identifier"></el-option>
                      </el-option-group>
                    </el-select>
                  </div>
                  <el-button type="danger" size="small" icon="Delete" style="margin-left: 10px;"></el-button>
                </div>
              </div>
            </div>
            <el-button type="primary" size="small" style="margin-top: 12px;" @click="handleAdd">新增条件</el-button>
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
  row: propTypes.object.def({}),
})

const activeName = ref<number[]>([])
const list = ref<any[]>([])

// 新增
const handleAdd = () => {
  list.value.push({})
}

const data = ref(toRaw(props.row))
data.value.model = {
  "properties": [
    {
      "identifier": "powerstate",
      "dataType": {
        "type": "enum",
        "specs": {
          "0": "关",
          "1": "开"
        }
      },
      "name": "开关",
      "accessMode": "rw"
    },
    {
      "identifier": "brightness",
      "dataType": {
        "type": "int32",
        "specs": {
          "min": "1",
          "max": "100"
        }
      },
      "name": "亮度",
      "accessMode": "rw"
    }
  ],
  "services": [
    {
      "identifier": "open",
      "inputData": [
        {
          "identifier": "bujian",
          "dataType": {
            "type": "text",
            "specs": {}
          },
          "name": "部件",
          "required": false
        }
      ],
      "outputData": [
        {
          "identifier": "result",
          "dataType": {
            "type": "bool",
            "specs": {
              "0": "成功",
              "1": "失败"
            }
          },
          "name": "执行结果",
          "required": false
        }
      ],
      "name": "打开设备"
    },
    {
      "identifier": "alarm",
      "inputData": [
        {
          "identifier": "event",
          "dataType": {
            "type": "enum",
            "specs": {
              "0": "发生水灾",
              "1": "发生火灾",
              "2": "发生水火灾"
            }
          },
          "name": "报警事件",
          "required": false
        }
      ],
      "outputData": [],
      "name": "报警"
    }
  ],
  "events": []
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
console.log('data.value', data.value)
</script>

<style lang="scss" scoped>
.list-box {
  margin-top: 10px;
  .cu-title {
    width: calc(100% - 30px);
    cursor: auto;
    display: flex;
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
      .item {
        border: 2px dashed rgb(217, 217, 217);
        padding: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
  }

}
</style>
