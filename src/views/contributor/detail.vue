<template>
  <div class="detail-box">
    <el-form :model="formModel" label-width="70px">
      <el-card>
        <template #header>
          <div class="card-header flex align-center">
            <span>基本信息</span>
            <el-button icon="EditPen" type="primary" link @click="handleEdit">编辑</el-button>
          </div>
        </template>
        <div class="base-info flex">
          <div class="img">
            <img v-if="state.type === 'view'" src="@/assets/images/profile.jpg" alt="" />
            <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 33 33" class="design-iconfont" width="80" height="80">
              <path fill="#D1D8DF" d="M16.25 0.3169000000000004A16 16 0 1 0 16.25 32.316900000000004A16 16 0 1 0 16.25 0.3169000000000004Z"></path>
              <path
                d="M16.17 8.08813C16.4939 8.08813 16.8151 8.12471 17.1335 8.19786C17.4518 8.27101 17.7507 8.36948 18.0299 8.49327C18.3092 8.61706 18.5578 8.75773 18.7756 8.91528C18.9934 9.07283 19.1638 9.23038 19.2867 9.38794C19.5771 9.74805 19.7893 10.1447 19.9234 10.578C20.0574 11.0113 20.1524 11.4249 20.2083 11.8187C20.2641 12.2689 20.292 12.7247 20.292 13.1861C20.3702 13.2423 20.4317 13.3155 20.4764 13.4055C20.521 13.4843 20.5573 13.5856 20.5853 13.7093C20.6132 13.8331 20.616 13.9851 20.5937 14.1651C20.5713 14.4015 20.5238 14.5899 20.4512 14.7306C20.3786 14.8713 20.2976 14.981 20.2083 15.0598C20.1077 15.1498 20.0016 15.2117 19.8899 15.2455C19.834 15.4368 19.7782 15.6168 19.7223 15.7857C19.6665 15.932 19.6022 16.0754 19.5296 16.2161C19.457 16.3568 19.376 16.4665 19.2867 16.5453C19.0744 16.7141 18.9013 16.8576 18.7672 16.9757C18.6332 17.0939 18.5438 17.2936 18.4991 17.575C18.4656 17.7438 18.4544 17.9154 18.4656 18.0898C18.4768 18.2643 18.5242 18.4387 18.608 18.6131C18.6918 18.7876 18.8203 18.9536 18.9934 19.1111C19.1666 19.2687 19.4095 19.4093 19.7223 19.5331C20.0016 19.6457 20.306 19.747 20.6355 19.837C20.9651 19.927 21.2862 20.0311 21.599 20.1493C21.9118 20.2674 22.1883 20.4137 22.4285 20.5882C22.6686 20.7626 22.839 21.0017 22.9395 21.3056C22.9954 21.4856 23.0373 21.7079 23.0652 21.9724C23.0931 22.2368 23.1071 22.5041 23.1071 22.7742C23.1071 23.0443 23.0876 23.2975 23.0485 23.5338C23.0094 23.7701 22.9507 23.9502 22.8725 24.074C22.8167 24.1528 22.6575 24.2315 22.395 24.3103C22.1324 24.3891 21.8085 24.4651 21.4231 24.5382C21.0377 24.6114 20.6076 24.6761 20.1329 24.7323C19.6581 24.7886 19.1805 24.8364 18.7002 24.8758C18.2198 24.9152 17.759 24.9462 17.3178 24.9687C16.8765 24.9912 16.4939 25.0024 16.17 25.0024C15.846 25.0024 15.469 24.9912 15.0389 24.9687C14.6088 24.9462 14.1648 24.9152 13.7068 24.8758C13.2488 24.8364 12.7936 24.7914 12.3411 24.7408C11.8887 24.6901 11.4782 24.6367 11.1095 24.5804C10.7409 24.5241 10.4281 24.4679 10.1712 24.4116C9.91425 24.3553 9.75227 24.2991 9.68525 24.2428C9.57354 24.1528 9.48696 23.8771 9.42552 23.4157C9.36408 22.9543 9.38922 22.3578 9.50093 21.6263C9.55678 21.2099 9.72155 20.892 9.99524 20.6726C10.2689 20.4531 10.5873 20.2787 10.9504 20.1493C11.3134 20.0199 11.6904 19.9045 12.0814 19.8032C12.4724 19.7019 12.8187 19.5556 13.1203 19.3643C13.3549 19.218 13.5336 19.0774 13.6565 18.9423C13.7794 18.8073 13.8688 18.6722 13.9246 18.5372C13.9805 18.4021 14.0084 18.2615 14.0084 18.1152C14.0084 17.9689 14.0028 17.8057 13.9916 17.6256C13.9693 17.3668 13.8799 17.1614 13.7235 17.0095C13.5671 16.8576 13.394 16.7028 13.2041 16.5453C13.1147 16.4665 13.0365 16.3568 12.9695 16.2161C12.9025 16.0754 12.841 15.932 12.7852 15.7857C12.7293 15.6168 12.6735 15.4368 12.6176 15.2455C12.5394 15.223 12.4612 15.1836 12.383 15.1273C12.316 15.071 12.2434 14.9923 12.1652 14.891C12.087 14.7897 12.02 14.6434 11.9641 14.4521C11.8971 14.2608 11.872 14.0863 11.8887 13.9288C11.9055 13.7712 11.9362 13.6362 11.9809 13.5237C12.0256 13.3999 12.0982 13.2817 12.1987 13.1692C12.1875 12.7415 12.2099 12.3139 12.2657 11.8863C12.3104 11.5261 12.3914 11.1379 12.5087 10.7215C12.626 10.3051 12.8019 9.93374 13.0365 9.60738C13.2488 9.29228 13.4862 9.03626 13.7487 8.83932C14.0112 8.64238 14.2793 8.48764 14.553 8.3751C14.8267 8.26257 15.1004 8.1866 15.374 8.14722C15.6477 8.10783 15.913 8.08813 16.17 8.08813V8.08813Z"
                fill="#fff"
              ></path>
            </svg>
            <el-button v-if="state.type !== 'view'" class="upload-btn" icon="Upload">上传头像</el-button>
          </div>
          <div class="text" v-if="state.type === 'view'">
            <div class="name">Serati Ma</div>
            <div class="desc">要么做第一个，要么做最好的一个。</div>
            <div class="post flex">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14" class="design-iconfont" width="16" height="16">
                <path
                  d="M12.2498 2.33398H1.74984C1.42767 2.33398 1.1665 2.59515 1.1665 2.91732V11.084C1.1665 11.4062 1.42767 11.6673 1.74984 11.6673H12.2498C12.572 11.6673 12.8332 11.4062 12.8332 11.084V2.91732C12.8332 2.59515 12.572 2.33398 12.2498 2.33398Z"
                  stroke="#4E5969"
                  stroke-linejoin="round"
                ></path>
                <path
                  d="M4.95817 7.29232C5.60249 7.29232 6.12484 6.76997 6.12484 6.12565C6.12484 5.48133 5.60249 4.95898 4.95817 4.95898C4.31385 4.95898 3.7915 5.48133 3.7915 6.12565C3.7915 6.76997 4.31385 7.29232 4.95817 7.29232Z"
                  stroke="#4E5969"
                  stroke-linejoin="round"
                ></path>
                <path
                  d="M6.7085 9.04102C6.7085 8.07452 5.92499 7.29102 4.9585 7.29102C3.992 7.29102 3.2085 8.07452 3.2085 9.04102"
                  stroke="#4E5969"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <path d="M8.1665 5.83398H10.4998" stroke="#4E5969" stroke-linecap="round" stroke-linejoin="round"></path>
                <path d="M8.75 8.16602H10.5" stroke="#4E5969" stroke-linecap="round" stroke-linejoin="round"></path>
              </svg>
              <span>设计师</span>
            </div>
            <div class="skill flex">
              <span>技能</span>
              <div class="tag flex">
                <div class="item" v-for="(item, index) in tags" :key="index">{{ item }}</div>
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
          <div class="tit">标题呢</div>
          <div class="v-html" v-html="formModel.context"></div>
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
      <div class="btn-group">
        <el-button>取消</el-button>
        <el-button type="primary" @click="submitForm">保存</el-button>
      </div>
    </el-form>
  </div>
</template>
<script lang="ts" setup>
import type { IContributorVO } from './types/index.type'
import { postOptions } from './types/index.type'
import { addContributorList, editContributorList, getContributorDetail } from './api/index.api'
import { ElLoading } from 'element-plus'

const route = useRoute()
const router = useRouter()
const state = reactive({
  type: 'add',
  id: '',
  tagList: [],
  tagOptions: []
})
const { id, type } = route.params
type && (state.type = type as string)
id && id !== '0' && (state.id = id as string)

const tags = ['java', 'Python', 'C']


const formModel = ref<IContributorVO>({} as IContributorVO)

const handleEdit = () => {
  router.push(`/system/user-auth/detail/${state.id}/edit`)
}

const submitForm = () => {
  const loading = ElLoading.service({
    lock: true,
    text: '加载中...',
    background: 'rgba(0, 0, 0, 0.7)',
  })
  addContributorList(toRaw(formModel)).then(res => {
    if (res.code === 200) {
      ElMessage.success('新增成功')
      router.go(-1)
    } else {
      ElMessage.error('新增失败')
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
