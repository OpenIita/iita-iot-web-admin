<template>
  <div class="app-box">
    <div style="padding: 16px;">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container" v-if="!settingsStore.topNav" />
      <section class="app-main">
        <router-view v-slot="{ Component, route }">
          <transition :enter-active-class="animante" mode="out-in">
            <div>
              <keep-alive :include="tagsViewStore.cachedViews">
                <component v-if="!route.meta.link" :is="Component" :key="route.path" />
              </keep-alive>
            </div>
          </transition>
        </router-view>
        <iframe-toggle />
      </section>
    </div>
  </div>
</template>

<script setup name="AppMain" lang="ts">
import useTagsViewStore from '@/store/modules/tagsView'
import useSettingsStore from '@/store/modules/settings'
import IframeToggle  from './IframeToggle/index.vue'
import { ComponentInternalInstance } from 'vue'
const { proxy } = getCurrentInstance() as ComponentInternalInstance
const tagsViewStore = useTagsViewStore()

// 随机动画集合
const animante = ref<string>('')
const settingsStore = useSettingsStore()
const animationEnable = ref(useSettingsStore().animationEnable)
watch(()=> useSettingsStore().animationEnable, (val) => {
  animationEnable.value = val
  if (val) {
    animante.value = proxy?.animate.animateList[Math.round(Math.random() * proxy?.animate.animateList.length)] as string
  } else {
    animante.value = proxy?.animate.defaultAnimate as string
  }
}, { immediate: true })
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.module.scss';
.app-box {
  padding-left: $base-sidebar-width;
  transition: .3s ease;
  width: 100%;
  height: calc(100vh - 50px);
  overflow-y: auto;
}
#app .hideSidebar {
  .app-box {
    padding-left: 54px;
  }
}
.app-main {
  /* 50= navbar  50  */
  // min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  // overflow-y: auto;
}

.fixed-header+.app-main {
  padding-top: 50px;
}

.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    min-height: calc(100vh - 84px);
  }

  .fixed-header+.app-main {
    padding-top: 84px;
  }
}
</style>
<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 6px;
  }
}

::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background-color: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background-color: #c0c0c0;
  border-radius: 3px;
}
</style>
