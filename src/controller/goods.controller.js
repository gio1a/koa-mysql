const path = require('path')

const {fileUploadError, unSupportedFileType} = require('../constant/err.type')

class GoodsController {

    // 上传商品图片
    async upload(ctx, next) {
        const {file} = ctx.request.files // file对应请求体中的key名
        const fileTypes = ['image/jpg','image/png'] // 支持类型
        if(file) {
            if (!fileTypes.includes(file.mimetype)) {
                return ctx.app.emit('error',unSupportedFileType,ctx)
            }
            ctx.body = {
                code: 0,
                message: '商品图片上传成功',
                result: {
                    goods_img:path.basename(file.filepath)
                }
            }
        }
         else {
            return ctx.app.emit('error',fileUploadError, ctx)
        }
    }
}

module.exports = new GoodsController()
