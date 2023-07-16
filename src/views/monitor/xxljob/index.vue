<template>
  <i-frame v-model:src="url" />
</template>

<script setup lang="ts">
const url = ref(import.meta.env.VITE_APP_XXL_JOB_ADMIN)
</script>
