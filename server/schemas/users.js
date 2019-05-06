var mongoose = require('mongoose');

//用户的表结构
module.exports = new mongoose.Schema({
  //用户编号
  userId: String,
  //用户名
  userName: String,
  //登录密码
  userPwd: String,
  //订单
  orderList: Array,
  //购物车
  cartList: [{
    _id: Object,
    productId: String,
    productName: String,
    salePrice: Number,
    productImage: String,
    productUrl: String,
    checked: Boolean,
    productNum: Number
  }],
  addressList: Array
});
