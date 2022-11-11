const Carts = require("../model/cart.model");

class CartService {
  async createOrUpdate(user_id, goods_id) {
    return {
      id,
      user_id,
      goods_id,
      number,
      selected,
    };
  }
}

module.exports = new CartService();
