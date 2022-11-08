// 业务
const Koa = require('koa');
const {koaBody} = require('koa-body')
const userRouter = require('../router/user.route') //导入

const app = new Koa();

// koa-body本身是一个函数，所以要在所有路由处理之前注册这个中间件
app.use(koaBody())
app.use(userRouter.routes()) // 注册路由


module.exports = app