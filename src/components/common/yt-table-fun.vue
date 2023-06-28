<template>
  <el-card shadow="never" v-if="!hide">
    <template #header>
      <el-row justify="space-between" style="margin-bottom: 0;">
        <el-row :gutter="gutter" align="center" class="mb8">
          <el-col :span="span" v-if="addBtn">
            <el-button v-bind="addBind" type="primary" icon="Plus" @click="emits('handleAdd')">{{ addBtnText }}</el-button>
          </el-col>
          <el-col :span="span" v-if="exportBtn">
            <el-button v-bind="exportBind" plain @click="emits('handleExport')">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" class="mr5 4hnpqv1lf__design-iconfont" width="14" height="14">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  fill="rgb(0, 112, 255)"
                  d="M7.38894 1.65169C7.17415 1.4369 6.82591 1.4369 6.61112 1.65169L3.47896 4.78385C3.26417 4.99864 3.26417 5.34688 3.47896 5.56167C3.69375 5.77646 4.04199 5.77646 4.25678 5.56167L6.45166 3.36679V9.34924C6.45166 9.65299 6.6979 9.89924 7.00166 9.89924C7.30542 9.89924 7.55166 9.65299 7.55166 9.34924V3.37005L9.74329 5.56167C9.95807 5.77646 10.3063 5.77646 10.5211 5.56167C10.7359 5.34688 10.7359 4.99864 10.5211 4.78385L7.38894 1.65169ZM2.30171 7.23303C2.60547 7.23303 2.85171 7.47928 2.85171 7.78303C2.85171 8.45985 3.08084 9.37097 3.70037 10.1032C4.30356 10.816 5.31832 11.4092 6.99995 11.4092C8.68158 11.4092 9.69634 10.816 10.2995 10.1032C10.9191 9.37097 11.1482 8.45985 11.1482 7.78303C11.1482 7.47928 11.3944 7.23303 11.6982 7.23303C12.002 7.23303 12.2482 7.47928 12.2482 7.78303C12.2482 8.6723 11.9553 9.84928 11.1393 10.8137C10.3069 11.7974 8.97251 12.5092 6.99995 12.5092C5.02739 12.5092 3.69304 11.7974 2.86065 10.8137C2.04461 9.84928 1.75171 8.6723 1.75171 7.78303C1.75171 7.47928 1.99795 7.23303 2.30171 7.23303Z"
                ></path>
              </svg>
              <span style="color: rgb(0, 112, 255);">{{ exportBtnText }}</span>
            </el-button>
          </el-col>
          <el-col :span="span" v-if="delBtn" class="ml10" style="display: flex;align-items: center;">
            <el-checkbox v-model="isAll" @change="(e) => emits('changeAll', e)" :indeterminate="isIndeterminate" label="all" size="large">
              <div class="checkbox-txt">
                已选<span>{{ props.multipleSelection.length || 0 }}</span
                >项
              </div>
            </el-checkbox>
            <el-button
              class="ml10"
              type="danger"
              link
              icon="Delete"
              v-bind="delBind"
              :disabled="props.multipleSelection.length === 0"
              @click="handleDel"
              >{{ delBtnText }}</el-button
            >
          </el-col>
        </el-row>
        <div class="rightToolbar">
          <slot name="rightToolbar"></slot>
        </div>
      </el-row>
    </template>
    <div>
      <slot></slot>
    </div>
  </el-card>
  <div v-else>
    <slot></slot>
  </div>
</template>
<script lang="ts" setup>
import { funProps } from './props/crudProps'

import { ElMessageBox } from 'element-plus'
const props = defineProps({...funProps})
const exportBind = reactive(props.exportPermi ? {
  vHasPermi: props.exportPermi
} : {})

const addBind = reactive(props.addPermi ? {
  vHasPermi: props.addPermi
} : {})
const delBind = reactive(props.delPermi ? {
  vHasPermi: props.delPermi
} : {})

// 参数
const showSearch = ref(false)
const isAll = ref(false)
const isIndeterminate = ref(false)
const emits = defineEmits(['handleAdd', 'handleDel', 'handleExport', 'reloadData', 'changeAll'])

const handleDel = () => {
  ElMessageBox.confirm(
    `是否确认批量删除${props.multipleSelection.length}条数据?`,
    '提示',
    {
      type: 'warning',
    }
  )
    .then(() => {
      emits('handleDel', props.multipleSelection)
    })
}
watch(() => props.multipleSelection, (newV) => {
  isAll.value = newV.length === props.limit
  isIndeterminate.value = 0 < newV.length && newV.length < props.limit
})
</script>

<style lang="scss" scoped>
.rightToolbar {
  display: flex;
  align-items: center;
  padding-right: 10px;
}
.checkbox-txt {
  color: #333;
  span {
    color: var(--el-color-primary);
    font-weight: 600;
  }
}
::v-deep(.el-checkbox.el-checkbox--large) {
  height: auto;
}
</style>
