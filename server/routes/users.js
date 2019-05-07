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
router.post('/cart/delete').then((req, res) => {
  let userName = req.cookies.userInfo;
  let productId = req.productId;
  return User.update({userName: userName}, {$pull: {cartList: productId}});
  }).then((newUser) => {
  responseData.msg = '删除成功！';
  res.json(responseData);
}).catch((err) => {
  responseData.code = 1;
  responseData.msg = err;
});

module.exports = router;
