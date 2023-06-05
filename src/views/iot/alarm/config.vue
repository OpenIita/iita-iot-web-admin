<template>
  <div>
    <yt-crud
      ref="crudRef"
      :data="data"
      :column="column"
      :table-props="{
        selection: false,
      }"
    ></yt-crud>
  </div>
</template>
<script lang="ts" setup>
import { IColumn } from '@/components/common/types/tableCommon'

import YtCrud from '@/components/common/yt-crud.vue'

const column: IColumn[] = [{
  label: '配置名称',
  key: 'name',
  search: true,
  rules: [{ required: true, message: '配置名称不能为空' }],
}, {
  label: '告警等级',
  key: 'level',
  tableWidth: 120,
  search: true,
  type: 'select',
  rules: [{ required: true, message: '请选择告警等级' }],
  componentProps: {
    options: [{
      label: 1,
      value: 1,
    }, {
      label: 2,
      value: 2,
    }, {
      label: 3,
      value: 3,
    }, {
      label: 4,
      value: 4,
    }, {
      label: 5,
      value: 5,
    }],
  }
}, {
  label: '消息模板',
  key: 'messageTemplateId',
  type: 'select',
  tableWidth: 120,
  componentProps: {
    labelAlias: 'title',
    valueAlias: 'id',
    options: [
      {
        "id": "947d22b7-305b-d959-874a-06e277143d44",
        "channelId": "fa1c5eaa-de6e-48b6-805e-8f091c7bb832",
        "title": "告警邮件配置",
        "param": {},
        "createAt": 1684824055050
      },
      {
        "id": "75f37720-22bb-4f0b-f127-78f2091507a0",
        "channelId": "fa1c5eaa-de6e-48b6-805e-8f091c7bb832",
        "title": "告警钉钉配置",
        "param": {
          "dingTalkWebhook": "xxxxxxxxxxxxxxxx",
          "dingTalkSecret": "xxxx"
        },
        "createAt": 1684824055053
      },
      {
        "id": "6e5db9b5-a709-723b-665b-bbca5ce6a62c",
        "channelId": "fa1c5eaa-de6e-48b6-805e-8f091c7bb833",
        "title": "告警企业微信配置",
        "param": {
          "qyWechatWebhook": "xxxxxxxxxxxxxxxx"
        },
        "createAt": 1684824055053
      }
    ]
  }
}, {
  label: '规则',
  key: 'ruleInfoId',
  tableWidth: 120,
  type: 'select',
  componentProps: {
    labelAlias: 'name',
    valueAlias: 'id',
    options: [
      {
        "id": "2820c218-660e-48ff-a234-c7b6793a5bb8",
        "name": "测试场景1",
        "type": "scene",
        "listeners": [
          {
            "type": "device",
            "config": "{\"id\":\"4ff98e8c-e6f6-4e96-8932-de488a0a4bfb\",\"type\":\"device\",\"topic\":\"\",\"conditions\":[{\"id\":0.8212160690052512,\"type\":\"property\",\"device\":\"Rf4QSjbm65X45753/ABC12400001\",\"identifier\":\"report\",\"parameters\":[{\"identifier\":\"powerstate\",\"comparator\":\">\",\"value\":\"0\"}]}]}"
          }
        ],
        "filters": [
          {
            "type": "device",
            "config": "{\"id\":\"24b4b975-d8ac-431d-881d-8c8b40e92861\",\"type\":\"device\",\"conditions\":[{\"id\":0.08981222614734863,\"device\":\"hdX3PCMcFrCYpesJ/ABD12300002\",\"identifier\":\"powerSwitch\",\"type\":\"property\",\"comparator\":\"==\",\"value\":\"0\"}]}"
          }
        ],
        "actions": [
          {
            "type": "device",
            "config": "{\"id\":\"fde024b5-5105-4639-8602-d04300613af9\",\"type\":\"device\",\"services\":[{\"device\":\"hdX3PCMcFrCYpesJ/ABD12300002\",\"identifier\":\"set\",\"inputData\":[{\"identifier\":\"powerSwitch\",\"value\":\"1\"}]},{\"device\":\"hdX3PCMcFrCYpesJ/ABD12300002\",\"identifier\":\"set\",\"inputData\":[{\"identifier\":\"windSpeed\",\"value\":\"20\"}]}]}"
          }
        ],
        "uid": "fa1c5eaa-de6e-48b6-805e-8f091c7bb831",
        "state": "stopped",
        "desc": "test",
        "createAt": 1649167998895
      }
    ]
  }
}, {
  label: '是否启用',
  key: 'enable',
  tableWidth: 120,
  type: 'switch',
}, {
  label: '告警描述',
  key: 'description',
  hide: true,
  componentProps: {
    type: 'textarea',
    rows: 4,
  }
}]


const data = ref([])
</script>

<!-- <style lang="scss" scoped>

</style> -->
