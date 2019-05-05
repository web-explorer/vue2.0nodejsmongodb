var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Product = require('./../models/Product');

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

});

module.exports = router;
