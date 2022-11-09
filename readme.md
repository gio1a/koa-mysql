**项目课程 ：**

-  [B站地址](https://www.bilibili.com/video/BV13A411w79h/?p=8&spm_id_from=333.1007.top_right_bar_window_history.content.click&vd_source=90ee0a6f382e91250b46aae870e6c912)
- [Github地址](https://github.com/jj112358/node-api)



### 一、项目初始化

##### 1. npm初始化

`npm init -y`

生成`package.json`文件：

- 记录项目依赖

##### 2. git初始化

`git init`

生成`.git`隐藏文件夹，git的本地仓库

##### 3. 创建readme.md



### 二、搭建项目

##### 1. 安装koa框架

##### 2.编写最基本的app


### 三、项目的优化

##### 1. 自动重启服务 

  - 安装`nodemon`

    `npm i nodemon -D` 安装在devDependencies里面

  - 编写`package.json`脚本

    ```js
    "scripts": {
        "dev":"nodemon ./src/main.js",
    },
    ```

  - 通过`npm run dev`启动项目

##### 2. 读取配置文件

  - 安装`dotenv`，读取根目录中的`.env`文件，将配置写入`process.env`中

    `npm i dotenv `

    `.env`文件

    `APP_PORT=8000`

    创建`src/config/config.default.js`

    ```js
    const dotenv = require('dotenv');
    
    dotenv.config()
    
    module.exports = process.env
    ```

    改写`main.js`

### 四、添加路由

> 路由：根据不同的url调用对应的处理函数

##### 1. 安装`koa-router`

`npm i koa-router`

- 导入包
- 实例化对象
- 编写路由
- 注册中间件

##### 2. 编写路由

创建`src/router`，编写`user.route.js`

##### 3. 改写`main.js`

导入`router`

注册中间件

### 五、目录结构优化

##### 1. 将HTTP服务和app业务拆分

创建`src/app/index.js`  app业务

改写`main.js` HTTP服务

##### 2. 将路由和控制器拆分

- 路由：解析URL，分布给控制器对应的方法`user.router.js`
- 控制器：处理不同的业务 `controller/user.controller.js`



### 六、解析body

##### 1. 安装koa-body

`npm i koa-body`

##### 2. 注册中间件

改写`app/index.js`

```js
const {koaBody} = require('koa-body')

// koa-body本身是一个函数，所以要在所有路由处理之前注册这个中间件
app.use(koaBody())
```

##### 3. 解析请求数据

改写`controller`

```js
// 1.获取数据
const {user_name, password} = ctx.request.body
// 2.操作数据库
const res = await createUser(user_name, password)
console.log(res);
// 3.返回结果
ctx.body = ctx.request.body
```

##### 4. 拆分service层

service层主要用于处理数据库



### 七、数据库操作

**sequelize**：基于` promise` 的 Node.js `ORM`

**ORM**：对象关系映射

- 数据表映射一个类
- 表中的数据行映射一个对象
- 字段映射为对象的属性
- 数据表的操作映射对象的方法

##### 1. 安装数据库

`npm i sequelize`

`npm i mysql2`

##### 2. 连接数据库

`src/db/seq.js`

```js
const {Sequelize} = require('sequelize')

const {
    MYSQL_HOST,
    MYSQL_PORT,
    MYSQL_USER,
    MYSQL_PWD,
    MYSQL_DB
} = require('../config/config.default')

const seq = new Sequelize(MYSQL_DB, MYSQL_USER, MYSQL_PWD, {
    host:MYSQL_HOST,
    dialect:'mysql'
})

// 测试数据库连接
// seq
//     .authenticate()
//     .then(() => {
//         console.log('数据库连接成功')
//     })
//     .catch(err => {
//         console.log('数据库连接失败',err)
//     })
```

### 八、 创建User模型

##### 拆分Model层

sequelize 主要通过 Model 对应数据表

创建`src/model/user.model.js`

### 九、添加用户入库

所有数据库操作都在Service层完成，Service调用Model完成数据库操作。

改写`src/service/user.service.js`

```js
const User = require('../model/use.model')

class UserService {
  async createUser(user_name, password) {
    // await表达式: promise对象的值
    const res = await User.create({ user_name, password })
    // console.log(res)

    return res.dataValues
  }
}

module.exports = new UserService()
```

改写`user.controller.js`

```js
const { createUser } = require('../service/user.service')

class UserController {
  async register(ctx, next) {
    // 1. 获取数据
    // console.log(ctx.request.body)
    const { user_name, password } = ctx.request.body
    // 2. 操作数据库
    const res = await createUser(user_name, password)
    // console.log(res)
    // 3. 返回结果
    ctx.body = {
      code: 0,
      message: '用户注册成功',
      result: {
        id: res.id,
        user_name: res.user_name,
      },
    }
  }

  async login(ctx, next) {
    ctx.body = '登录成功'
  }
}

module.exports = new UserController()
```

### 十、错误处理

在控制器中，对不同错误尽享处理，返回不同的错误提示，提高代码质量

```js
const { createUser, getUerInfo } = require('../service/user.service')

class UserController {
  async register(ctx, next) {
    // 1. 获取数据
    const { user_name, password } = ctx.request.body

    // 验证合法性
    if (!user_name || !password) {
      console.error('用户名或密码为空', ctx.request.body)
      ctx.status = 400
      ctx.body = {
        code: '10001',
        message: '用户名或密码为空',
        result: ''
      }
      return
    }
    // 合理性
    if (getUerInfo({ user_name })) {
      ctx.status = 409
      ctx.body = {
        code: '10002',
        message: '用户已经存在',
        result: ''
      }
      return
    }
    // 2. 操作数据库
    const res = await createUser(user_name, password)
    // 3. 返回结果
    ctx.body = {
      code: 0,
      message: '用户注册成功',
      result: {
        id: res.id,
        user_name: res.user_name,
      },
    }
  }

  async login(ctx, next) {
    ctx.body = '登录成功'
  }
}

module.exports = new UserController()
```

在service中封装函数

```js
const User = require('../model/use.model')

class UserService {
  async createUser(user_name, password) {
    // 插入数据
    // await表达式: promise对象的值
    const res = await User.create({ user_name, password })

    return res.dataValues
  }

  async getUerInfo({ id, user_name, password, is_admin }) {
    const whereOpt = {}

    // 短路运算符
    id && Object.assign(whereOpt, { id })
    user_name && Object.assign(whereOpt, { user_name })
    password && Object.assign(whereOpt, { password })
    is_admin && Object.assign(whereOpt, { is_admin })

    const res = await User.findOne({
      attributes: ['id', 'user_name', 'password', 'is_admin'],
      where: whereOpt,
    })

    return res ? res.dataValues : null
  }
}

module.exports = new UserService()
```

### 十一、拆分中间件

为了使代码逻辑更清晰，可以拆分一个中间件，封装多个中间件函数

![image-20210524154353520](https://camo.githubusercontent.com/c9c69e7a6c7a03c0a8b04971148c33c3363ec421f9cacbbcaef0c1cf3e0a221a/687474703a2f2f696d6167652e62726f6a69652e636e2f696d6167652d32303231303532343135343335333532302e706e67)

    ##### 1. 拆分中间件

添加`src/middleware/user.middleware.js`，把传入信息的验证移到这里。

```js
const { getUerInfo } = require('../service/user.service')
const { userFormateError, userAlreadyExited } = require('../constant/err.type')

const userValidator = async (ctx, next) => {
  const { user_name, password } = ctx.request.body
  // 合法性
  if (!user_name || !password) {
    console.error('用户名或密码为空', ctx.request.body)
    ctx.app.emit('error', userFormateError, ctx)
    return
  }

  await next()
}

const verifyUser = async (ctx, next) => {
  const { user_name } = ctx.request.body

  if (getUerInfo({ user_name })) {
    ctx.app.emit('error', userAlreadyExited, ctx)
    return
  }

  await next()
}

module.exports = {
  userValidator,
  verifyUser,
}
```

##### 2. 统一错误处理

- 在出错的地方使用`ctx.app.emit`提交错误
- 在app中使用`app.on`监听

编写统一的错误定义文件`src/constant/err.typr.js`

```js
module.exports = {
  userFormateError: {
    code: '10001',
    message: '用户名或密码为空',
    result: '',
  },
  userAlreadyExited: {
    code: '10002',
    message: '用户已经存在',
    result: '',
  },
}
```

##### 3. 错误处理函数

`src/app/errHandler.js`

```js
module.exports = (err, ctx) => {
  let status = 500
  switch (err.code) {
    case '10001':
      status = 400
      break
    case '10002':
      status = 409
      break
    default:
      status = 500
  }
  ctx.status = status
  ctx.body = err
}
```

改写`app/index.js`文件

```js
const errHandler = require('./errHandler')
// 统一的错误处理
app.on('error', errHandler)
```

### 十二、加密

在将密码保存到数据库之前，要对密码进行加密处理

##### 1.安装bcrcyptjs



##### 2. 编写加密中间件



##### 3.在router中使用



### 十三、登陆验证





​    

​    

