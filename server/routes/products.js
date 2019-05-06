var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Product = require('./../models/Product');
var User = require('./../models/User');

//定义返回数据的格式
var responseData;

router.use(function(req, res, next){
  responseData = {
    code: 0,
    msg: ''
  };
  next();
});

/*
 * 获取商品列表
 * */
router.get('/select', function(req, res) {

  var pageSize = Number(req.query.pageSize);console.log(pageSize);
  var pageNum = req.query.pageNum;console.log(pageNum);
  var priceRange = Number(req.query.priceRange);console.log(priceRange);
  var sortByPrice = Number(req.query.sortByPrice);console.log(sortByPrice);
  var skip = (pageNum - 1) * pageSize;console.log(skip);
  var where = {};
  if(priceRange == -1){

  }else{
    switch (priceRange) {
      case 0 :
        where.salePrice = {
          $gte: 0,
          $lt: 500
        };
        break;
      case 1 :
        where.salePrice = {
          $gte: 500,
          $lt: 1000
        };
        break;
      case 2 :
        where.salePrice = {
          $gte: 1000,
          $lt: 2000
        };
        break;
      case 3 :
        where.salePrice = {
          $gte: 2000,
          $lt: 4000
        };
        break;
    }
  }console.log(where);

  responseData.result = {};
  responseData.result.pageSize = pageSize;
  responseData.result.pageNum = pageNum;

/*  mongoose.connect('mongodb://localhost:27017/dumall', {useNewUrlParser: true}, function(err){
    /!*if(err){
      console.log('数据库连接失败！');
    }else{
      console.log('数据库连接成功！');

      Product.count().where(where).then(function(count){
        responseData.result.count = count;
        responseData.result.pages = Math.ceil(count / pageSize);
        return Product.find().where(where).sort({salePrice: sortByPrice}).skip(skip).limit(pageSize);
      }).then(function(products){
        responseData.result.products = products;
        responseData.msg = '成功';
        res.json(responseData);
      });

    }*!/
    /!*Product.count().where(where).then(function(count){
      responseData.result.count = count;
      responseData.result.pages = Math.ceil(count / pageSize);
      return Product.find().where(where).sort({salePrice: sortByPrice}).skip(skip).limit(pageSize);
    }).then(function(products){
      responseData.result.products = products;
      responseData.msg = '成功';
      res.json(responseData);
    });*!/
  });*/

  Product.count().where(where).then(function(count){
    responseData.result.count = count;
    responseData.result.pages = Math.ceil(count / pageSize);
    return Product.find().where(where).sort({salePrice: sortByPrice}).skip(skip).limit(pageSize);
  }).then(function(products){
    responseData.result.products = products;
    responseData.msg = '成功';
    res.json(responseData);
  });

});

/*
* 把商品添加到购物车
* */
router.post('/addCart', (req, res) => {
  let userName = req.body.userName;
  let productId = req.body.productId;
  let user;

  User.findOne({userName: userName}).then(function(userDoc){
    user = userDoc;
    for(var i=0; i<user.cartList.length; i++){
      if(user.cartList[i].productId == productId){
        let num = Number(user.cartList[i].productNum);
        num++;
        cartList[i].productNum = num;
        responseData.result = num;
        user.save();
        res.json(responseData);
        break;
      }
    }
    if(i == user.cartList.length){
      return Product.findOne({productId: productId});
    }
  }).then(function(product){
    product.productNum = '1';
    responseData.result = 1;
    product.checked = '1';console.log(product);
    user.cartList.push(product);
    return user.save();
  }).then(function(newUser){
    responseData.msg = '添加成功！';
    res.json(responseData);
  }).catch(function(err){
    responseData.code = 1;
    responseData.msg = err;
    res.json(responseData);
  });
});

module.exports = router;
