<template>
  <div class="detail-box" v-loading="state.loading">
    <el-form :model="formModel" label-width="70px">
      <el-card>
        <template #header>
          <div class="card-header flex align-center">
            <span>基本信息</span>
            <div>
              <el-button v-if="state.type === 'view'" icon="EditPen" type="primary" link @click="handleEdit">编辑</el-button>
              <el-button icon="Back" type="primary" link @click="router.go(-1)">返回</el-button>
            </div>
          </div>
        </template>
        <div class="base-info flex">
          <div class="img">
            <img v-if="state.type === 'view' || formModel.avatar" :src="formModel.avatar" alt="" />
            <svg-icon v-else icon-class="head" />
            <file-upload
              :limit="1"
              uploadType="url"
              is-slot
              is-cover
              :is-show-tip="false"
              :file-type="['png', 'jpg', 'jpeg']"
              :is-show-list="false"
              v-model="formModel.avatar"
              v-if="state.type !== 'view'"
            >
              <template #buttonSlot>
                <el-button class="upload-btn" icon="Upload" @click="formModel.avatar = ''">上传头像</el-button>
              </template>
            </file-upload>
          </div>
          <div class="text" v-if="state.type === 'view'">
            <div class="name">{{ formModel.contributor || '' }}</div>
            <div class="desc">{{ formModel.intro || '' }}</div>
            <div class="post flex">
              <svg-icon icon-class="name" />
              <span>{{ getPostName(formModel.post) }}</span>
            </div>
            <div class="skill flex">
              <span>技能</span>
              <div class="tag flex">
                <div class="item" v-for="(item, index) in formModel.tags?.split(',') || []" :key="index">{{ item }}</div>
              </div>
            </div>
          </div>
          <div class="form-box" v-else>
            <el-form-item label="用户名">
              <el-input v-model="formModel.contributor" placeholder="请输入用户名" />
            </el-form-item>
            <el-form-item label="岗位">
              <el-select v-model="formModel.post">
                <el-option v-for="item in postOptions" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item label="技能标签">
              <el-select
                v-model="state.tagList"
                multiple
                filterable
                allow-create
                default-first-option
                :reserve-keyword="false"
                class="custom-select"
                style="width: 100%;"
                placeholder="请输入技能标签选择"
              >
                <el-option v-for="item in state.tagOptions" :key="item" :label="item" :value="item" />
              </el-select>
            </el-form-item>
            <el-form-item label="个人简介">
              <el-input v-model="formModel.intro" :rows="5" type="textarea" maxlength="100" show-word-limit placeholder="请输入个人简介" />
            </el-form-item>
          </div>
        </div>
      </el-card>
      <el-card class="detail-info">
        <template #header>
          <div class="card-header flex align-center">
            <span>详情</span>
          </div>
        </template>
        <div class="detail-txt" v-if="state.type === 'view'">
          <div class="tit">{{ formModel.title || '' }}</div>
          <div class="v-html" v-html="formModel.context || ''"></div>
        </div>
        <div class="detail-form" v-else>
          <el-form-item label="标题">
            <el-input v-model="formModel.title" placeholder="请输入标题" />
          </el-form-item>
          <el-form-item label="详情">
            <editor v-model="formModel.context" :min-height="300" />
          </el-form-item>
        </div>
      </el-card>
      <div class="btn-group" v-if="state.type !== 'view'">
        <el-button @click="router.go(-1)">取消</el-button>
        <el-button type="primary" @click="submitForm">保存</el-button>
      </div>
    </el-form>
  </div>
</template>
<script lang="ts" setup>
import type { IContributorVO } from './types/index.type'
import { postOptions } from './types/index.type'
import { addContributorList, editContributorList, getContributorDetail } from './api/index.api'
import { ElLoading, ElMessage } from 'element-plus'
import { reactive, ref, toRaw } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const state = reactive({
  type: 'add',
  id: '',
  tagList: [],
  tagOptions: [],
  loading: false,
})
const { id, type } = route.params
type && (state.type = type as string)
id && id !== '0' && (state.id = id as string)

const getInfo = () => {
  state.loading = true
  getContributorDetail(id).then(res => {
    if (res.code === 200) {
      formModel.value = res.data || {}
      state.tagList = res.data?.tags?.split(',') || []
    }
    console.log(res.data)
  }).finally(() => {
    state.loading = false
  })
}
getInfo()
const tags = ['java', 'Python', 'C']

const getPostName = (val) => {
  return postOptions.find(f => f.value === val)?.label || ''
}
const formModel = ref<IContributorVO>({} as IContributorVO)
const handleEdit = () => {
  router.push(`/system/user-auth/detail/${state.id}/edit`)
}

const submitForm = () => {
  const verify = {
    contributor: '请输入名称',
    intro: '请输入简介',
    post: '请选择岗位',
    avatar: '请上传头像',
  }
  for (let key in verify) {
    console.log(key)
    if (!formModel.value[key]) return ElMessage.error(verify[key])
  }
  if (state.tagList?.length <= 0) return ElMessage.error('请选择技能标签')
  const loading = ElLoading.service({
    lock: true,
    text: '加载中...',
    background: 'rgba(0, 0, 0, 0.7)',
  })
  const fun = state.type === 'view' ? editContributorList : addContributorList
  fun({
    ...toRaw(formModel.value),
    tags: state.tagList.join(',')
  }).then(res => {
    const txt = state.type === 'edit' ? '编辑' : '新增'
    if (res.code === 200) {
      ElMessage.success(`${txt}成功`)
      router.go(-1)
    } else {
      ElMessage.error(`${txt}失败`)
    }
  }).finally(() => {
    loading.close()
  })
}
</script>

<style lang="scss" scoped>

.detail-box {
  padding-top: 15px;
  .card-header {
    justify-content: space-between;
    padding-bottom: 8px;
    span {
      font-weight: 600;
    }
  }
  .base-info {
    padding: 16px 24px;
    .img {
      text-align: center;
      max-width: 110px;
      img {
        display: inline-block;
        width: 80px;
        height: 80px;
        border-radius: 100%;
        overflow: hidden;
      }
      .upload-btn {
        margin-top: 16px;
      }
    }
    .text {
      width: calc(100% - 80px);
      padding-left: 24px;
      .name {
        font-size: 16px;
        font-weight: 600;
        color: #0B1D30;
        margin-bottom: 4px;
      }
      .desc {
        color: #54575E;
        font-size: 12px;
        padding: 8px 0;
      }
      .post {
        align-items: center;
        margin-bottom: 12px;
        padding-bottom: 12px;
        border-bottom: 1px dashed #d8d8da;
        span {
          color: #0B1D30;
          font-size: 12px;
          display: inline-block;
          margin-left: 8px;
        }
      }
      .skill {
        align-items: center;
        span {
          display: inline-block;
          margin-right: 12px;
          font-size: 12px;
          color: #0B1D30;
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
    .form-box {
      max-width: 600px;
      width: calc(100% - 80px);
      padding-left: 24px;
    }
  }
  .detail-info {
    margin-top: 15px;
    .tit {
      color: #0B1D30;
      font-size: 14px;
      font-weight: 600;
      margin-bottom: 4px;
    }
    .v-html {
      padding: 16px 24px;
    }
  }
  .detail-form {
    width: 100%;
    max-width: 860px;
  }
  .btn-group {
    position: fixed;
    width: 100%;
    padding: 12px 24px;
    bottom: 20px;
    right: 20px;
    text-align: right;
  }
}
</style>
