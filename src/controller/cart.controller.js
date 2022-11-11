const { createOrUpdate } = require("../service/cart.service");
const {addToCartError} = require('../constant/err.type')

class CartController {
  async add(ctx) {
    // 将商品添加到购物车
    const user_id = ctx.state.user.id;
    const goods_id = ctx.request.body.goods_id;
    try {
      const res = await createOrUpdate(user_id, goods_id);
      ctx.body = {
        code: 0,
        message: "添加到购物车成功",
        result: res,
      };
    } catch (error) {
        console.error(error)
        return ctx.app.emit('error',addToCartError,ctx)
    }
  }
}

module.exports = new CartController();
