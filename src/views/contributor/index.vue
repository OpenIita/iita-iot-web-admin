<template>
  <div>
    <el-card>
      <template #header>
        <div class="card-header flex align-center">
          <span>贡献者列表</span>
          <el-button icon="Plus" type="primary" link>新增</el-button>
        </div>
      </template>
      <div class="user-box">
        <div class="group" v-for="item in data" :key="item.title">
          <div class="title flex" v-if="item.children">
            <div class="tit">{{ item.title }}</div>
            <div class="total">总人数{{ item.children.length }}</div>
          </div>
          <div class="user" v-if="item.children">
            <el-row gutter="16" type="flex">
              <el-col :span="8" v-for="user in item.children" :key="user.id">
                <user-item :data="user"></user-item>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script lang="ts" setup>
import UserItem from './components/user-item.vue'

const data = ref([
  {
    title: '后端开发者',
    children: [
      {
        name: '啊哈C',
        img: '',
        desc: '海纳百川，有容乃大',
        tag: ['java', 'Python', 'C'],
        id: 1,
      },
      {
        name: '啊哈C',
        img: '',
        desc: '海纳百川，有容乃大',
        tag: ['java', 'Python', 'C'],
        id: 1,
      },
      {
        name: '啊哈C',
        img: '',
        desc: '海纳百川，有容乃大',
        tag: ['java', 'Python', 'C'],
        id: 1,
      },
      {
        name: '啊哈C',
        img: '',
        desc: '海纳百川，有容乃大',
        tag: ['java', 'Python', 'C'],
        id: 1,
      },
      {
        name: '啊哈C',
        img: '',
        desc: '海纳百川，有容乃大',
        tag: ['java', 'Python', 'C'],
        id: 1,
      }
    ]
  },
  {
    title: '前端开发者',
    children: [
      {
        name: '啊哈C',
        img: '',
        desc: '海纳百川，有容乃大',
        tag: ['java', 'Python', 'C'],
        id: 1,
      },
    ]
  },
  {
    title: '设计师',
    children: [
      {
        name: '啊哈C',
        img: '',
        desc: '海纳百川，有容乃大',
        tag: ['java', 'Python', 'C'],
        id: 1,
      },
    ]
  }
])
</script>

<style lang="scss" scoped>
.card-header {
  justify-content: space-between;
  padding-bottom: 8px;
  span {
    font-weight: 600;
  }
}
.user-box {
  .group {
    margin-bottom: 30px;
    &:last-child {
      margin-bottom: 0;
    }
    .title {
      align-items: center;
      margin-bottom: 16px;
      .tit {
        color: #0B1D30;
        font-size: 14px;
        font-weight: 600;
        padding-left: 10px;
        position: relative;
        &::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 0;
          width: 2px;
          height: 12px;
          transform: translateY(-50%);
          background-color: var(--el-color-primary);
        }
      }
      .total {
        padding-left: 16px;
        font-size: 12px;
        color: #717C8E;
        span {
          color: #0B1D30;
        }
      }
    }
  }
}
</style>
