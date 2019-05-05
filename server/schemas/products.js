var mongoose = require('mongoose');

//商品的表结构
module.exports = new mongoose.Schema({

  //商品编号
  productId: String,
  //商品名
  productName: String,
  //商品价格
  salePrice: Number,
  //商品图片
  productImage: String
});
