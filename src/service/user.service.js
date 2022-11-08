class UserService {
    // 主要用于操作数据库
    async createUser(user_name,password) {
        // todo:写入数据库
        return '写入数据库成功'
        // async函数 会把return结果封装成一个promise对象
    }


}

module.exports = new UserService()