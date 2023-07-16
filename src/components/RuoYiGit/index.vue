<template>
  <svg-icon icon-class="github" @click="goto" />
</template>

<script setup>
const url = ref('https://gitee.com/iotkit-open-source/iotkit-parent')

function goto() {
  window.open(url.value)
}
</script>
