<template>
  <div>
    <yt-table-fun @handle-add="handleAdd()">
      <el-row :gutter="16" v-loading="loading">
        <el-col :span="6" :sm="6" :xs="24" v-for="com in data" :key="com.id" style="margin: 10px 0">
          <el-card>
            <template #header>
              <div class="clearfix">
                <b>{{ com.name }}</b>
                <div style="float: right">
                  <el-popconfirm title="确认要删除吗？" @confirm="handleDelete(com)">
                    <template #reference>
                      <div>
                        <el-button icon="Delete" link type="danger"></el-button>
                      </div>
                    </template>
                  </el-popconfirm>
                </div>
              </div>
            </template>
            <el-descriptions :column="1" size="default" :labelStyle="{ fontWeight: 'bold' }">
              <el-descriptions-item label-class-name="custom-label" label="通讯协议">{{
                com.protocol
              }}</el-descriptions-item>
              <el-descriptions-item label-class-name="custom-label" label="转换器">{{
                getTypeName(com.converter)
              }}</el-descriptions-item>
              <el-descriptions-item label-class-name="custom-label" label="jar包" class-name="ov-text1">{{ com.jarFile }}</el-descriptions-item>
              <el-descriptions-item label-class-name="custom-label" label="状态">
                <el-switch
                  v-model="com.state"
                  active-text="运行中"
                  inactive-text="已停止"
                  active-value="running"
                  inactive-value="stopped"
                  inline-prompt
                  size="large"
                  style="--el-switch-on-color: #029D40; --el-switch-off-color: #DFDFDF"
                  @change="stateChange(com)"
                >
                </el-switch>
              </el-descriptions-item>
              <el-descriptions-item label-class-name="custom-label" label="操作">
                <el-button @click="handleEdit(com)" link icon="Edit" type="primary">修改</el-button>
                <el-button @click="handleEditScript(com)" icon="EditPen" type="primary" class="mg-left-10" link>编写脚本</el-button>
              </el-descriptions-item>
            </el-descriptions>
          </el-card>
        </el-col>
      </el-row>
    </yt-table-fun>
    <yt-table-form ref="tableFormRef" :column="column" @onSuccess="handleSave" @openBeforeFun="openBeforeFun">
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
            <el-input style="width: 250px" size="small" v-model="scope.row.config.port" auto-complete="off" placeholder="请输入端口" />
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
            <el-input style="width: 250px" size="small" v-model="scope.row.config.port" auto-complete="off" placeholder="请输入端口" />
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
            <el-input style="width: 250px" size="small" v-model="scope.row.config.host" auto-complete="off" placeholder="请输入IP地址" />
          </el-form-item>
          <el-form-item v-if="scope.row.config.type == 'server'" label="IP地址" prop="host">
            <el-input style="width: 250px" size="small" v-model="scope.row.config.host" auto-complete="off" placeholder="请输入IP地址" />
          </el-form-item>
          <el-form-item label="处理方式" prop="parserType">
            <el-select v-model="scope.row.config.parserType" placeholder="请选择通讯协议">
              <el-option label="不处理" value="不处理" />
              <el-option label="固定长度" value="固定长度" />
              <el-option label="分隔符" value="分隔符" />
              <el-option label="自定义脚本" value="自定义脚本" />
            </el-select>
          </el-form-item>
          <el-form-item v-if="scope.row.config.parserType == '固定长度'" label="长度" prop="fix">
            <el-input
              style="width: 250px"
              size="small"
              v-model="scope.row.config.parserConfiguration.fix"
              auto-complete="off"
              placeholder="请输入长度"
            />
          </el-form-item>
          <el-form-item v-if="scope.row.config.parserType == '分隔符'" label="分隔符" prop="delimited">
            <el-input
              style="width: 250px"
              size="small"
              v-model="scope.row.config.parserConfiguration.delimited"
              auto-complete="off"
              placeholder="请输入分隔符"
            />
          </el-form-item>
          <el-form-item v-if="scope.row.config.parserType == '自定义脚本'" label="script" prop="fix">
            <el-input
              style="width: 250px"
              size="small"
              v-model="scope.row.config.parserConfiguration.script"
              auto-complete="off"
              placeholder="请输入自定义脚本"
            />
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
            <el-input style="width: 250px" size="small" v-model="scope.row.config.port" auto-complete="off" placeholder="请输入端口" />
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
                />
                <el-button size="small" type="danger" style="margin-left: 10px;" @click="delToken(accessToken, scope.row.config)">删除</el-button>
              </el-form-item>
            </div>
            <el-button size="small" @click="addToken(scope.row.config)">新增</el-button>
          </el-form-item>
          <el-form-item v-if="scope.row.config.type == 'client'" label="IP" prop="ip">
            <el-input style="width: 250px" size="small" v-model="scope.row.config.ip" auto-complete="off" placeholder="请输入IP地址" />
          </el-form-item>
          <el-form-item v-if="scope.row.config.type == 'client'" label="URL" prop="url">
            <el-input style="width: 250px" size="small" v-model="scope.row.config.url" auto-complete="off" placeholder="请输入URL" />
          </el-form-item>
          <el-form-item v-if="scope.row.config.type == 'client'" label="心跳间隔" prop="heartBeatTime">
            <el-input
              style="width: 250px"
              size="small"
              v-model="scope.row.config.heartBeatTime"
              auto-complete="off"
              placeholder="请输入心跳间隔(毫秒)"
            />
          </el-form-item>
          <el-form-item v-if="scope.row.config.type == 'client'" label="心跳包" prop="heartBeatData">
            <el-input style="width: 250px" size="small" v-model="scope.row.config.heartBeatData" auto-complete="off" placeholder="请输入心跳包数据" />
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
            <el-input style="width: 250px" size="small" v-model="scope.row.config.port" auto-complete="off" placeholder="请输入端口" />
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
            <el-input style="width: 250px" size="small" v-model="scope.row.config.authPort" auto-complete="off" placeholder="请输入认证端口" />
          </el-form-item>
          <el-form-item v-if="scope.row.config.type == 'client'" label="地址" prop="broker">
            <el-input style="width: 250px" size="small" v-model="scope.row.config.broker" auto-complete="off" placeholder="请输入broker地址" />
          </el-form-item>
          <el-form-item v-if="scope.row.config.type == 'client'" label="clientId" prop="clientId">
            <el-input style="width: 250px" size="small" v-model="scope.row.config.clientId" auto-complete="off" placeholder="请输入clientId" />
          </el-form-item>
          <el-form-item v-if="scope.row.config.type == 'client'" label="用户名" prop="username">
            <el-input style="width: 250px" size="small" v-model="scope.row.config.username" auto-complete="off" placeholder="请输入用户名" />
          </el-form-item>
          <el-form-item v-if="scope.row.config.type == 'client'" label="密码" prop="password">
            <el-input style="width: 250px" size="small" v-model="scope.row.config.password" auto-complete="off" placeholder="请输入密码" />
          </el-form-item>
        </el-form>
      </template>
      <template #jarFileForm="{ row }">
        <div v-if="row.jarFile">
          <el-tag
            size="default"
            type="info"
            closable
            @close="() => {
              row.jarFile = ''
            }"
            >{{ row.jarFile }}</el-tag
          >
        </div>
        <upload-file
          v-else
          v-model:value="row.jarFile"
          :fileType="['jar']"
          :limit="1"
          :params="{
            id: row.id
          }"
          @stringSuccess="(res) => uploadJarSuccess(res, row)"
          uploadType="url"
          uploadUrl="/protocol/uploadJar"
        ></upload-file>
      </template>
    </yt-table-form>
    <conversion-script title="通讯脚本" type="communication" ref="conversionScriptRef" />
  </div>
</template>
<script lang="ts" setup>
import { IColumn } from '@/components/common/types/tableCommon'
import { generateUUID } from '@/utils'
import { getComponentList, deleteComponent, addComponent, editComponent, changeState } from '../api/component.api'
import type { IComponentVO } from '../api/component.api'
import { getConvertorsList } from '../api/convertors.api'

import YtTableFun from '@/components/common/yt-table-fun.vue'
import YtTableForm from '@/components/common/yt-table-form'
import ConversionScript from '../modules/conversionScript.vue'
import UploadFile from '@/components/FileUpload/index.vue'

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
  loading.value = true
  deleteComponent(row.id).then(res => {
    if (res.code === 200) {
      ElMessage.success('删除成功')
      getData()
    } else {
      ElMessage.error(res.message)
    }
  }).finally(() => {
    loading.value = false
  })
}

// 编辑
const handleEdit = (row: any) => {
  tableFormRef.value?.openDialog('update', {
    ...toRaw(row),
    config: JSON.parse(row.config) || {}
  })
}
// 状态更改
const stateChange = (row: any) => {
  loading.value = true
  changeState({
    id: row.id,
    state: row.state,
  }).then((res) => {
    if (res.code === 200) {
      ElMessage.success('变更成功')
    } else {
      ElMessage.error(res.message)
    }
  }).finally(() => {
    getData()
    loading.value = false
  })
}
const type = ref<any[]>([])
const getTypeName = (id: string) => {
  return type.value.find(f => f.id === id)?.name || ''
}
// 添加令牌
const addToken = (config: any) => {
  const randomString = (len: number) => {
    len = len || 32
    var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefghijklmnopqrstwxyz1234567890'
    var maxPos = $chars.length
    var randomStr = ''
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
  }
}, {
  label: '转换器类型',
  key: 'converType',
  type: 'radio',
  componentProps: {
    defaultValue: 'custom',
    options: [{
      label: '自定义',
      value: 'custom',
    }, {
      label: '静态',
      value: 'static',
    }]
  },
  formWatch: (scope) => {
    scope.column.forEach((f: IColumn) => {
      if (f.key === 'converter') {
        f.formHide = scope.value === 'static'
      }
    })
    column.value = scope.column
  }
}, {
  label: '转换器',
  key: 'converter',
  type: 'select',
  componentProps: {
    labelAlias: 'name',
    valueAlias: 'id',
    options: type.value,
  },
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
    if (!scope.data.config) scope.data.config = obj[scope.value] || {}
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
  rules: [{ required: true, message: '请选择通讯协议' }]
}, {
  label: '配置',
  key: 'config',
  formSlot: true,
}, {
  label: 'jar包',
  key: 'jarFile',
  formSlot: true,
  rules: [{ required: true, message: '请上传jar包' }]
}])
const data = ref<IComponentVO[]>([])
const configRule = reactive({
  httpConfigRule: {
    port: [{ required: true, message: '请输入端口号', trigger: 'blur' }],
  },
  mqttConfigRule: {
    port: [{ required: true, message: '请输入端口号', trigger: 'blur' }],
  },
  tcpConfigRule: {
    port: [{ required: true, message: '请输入端口号', trigger: 'blur' }],
    host: [{ required: true, message: '请输入端IP', trigger: 'blur' }],
  },
  wsConfigRule: {
    port: [{ required: true, message: '请输入端口号', trigger: 'blur' }],
    ip: [{ required: true, message: '请输入IP', trigger: 'blur' }],
    url: [{ required: true, message: '请输入URL', trigger: 'blur' }]
  },
})
// 弹窗前置操作
const openBeforeFun = ({type, data}) => {
  if (type === 'add') {
    data.id = ''
  }
}
// 上传jar成功
const uploadJarSuccess = (res, row) => {
  console.log(res)
  if (res.id) {
    row.id = res.id
    row.jarFile = res.fileName
  }
  console.log(row)
}
// 保存
const handleSave = ({type, data, cancel}) => {
  loading.value = true
  let fun = addComponent
  if (type === 'update') fun = editComponent
  fun({
    ...toRaw(data),
    config: JSON.stringify(data.config),
  }).then(() => {
    ElMessage.success(type === 'add' ? '添加成功' : '编辑成功')
    cancel()
    getData()
  }).finally(() => {
    loading.value = false
  })
}
// 获取数据
const loading = ref(false)
const getData = () => {
  loading.value = true
  getComponentList().then(res => {
    data.value = res.data.rows || []
    console.log(data.value)
  }).finally(() => {
    loading.value = false
  })
}
// 获取字典
const getDict = () => {
  getConvertorsList({
    pageNum: 1,
    pageSize: 10000000,
  }).then(res => {
    type.value = res.data.rows || []
    column.value.forEach(item => {
      if (item.key === 'converter') {
        item.componentProps.options = type.value
      }
    })
  })
}
getDict()
getData()
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
::v-deep(.el-descriptions__cell) {
  display: flex;
  align-items: center;
}
::v-deep(.custom-label) {
  width: 60px;
  text-align: right;
}
::v-deep(.el-descriptions__body .el-descriptions__table:not(.is-bordered) .el-descriptions__cell) {
  padding-bottom: 6px;
}
::v-deep(.el-card__header) {
  padding: 16px!important;
}
</style>
