# seller

> seller project  模仿饿了么移动端页面

# introduce
> 目录结构介绍

  每个文件夹下有一个README.md,介绍详细信息

  - build          ------   编译任务的代码
  - config webpack ------   配置文件
  - node_modules   ------   包管理文件夹
  - resource       ------   开发过程中所用到的资源文件
  - src            ------   应用主源码
  - static         ------   静态资源文件
  - test           ------   用于测试文件夹
  - .babelrc babel ------   配置文件
  - .editorconfig  ------   开发环境配置文件
  - .eslintignore  ------   eslint代码检测忽略文件
  - .eslintrc.js   ------   eslint配置文件
  - .gitignore     ------   git忽略配置文件
  - data.json      ------   mock数据
  - index.html     ------   应用入口
  - package.json   ------   项目的基本信息
  - README.md      ------   项目介绍

> 使用VueJs仿饿了么手机端页面效果

  - 使用VueJs 2.0
  - VueJs 2.0脚手架vue-cli开发
  - 异步请求框架 axios库
    ```
        import axios from 'axios'
        Vue.prototype.$http = axios
        this.$http.get(...)
        .then((response)=>{
        })
        .catch((err)=>{
        })
    ```
  - 数据mock
     data.json是准备好的数据，利用vue脚手架在 ./build/dev-server.js中修改代码，dev-server.js本质是利用express做的
     http服务器，所以增加几个路由mock数据

     ```

          var appData = require('../data.json')
          var seller = appData.seller
          var goods = appData.goods
          var ratings = appData.ratings
          var apiRouter = express.Router()
          api.get('/seller',(req,res)=>{
             res.json({
              errno: 0,
              data: seller
             })
          })
           api.get('/goods',(req,res)=>{
             res.json({
              errno: 0,
              data: goods
             })
           })
           api.get('/ratings',(req,res)=>{
             res.json({
              errno: 0,
              data: ratings
             })
           })
           app.use('./api',apiRouter)
     ```

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
