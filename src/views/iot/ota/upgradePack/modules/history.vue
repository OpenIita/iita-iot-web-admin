<template>
  <el-dialog v-model="state.visible" title="升级历史">
    <el-collapse v-if="state.visible && data?.length > 0" v-model="state.activeName" accordion>
      <el-collapse-item v-for="(item, index) in data" :title="item.title" :name="index" :key="index">
        <div class="dn-list flex" v-for="dItem in item.data" :key="dItem.id">
          <div class="title flex">
            <span class="name">{{ dItem.deviceName }}</span>
            <el-tag v-if="dItem.step === -1" class="ml-2" size="small" type="danger">升级失败</el-tag>
            <el-tag v-else-if="dItem.step === -2" class="ml-2" size="small" type="danger">下载失败</el-tag>
            <el-tag v-else-if="dItem.step === -3" class="ml-2" size="small" type="danger">校验失败</el-tag>
            <el-tag v-else-if="dItem.step === -4" class="ml-2" size="small" type="danger">烧写失败</el-tag>
            <el-tag v-else class="ml-2" size="small" type="success">成功</el-tag>
          </div>
          <el-tooltip class="box-item" effect="dark" content="查看详情" placement="top">
            <el-button link type="primary" icon="View" />
          </el-tooltip>
        </div>
      </el-collapse-item>
    </el-collapse>
    <el-empty v-else description="暂无升级数据" />
  </el-dialog>
</template>

<script lang="ts" setup>
import { ComponentInternalInstance } from 'vue'
import { getUpgradePackLot, resultUpgradePack } from '../../api/upgradePack.api'
import { formatDate } from '@/utils'

const state = reactive({
  visible: false,
  id: '',
  activeName: '1',
})
const data = ref<any[]>([])

const { proxy } = getCurrentInstance() as ComponentInternalInstance
const getData = () => {
  proxy?.$modal.loading('加载中...')
  getUpgradePackLot({
    taskId: state.id,
  }).then(res => {
    const list: Promise<any>[] = []
    const dataList: any[] = []
    res.data.rows.forEach((item) => {
      dataList.push({
        title: formatDate(item.createAt),
        data: []
      })
      list.push(resultUpgradePack({
        otaInfoId: item.id
      }))
    })
    data.value = []
    Promise.all(list).then(res2 => {
      res2.forEach((item, index) => {
        if (item.code === 200) {
          dataList[index].data = item.data.rows
        }
      })
      // 过滤空数据
      dataList.forEach((item => {
        if (item.data?.length > 0) data.value.push(item)
      }))
    }).finally(() => {
      proxy?.$modal.closeLoading()
    })
  }).catch(() => {
    proxy?.$modal.closeLoading()
  })
}
const openDialog = (id: string) => {
  if (!id) return ElMessage.error('id为空')
  state.visible = true
  state.id = id
  nextTick(() => {
    getData()
  })
}
defineExpose({
  openDialog,
})
</script>

<style lang="scss" scoped>
.dn-list {
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  margin-bottom: 4px;
  border-bottom: 1px solid #ededed;
  &:last-child {
    border-bottom: none;
  }
  .title {
    .name {
      display: inline-block;
      font-size: 14px;
      color: #000;
    }
  }
}
:deep(.el-collapse-item__header) {
  font-weight: 600;
  font-size: 16px;
}
</style>
