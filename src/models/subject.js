const mongoose = require('mongoose')
const Schema = mongoose.Schema

const subjectSchema = new Schema({
  subject_name: {
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
  description: {
    type: String,
    required: true,
    minlength: 10,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
})
const Subject = mongoose.model('Subject', subjectSchema)
module.exports = Subject
