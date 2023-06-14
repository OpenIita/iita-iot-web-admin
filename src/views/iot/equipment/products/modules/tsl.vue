<template>
  <div></div>
  <vue-json-editor v-model:json="model" :showBtns="false" :mode="'code'" lang="zh" height="400" />
</template>
<script lang="ts" setup>
import { propTypes } from '@/utils/propTypes'
import vueJsonEditor from 'vue3-ts-jsoneditor'

const props = defineProps({
  model: propTypes.object.def({}),
})

const data = {
  'properties': [
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
  'services': [],
  'events': []
}
const model = ref(props.model)
</script>
