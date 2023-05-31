<template>
  <div>
    <yt-table-fun @handle-add="handleAdd()">
      <el-row :gutter="40">
        <el-col :span="6" :sm="6" :xs="24" v-for="com in data" :key="com.id" style="margin: 10px 0">
          <el-card>
            <template #header>
              <div class="clearfix">
                <b>{{ com.name }}</b>
                <div style="float: right">
                  <el-popconfirm title="确认要删除吗？" @confirm="handleDelete(com)">
                    <template #reference>
                      <div>
                        <el-button size="mini" icon="Delete" plain></el-button>
                      </div>
                    </template>
                  </el-popconfirm>
                </div>
              </div>
            </template>
            <el-descriptions :column="1" size="medium" :labelStyle="{ fontWeight: 'bold' }">
              <el-descriptions-item label="通讯协议">{{
                com.protocol
              }}</el-descriptions-item>
              <el-descriptions-item label="转换器">{{
                getTypeName(com.converter)
              }}</el-descriptions-item>
              <el-descriptions-item label="jar包" :labelStyle="{ fontWeight: 'bold', width: '50px' }">{{ com.jarFile }}</el-descriptions-item>
              <el-descriptions-item label="状态">
                <el-switch v-model="com.flag" active-text="运行中" inactive-text="已停止" @change="stateChange(com)"> </el-switch>
              </el-descriptions-item>
              <el-descriptions-item label="操作">
                <el-button @click="handleEdit(com)" size="mini" icon="Edit" plain></el-button>
                <el-button @click="handleEditScript(com)" class="mg-left-10" size="mini">编写脚本</el-button>
              </el-descriptions-item>
            </el-descriptions>
          </el-card>
        </el-col>
      </el-row>
    </yt-table-fun>
    <yt-table-form ref="tableFormRef" :column="column">
      <template #configForm="scope">
        <el-form
          v-if="scope.row.protocol == 'http'"
          class="cu-form"
          label-width="60px"
          :model="scope.row.config"
          :rules="configRule.httpConfigRule"
          ref="httpConfigForm"
        >
          <el-form-item label="端口" prop="port">
            <el-input style="width: 250px" size="small" v-model="scope.row.config.port" auto-complete="off" placeholder="请输入端口"></el-input>
          </el-form-item>
        </el-form>
        <el-form
          v-if="scope.row.protocol == 'tcp'"
          class="cu-form"
          label-width="80px"
          :model="scope.row.config"
          :rules="configRule.tcpConfigRule"
          ref="mqttConfigForm"
        >
          <el-form-item label="端口" prop="port">
            <el-input style="width: 250px" size="small" v-model="scope.row.config.port" auto-complete="off" placeholder="请输入端口"></el-input>
          </el-form-item>
          <el-form-item label="模式" prop="type">
            <el-radio v-model="scope.row.config.type" label="server">服务端模式</el-radio>
            <el-radio v-model="scope.row.config.type" label="client">客户端模式</el-radio>
            <div>
              <el-tag v-if="scope.row.config.type == 'server'" type="info"> 设备直连通讯组件，收到设备消息直接进行处理 </el-tag>
              <el-tag v-if="scope.row.config.type == 'client'" type="info"> 设备连接其它tcp服务端接受消息 </el-tag>
            </div>
          </el-form-item>
          <el-form-item v-if="scope.row.config.type == 'client'" label="IP地址" prop="host">
            <el-input style="width: 250px" size="small" v-model="scope.row.config.host" auto-complete="off" placeholder="请输入IP地址"></el-input>
          </el-form-item>
          <el-form-item v-if="scope.row.config.type == 'server'" label="IP地址" prop="host">
            <el-input style="width: 250px" size="small" v-model="scope.row.config.host" auto-complete="off" placeholder="请输入IP地址"></el-input>
          </el-form-item>
          <el-form-item label="处理方式" prop="parserType">
            <el-select v-model="scope.row.config.parserType" placeholder="请选择通讯协议">
              <el-option label="不处理" value="不处理"> </el-option>
              <el-option label="固定长度" value="固定长度"> </el-option>
              <el-option label="分隔符" value="分隔符"> </el-option>
              <el-option label="自定义脚本" value="自定义脚本"> </el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if="scope.row.config.parserType == '固定长度'" label="长度" prop="fix">
            <el-input
              style="width: 250px"
              size="small"
              v-model="scope.row.config.parserConfiguration.fix"
              auto-complete="off"
              placeholder="请输入长度"
            ></el-input>
          </el-form-item>
          <el-form-item v-if="scope.row.config.parserType == '分隔符'" label="分隔符" prop="delimited">
            <el-input
              style="width: 250px"
              size="small"
              v-model="scope.row.config.parserConfiguration.delimited"
              auto-complete="off"
              placeholder="请输入分隔符"
            ></el-input>
          </el-form-item>
          <el-form-item v-if="scope.row.config.parserType == '自定义脚本'" label="script" prop="fix">
            <el-input
              style="width: 250px"
              size="small"
              v-model="scope.row.config.parserConfiguration.script"
              auto-complete="off"
              placeholder="请输入自定义脚本"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-form
          v-if="scope.row.protocol == 'websocket'"
          class="cu-form"
          label-width="80px"
          :model="scope.row.config"
          :rules="configRule.wsConfigRule"
          ref="wsConfigForm"
        >
          <el-form-item label="端口" prop="port">
            <el-input style="width: 250px" size="small" v-model="scope.row.config.port" auto-complete="off" placeholder="请输入端口"></el-input>
          </el-form-item>
          <el-form-item label="模式" prop="type">
            <el-radio v-model="scope.row.config.type" label="server">服务端模式</el-radio>
            <el-radio v-model="scope.row.config.type" label="client">客户端模式</el-radio>
            <div>
              <el-tag v-if="scope.row.config.type == 'server'" type="info"> 设备直连通讯组件，收到设备消息直接进行处理 </el-tag>
              <el-tag v-if="scope.row.config.type == 'client'" type="info"> 设备连接其它websocket服务端接受消息 </el-tag>
            </div>
          </el-form-item>
          <el-form-item label="访问令牌" v-if="scope.row.config.type == 'server'">
            <div class="box-card" v-for="accessToken in scope.row.config.accessTokens" :key="accessToken.id" style="width: 100%;">
              <el-form-item style="width: 250px;">
                <el-input
                  style="width: 150px"
                  size="small"
                  v-model="accessToken.tokenName"
                  auto-complete="off"
                  prop="tokenName"
                  :placeholder="accessToken.tokenName==''?'请输入令牌名':accessToken.tokenName"
                ></el-input>
                <el-button size="small" type="error" style="margin-left: 10px;" @click="delToken(accessToken, scope.row.config)">删除</el-button>
              </el-form-item>
            </div>
            <el-button size="small" @click="addToken(scope.row.config)">新增</el-button>
          </el-form-item>
          <el-form-item v-if="scope.row.config.type == 'client'" label="IP" prop="ip">
            <el-input style="width: 250px" size="small" v-model="scope.row.config.ip" auto-complete="off" placeholder="请输入IP地址"></el-input>
          </el-form-item>
          <el-form-item v-if="scope.row.config.type == 'client'" label="URL" prop="url">
            <el-input style="width: 250px" size="small" v-model="scope.row.config.url" auto-complete="off" placeholder="请输入URL"></el-input>
          </el-form-item>
          <el-form-item v-if="scope.row.config.type == 'client'" label="心跳间隔" prop="heartBeatTime">
            <el-input
              style="width: 250px"
              size="small"
              v-model="scope.row.config.heartBeatTime"
              auto-complete="off"
              placeholder="请输入心跳间隔(毫秒)"
            ></el-input>
          </el-form-item>
          <el-form-item v-if="scope.row.config.type == 'client'" label="心跳包" prop="heartBeatData">
            <el-input
              style="width: 250px"
              size="small"
              v-model="scope.row.config.heartBeatData"
              auto-complete="off"
              placeholder="请输入心跳包数据"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-form
          v-if="scope.row.protocol == 'mqtt'"
          class="cu-form"
          label-width="90px"
          :model="scope.row.config"
          :rules="configRule.mqttConfigRule"
          ref="mqttConfigForm"
        >
          <el-form-item label="端口" prop="port">
            <el-input style="width: 250px" size="small" v-model="scope.row.config.port" auto-complete="off" placeholder="请输入端口"></el-input>
          </el-form-item>
          <el-form-item label="WebSocket">
            <el-switch v-model="scope.row.config.useWebSocket" active-text="是" inactive-text="否"></el-switch>
            <div>
              <el-tag v-if="scope.row.config.useWebSocket == true" type="info"> 通过websocket连接mqtt broker </el-tag>
            </div>
          </el-form-item>
          <el-form-item label="模式" prop="type">
            <el-radio v-model="scope.row.config.type" label="server">服务端模式</el-radio>
            <el-radio v-model="scope.row.config.type" label="client">客户端模式</el-radio>
            <div>
              <el-tag v-if="scope.row.config.type == 'server'" type="info"> 设备直连通讯组件，收到设备消息直接进行处理 </el-tag>
              <el-tag v-if="scope.row.config.type == 'client'" type="info"> 设备连接其它broker，通讯组件从broker获取设备消息处理 </el-tag>
            </div>
          </el-form-item>
          <el-form-item v-if="scope.row.config.type == 'client'" label="认证端口" prop="authPort">
            <el-input style="width: 250px" size="small" v-model="scope.row.config.authPort" auto-complete="off" placeholder="请输入认证端口"></el-input>
          </el-form-item>
          <el-form-item v-if="scope.row.config.type == 'client'" label="地址" prop="broker">
            <el-input style="width: 250px" size="small" v-model="scope.row.config.broker" auto-complete="off" placeholder="请输入broker地址"></el-input>
          </el-form-item>
          <el-form-item v-if="scope.row.config.type == 'client'" label="clientId" prop="clientId">
            <el-input style="width: 250px" size="small" v-model="scope.row.config.clientId" auto-complete="off" placeholder="请输入clientId"></el-input>
          </el-form-item>
          <el-form-item v-if="scope.row.config.type == 'client'" label="用户名" prop="username">
            <el-input style="width: 250px" size="small" v-model="scope.row.config.username" auto-complete="off" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item v-if="scope.row.config.type == 'client'" label="密码" prop="password">
            <el-input style="width: 250px" size="small" v-model="scope.row.config.password" auto-complete="off" placeholder="请输入密码"></el-input>
          </el-form-item>
        </el-form>
      </template>
    </yt-table-form>
    <conversion-script title="通讯脚本" type="communication" ref="conversionScriptRef"></conversion-script>
  </div>
</template>
<script lang="ts" setup>
import { IColumn } from '@/components/common/types/tableCommon'
import { generateUUID } from '@/utils'

import YtTableFun from '@/components/common/yt-table-fun.vue'
import YtTableForm from '@/components/common/yt-table-form'
import ConversionScript from '../modules/conversionScript.vue'

// 转换脚本
const conversionScriptRef = ref()
const handleEditScript = (row: any) => {
  conversionScriptRef.value.openDialog(row)
}
const tableFormRef = ref()
const handleAdd = () => {
  tableFormRef.value?.openDialog('add', {
    config: {}
  })
}
// 删除
const handleDelete = (row: any) => {
  console.log(row)
}

// 编辑
const handleEdit = (row: any) => {
  tableFormRef.value?.openDialog('update', row)
}
const stateChange = (status: any) => {
  console.log(status)
}
const type = [
  {
    "id": "62995ba4dbf51a5ec41d5f7b",
    "uid": "fa1c5eaa-de6e-48b6-805e-8f091c7bb831",
    "name": "自定义表计协议",
    "desc": "用于燃气表的协议",
    "createAt": 1654217636597
  },
  {
    "id": "628ceb14addfdb2a3b4b5727",
    "uid": "fa1c5eaa-de6e-48b6-805e-8f091c7bb831",
    "name": "奇特HTTP标准协议",
    "desc": "奇特HTTP标准协议转换器",
    "createAt": 1653402388275
  },
  {
    "id": "6260396d67aced2696184053",
    "uid": "fa1c5eaa-de6e-48b6-805e-8f091c7bb831",
    "name": "奇特MQTT标准协议",
    "desc": "奇特MQTT标准协议转换器",
    "createAt": 1650473325173
  }
]
const getTypeName = (id: string) => {
  return type.find(f => f.id === id)?.name || ''
}
// 添加令牌
const addToken = (config: any) => {
  const randomString = (len: number) => {
    len = len || 32
    var $chars = "ABCDEFGHJKMNPQRSTWXYZabcdefghijklmnopqrstwxyz1234567890"
    var maxPos = $chars.length
    var randomStr = ""
    for (var i = 0; i < len; i++) {
       randomStr += $chars.charAt(Math.floor(Math.random() * maxPos))
    }
    return randomStr
  }
  config.accessTokens.push({
    id: generateUUID(),
    tokenName: '',
    tokenStr: randomString(64)
  })
}
// 删除令牌
const delToken = (token: any, config: any) => {
  let idx = config.config.accessTokens.findIndex((l: any) => l.id == token.id)
  config.config.accessTokens.splice(idx, 1)
}
const column = ref<IColumn[]>([{
  label: '组件名称',
  key: 'name',
  rules: [{required: true, message: '组件名称不能为空'}]
}, {
  label: '组件类型',
  key: 'type',
  type: 'radio',
  componentProps: {
    defaultValue: 'device',
    options: [{
      label: '设备组件',
      value: 'device',
    }, {
      label: '业务组件',
      value: 'biz',
    }]
  },
  formWatch: (scope) => {
    scope.column.forEach((f: IColumn) => {
      if (f.key === 'converter') {
        f.formHide = scope.value === 'biz'
      }
    })
    column.value = scope.column
    console.log(column.value)
  }
}, {
  label: '转换器',
  key: 'converter',
  formHide: true,
  rules: [
    { required: true, message: '请选择转换器', trigger: 'blur' },
  ]
}, {
  label: '通讯协议',
  key: 'protocol',
  type: 'select',
  formWatch: (scope) => {
    const websocketConfig = {
      port: 0,
      ssl: false,
      type: 'server',
      ip: '',
      url: '',
      heartBeatTime: 10000,
      heartBeatData: '',
      accessTokens: []
    }
    const httpConfig = {
      port: 0,
    }
    const mqttConfig = {
      port: 1883,
      ssl: false,
      useWebSocket:false,
      type: 'server',
      subscribeTopics: [
        '/sys/+/+/s/#',
        '/sys/client/connected',
        '/sys/client/disconnected',
        '/sys/session/subscribed',
        '/sys/session/unsubscribed',
      ],
    }
    const tcpConfig = {
      port: 2424,
      ssl: false,
      type: 'server',
      parserType: '不处理',
      parserConfiguration: {
        delimited: '',
        fix: 1,
        script: '',
      }
    }
    const obj: any = {
      mqtt: mqttConfig,
      http: httpConfig,
      tcp: tcpConfig,
      websocket: websocketConfig,
    }
    scope.data.config = obj[scope.value] || {}
  },
  componentProps: {
    defaultValue: 'mqtt',
    options: [{
      label: 'MQTT',
      value: 'mqtt',
    }, {
      label: 'HTTP',
      value: 'http',
    }, {
      label: 'TCP',
      value: 'tcp',
    }, {
      label: 'WEBSOCKET',
      value: 'websocket',
    }]
  },
  rules: [{required: true, message: '请选择通讯协议'}]
}, {
  label: '配置',
  key: 'config',
  formSlot: true,
}, {
  label: 'jar包',
  key: 'jarFile',
  type: 'upload',
  componentProps: {
    fileType: ['jar'],
    limit: 1,
  }
}])
const data = ref([
  {
    "id": "fee0e826-963f-4e53-a2cf-11e3e5f784ea",
    "uid": "fa1c5eaa-de6e-48b6-805e-8f091c7bb831",
    "name": "移动Onenet Studio接入",
    "type": "biz",
    "protocol": "http",
    "jarFile": "http-biz-component-0.1.0-SNAPSHOT.jar",
    "config": "{\"port\":\"8086\"}",
    "converter": "6260396d67aced2696184053",
    "state": "stopped",
    "createAt": 1652238780184
  },
  {
    "id": "eabb131d-8fd1-43a8-88d9-a198abfd3d42",
    "uid": "fa1c5eaa-de6e-48b6-805e-8f091c7bb831",
    "name": "MQTT标准协议组件",
    "type": "device",
    "protocol": "mqtt",
    "jarFile": "iot-mqtt-component-0.4.2-SNAPSHOT.jar",
    "config": "{\"port\":1883,\"ssl\":false,\"type\":\"server\"}",
    "converter": "6260396d67aced2696184053",
    "state": "running",
    "createAt": 1650473458084
  },
  {
    "id": "cd8253c1-b489-434c-845d-d18c7b70dcea",
    "uid": "fa1c5eaa-de6e-48b6-805e-8f091c7bb831",
    "name": "电信NB协议接入组件",
    "type": "device",
    "protocol": "http",
    "jarFile": "ctwing-component-0.2.1-SNAPSHOT.jar",
    "config": "{\"port\":\"8087\"}",
    "converter": "62995ba4dbf51a5ec41d5f7b",
    "state": "stopped",
    "createAt": 1654235056032
  },
  {
    "id": "6c095554-35e7-4e9d-a8d2-bb919e9479f4",
    "uid": "fa1c5eaa-de6e-48b6-805e-8f091c7bb831",
    "name": "EMQX标准协议组件",
    "type": "device",
    "protocol": "mqtt",
    "jarFile": "emqx-component-0.2.1-SNAPSHOT.jar",
    "config": "{\"port\":\"1884\",\"ssl\":false,\"type\":\"client\",\"subscribeTopics\":[\"/sys/+/+/s/#\",\"/sys/client/connected\",\"/sys/client/disconnected\",\"/sys/session/subscribed\",\"/sys/session/unsubscribed\"],\"authPort\":\"8088\",\"broker\":\"127.0.0.1\",\"clientId\":\"test\",\"username\":\"test\",\"password\":\"123\"}",
    "converter": "6260396d67aced2696184053",
    "state": "stopped",
    "createAt": 1653180468724
  },
  {
    "id": "3ababc5e-15e9-45a7-8f38-2a6afd45c780",
    "uid": "fa1c5eaa-de6e-48b6-805e-8f091c7bb831",
    "name": "小度音箱接入组件",
    "type": "biz",
    "protocol": "http",
    "jarFile": "http-biz-component-0.1.0-SNAPSHOT.jar",
    "config": "{\"port\":\"8084\"}",
    "converter": "",
    "state": "stopped",
    "createAt": 1650685502665
  }
].map(m => ({
  ...m,
  flag: m.state == 'running',
})))
const configRule = reactive({
  httpConfigRule: {
    port: [{ required: true, message: "请输入端口号", trigger: "blur" }],
  },
  mqttConfigRule: {
    port: [{ required: true, message: "请输入端口号", trigger: "blur" }],
  },
  tcpConfigRule: {
    port: [{ required: true, message: "请输入端口号", trigger: "blur" }],
    host: [{ required: true, message: "请输入端IP", trigger: "blur" }],
  },
  wsConfigRule: {
    port: [{ required: true, message: "请输入端口号", trigger: "blur" }],
    ip: [{ required: true, message: "请输入IP", trigger: "blur" }],
    url: [{ required: true, message: "请输入URL", trigger: "blur" }]
  },
})
</script>

<style lang="scss" scoped>
.cu-form {
  width: 100%;
  border: 1px solid #ddd;
  padding: 10px 10px;
  box-sizing: border-box;
  border-radius: 3px;
  ::v-deep(.el-form-item) {
    margin-bottom: 15px;
  }
}
</style>
