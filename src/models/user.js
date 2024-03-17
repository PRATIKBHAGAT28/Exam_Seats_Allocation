const mongoose = require('mongoose')
const validator = require('validator')
const Schema = mongoose.Schema
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    minlength: [5, 'minimum 5 length is required'],
    maxlength: [15, 'maximum length is 15'],
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (value) {
        return validator.isEmail(value)
      },
      message: function () {
        return 'Invalid Email Format'
      },
    },
  },
  password: {
    type: String,
    required: true,
    minlength: [8, 'minimum 8 length is required'],
    maxlength: [128, 'maximum length is 128'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
})
const User = mongoose.model('User', userSchema)
module.exports = User
