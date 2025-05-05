const express = require('express');
const md5 = require('md5')
const jwt = require('jsonwebtoken')

const UserModel = require('../../models/UserModel')
const {secret} = require('../../config/config')

const router = express.Router();



// 登录页面
router.get('/login', (req, res) => {
  res.render('auth/login')
})

// 用户登录
router.post('/login', (req, res) => {
  const {username, password} = req.body
  UserModel.findOne({username: username, password: md5(password)}, (err, data) => {
    if(err) {
      res.json({
        code: '2001',
        msg: '登录失败',
        data: null
      })
      return
    }
    if(!data) {
      return res.json({
        code: '2002',
        msg: '用户名或密码错误',
        data: null
      })
    }
    const token = jwt.sign({
      username: data.username,
      _id: data._id
    }, secret, {
      expiresIn: 7*24*60*60
    })
    res.json({
      code: '0000',
      msg: '登录成功',
      data: token
    })

  })
})

// 退出登录
router.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.render('success', {msg: '退出成功', url:'/login'})
  })
})

module.exports = router;
