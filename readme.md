##### 项目课程 

-  [B站地址](https://www.bilibili.com/video/BV13A411w79h/?p=8&spm_id_from=333.1007.top_right_bar_window_history.content.click&vd_source=90ee0a6f382e91250b46aae870e6c912)
- [Github地址](https://github.com/jj112358/node-api)



##### 数据库操作

sequelize：基于` promise` 的 Node.js `ORM`

ORM：对象关系映射

- 数据表映射一个类
- 表中的数据行映射一个对象
- 字段映射为对象的属性
- 数据表的操作映射对象的方法

`npm i sequelize`

`npm i mysql2`



##### 统一错误处理

- 在出错的地方使用`ctx.app.emit`提交错误
- 在app中使用`app.on`监听

##### 加密

在将密码保存到数据库之前，要对密码进行加密处理

加盐加密(使用bcrcyptjs

##### 用户认证与授权

登录成功后，会给用户颁发令牌`token`，用户在以后的每一次请求中都会携带这个令牌。

使用`jwt`(`jsonwebtoken`)
