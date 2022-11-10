// 业务
const Koa = require('koa');
const {koaBody} = require('koa-body')
const errHandler = require('./errHandler')

const router = require('../router')
const app = new Koa();

// koa-body本身是一个函数，所以要在所有路由处理之前注册这个中间件
app.use(koaBody())
// 注册路由
app.use(router.routes()) // 会把router文件夹下所有路由文件都加载进来（通过router/index.js）
app.use(router.allowedMethods()) // 规定只能使用路由里的请求方式，否则会报405或501

// 进行统一的错误处理
app.on('error', errHandler)

module.exports = app