const Router = require('koa-router')

const {register, login} = require('../controller/user.controller')

const router = new Router({prefix:'/users'}) // 统一前缀

router.post('/register', register)// 注册（register）的接口
router.post('/login',login);

module.exports = router