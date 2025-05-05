
const jwt = require('jsonwebtoken')
const {secret} = require('../config/config')

module.exports = (req, res, next) => {

  const token = req.get('token')
  if(!token) {
    return res.json({
      code: '2003',
      msg: 'token缺失',
      data: null
    })
  }
  jwt.verify(token, secret, (err, data) => {
    if(err) {
      return res.json({
        code: '2004',
        msg: 'token 校验失败',
        data: null
      })
    }
    // 把data保存在req.user中,以便于在后续的路由回调中使用， 类似于req.body  req.session
    req.user = data
    next()
  })

}