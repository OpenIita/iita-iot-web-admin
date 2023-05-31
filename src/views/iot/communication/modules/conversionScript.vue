<template>
  <el-dialog v-model="dialogModel" width="80%" append-to-body :fullscreen="isFullscreen">
    <template #header>
      <span class="el-dialog__title">{{ title + '编写' }}</span>
      <div class="header-icon">
        <el-icon v-if="!isFullscreen" @click="isFullscreen = true"><FullScreen /></el-icon>
        <svg
          v-else
          @click="isFullscreen = false"
          t="1685346536331"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="1707"
          width="20"
          height="20"
        >
          <path
            d="M354.133333 682.666667H256v-42.666667h170.666667v170.666667H384v-98.133334L243.2 853.333333l-29.866667-29.866666L354.133333 682.666667z m358.4 0l140.8 140.8-29.866666 29.866666-140.8-140.8V810.666667h-42.666667v-170.666667h170.666667v42.666667h-98.133334zM354.133333 384L213.333333 243.2l29.866667-29.866667L384 354.133333V256h42.666667v170.666667H256V384h98.133333z m358.4 0H810.666667v42.666667h-170.666667V256h42.666667v98.133333L823.466667 213.333333l29.866666 29.866667L712.533333 384z"
            fill="#909399"
            p-id="1708"
          ></path>
        </svg>
      </div>
    </template>
    <!-- <el-row>
      脚本语言:
      <el-radio v-model="editScript.typ" label="js"></el-radio>
    </el-row> -->
    <el-row justify="space-between" class="row-box">
      <el-col :span="16">
        {{ title }}：
        <div v-if="editScript.typ == 'js'">new (function () {</div>
        <code-editor :code="editScript.script"></code-editor>
        <div v-if="editScript.typ == 'js'">})()</div>
      </el-col>
      <el-col :span="7" class="right-box">
        测试数据：
        <div style="height: 200px; overflow: auto">
          <code-editor :code="testDataScript.script"></code-editor>
        </div>
        <el-row style="padding: 5px 5px">
          <el-col :span="10"> 测试结果： </el-col>
          <el-col :span="7" v-if="type === 'change'">
            <el-button size="mini" type="primary" @click="execTest('decode')">解码测试</el-button>
          </el-col>
          <el-col :span="7" v-if="type === 'change'">
            <el-button size="mini" type="primary" @click="execTest('encode')">编码测试</el-button>
          </el-col>
          <el-col :span="7" v-if="type === 'communication'">
            <el-button size="mini" type="primary" @click="execTest()">测试</el-button>
          </el-col>
        </el-row>
        <div>
          <el-input type="textarea" v-model="testDataScript.testResult" :readonly="true" :rows="7"> </el-input>
        </div>
      </el-col>
    </el-row>
    <template #footer>
      <el-button @click="dialogModel = false">关闭</el-button>
      <el-button @click="dialogModel = false" type="primary">保存</el-button>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { propTypes } from '@/utils/propTypes'
import codeStr from './code'

import CodeEditor from '@/components/CodeEditor/index.vue'
import { id } from 'element-plus/es/locale'

const dialogModel = ref(false)
const props = defineProps({
  title: propTypes.string.def('标题'),
  type: propTypes.string.def('change'), // 转换：change 通讯：communication
})
const isFullscreen = ref(false)
const editScript = reactive<any>({
  id: '',
  typ: 'js',
  script: '',
})
const testDataScript = reactive({
  script: '{}',
  testResult: ''
})
// 执行操作 decode: 解码 encode： 编码
const execTest = (type?: 'decode' | 'encode') => {
  try {
    localStorage.setItem(
      'testDataScript_' + editScript.id,
      testDataScript.script || '{}'
    )

    var script = 'new (function (){' + editScript.script + '})()'
    var coder = eval(script)
    var testData = eval(
      '(function(){return ' + testDataScript.script + '})()'
    )
    if (type) {
      testDataScript.testResult = JSON.stringify(coder[type](testData))
    } else {
      testDataScript.testResult = JSON.stringify(
        coder.onReceive(testData.head, testData.type, testData.payload)
      )
    }
  } catch (err) {
    testDataScript.testResult = err as string
  }
}

// 打开痰喘
const openDialog = (row: any) => {
  dialogModel.value = true
  editScript.id = row.id
  editScript.script = '' ||
  `this.decode = function (msg) {
    return null
  }
this.encode = function (service,device) {
  return null
}
  `
  testDataScript.script =
          localStorage.getItem("testDataScript2_" + row.id) || "{}"
}

defineExpose({
  openDialog,
})
</script>

<style lang="scss" scoped>
.row-box {
  position: relative;
  .right-box {
    position: sticky;
    top: 0;
    min-height: 300px;
  }
}
.header-icon {
  position: absolute;
  top: 22px;
  right: 50px;
  color: #909399;
  cursor: pointer;
}
</style>
