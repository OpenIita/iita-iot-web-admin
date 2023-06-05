<template>
  <div>设备详情TODO：后面联调再写</div>
</template>
<!-- TODO: 后面联调的时候重写 -->
<!-- <template>
  <div>
    <el-page-header @back="$router.back(-1)" content="设备详情"> </el-page-header>
    <el-divider></el-divider>
    <el-tabs v-model="state.activeName" @tab-click="handleClick">
      <el-tab-pane label="基本信息" name="base">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-descriptions :column="1" border :labelStyle="{ 'font-weight': 'bold' }">
              <el-descriptions-item label="设备ID">{{
                state.deviceDetail.deviceId
              }}</el-descriptions-item>
              <el-descriptions-item label="产品productKey">{{
                state.deviceDetail.productKey
              }}</el-descriptions-item>
              <el-descriptions-item label="设备deviceName">{{
                state.deviceDetail.deviceName
              }}</el-descriptions-item>
              <el-descriptions-item label="设备密钥">{{
                state.deviceDetail.secret
              }}</el-descriptions-item>
              <el-descriptions-item label="创建时间">{{
                state.deviceDetail.createAt | timestampToTime
              }}</el-descriptions-item>
              <el-descriptions-item label="设备状态">{{
                state.deviceDetail.state
                ? state.deviceDetail.state.online
                  ? "在线"
                  : "离线"
                : "离线"
              }}</el-descriptions-item>
              <el-descriptions-item label="最后上线时间">{{
                state.deviceDetail.onlineTime
              }}</el-descriptions-item>
            </el-descriptions></el-col
          >
          <el-col v-if="state.showDeviceMap" :span="12">
            <Map :center="map.mapLnglat" />
          </el-col>
        </el-row>
        <div style="margin: 10px 10px">设备标签&nbsp;<el-button size="mini" icon="el-icon-plus" @click="addTag"></el-button></div>
        <el-descriptions :column="2" border :labelStyle="{ 'font-weight': 'bold' }">
          <el-descriptions-item v-for="tag in state.tags" :key="tag.name" :label="tag.name + '(' + tag.id + ')'">{{ tag.value
          }}</el-descriptions-item>
        </el-descriptions>
      </el-tab-pane>
      <el-tab-pane label="属性" name="property">
        <el-table :data="state.properties" border v-loading="false" style="width: 100%">
          <el-table-column prop="name" label="属性名" width="180">
            <template v-slot="scope"> {{ scope.row.name }}({{ scope.row.identifier }}) </template>
          </el-table-column>
          <el-table-column prop="value" label="属性值" width="180">
            <template v-slot="scope">
              <span>{{ scope.row.value }} &nbsp;</span>
              <el-button @click="showPropertyHistory(scope.row)" size="mini">历史</el-button>
            </template>
          </el-table-column>
          <el-table-column label="可读写">
            <template v-slot="scope">
              <el-tag v-if="!scope.row.write" type="info" size="mini" effect="plain">只读</el-tag>
              <el-button @click="showWriteProperty(scope.row)" v-if="scope.row.write" size="mini" type="success" plain>可写</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div v-if="!!state.propertyHistory.name">
          <el-divider></el-divider>
          <el-row>
            <el-col :span="2">
              <h5>历史数据</h5>
            </el-col>
            <el-col :span="9">
              <el-date-picker
                v-model="state.historyTime"
                type="datetimerange"
                :picker-options="state.pickerOptions"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                align="right"
                @change="state.timeRangeChange"
              >
              </el-date-picker>
            </el-col>
            <el-col :span="4">
              <el-radio-group v-model="state.dataType" size="small">
                <el-radio-button label="">无</el-radio-button>
                <el-radio-button label="stats">统计</el-radio-button>
              </el-radio-group>
            </el-col>
          </el-row>
          <PropertyChart :name="state.propertyHistory.name" :properties="state.propertyHistory.data"></PropertyChart>
        </div>
      </el-tab-pane>
      <el-tab-pane label="服务" name="service">
        <el-table :data="state.services" border v-loading="false" style="width: 100%">
          <el-table-column label="服务名称" width="180">
            <template v-slot="scope"> {{ scope.row.name }}({{ scope.row.identifier }}) </template>
          </el-table-column>
          <el-table-column label="操作" width="100">
            <template v-slot="scope">
              <el-button @click="showInvokeService(scope.row)" type="success" size="mini" plain>调用</el-button>
            </template>
          </el-table-column>
          <el-table-column label="参数">
            <template v-slot="scope">
              {{ scope.row.inputData }}
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="日志" name="event">
        <el-form :inline="true" :model="state.formInline" class="user-search">
          <el-form-item>
            <el-select size="small" v-model="state.formInline.type" placeholder="请选择日志类型">
              <el-option label="所有" value=""></el-option>
              <el-option label="状态" value="state"></el-option>
              <el-option label="事件" value="event"></el-option>
              <el-option label="属性" value="property"></el-option>
              <el-option label="服务" value="service"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="搜索：">
            <el-input size="small" v-model="state.formInline.identifier" placeholder="日志识符"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="small" type="primary" icon="el-icon-search" @click="logSearch">搜索</el-button>
          </el-form-item>
        </el-form>

        <el-table :data="state.events" border v-loading="loading" style="width: 100%">
          <el-table-column label="时间" width="180">
            <template v-slot="scope">
              {{ scope.row.time }}
            </template>
          </el-table-column>
          <el-table-column prop="type" label="类型" width="80"> </el-table-column>
          <el-table-column prop="name" label="名称(标识符)" width="180"> </el-table-column>
          <el-table-column label="内容">
            <template v-slot="scope">
              {{ scope.row.content.data }}
            </template>
          </el-table-column>
        </el-table>
        <Pagination :data="state.formInline" @onPagePaging="getEvents"></Pagination>
      </el-tab-pane>
      <el-tab-pane label="模拟上报">
        <el-table
          size="small"
          :data="state.modelFunctions"
          highlight-current-row
          v-loading="false"
          border
          element-loading-text="拼命加载中"
          style="width: 100%"
        >
          <el-table-column type="expand" label="上报">
            <template v-slot="fun">
              <el-form v-model="fun.row" label-width="80px" style="width: 500px">
                <el-form-item label="值" v-if="fun.row.type == 'property'">
                  <el-input v-model="fun.row.value" size="mini"></el-input>
                </el-form-item>
                <el-form-item label="内容" v-else>
                  <el-input type="textarea" v-model="fun.row.content" size="mini" rows="4"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" size="mini" @click="sendDeviceMsg(fun.row)">发送</el-button>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column sortable prop="type" label="功能类型" width="100"> </el-table-column>
          <el-table-column sortable prop="name" label="功能名称" width="180"> </el-table-column>
          <el-table-column sortable prop="identifier" label="标识符" width="150"> </el-table-column>
          <el-table-column sortable prop="dataTypeName" label="数据类型" width="100"> </el-table-column>
          <el-table-column sortable prop="params" label="数据定义" width="200"> </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="设备配置">
        <DeviceConfig :deviceId="state.deviceId" />
      </el-tab-pane>
      <el-tab-pane label="模拟设备">
        <DeviceSimulator :thingModelFunctions="state.modelFunctions" :deviceDetail="state.deviceDetail"></DeviceSimulator>
      </el-tab-pane>
    </el-tabs>
    <el-dialog :title="state.title" v-model:visible="state.propertyWriteFormVisible" width="40%" @click="closeDialog">
      <el-form label-width="120px" :model="state.propertyWriteForm" ref="propertyWriteForm">
        <div style="display: none">
          <el-input size="small" v-model="state.propertyWriteForm.identifier" type="hidden"></el-input>
        </div>
        <el-form-item label="属性值" prop="value">
          <el-input size="small" v-model="state.propertyWriteForm.value" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button size="small" @click="closeDialog">取消</el-button>
          <el-button size="small" type="primary" :loading="false" class="title" @click="submitPropertyWriteForm('propertyWriteForm')">保存</el-button>
        </div>
      </template>
    </el-dialog>

    <el-dialog :title="state.title" v-model:visible="state.serviceFormVisible" width="40%" @click="closeDialog">
      <el-form label-width="120px" :model="state.serviceForm" ref="serviceForm">
        <div style="display: none">
          <el-input size="small" v-model="state.serviceForm.identifier" type="hidden"></el-input>
          <el-input size="small" v-model="state.serviceForm.productKey" type="hidden"></el-input>
          <el-input size="small" v-model="state.serviceForm.deviceName" type="hidden"></el-input>
        </div>
        <el-form-item
          v-for="param in state.serviceForm.params"
          :key="param.identifier"
          :label="param.name + '(' + param.identifier + ')'"
          prop="params"
        >
          <el-input size="small" v-model="param.value" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="closeDialog">取消</el-button>
        <el-button size="small" type="primary" :loading="loading" class="title" @click="submitServiceForm('serviceForm')">保存</el-button>
      </div>
    </el-dialog>

    <el-dialog title="添加设备标签" v-model:visible="state.showAddTag" width="400px">
      <el-form ref="form" :model="state.tagForm" :rules="state.rules" label-width="80px">
        <el-form-item label="标签名称" prop="name">
          <el-input size="small" v-model="state.tagForm.name"></el-input>
        </el-form-item>
        <el-form-item label="标识符" prop="id">
          <el-input size="small" v-model="state.tagForm.id"></el-input>
        </el-form-item>
        <el-form-item label="标签值" prop="value">
          <el-input size="small" v-model="state.tagForm.value"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitAddTag" size="small">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>

const route = useRoute()
const { id } = route.params

const state = reactive<any>({
  loading: false,
  activeName: 'base',
  title: '',
  propertyWriteFormVisible: false,
  propertyWriteForm: {
    identifier: '',
    productKey: '',
    deviceName: '',
    value: '',
  },
  serviceFormVisible: false,
  serviceForm: {
    identifier: '',
    productKey: '',
    deviceName: '',
    params: [],
  },
  showAddTag: false,
showDeviceMap: false,
  tagForm: {
    name: '',
    identifier: '',
    value: '',
  },
  rules: {
    id: [{ required: true, message: '请输入标识符', trigger: 'blur' }],
    name: [{ required: true, message: '请输入标签名称', trigger: 'blur' }],
    value: [{ required: true, message: '请输入标签值', trigger: 'blur' }],
  },
  deviceId: '',
  deviceDetail: {},
  thingModel: null,
  modelFunctions: [],
  properties: [],
  services: [],
  events: [],
  eventMap: {},
mapLnglat:'',
  tags: [],
  formInline: {
    type: '',
    identifier: '',
    page: 1,
    size: 10,
    total: 0,
  },
  deviceLogs: [],
  typeMap: {
    lifetime: '生命周期',
    state: '设备状态',
    property: '属性',
    event: '事件',
    service: '服务',
  },
  propertyHistory: {
    name: '',
    data: [],
  },
  dataType: '',
  currHistoryProperty: {},
  historyTime: [
    new Date(new Date().getTime() - 24 * 3600 * 1000),
    new Date(new Date().getTime() + 24 * 3600 * 1000),
  ],
  pickerOptions: {
    shortcuts: [
      {
        text: '最近1小时',
        onClick(picker: any) {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000)
          picker.$emit('pick', [start, end])
        },
      },
      {
        text: '最近6小时',
        onClick(picker: any) {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 6)
          picker.$emit('pick', [start, end])
        },
      },
      {
        text: '最近1天',
        onClick(picker: any) {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24)
          picker.$emit('pick', [start, end])
        },
      },
      {
        text: '最近5天',
        onClick(picker: any) {``
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 5)
          picker.$emit('pick', [start, end])
        },
      },
    ],
  },
})
</script>

<style lang="scss" scoped></style> -->
