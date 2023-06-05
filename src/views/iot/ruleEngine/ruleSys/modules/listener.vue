<template>
  <div>
    <el-button @click="handleAdd">新增</el-button>
    <div class="list-box">
      <el-collapse accordion v-model="activeName">
        <el-collapse-item :name="0" v-for="(item, index) in list" :key="index">
          <template #title>
            <div class="cu-title" @click.stop>
              <div class="item">
                <select-product></select-product>
              </div>
              <div class="item">
                <select-device placeholder="默认全部设备" product-id="11111"></select-device>
              </div>
            </div>
          </template>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>
<script lang="ts" setup>
import SelectProduct from '@/components/YtSelect/select-product.vue'
import SelectDevice from '@/components/YtSelect/select-device.vue'

const activeName = ref<number[]>([])
const list = ref<any[]>([])

// 新增
const handleAdd = () => {
  list.value.push({})
  activeName.value.push(list.value.length - 1)
}
</script>

<style lang="scss" scoped>
.list-box {
  margin-top: 10px;
  .cu-title {
    width: calc(100% - 30px);
    cursor: auto;
    display: flex;
    .item {
      width: 250px;
      margin-right: 10px;
    }
  }
}
</style>
