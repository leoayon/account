const express = require('express');
const moment = require('moment')

const AccountModel = require('../../models/AccountModel')
const checkLoginMiddleware = require('../../middlewares/checkLoginMiddleware')

const router = express.Router();

// 添加首页路由规则
router.get('/', (req, res) => {
  // 重定向
  res.redirect('/account')
})

// 记账本列表页面
router.get('/account', checkLoginMiddleware, function(req, res, next) {
  // 获取所有的账单信息
  // const accounts = db.get('accounts').value()
  AccountModel.find().sort({account: -1}).exec((err, data) => {
    if(err) {
      res.status(500).send('获取失败')
      return
    }
    res.render('list', {accounts: data, moment})

  })

});

// 添加记录页面
router.get('/account/create', checkLoginMiddleware, (req, res) => {
  res.render('create')
})

// 新增记录
router.post('/account', checkLoginMiddleware, (req, res) => {
  // 获取请求体数据
  // console.log(req.body)
  /*const id = shortid.generate()
  db.get('accounts').unshift({id, ...req.body}).write()*/

  AccountModel.create({
    ...req.body,
    time: moment(req.body.time).toDate()
  }, (err, data) => {
    if(err) {
      res.status(500).send('添加失败')
      return
    }
    res.render('success', {msg: '添加成功啦！', url: '/account'})
  })

})

// 删除记录
router.get('/account/:id', checkLoginMiddleware, (req, res) => {
  /*const {id} = req.params
  db.get('accounts').remove({id}).write()*/
  const {id} = req.params
  AccountModel.deleteOne({_id: id}, (err, data) => {
    if(err) {
      res.status(500).send('删除失败')
      return
    }
    res.render('success', {msg: '删除成功啦！', url: '/account'})
  })


})



module.exports = router;
