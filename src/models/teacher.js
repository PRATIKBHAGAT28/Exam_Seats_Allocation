const mongoose = require('mongoose')
const validator = require('validator')
const Schema = mongoose.Schema

const teacherSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
  },
  gender: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  qualification: {
    type: String,
    required: true,
  },
  experience: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return validator.isEmail(value)
      },
      message: function () {
        return 'Invalid Email Format'
      },
    },
  },
  mobile: {
    type: String,
    required: true,
    minlength: [10, 'number should be of 10 digit'],
    maxlength: [10, 'number should be of 10 digit'],
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
  department: {
    type: Schema.Types.ObjectId,
    ref: 'Department',
    required: true,
  },
  subject: {
    type: Schema.Types.ObjectId,
    ref: 'Subject',
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
})
const Teacher = mongoose.model('Teacher', teacherSchema)
module.exports = Teacher
