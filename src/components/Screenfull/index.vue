<template>
  <svg-icon :icon-class="isFullscreen ? 'exit-fullscreen' : 'fullscreen'" @click="toggle" />
</template>

<script setup lang="ts">
const { isFullscreen, toggle } = useFullscreen()
</script>
