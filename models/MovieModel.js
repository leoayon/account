
// 引入mongoose
const mongoose = require('mongoose')

// 创建文档结构
const MovieSchema = new mongoose.Schema({
  name: String,
  director: String,
  type: String
})

// 创建模型对象
const MovieModel = mongoose.model('movie', MovieSchema)

// 暴露
module.exports = MovieModel