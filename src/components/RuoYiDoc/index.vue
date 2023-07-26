<template>
  <div>
    <svg-icon icon-class="question" @click="goto" />
  </div>
</template>

<script setup>
const url = ref('http://iotkit-open-source.gitee.io/document')

function goto() {
  window.open(url.value)
}
</script>
