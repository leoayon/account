const express = require('express');
const md5 = require('md5')

const UserModel = require('../../models/UserModel')

const router = express.Router();

// 注册页面
router.get('/reg', (req, res) => {
  res.render('auth/reg')
})

// 用户注册
router.post('/reg', (req, res) => {
  console.log(req.body)
  UserModel.create({...req.body, password: md5(req.body.password)}, (err, data) => {
    if(err) {
      res.status(500).send('注册失败')
      return
    }
    res.render('success', {msg: '注册成功', url: '/login'})
  })
})

// 登录页面
router.get('/login', (req, res) => {
  res.render('auth/login')
})

// 用户登录
router.post('/login', (req, res) => {
  const {username, password} = req.body
  UserModel.findOne({username: username, password: md5(password)}, (err, data) => {
    if(err) {
      res.status(500).send('登录失败')
      return
    }
    console.log(data)
    if(!data) {
      return res.send('用户名或密码错误！')
    }
    req.session.username = username
    req.session._id = data._id
    res.render('success', {msg: '登录成功', url: '/account'})
  })
})

// 退出登录
router.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.render('success', {msg: '退出成功', url:'/login'})
  })
})

module.exports = router;
