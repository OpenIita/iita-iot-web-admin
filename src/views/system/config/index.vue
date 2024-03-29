<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div class="search" v-show="showSearch">
        <el-form :model="queryParams" ref="queryFormRef" :inline="true" label-width="68px">
          <el-form-item label="参数名称" prop="configName">
            <el-input v-model="queryParams.configName" placeholder="请输入参数名称" clearable style="width: 240px" @keyup.enter="handleQuery" />
          </el-form-item>
          <el-form-item label="参数键名" prop="configKey">
            <el-input v-model="queryParams.configKey" placeholder="请输入参数键名" clearable style="width: 240px" @keyup.enter="handleQuery" />
          </el-form-item>
          <el-form-item label="系统内置" prop="configType">
            <el-select v-model="queryParams.configType" placeholder="系统内置" clearable>
              <el-option v-for="dict in sys_yes_no" :key="dict.value" :label="dict.label" :value="dict.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="创建时间" style="width: 308px;">
            <el-date-picker
              v-model="dateRange"
              value-format="YYYY-MM-DD HH:mm:ss"
              type="daterange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="[new Date(2000, 1, 1, 0, 0, 0), new Date(2000, 1, 1, 23, 59, 59)]"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
            <el-button icon="Refresh" @click="resetQuery">重置</el-button>
            <el-button icon="Download" @click="exportSysData">系统数据备份</el-button>
          </el-form-item>
        </el-form>
      </div>
    </transition>
    <el-card shadow="never">
      <template #header>
        <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
            <el-button type="primary" plain icon="Plus" @click="handleAdd" v-hasPermi="['system:config:add']">新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdate()" v-hasPermi="['system:config:edit']">
              修改
            </el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete()" v-hasPermi="['system:config:remove']">
              删除
            </el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="warning" plain icon="Download" @click="handleExport" v-hasPermi="['system:config:export']">导出</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" plain icon="Refresh" @click="handleRefreshCache" v-hasPermi="['system:config:remove']">刷新缓存</el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @queryTable="getList" />
        </el-row>
      </template>

      <el-table v-loading="loading" :data="configList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="参数主键" align="center" prop="configId" v-if="false" />
        <el-table-column label="参数名称" align="center" prop="configName" :show-overflow-tooltip="true" />
        <el-table-column label="参数键名" align="center" prop="configKey" :show-overflow-tooltip="true" />
        <el-table-column label="参数键值" align="center" prop="configValue" :show-overflow-tooltip="true" />
        <el-table-column label="系统内置" align="center" prop="configType">
          <template #default="scope">
            <dict-tag :options="sys_yes_no" :value="scope.row.configType" />
          </template>
        </el-table-column>
        <el-table-column label="备注" align="center" prop="remark" :show-overflow-tooltip="true" />
        <el-table-column label="创建时间" align="center" prop="createTime" width="180">
          <template #default="scope">
            <span>{{ parseTime(scope.row.createTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="150" class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip content="修改" placement="top">
              <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['system:config:edit']" />
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['system:config:remove']" />
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total > 0" :total="total" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" @pagination="getList" />
    </el-card>

    <!-- 添加或修改参数配置对话框 -->
    <el-dialog
      :title="dialog.title"
      v-model="dialog.visible"
      width="500px"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      append-to-body
      destroy-on-close
    >
      <el-form v-if="dialog.visible" ref="configFormRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="参数名称" prop="configName">
          <el-input v-model="form.configName" placeholder="请输入参数名称" />
        </el-form-item>
        <el-form-item label="参数键名" prop="configKey">
          <el-input v-model="form.configKey" placeholder="请输入参数键名" />
        </el-form-item>
        <el-form-item label="参数键值" prop="configValue">
          <el-input v-model="form.configValue" placeholder="请输入参数键值" />
        </el-form-item>
        <el-form-item label="系统内置" prop="configType">
          <el-radio-group v-model="form.configType">
            <el-radio v-for="dict in sys_yes_no" :key="dict.value" :label="dict.value">{{ dict.label }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" type="textarea" placeholder="请输入内容" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="submitForm">确 定</el-button>
          <el-button @click="cancel">取 消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup name="Config" lang="ts">
import { listConfig, getConfig, delConfig, addConfig, updateConfig, refreshCache } from '@/api/system/config'
import { ConfigForm, ConfigQuery, ConfigVO } from '@/api/system/config/types'
import { ComponentInternalInstance } from 'vue'
import { DateModelType, FormInstance } from 'element-plus'

const { proxy } = getCurrentInstance() as ComponentInternalInstance
const { sys_yes_no } = toRefs<any>(proxy?.useDict('sys_yes_no'))

const configList = ref<ConfigVO[]>([])
const loading = ref(true)
const showSearch = ref(true)
const ids = ref<Array<number | string>>([])
const single = ref(true)
const multiple = ref(true)
const total = ref(0)
const dateRange = ref<[DateModelType, DateModelType]>(['', ''])

const queryFormRef = ref<FormInstance>()
const configFormRef = ref<FormInstance>()
const dialog = reactive<DialogOption>({
  visible: false,
  title: '',
})
const initFormData: ConfigForm = {
  id: undefined,
  configName: '',
  configKey: '',
  configValue: '',
  configType: 'Y',
  remark: '',
}
const data = reactive<PageData<ConfigForm, ConfigQuery>>({
  form: { ...initFormData },
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    configName: '',
    configKey: '',
    configType: '',
  },
  rules: {
    configName: [{ required: true, message: '参数名称不能为空', trigger: 'blur' }],
    configKey: [{ required: true, message: '参数键名不能为空', trigger: 'blur' }],
    configValue: [{ required: true, message: '参数键值不能为空', trigger: 'blur' }],
  },
})

const { queryParams, form, rules } = toRefs(data)

/** 查询参数列表 */
const getList = async () => {
  loading.value = true
  const res: any = await listConfig(proxy?.addDateRange(queryParams.value, dateRange.value))
  configList.value = res.data.rows
  total.value = res.data.total
  loading.value = false
}
/** 取消按钮 */
const cancel = () => {
  reset()
  dialog.visible = false
}
/** 表单重置 */
const reset = () => {
  form.value = { ...initFormData }
  configFormRef.value?.resetFields()
}
/** 搜索按钮操作 */
const handleQuery = () => {
  queryParams.value.pageNum = 1
  getList()
}
/** 重置按钮操作 */
const resetQuery = () => {
  dateRange.value = ['', '']
  queryFormRef.value?.resetFields()
  handleQuery()
}
/** 多选框选中数据 */
const handleSelectionChange = (selection: ConfigVO[]) => {
  ids.value = selection.map((item) => item.configId)
  single.value = selection.length != 1
  multiple.value = !selection.length
}
/** 新增按钮操作 */
const handleAdd = () => {
  dialog.visible = true
  dialog.title = '添加参数'
  nextTick(() => {
    reset()
  })
}
/** 修改按钮操作 */
const handleUpdate = (row?: ConfigVO) => {
  dialog.visible = true
  dialog.title = '修改参数'
  const configId = row?.id ? row.id : ids.value[0]
  nextTick(async () => {
    reset()
    const res = await getConfig(configId)
    form.value = res.data
  })
}
/** 提交按钮 */
const submitForm = () => {
  configFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      form.value.id ? await updateConfig(form.value) : await addConfig(form.value)
      proxy?.$modal.msgSuccess('操作成功')
      dialog.visible = false
      getList()
    }
  })
}
/** 删除按钮操作 */
const handleDelete = async (row?: ConfigVO) => {
  const configIds = row?.id ? [row.id] : ids.value[0]

  await proxy?.$modal.confirm('是否确认删除参数编号为"' + configIds + '"的数据项？')
  await delConfig(configIds)
  getList()
  proxy?.$modal.msgSuccess('删除成功')
}
/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download(
    'system/config/export',
    {
      ...queryParams.value,
    },
    `config_${new Date().getTime()}.xlsx`
  )
}
/** 刷新缓存按钮操作 */
const handleRefreshCache = async () => {
  await refreshCache()
  proxy?.$modal.msgSuccess('刷新缓存成功')
}

const exportSysData = async () => {
  proxy?.download('system/config/exportSysData', {}, `data_${new Date().getTime()}.zip`)
}

onMounted(() => {
  getList()
})
</script>
