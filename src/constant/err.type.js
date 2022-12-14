module.exports = {
  userFormatError: {
    code: "10001",
    message: "用户名或密码为空",
    result: "",
  },
  userAlreadyExisted: {
    code: "10002",
    message: "用户已存在",
    result: "",
  },
  userRegisterError: {
    code: "10003",
    message: "用户注册错误",
    result: "",
  },
  userDoesNotExist: {
    code: "10004",
    message: "用户不存在",
    result: "",
  },
  userLoginError: {
    code: "10005",
    message: "用户登录失败",
    result: "",
  },
  invalidPwd: {
    code: "10006",
    message: "用户密码错误",
    result: "",
  },
  tokenExpiredError: {
    code: "10101",
    message: "token已过期",
    result: "",
  },
  invalidToken: {
    code: "10102",
    message: "token无效",
    result: "",
  },
  notBeforeError: {
    code: "10103",
    message: "jwt not active",
    result: "",
  },
  hasNotPermission:{
    code:'10104',
    message:'没有管理员权限',
    result:''
  },
  fileUploadError:{
    code:'10201',
    message:'商品图片上传失败',
    result:''
  },
  unSupportedFileType:{
    code:'10202',
    message:'不支持的文件格式',
    result:''
  },
  goodsFormatError:{
    code:'10203',
    message:'商品发布的信息格式错误',
    result:''
  },
  publishGoodsError:{
    code:'10204',
    message:'发布商品失败',
    result:''
  },
  invalidGoodsId: {
    code:'10205',
    message:'无效的商品id',
    result:''
  },
  addToCartError:{
    code:'10301',
    message:'添加到购物车失败',
    result:''
  },
  cartFormatError:{
    code:'10302',
    message:'购物车数据格式错误',
    result:''
  },
  addrFormatError:{
    code:'10401',
    message:'地址数据格式错误',
    result:''
  },
  orderFormatError:{
    code:'10501',
    message:'订单数据格式错误',
    result:''
  }




};
