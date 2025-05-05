
const mongoose = require('mongoose')

//5. 创建文档的结构对象
//设置集合中文档的属性以及属性值的类型
const BookSchema = new mongoose.Schema({
  name: String,
  author: String,
  price: Number,
  isHot: Boolean,
  tags: Array,
  pub_time: Date
})
//6. 创建模型对象  对文档操作的封装对象
const BookModel = mongoose.model('book', BookSchema)

module.exports = BookModel