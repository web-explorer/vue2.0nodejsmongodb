var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('./../models/User');

var responseData;
router.use(function(req, res, next){
  responseData = {
    code: 0,
    msg: ''
  };
  next();
});

/* GET users listing. */

/* POST users listing. */
/*
* 用户登录
* */
router.post('/login',function(req,res){
  var userName = req.body.userName;console.log(userName);
  var userPwd = req.body.userPwd;console.log(userPwd);

  User.findOne({
    userName: userName,
    userPwd: userPwd
  }).then(function (user) {
    console.log(user);
    if(user){
      responseData.msg = '用户名和密码正确！';
      responseData.result = {
        userName: user.userName
      }
      res.cookie('userInfo', user.userName, {
        path: '/',
        maxAge: 1000 * 60 * 60
      });
      res.json(responseData);
    }else{
      responseData.code = 1;
      responseData.msg = '用户名或密码错误！';
      res.json(responseData);
    }
      });
});

/*
* 用户退出
* */
router.post('/logout',function(req, res){
  let userName = req.body.userName;
  res.cookie('userInfo', '', {
    path: '/',
    maxAge: 0
  });
  responseData.msg = '成功！';
  res.json(responseData);
});

/*
* 验证用户的登录状态
* */
router.post('/checkLogin', (req, res) => {
  if(req.cookies.userInfo){
    responseData.msg = '当前用户已登录！';
    responseData.result = {
      userName: req.cookies.userInfo
    };
  }else{
    responseData.code = 1;
    responseData.msg = '当前用户未登录！';
  }
  res.json(responseData);
});

/*
* 获取购物车中的商品
* */
router.get('/cart',function (req, res) {
  let userName = req.cookies.userInfo;
  User.findOne({
    userName: userName
  }).then(function(user){
    responseData.msg = '成功！';
    responseData.result = user.cartList;
    res.json(responseData);
  });
});

/*
* 删除购物车里的某个商品
* */
router.post('/cart/delete', (req, res) => {
  let userName = req.cookies.userInfo;
  let productId = req.body.productId;
  User.update({userName: userName}, {'$pull': {cartList: {productId: productId}}}).then((newUser) => {
    responseData.msg = '删除成功！';
    res.json(responseData);
  }).catch((err) => {
    responseData.code = 1;
    responseData.msg = err;
  });
});

/*
* 切换购物车中商品的选中状态
* */
router.post('/cart/check', (req, res) => {
  let userName = req.cookies.userInfo;
  let productId = req.body.productId;
  let checked = req.body.checked;

  /*User.findOne({userName: userName}).then((user) => {
    for(let i=0; i<user.cartList.length; i++){
      if(user.cartList[i].productId == productId){console.log(user.cartList[i].checked);
        user.cartList[i].checked = !user.cartList[i].checked;
        break;
      }
    }
    return user.save();*/

    User.update({
      userName: userName,
      'cartList.productId': productId
    }, {
      'cartList.$.checked': checked
    }).then((newUser) => {
    responseData.msg = '更新商品的选中状态成功！';
    res.json(responseData);
  }).catch((err) => {
    responseData.code = 1;
    responseData.msg = err.message;
    res.json(responseData);
  });

});

/*
* 切换所有商品的选中状态
* */
router.post('/cart/setAll', (req, res) => {
  let userName = req.cookies.userInfo;console.log(userName);
  let checked = req.body.checked;console.log(checked);

  /*User.findOne({userName: userName}).then((user) => {
    for(let i=0; i<user.cartList.length; i++){
      user.cartList[i].checked = checked;
    }
    return user.save();
  }).then((newUser) => {
    responseData.msg = '修改商品的状态成功！';
    res.json(responseData);
  });*/

  User.update({userName: userName}, {$set: {'cartList.$.checked': checked}}).then((newUsers) => {
    responseData.msg = '更新商品的选中状态成功！';
    res.json(responseData);
  }).catch((err) => {
    responseData.code = 1;
    responseData.msg = err.message;
    res.json(responseData);
  });

});

/*
* 购物车中的某个商品数量-1
* */
router.post('/cart/countMinus',(req, res) => {
  let userName = req.cookies.userInfo;
  let productId = req.body.productId;

  User.findOne({userName: userName}).then((user) => {
    for(let i=0; i<user.cartList.length; i++){
      if(user.cartList[i].productId == productId){
        user.cartList[i].productNum--;
        break;
      }
    }
    return user.save();
  }).then((newUser) => {
    responseData.msg = '修改商品的数量成功！';
    res.json(responseData);
  });

});

/*
* 购物车中的某个商品数量+1
* */
router.post('/cart/countAdd',(req, res) => {
  let userName = req.cookies.userInfo;
  let productId = req.body.productId;

  User.findOne({userName: userName}).then((user) => {
    for(let i=0; i<user.cartList.length; i++){
      if(user.cartList[i].productId == productId){
        user.cartList[i].productNum++;
        break;
      }
    }
    return user.save();
  }).then((newUser) => {
    responseData.msg = '修改商品的数量成功！';
    res.json(responseData);
  });

});

module.exports = router;
