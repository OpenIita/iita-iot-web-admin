<template>
  <div class="p-3 basic-layout">
    <div class="main-box">
      <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
        <slot />
      </transition>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ComponentInternalInstance } from 'vue'

const { proxy } = getCurrentInstance() as ComponentInternalInstance
</script>

<style lang="scss" scoped>
.basic-layout {
  .main-box {
    // padding: 15px;
    // background-color: #fff;
    // border-radius: 5px;
    // min-height: 200px;
  }
}
</style>
