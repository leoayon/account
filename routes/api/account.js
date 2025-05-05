const express = require('express');
const moment = require('moment')
const jwt = require('jsonwebtoken')

const AccountModel = require('../../models/AccountModel')
const checkTokenMiddleware = require('../../middlewares/checkTokenMiddleware')

const router = express.Router();


// 获取账单列表
router.get('/account', checkTokenMiddleware, function(req, res, next) {

  console.log(req.user)
  AccountModel.find().sort({account: -1}).exec((err, data) => {
    if(err) {
      res.json({
        code: '1001',
        msg: '读取失败!',
        data: null
      })
      return
    }
    res.json({
      code: '0000',
      msg: '读取成功！',
      data: data
    })
  })

});

// 新增账单
router.post('/account', checkTokenMiddleware, (req, res) => {

  AccountModel.create({
    ...req.body,
    time: moment(req.body.time).toDate()
  }, (err, data) => {
    if(err) {
      res.json({
        code: '1002',
        msg: '创建失败!',
        data: null
      })
      return
    }
    res.json({
      code: '0000',
      msg: '创建成功！',
      data: data
    })
  })

})

// 删除账单
router.delete('/account/:id', checkTokenMiddleware, (req, res) => {

  const {id} = req.params
  AccountModel.deleteOne({_id: id}, (err, data) => {
    if(err) {
      res.json({
        code: '1004',
        msg: '删除失败！',
        data: null
      })
      return
    }
    res.json({
      code: '0000',
      msg: '删除成功！',
      data: {}
    })
  })

})

// 获取单条账单
router.get('/account/:id', checkTokenMiddleware, (req, res) => {

  const {id} = req.params
  AccountModel.findById(id, (err, data) => {
    if(err) {
      return res.json({
        code: '1005',
        msg: '获取失败！',
        data: null
      })
    }
    res.json({
      code: '0000',
      msg: '获取成功！',
      data: data
    })
  })

})

// 更新单个账单信息
router.patch('/account/:id', checkTokenMiddleware, (req, res) => {

  const {id} = req.params
  AccountModel.updateOne({_id: id}, req.body, (err, data) => {
    if(err) {
      return res.json({
        code: '1006',
        msg: '更新失败！',
        data: null
      })
    }
    AccountModel.findById(id, (err, data) => {
      res.json({
        code: '0000',
        msg: '更新成功！',
        data: data
      })
    })


  })


})

module.exports = router;
