<template>
  <el-dialog v-model="state.visible" title="升级历史">
    <el-collapse v-if="state.visible" v-model="state.activeName" accordion>
      <el-collapse-item v-for="(item, index) in data" :title="item.title" :name="index" :key="index">
        <div class="dn-list flex" v-for="dItem in item.data" :key="dItem.id">
          <div class="title flex">
            <span class="name">{{ dItem.name }}</span>
            <el-tag v-if="dItem.status === '成功'" class="ml-2" size="small" type="success">成功</el-tag>
            <el-tag v-if="dItem.status === '失败'" class="ml-2" size="small" type="danger">失败</el-tag>
          </div>
          <el-tooltip class="box-item" effect="dark" content="查看详情" placement="top">
            <el-button link type="primary" icon="View" />
          </el-tooltip>
        </div>
      </el-collapse-item>
    </el-collapse>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ComponentInternalInstance } from 'vue'
import { getUpgradePackLot, resultUpgradePack } from '../../api/upgradePack.api'

const state = reactive({
  visible: false,
  id: '',
  activeName: '1',
})
const data = ref([
  {
    title: '历史1',
    data: [{
      id: 1,
      name: 'dn1111',
      status: '成功'
    }, {
      id: 2,
      name: 'dn1111',
      status: '成功'
    }, {
      id: 3,
      name: 'dn1111',
      status: '成功'
    }, {
      id: 4,
      name: 'dn1111',
      status: '成功'
    }, {
      id: 5,
      name: 'dn1111',
      status: '成功'
    }]
  },
  {
    title: '历史1',
    data: [{
      id: 1,
      name: 'dn1111',
      status: '成功'
    }, {
      id: 2,
      name: 'dn1111',
      status: '成功'
    }, {
      id: 3,
      name: 'dn1111',
      status: '成功'
    }, {
      id: 4,
      name: 'dn1111',
      status: '成功'
    }, {
      id: 5,
      name: 'dn1111',
      status: '成功'
    }]
  }
])

const { proxy } = getCurrentInstance() as ComponentInternalInstance
const getData = () => {
  proxy?.$modal.loading('加载中...')
  getUpgradePackLot({
    taskId: state.id,
  }).then(res => {
    const list: Promise<any>[] = []
    res.data.rows.forEach((item) => {
      list.push(resultUpgradePack({
        otaInfoId: item.id
      }))
    })
    Promise.all(list).then(res => {
      console.log(res)
    }).finally(() => {
      proxy?.$modal.closeLoading()
    })
    console.log('res', res)
  }).catch(() => {
    proxy?.$modal.closeLoading()
  })
}
const openDialog = (id: string) => {
  if (!id) return ElMessage.error('id为空')
  state.visible = true
  state.id = id
  getData()
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
