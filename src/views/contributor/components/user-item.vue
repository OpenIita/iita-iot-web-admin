<template>
  <div class="user-item flex" @click="goView">
    <div class="img">
      <img :src="data.avatar || defaultImg" alt="" />
    </div>
    <div class="text">
      <div class="name flex">
        <span>{{ data.contributor }}</span>
        <el-icon><ArrowRight /></el-icon>
      </div>
      <div class="desc">{{ data.intro }}</div>
      <div class="tag flex">
        <div class="item" v-for="(item, index) in data?.tags?.split(',') || []" :key="index">{{ item }}</div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { propTypes } from '@/utils/propTypes'
import defaultImg from '@/assets/images/profile.jpg'

const props = defineProps({
  data: propTypes.object.def({
    contributor: '',
    avatar: '',
    intro: '',
    post: '',
    tags: [],
    id: '',
    context: '',
    title: '',
  })
})
const router = useRouter()
const goView = () => {
  console.log(props.data)
  router.push({
    path: `/system/user-auth/detail/${props.data.id}/view`,
  })
}
</script>

<style lang="scss" scoped>
.user-item {
  padding: 16px;
  margin-bottom: 16px;
  border: 1px solid #e2e8efff;;
  background: #fafbfcff;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.3s ease;
  &:hover {
    border-color: var(--el-color-primary);
    transform: translateY(-3px);
  }
  .img {
    width: 64px;
    height: 64px;
    border-radius: 100%;
    overflow: hidden;
    img {
      width: 100%;
    }
  }
  .text {
    padding-left: 16px;
    width: calc(100% - 64px);
    .name {
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 8px;
      align-items: center;
      justify-content: space-between;
    }
    .desc {
      color: #54575E;
      font-size: 12px;
      margin-bottom: 12px;
      padding-bottom: 12px;
      border-bottom: 1px dashed rgba(235, 238, 241, 1);
    }
    .tag {
      .item {
        padding: 4px 10px;
        border: 1px solid;
        font-size: 12px;
        color: #DBF7F5;
        background-color: rgba(219, 247, 245, 1);
        border-color: #DBF7F5;
        border-radius: 2px;
        margin-right: 6px;
        &:last-child {
          margin-right: 0;
        }
        &:nth-child(1) {
          color: rgba(0, 112, 255, 1);
          border-color: rgba(0, 112, 255, 1);
          background-color: rgba(230, 241, 255, 1);
        }
        &:nth-child(2) {
          color: rgba(176, 74, 255, 1);
          border-color: rgba(176, 74, 255, 1);
          background-color: rgba(241, 227, 255, 1);
        }
        &:nth-child(3) {
          color: rgba(2, 157, 64, 1);
          border-color: rgba(2, 157, 64, 1);
          background-color: rgba(229, 245, 235, 1);
        }
        &:nth-child(4) {
          color: rgba(255, 125, 0, 1);
          border-color: rgba(255, 125, 0, 1);
          background-color: rgba(255, 239, 224, 1);
        }
        &:nth-child(5) {
          color: rgba(241, 83, 83, 1);
          border-color: rgba(241, 83, 83, 1);
          background-color: rgba(255, 234, 234, 1);
        }
      }
    }
  }
}
</style>
