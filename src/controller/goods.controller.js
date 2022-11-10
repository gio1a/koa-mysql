class GoodsController {

    // 上传商品图片
    async upload(ctx, next) {
        ctx.body = '商品图片上传成功'
    }
}

module.exports = new GoodsController()
