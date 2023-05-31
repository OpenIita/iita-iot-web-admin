<template>
  <el-dialog v-model="state.dialogShow" width="950px" :title="state.modelForm.id ? '编辑' : '新增' + '功能'">
    <el-form class="model-form" label-width="120px" :model="state.modelForm" ref="state.modelForm">
      <el-form-item label="功能类型">
        <el-radio-group :disabled="!state.isAdd" v-model="state.modelForm.type" size="mini">
          <el-radio-button label="property">属性</el-radio-button>
          <el-radio-button label="service">服务</el-radio-button>
          <el-radio-button label="event">事件</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <div v-if="isSelectType('property')">
        <property-model
          :property="state.modelForm.raw"
          :enumItems="state.enumItems"
          :boolItem="state.boolItem"
          :isProperty="true"
          :isUpdate="state.isAdd"
        ></property-model>
      </div>
      <div v-if="isSelectType('service')">
        <div>
          <el-form-item label="名称" prop="name">
            <el-input v-model="state.modelForm.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="标识符" prop="identifier">
            <el-input v-model="state.modelForm.identifier" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="输入参数">
            <ModelParams :modelParams="state.modelForm.raw.inputData"></ModelParams>
          </el-form-item>
          <el-form-item label="输出参数">
            <ModelParams :modelParams="state.modelForm.raw.outputData"></ModelParams>
          </el-form-item>
        </div>
      </div>
      <div v-if="isSelectType('event')">
        <div>
          <el-form-item label="名称" prop="name">
            <el-input v-model="state.modelForm.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="标识符" prop="identifier">
            <el-input v-model="state.modelForm.identifier" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="输出参数">
            <ModelParams :modelParams="state.modelForm.raw.outputData"></ModelParams>
          </el-form-item>
        </div>
      </div>
      <el-form-item> </el-form-item>
      <el-form-item>
        <el-button @click="cancelEdit">取消</el-button>
        <el-button @click="saveThingModel()" type="primary">保存</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script lang="ts" setup>
import { ParseProperty } from '@/views/iot/equipment/products/util'

import PropertyModel from '../components/PropertyModel.vue'
import ModelParams from '../components/ModelParams.vue'

const state = reactive({
  isAdd: true,
  data: {} as any,
  dialogShow: false,
  modelForm: {} as any,
  modelType: '1',
  model: {} as any,
  boolItem: {},
  enumItems: [{}],
  scriptRules: {
    model: [
      { required: true, message: '设备型号不能为空', trigger: 'blur' },
    ],
    script: [
      { required: true, message: '脚本内容不能为空', trigger: 'blur' },
    ],
  }
})
const openDialog = (row?: any, props?: any) => {
  if (row) {
    state.modelForm = row
    state.isAdd = false
    state.modelType = (row.model.endsWith && row.model.endsWith('_default')) ? '1' : '2'
    if (props.enumItems) state.enumItems = props.enumItems
    if (props.boolItem) state.boolItem = props.boolItem
  } else {
    state.isAdd = true
    state.modelForm = {
      type: 'property',
      identifier: '',
      name: '',
      raw: {
        name: '',
        identifier: '',
        type: 'property',
        dataType: {
          specs: {},
        },
        inputData: [],
        outputData: [],
        enumItems: [],
        boolItem: {
          _true: '',
          _false: '',
        },
      },
    }
  }
  state.dialogShow = true
}
const cancelEdit = () => {
  state.dialogShow = false
}
const isSelectType = (type: string | number) => {
  console.log(state.modelForm)
  return type == state.modelForm.type
}
const newProperty = () => {
  return ParseProperty(state.modelForm.raw, state.enumItems, this.boolItem);
}
const submitThingModelChange = () => {
  cancelEdit()
  // ThingModelSave({
  //   productKey: product.id,
  //   model: JSON.stringify(state.model),
  // }).then(() => {
  //   this.getThingModel()
  //   this.formVisible = false
  // })
}
const saveThingModel = () => {
  if (state.isAdd) {
    if (state.modelForm.type == "property") {
      //删除旧的
      const idx = state.model.properties.findIndex(
        (p: any) => p.identifier == state.modelForm.raw.identifier
      )
      if (idx >= 0) {
        state.model.properties.splice(idx, 1)
      }

      state.model.properties.push(newProperty())
    } else if (state.modelForm.type == "service") {
      //删除旧的
      const idx = state.model.services.findIndex(
        (p: any) => p.identifier == state.modelForm.raw.identifier
      )
      if (idx >= 0) {
        state.model.services.splice(idx, 1)
      }

      state.model.services.push({
        identifier: state.modelForm.identifier,
        name: state.modelForm.name,
        inputData: state.modelForm.raw.inputData,
        outputData: state.modelForm.raw.outputData,
      })
    } else if (state.modelForm.type == "event") {
      //删除旧的
      const idx = state.model.events.findIndex(
        (p: any) => p.identifier == state.modelForm.raw.identifier
      )
      if (idx >= 0) {
        state.model.events.splice(idx, 1)
      }

      state.model.events.push({
        identifier: state.modelForm.identifier,
        name: state.modelForm.name,
        outputData: state.modelForm.raw.outputData,
      })
    }
  } else {
    if (state.modelForm.type == 'property') {
      let prop = newProperty()
      for (var i = 0; i < state.model.properties.length; i++) {
        if (state.model.properties[i].identifier == prop.identifier) {
          state.model.properties[i] = prop
        }
      }
    } else if (state.modelForm.type == 'service') {
      state.model.services.forEach((s: any) => {
        if (s.identifier == state.modelForm.identifier) {
          s.identifier = state.modelForm.identifier
          s.name = state.modelForm.name
          s.inputData = state.modelForm.raw.inputData
          s.outputData = state.modelForm.raw.outputData
        }
      })
    } else if (state.modelForm.type == 'event') {
      state.model.events.forEach((s: any) => {
        if (s.identifier == state.modelForm.identifier) {
          s.identifier = state.modelForm.identifier
          s.name = state.modelForm.name
          s.outputData = state.modelForm.raw.outputData
        }
      })
    }
  }

  submitThingModelChange()
}

defineExpose({
  openDialog,
})
</script>

<style lang="scss" scoped></style>
