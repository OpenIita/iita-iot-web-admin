<template>
  <div>
    <el-card>
      <template #header>
        <div class="card-header flex align-center">
          <span>贡献者列表</span>
          <el-button icon="Plus" type="primary" link>新增</el-button>
        </div>
      </template>
      <div class="user-box">

      </div>
    </el-card>
  </div>
</template>
<script lang="ts" setup></script>

<style lang="scss" scoped>
.card-header {
  justify-content: space-between;
}
</style>
