const Router = require("koa-router");
const { userValidator,verifyUser } = require("../middleware/user.middleware");

const { register, login } = require("../controller/user.controller");

const router = new Router({ prefix: "/users" }); // 统一前缀

router.post("/register", userValidator, verifyUser, register); // 注册（register）的接口
router.post("/login", login);

module.exports = router;
