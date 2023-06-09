## 平台简介

* 本仓库为前端技术栈 [Vue3](https://v3.cn.vuejs.org) + [TS](https://www.typescriptlang.org/) + [Element Plus](https://element-plus.org/zh-CN) + [Vite](https://cn.vitejs.dev) 版本。
* 配套后端代码仓库地址
* [奇特物联开源 / iotkit-parent V0.4.5(注意版本号)](https://gitee.com/iotkit-open-source/iotkit-parent.git)

## 前端运行

|环境|要求|
|--|--|
|nodejs|14.16.x+|
|pnpm|任意版本|
|vue|3.2.45+|
|element-plus|2.2.27+|
|vite|2.0.0+|

```bash
# 克隆项目
git clone https://gitee.com/openiita/iita-iot-web-admin.git

#安装pnpm
npm i pnpm -g
pnpm config set registry https://registry.npmmirror.com/

# 安装依赖
pnpm install

# 启动服务
pnpm run dev

# 构建生产环境 yarn build:prod
# 前端访问地址 http://localhost:8082

