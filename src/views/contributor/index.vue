<template>
  <div>
    <el-card v-loading="loading">
      <template #header>
        <div class="card-header flex align-center">
          <span>贡献者列表</span>
          <el-button icon="Plus" type="primary" link @click="handleAdd">新增</el-button>
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
    <el-card class="mt-5">
      <template #header>
        <div class="card-header flex align-center">
          <span>贡献指南</span>
        </div>
      </template>
      <div class="text-box">
        <div class="box-item">
          <div class="title">
            <div class="tit">关于我们</div>
          </div>
          <div class="desc">
            我们是一群热爱开源的人，我们希望通过开源的方式，让更多的人了解物联网，参与物联网，爱上物联网。我们需要你的贡献，一起让铱塔智联物联网平台变的更好！
          </div>
        </div>
        <div class="box-item">
          <div class="title">
            <div class="tit">如何加入</div>
          </div>
          <div class="join-box">
            <div class="item" v-for="(item, index) in joinList" :key="index" @click="goLink(item.url)">
              <div class="icon">
                <svg-icon :icon-class="item.icon" className="icon-svg" color="#0070FF"></svg-icon>
              </div>
              <div class="text">{{ item.title }}</div>
            </div>
          </div>
        </div>
        <div class="box-item">
          <div class="title">
            <div class="tit">贡献规范</div>
          </div>
          <div class="norm-item">
            <div class="item-tit">文档规范</div>
            <div class="item-box">
              <div class="item">
                <div class="tit">格式:</div>
                <div class="txt-list">文章格式使用 <span>Markdown</span></div>
              </div>
              <div class="item">
                <div class="tit">内容:</div>
                <div class="txt-list">
                  <ul>
                    <li>撰写的内容需符合该部分主题</li>
                    <li>不求文风华丽，只需结构清晰，表述简洁，易读易懂</li>
                    <li>欢迎原创内容和新解读、新观点，不欢迎大篇幅摘抄和生搬硬套</li>
                    <li>涉及参考资料的内容需要标明来源出处并获得作者授权（或符合作品许可证）</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="norm-item">
            <div class="item-tit">代码规范</div>
            <div class="item-box">
              <div class="desc">根据各项目下的代码规范</div>
            </div>
          </div>
          <div class="norm-item">
            <div class="item-tit">贡献方式</div>
            <div class="way-item">
              <div class="tit">直接提交PR：</div>
              <div class="desc">
                如果你对阅读到的内容有任何修改建议，并且已经产出了修改后的内容，你可以通过 「Fork + PR」 或者 「轻量级
                PR」的方式提交内容进行贡献。你的 PR 会在通过编写小组和审校专家团队审核后合并进「铱塔智联物联网平台」的最终内容中。
              </div>
            </div>
            <div class="way-item">
              <div class="tit">提交 Issue：</div>
              <div class="desc">
                如果你对阅读到的内容有任何修改建议，并且已经产出了修改后的内容，你可以通过 「Fork + PR」 或者 「轻量级
                PR」的方式提交内容进行贡献。你的 PR 会在通过编写小组和审校专家团队审核后合并进「铱塔智联物联网平台」的最终内容中。
              </div>
            </div>
            <div class="way-item">
              <div class="tit">领取 Issue：</div>
              <div class="desc">
                <p>
                  1、在
                  文档Issue或项目Issue页面中，会有官方和用户提出的各种有关「铱塔智联物联网平台」内容的需求，从中选择你擅长的内容进行评论认领，由编写组确认后即可开始编写。
                </p>
                <p>
                  2、评论内容为 「作者姓名+预计完成时间+备注」 ，如 「 开源爱好者，预计 9 月 18 日完成部分内容」 ，收到用户名为「xiwa」的账号回复
                  「已确认」 后，代表你就可以开始编写工作。
                </p>
                <p>
                  3、编写完成后通过 「Fork + PR」 或者 「轻量级 PR」的方式提交内容进行贡献。你的 PR
                  会在通过编写小组和审校专家团队审核后合并进「铱塔智联物联网平台」的最终内容中。
                </p>
              </div>
            </div>
            <div class="a-link">
              <a href="http://iotkit-open-source.gitee.io/document/">文档地址
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" class="2qofvgpt7__design-iconfont" width="12" height="12">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M2.6252 2.29922C2.4457 2.29922 2.3002 2.44473 2.3002 2.62422V11.3742C2.3002 11.5537 2.4457 11.6992 2.6252 11.6992H11.3752C11.5547 11.6992 11.7002 11.5537 11.7002 11.3742V8.59571C11.7002 8.29196 11.9464 8.04571 12.2502 8.04571C12.554 8.04571 12.8002 8.29196 12.8002 8.59571V11.3742C12.8002 12.1612 12.1622 12.7992 11.3752 12.7992H2.6252C1.8382 12.7992 1.2002 12.1612 1.2002 11.3742V2.62422C1.2002 1.83721 1.83819 1.19922 2.6252 1.19922H5.2502C5.55395 1.19922 5.80019 1.44546 5.80019 1.74922C5.80019 2.05298 5.55395 2.29922 5.2502 2.29922H2.6252ZM7.61719 1.74922C7.61719 1.44546 7.86343 1.19922 8.16719 1.19922H12.2505C12.5543 1.19922 12.8005 1.44546 12.8005 1.74922V5.83255C12.8005 6.13631 12.5543 6.38255 12.2505 6.38255C11.9468 6.38255 11.7005 6.13631 11.7005 5.83255V3.07632L7.91449 6.86235C7.69971 7.07714 7.35147 7.07714 7.13668 6.86235C6.92189 6.64756 6.92189 6.29932 7.13668 6.08453L10.922 2.29922H8.16719C7.86343 2.29922 7.61719 2.05298 7.61719 1.74922Z"
                    fill="#0070FF"
                  ></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script lang="ts" setup>
import { getContributorList } from './api/index.api'

import UserItem from './components/user-item.vue'
import SvgIcon from '@/components/SvgIcon/index.vue'

const data = ref([])
const loading = ref(false)
const getData = () => {
  loading.value = true
  getContributorList({
    // pageNum: 1,
    // pageSize: 10000,
  }).then((res) => {
    data.value = res.data.rows || []
  }).finally(() => {
    loading.value = false
  })
}
getData(0)
const joinList = [{
  title: '贡献代码',
  icon: 'join_code',
  url: 'https://gitee.com/iotkit-open-source',
}, {
  title: '贡献文档',
  icon: 'join_document',
  url: 'http://iotkit-open-source.gitee.io/document/',
}, {
  title: '贡献测试用例',
  icon: 'join_example',
  url: 'https://gitee.com/iotkit-open-source',
}, {
  title: '贡献示例',
  icon: 'join_testcase',
  url: 'https://gitee.com/open-iita/iotkit-parent#捐助支持',
}, {
  title: '贡献翻译',
  icon: 'join_translate',
  url: 'https://gitee.com/open-iita/iotkit-parent#捐助支持',
}, {
  title: '贡献建议',
  icon: 'join_proposal',
  url: 'https://gitee.com/open-iita/iotkit-parent#捐助支持',
}, {
  title: '贡献资金',
  icon: 'join_capital',
  url: 'https://gitee.com/open-iita/iotkit-parent#捐助支持',
  }]

const goLink = (url) => {
  window.open(url)
}

const router = useRouter()
const handleAdd = () => {
  router.push({
    path: '/system/user-auth/detail/0/add',
  })
}
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
  }
}
.text-box {
  .box-item {
    margin-bottom: 30px;
    .desc {
      color: #717C8E;
      font-size: 12px;
    }
    .join-box {
      display: flex;
      margin-left: 30px;
      .item {
        margin-right: 70px;
        text-align: center;
        cursor: pointer;
        &:hover {
          .icon {
            transform: scale(1.1);
          }
          .text {
            color: var(--el-color-primary);
          }
        }
        .icon {
          width: 40px;
          height: 40px;
          display: inline-block;
          transition: 0.6s ease;
          .icon-svg {
            width: 100%;
            height: 100%;
          }
        }
        .text {
          color: #717C8E;
          font-size: 12px;
          margin-top: 8px;
        }
        &:last-child {
          margin-right: 0;
        }
      }
    }
    .norm-item {
      padding-left: 16px;
      font-size: 12px;
      padding-bottom: 24px;
      margin-bottom: 24px;
      border-bottom: 1px solid #EFEFEF;
      .item-tit {
        font-weight: 600;
        color: #0B1D30;
        font-size: 12px;
        margin-bottom: 12px;
      }
      .item-box {
        padding-left: 10px;
        .item {
          display: flex;
          .tit {
            color: #54575E;
            width: 40px;
            font-size: 12px;
            margin-bottom: 12px;
            font-weight: 600;
          }
          .txt-list {
            ul {
              margin: 0;
              padding-left: 15px;
              li {
                margin-bottom: 8px;
                &:last-child {
                  margin-bottom: 0;
                }
              }
            }
          }
        }
      }
      .way-item {
        padding-left: 10px;
        margin-top: 24px;
        .tit {
          padding-left: 10px;
          margin-bottom: 12px;
          font-weight: 600;
        }
        .desc {
          padding-left: 10px;
          line-height: 20px;
        }
      }
      .a-link {
        padding-left: 20px;
        a {
          display: flex;
          align-items: center;
        }
        svg {
          margin-left: 6px;
        }
      }
    }
  }
  .a-link {
    color: var(--el-color-primary);
    font-size: 12px;
  }
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
</style>
