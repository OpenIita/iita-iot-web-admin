<script lang="ts" name="ContentWrap" setup>
import { propTypes } from '@/utils/propTypes'



defineProps({
  title: propTypes.string.def(''),
  message: propTypes.string.def('')
})
</script>

<template>
  <ElCard :class="['mb-15px']" shadow="never">
    <template v-if="title" #header>
      <div class="flex items-center">
        <span class="text-16px font-700">{{ title }}</span>
        <ElTooltip v-if="message" effect="dark" placement="right">
          <template #content>
            <div class="max-w-200px">{{ message }}</div>
          </template>
          <Icon :size="14" class="ml-5px" icon="ep:question-filled" />
        </ElTooltip>
      </div>
    </template>
    <div>
      <slot></slot>
    </div>
  </ElCard>
</template>
