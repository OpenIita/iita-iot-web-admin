<template>
  <div class="user-item">
    <div class="img">
      <img :src="data.img" alt="" />
    </div>
    <div class="text">
      <div class="name">{{ data.name }}</div>
      <div class="desc">{{ data.desc }}</div>
      <div class="tag" v-for="(item, index) in data.tag" :key="index">
        <div class="item">{{ item }}</div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { propTypes } from '@/utils/propTypes'

const props = defineProps({
  data: propTypes.object.def({
    name: '',
    img: '',
    desc: '',
    tag: [],
    id: '',
  })
  })
</script>

<style lang="scss" scoped></style>
