## 平台简介

* 本仓库为前端技术栈 [Vue3](https://v3.cn.vuejs.org) + [TS](https://www.typescriptlang.org/) + [Element Plus](https://element-plus.org/zh-CN) + [Vite](https://cn.vitejs.dev) 版本。
* 配套后端代码仓库地址
* [奇特物联开源 / iotkit-parent V0.4.5(注意版本号)](https://gitee.com/iotkit-open-source/iotkit-parent.git)

## 前端目录结构
```
|-- .editorconfig              编辑器配置
|-- .env.development           开发环境配置
|-- .env.production            生产环境配置
|-- .eslintignore              eslint忽略配置
|-- .eslintrc-auto-import.json eslint自动导入json校验
|-- .eslintrc.js               eslint规则配置  
|-- .gitignore                 git忽略
|-- .prettierignore            prettier忽略
|-- commitlint.config.js       git commit 格式校验
|-- index.html                 项目单页面主页
|-- package.json               项目配置  
|-- pnpm-lock.yaml             pnpm依赖锁
|-- README.md                  
|-- tsconfig.json              ts配置
|-- vite.config.ts             vite配置
|-- bin                        脚本
|-- dist                       打包生成
|-- public                     根目录静态资源
|-- src                        项目主要目录
|   |-- animate.ts             动画
|   |-- App.vue                vue根组件
|   |-- main.ts                入口文件：实例化
|   |-- permission.ts          权限
|   |-- settings.ts            项目信息设置
|   |-- api                    全局api
|   |-- assets                 静态资源
|   |   |-- icons              图标目录
|   |   |   |-- svg            svg目录
|   |   |-- images             图片资源
|   |   |-- logo               网站LOGO
|   |   |-- styles             样式文件
|   |-- components             组件库
|   |-- directive              指令库
|   |-- enums                  枚举库
|   |-- hooks                  组合式api
|   |-- lang                   国际化
|   |-- layout                 布局组件
|   |-- plugins                插件
|   |-- router                 路由
|   |-- store                  状态管理
|   |-- types                  ts 类型
|   |-- utils                  工具库
|   |-- views                  视图层
|       |-- iot                iot主要功能
|-- vite                       vite相关扩展
```

## 前端运行

|环境|要求|
|--|--|
|nodejs|14.16.x+|
|pnpm|任意版本|
|vue|3.2.45+|
|element-plus|2.2.27+|
|vite|2.0.0+|

[常见问题](http://iotkit-open-source.gitee.io/document/pages/772a9f/#creating-server-tcp-listening-socket-127-0-0-1-6379-bind-no-such-file-or-directory)

```bash
# 克隆项目
git clone https://gitee.com/openiita/iita-iot-web-admin.git

#安装pnpm
npm i pnpm -g
pnpm config set registry https://registry.npmmirror.com/

# 安装依赖
如之前安装老版本，或者使用npm i、yarn、cnpm i安装过node_modules，请先删除在进行安装。
pnpm install

# 启动服务
pnpm run dev

# 构建生产环境 
yarn build:prod
# 前端访问地址
http://localhost:8082[奇特目录.md](..%2F..%2F..%2F%CF%C2%D4%D8%2F%C6%E6%CC%D8%C4%BF%C2%BC.md)


