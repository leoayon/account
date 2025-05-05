
module.exports = function (success, error) {
  if(typeof error !== 'function') {
    error = () => {
      console.log('连接出错')
    }
  }
  
  //1. 安装 mongoose
//2. 导入 mongoose
  const mongoose = require('mongoose')
  const {DBHOST, DBPORT, DBNAME} = require('../config/config')

//3. 连接 mongodb 服务                          数据库的名称
  mongoose.connect(`mongodb://${DBHOST}:${DBPORT}/${DBNAME}`)

//4. 设置回调
// 设置连接成功的回调  once 一次   事件回调函数只执行一次
  mongoose.connection.on('open', () => {
    success()
  })

// 设置连接错误的回调
  mongoose.connection.on('error', () => {
    // console.log('连接出错')
    error()
  })

//设置连接关闭的回调
  mongoose.connection.on('close', () => {
    console.log('连接关闭')
  })

//关闭 mongodb 的连接
  /*
  setTimeout(() => {
    mongoose.disconnect()
  }, 2000)*/
}


