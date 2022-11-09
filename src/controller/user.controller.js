const {createUser} = require('../service/user.service')
const {userRegisterError} = require('../constant/err.type')

class UserController {
    async register(ctx, next) {
        // 1.获取数据
        // console.log(ctx.request.body);
        const {user_name, password} = ctx.request.body
        try{
            const res = await createUser(user_name, password)
            console.log('controller createUser res --------->',res)
            ctx.body = {
                code:0,
                message:'用户添加成功',
                result:{
                    id:res.id,
                    user_name:res.user_name
                }
            }
        } catch(err) {
            console.log(err)
            ctx.app.emit('error', userRegisterError, ctx)
        }
        
    }
    async login(ctx, next) {
        ctx.body = '用户登录成功'
    }
}



module.exports = new UserController()