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

​    

​    

​    

​    

​    

