<template>
  <div class="search" v-show="data.showSearch">
    <el-form :model="data.queryParams" ref="queryFormRef" :inline="true" label-width="68px">
      <el-form-item label="用户名称" prop="userName">
        <el-input v-model="data.queryParams.userName" placeholder="请输入用户名称" clearable style="width: 240px" @keyup.enter="handleQuery" />
      </el-form-item>
      <el-form-item label="手机号码" prop="phonenumber">
        <el-input v-model="data.queryParams.phonenumber" placeholder="请输入手机号码" clearable style="width: 240px" @keyup.enter="handleQuery" />
      </el-form-item>

      <el-form-item label="状态" prop="status">
        <!-- <el-select v-model="data.queryParams.status" placeholder="用户状态" clearable style="width: 240px">
          <el-option v-for="dict in sys_normal_disable" :key="dict.value" :label="dict.label" :value="dict.value" />
        </el-select> -->
      </el-form-item>
      <el-form-item label="创建时间" style="width: 308px;">
        <el-date-picker
          v-model="dateRange"
          value-format="YYYY-MM-DD"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleQuery" icon="Search">搜索</el-button>
        <el-button @click="resetQuery" icon="Refresh">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts" setup>
import { DateModelType, ElTree, ElUpload, UploadFile, ElForm } from 'element-plus'

interface ISearchData {
  label: string; // 搜索名称
  key: string; // 搜索key
  type?: 'string' | 'select' | 'time' | 'dateRange'; // 数据类型
}

const props = defineProps<{
  dataList: ISearchData[],
}>()
console.log(props.dataList)
const dateRange = ref<[DateModelType, DateModelType]>(['',''])
const handleQuery = () => {
  console.log('handleQuery')
}
const resetQuery = () => {
  console.log('resetQuery')
}
const data = reactive({
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    userName: '',
    phonenumber: '',
    status: '',
    deptId: ''
  },
  showSearch: true,
})
</script>

<style lang="scss" scoped>
.search {
  // padding: ;
}
</style>
