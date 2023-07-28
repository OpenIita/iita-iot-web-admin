<template>
  <div @click="toggleClick">
    <svg-icon icon-class="hamburger" class="hamburger" :class="{'is-active':isActive}" />
  </div>
</template>

<script setup lang="ts">
defineProps({
  isActive: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['toggleClick'])
const toggleClick = () => {
  emit('toggleClick')
}
</script>

<style scoped>
.hamburger {
  display: inline-block;
  vertical-align: middle;
  width: 16px;
  height: 16px;
  path {
    fill: #646A73;
  }
}

.hamburger.is-active {
  transform: rotate(180deg);
}
</style>
