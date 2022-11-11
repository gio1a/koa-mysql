const { DataTypes } = require('sequelize')
const seq = require('../db/seq')

const Carts = seq.define('zd_carts', {
    goods_id:{
        type: DataTypes.INTEGER,
        allowNull:false,
        comment:'商品id'
    },
    user_id:{
        type: DataTypes.INTEGER,
        allowNull:false,
        comment:'用户id'
    },
    number:{
        type:DataTypes.INTEGER,
        allowNull:false,
        comment:'数量'
    },
    selected:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
        comment:'0：没选中，1：选中'
    }
},{
    paranoid:true
})

Carts.sync({force:true})

module.exports = Carts