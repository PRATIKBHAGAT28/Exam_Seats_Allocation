const mongoose = require('mongoose')
const validator = require('validator')
const Schema = mongoose.Schema
const studentSchema = new Schema({
  roll: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    minlength: 3,
  },
  fathers_name: {
    type: String,
    required: true,
    minlength: 3,
  },
  mobile: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 10,
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
        return 'invalid email format'
      },
    },
  },
  address: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 128,
  },
  gender: {
    type: String,
    required: true,
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
  semester: {
    type: Schema.Types.ObjectId,
    ref: 'Semester',
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  parents_mobile: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 10,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
})
const Student = mongoose.model('Student', studentSchema)
module.exports = Student
