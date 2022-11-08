// 业务
const Koa = require('koa');

const userRouter = require('../router/user.route') //导入

const app = new Koa();


app.use(userRouter.routes()) // 注册路由


module.exports = app