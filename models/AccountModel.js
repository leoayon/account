
const mongoose = require('mongoose')

const AccountSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  time: {
    type: Date,
    required: true
  },
  type: {
    type: Number,
    default: -1
  },
  account: {
    type: Number,
    required: true
  },
  remarks: {
    type: String
  }
})

const AccountModel = mongoose.model('account', AccountSchema)

module.exports = AccountModel