<template>
  <div>
    <vue-json-editor v-model:modelValue="model" :showBtns="true" :mode="'code'" lang="zh" height="400" />
    <el-button @click="submitThingModelChange()">保存</el-button>
  </div>
</template>
<script lang="ts" setup>
import { propTypes } from '@/utils/propTypes'
import vueJsonEditor from 'vue3-ts-jsoneditor'
import { saveObjectModel } from '@/views/iot/equipment/api/products.api';

const props = defineProps({
  id: propTypes.string.def(''),
  model: propTypes.object.def({}),
})


const model = ref(props.model)
watch(() => props.model, (newV) => {
  model.value = newV
})

const submitThingModelChange = () => {
  if (!model) {
    return
  }
  saveObjectModel({
    productKey: props.id,
    model:JSON.stringify( model.value),
  }).then(() => {

  }).finally(()=>{
  })
}
</script>
