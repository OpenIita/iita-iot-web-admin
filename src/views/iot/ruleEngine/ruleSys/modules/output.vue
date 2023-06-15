<template>
  <div>
    <div class="list-box">
      <el-collapse v-model="activeName">
        <el-collapse-item :name="index" v-for="(item, index) in list" :key="index">
          <template #title>
            <div class="flex" style="justify-content: space-between;width: 100%;">
              <div class="cu-title" @click.stop>
                <el-radio-group v-model="item.type" @change="actionTypeChange(item)">
                  <el-radio v-if="actions.indexOf('device') >= 0" :label="'device'">设备控制 </el-radio>
                  <el-radio v-if="actions.indexOf('alarm') >= 0" :label="'alarm'">告警消息 </el-radio>
                  <el-radio v-if="actions.indexOf('scene') >= 0" :label="'scene'">场景控制 </el-radio>
                  <el-radio v-if="actions.indexOf('http') >= 0" :label="'http'">http推送 </el-radio>
                  <el-radio v-if="actions.indexOf('mqtt') >= 0" :label="'mqtt'">mqtt推送 </el-radio>
                  <el-radio v-if="actions.indexOf('kafka') >= 0" :label="'kafka'">kafka推送 </el-radio>
                  <el-radio v-if="actions.indexOf('tcp') >= 0" :label="'tcp'">tcp推送 </el-radio>
                </el-radio-group>
                <div class="item" style="width: 240px;margin-left: 15px;">
                  <select-device v-if="item.type === 'device'" placeholder="选择设备"></select-device>
                </div>
              </div>
              <div style="padding-right: 10px;">
                <el-button @click="removeListener(index)">删除</el-button>
              </div>
            </div>
          </template>
          <div class="condition-box" v-if="item.type === 'device'">
            <DeviceAction :config="item"></DeviceAction>
          </div>
          <div class="condition-box" v-if="item.type === 'http'">
            <HttpAction :config="item"></HttpAction>
          </div>
          <div class="condition-box" v-if="item.type === 'mqtt'">
            <MqttAction :config="item"></MqttAction>
          </div>
          <div class="condition-box" v-if="item.type === 'kafka'">
            <KafkaAction :config="item"></KafkaAction>
          </div>
          <div class="condition-box" v-if="item.type === 'tcp'">
            <TcpAction :config="item"></TcpAction>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
    <el-button style="margin-top: 10px;" @click="handleAdd">新增输出</el-button>
  </div>
</template>
<script lang="ts" setup>
import { propTypes } from '@/utils/propTypes'

import SelectDevice from '@/components/YtSelect/select-device.vue'
import DeviceAction from '../components/DeviceAction.vue'
import HttpAction from '../components/HttpAction.vue'
import MqttAction from '../components/MqttAction.vue'
import KafkaAction from '../components/KafkaAction.vue'
import TcpAction from '../components/TcpAction.vue'

const props = defineProps({
  row: propTypes.object.def({}),
  actions: propTypes.string.def(''),
})
const arr: number[] = []
for (let i = 0; i < 100; i++) {
  arr.push(i)
}
const activeName = ref<number[]>(arr)
const list = ref<any[]>([])

// 新增输出
const handleAdd = () => {
  list.value.push({
    conditions: [{
      parameters: [],
    }],
  })
}

// 删除输出
const removeListener = (index: number) => {
  list.value.splice(index, 1)
}

const data = ref(toRaw(props.row))

const actionTypeChange = (item) => {
  if (item.type == 'http') {
    item.services = [
      {
        url: '',
        script: `this.translate=function(msg){
        }`,
      },
    ]
  } else if (item.type == 'mqtt') {
    item.services = [
      {
        host: '',
        port: 1883,
        username: '',
        password: '',
        script: `this.translate=function(msg){
        }`,
      },
    ]
  } else if (item.type == 'kafka') {
    item.services = [
      {
        services: '',
        ack: '',
        script: `this.translate=function(msg){
        }`,
      },
    ]
  } else if (item.type === 'tcp') {
    item.services = [
      {
        host: '',
        port: 1883,
        script: `this.translate=function(msg){
        }`
      },
    ]
  }
}

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
