<template>
  <div class="login flex">
    <div class="login-l">
      <div class="title">开源物联网平台</div>
      <div class="desc">智能互联<span></span>畅享未来</div>
      <div class="icon">
        <img src="@/assets/images/login/let_img.png" alt="" />
      </div>
    </div>
    <div class="login-r">
      <el-form ref="loginRef" :model="loginForm" :rules="loginRules" class="login-form">
        <h3 class="logo">
          <img src="@/assets/logo/logo.png" alt="" />
        </h3>
        <div class="title">登录</div>
        <el-form-item prop="tenantId" v-if="tenantEnabled">
          <el-select v-model="loginForm.tenantId" filterable placeholder="请选择/输入公司名称" style="width: 100%">
            <el-option v-for="item in tenantList" :key="item.tenantId" :label="item.companyName" :value="item.tenantId" />
            <template #prefix><svg-icon icon-class="company" class="el-input__icon input-icon" /></template>
          </el-select>
        </el-form-item>
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" type="text" size="large" auto-complete="off" placeholder="账号">
            <template #prefix>
              <el-icon><User /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" type="password" size="large" auto-complete="off" placeholder="密码" @keyup.enter="handleLogin">
            <template #prefix>
              <el-icon><Lock /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="code" v-if="captchaEnabled">
          <el-input v-model="loginForm.code" size="large" auto-complete="off" placeholder="验证码" style="width: 67%" @keyup.enter="handleLogin">
            <template #prefix><svg-icon icon-class="validCode" class="el-input__icon input-icon" /></template>
          </el-input>
          <div class="login-code">
            <img :src="codeUrl" @click="getCode" class="login-code-img" />
          </div>
        </el-form-item>
        <el-checkbox v-model="loginForm.rememberMe" style="margin:0px 0px 25px 0px;">记住密码</el-checkbox>
        <el-form-item style="width:100%;">
          <el-button :loading="loading" size="large" type="primary" style="width:100%;" @click.prevent="handleLogin">
            <span v-if="!loading">登 录</span>
            <span v-else>登 录 中...</span>
          </el-button>
          <div style="float: right;" v-if="register">
            <router-link class="link-type" :to="'/register'">立即注册</router-link>
          </div>
        </el-form-item>
      </el-form>
      <div class="round1 round"></div>
      <div class="round2 round"></div>
      <div class="round3 round"></div>
      <!--  底部  -->
      <div class="el-login-footer">
        <span>Copyright © 2023 OPEN IITA</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getCodeImg, getTenantList } from '@/api/login'
import Cookies from 'js-cookie'
import { encrypt, decrypt } from '@/utils/jsencrypt'
import { useUserStore } from '@/store/modules/user'
import { LoginData, TenantVO } from '@/api/types'
import { FormInstance, FormRules } from 'element-plus'
import { to } from 'await-to-js'

const userStore = useUserStore()
const router = useRouter()

// const title = import.meta.env.VITE_APP_TITLE
const loginForm = ref<LoginData>({
  tenantId: '000000',
  username: 'admin',
  password: 'admin123',
  rememberMe: false,
  code: '',
  uuid: '',
})

const loginRules: FormRules = {
  tenantId: [{ required: true, trigger: 'blur', message: '请输入您的租户编号' }],
  username: [{ required: true, trigger: 'blur', message: '请输入您的账号' }],
  password: [{ required: true, trigger: 'blur', message: '请输入您的密码' }],
  code: [{ required: true, trigger: 'change', message: '请输入验证码' }],
}

const codeUrl = ref('')
const loading = ref(false)
// 验证码开关
const captchaEnabled = ref(true)
// 租户开关
const tenantEnabled = ref(true)

// 注册开关
const register = ref(false)
const redirect = ref(undefined)
const loginRef = ref<FormInstance>()
// 租户列表
const tenantList = ref<TenantVO[]>([])

const handleLogin = () => {
  loginRef.value?.validate(async (valid: boolean, fields: any) => {
    if (valid) {
      loading.value = true
      // 勾选了需要记住密码设置在 cookie 中设置记住用户名和密码
      if (loginForm.value.rememberMe) {
        Cookies.set('tenantId', loginForm.value.tenantId, { expires: 30 })
        Cookies.set('username', loginForm.value.username, { expires: 30 })
        Cookies.set('password', String(encrypt(loginForm.value.password)), { expires: 30 })
        Cookies.set('rememberMe', String(loginForm.value.rememberMe), { expires: 30 })
      } else {
        // 否则移除
        Cookies.remove('tenantId')
        Cookies.remove('username')
        Cookies.remove('password')
        Cookies.remove('rememberMe')
      }
      // 调用action的登录方法
      // prittier-ignore
      const [err] = await to(userStore.login(loginForm.value))
      if (!err) {
        await router.push({ path: redirect.value || '/' })
      } else {
        loading.value = false
        // 重新获取验证码
        if (captchaEnabled.value) {
          await getCode()
        }
      }
    } else {
      console.log('error submit!', fields)
    }
  })
}

/**
 * 获取验证码
 */
const getCode = async () => {
  const res = await getCodeImg()
  const { data } = res
  captchaEnabled.value = data.captchaEnabled === undefined ? true : data.captchaEnabled
  if (captchaEnabled.value) {
    codeUrl.value = 'data:image/gif;base64,' + data.img
    loginForm.value.uuid = data.uuid
  }
}

const getCookie = () => {
  const tenantId = Cookies.get('tenantId')
  const username = Cookies.get('username')
  const password = Cookies.get('password')
  const rememberMe = Cookies.get('rememberMe')
  loginForm.value = {
    tenantId: tenantId === undefined ? loginForm.value.tenantId : tenantId,
    username: username === undefined ? loginForm.value.username : username,
    password: password === undefined ? loginForm.value.password : (decrypt(password) as string),
    rememberMe: rememberMe === undefined ? false : Boolean(rememberMe),
  }
}

/**
 * 获取租户列表
 */
const initTenantList = async () => {
  const { data } = await getTenantList()
  tenantEnabled.value = data.tenantEnabled === undefined ? true : data.tenantEnabled
  if (tenantEnabled.value) {
    tenantList.value = data.voList
    if (tenantList.value != null && tenantList.value.length !== 0) {
      loginForm.value.tenantId = tenantList.value[0].tenantId
    }
  }
}

onMounted(() => {
  getCode()
  initTenantList()
  getCookie()
})
</script>

<style lang="scss" scoped>
.login {
  height: 100%;
  &-l {
    width: 50%;
    padding: 0 60px;
    background-image: url('@/assets/images/login/bg.png');
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 160px;
      height: 160px;
      border-radius: 50%;
      transform: translate(-30%, 40%);
      background: linear-gradient(18deg, #eaf2fbff 0%, #ebf2fc00 100%);
    }
    .title {
      font-size: 30px;
      color: #fff;
      opacity: 0.8;
    }
    .desc {
      padding: 22px 0;
      font-size: 36px;
      color: #fff;
      font-weight: 500;
      span {
        display: inline-block;
        width: 50px;
      }
    }
    .icon {
      width: 100%;
      max-width: 600px;
      img {
        width: 100%;
        height: auto;
      }
    }
  }
  &-r {
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    background-size: cover;
    position: relative;
    overflow: hidden;
    .round {
      position: absolute;
      border-radius: 50%;
      background: linear-gradient(18deg, #eaf2fbff 0%, #ebf2fc00 100%);
      z-index: 1;
    }
    .round1 {
      width: 220px;
      height: 220px;
      bottom: 0;
      right: 0;
      transform: translate(40%, 20%);
    }
    .round2 {
      width: 72px;
      height: 72px;
      bottom: 100px;
      left: 70px;
      transform: translate(40%, 20%);
    }
    .round3 {
      width: 36px;
      height: 36px;
      top: 100px;
      right: 170px;
    }
    .logo {
      width: 230px;
      margin: 0 auto;
      margin-bottom: 80px;
      img {
        width: 100%;
      }
    }
    .title {
      color: rgba(11, 29, 48, 1);
      font-size: 24px;
      margin-bottom: 30px;
      font-weight: 600;
    }
    .login-form {
      border-radius: 6px;
      background: #ffffff;
      width: 400px;
      position: relative;
      z-index: 2;
      .el-input {
        height: 40px;
        input {
          height: 40px;
        }
      }
      .input-icon {
        height: 39px;
        width: 14px;
        margin-left: 0px;
      }
    }
    .login-tip {
      font-size: 13px;
      text-align: center;
      color: #bfbfbf;
    }
    .login-code {
      width: 33%;
      height: 40px;
      float: right;
      img {
        cursor: pointer;
        vertical-align: middle;
        width: 100%;
      }
    }
    .el-login-footer {
      position: absolute;
      bottom: 0;
      height: 40px;
      line-height: 40px;
      width: 50%;
      text-align: center;
      color: #87909d;
      font-family: Arial, serif;
      font-size: 12px;
      letter-spacing: 1px;
    }
    .login-code-img {
      height: 40px;
      padding-left: 12px;
    }
  }
}
</style>
