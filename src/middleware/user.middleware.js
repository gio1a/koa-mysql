const {getUserInfo} = require('../service/user.service')
const {userFormatError, userAlreadyExisted, userRegisterError} = require('../constant/err.type')

const userValidator = async (ctx,next) => {
    const {user_name, password} = ctx.request.body
    // 验证合法性
    if(!user_name|| !password) {
        console.error('用户名或密码为空',ctx.request.body)
        ctx.app.emit('error', userFormatError, ctx)
        return;
    }
    await next()
}

const verifyUser = async (ctx,next) => {
    // 验证合理性
    const {user_name} = ctx.request.body
    // if(await getUserInfo({ user_name })) {
    //     ctx.app.emit('error', userAlreadyExisted, ctx)
    //     return;
    // }
    try {
        const res = await getUserInfo({user_name})
        if(res) {
            console.error('用户名已存在',{user_name})
            ctx.app.emit('error', userAlreadyExisted, ctx)
            return
        }
    } catch(err) {
        console.error('获取用户信息错误',err)
        ctx.app.emit('error', userRegisterError, ctx)
        return
    }
    await next()
}


module.exports = {
    userValidator,
    verifyUser
}