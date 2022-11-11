const { invalidGoodsId } = require("../constant/err.type")

const validator = async(ctx,next) => {
    try {
        ctx.verifyParams({
            goods_id: 'number' // 简写 等于{type:number,required:true}
        })
    } catch (error) {
        console.error(error)
        invalidGoodsId.result = error
        return ctx.app.emit('error',invalidGoodsId,ctx)
    }
    await next()
}

module.exports = {
    validator,
}
