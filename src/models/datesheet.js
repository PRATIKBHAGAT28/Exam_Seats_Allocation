const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const datesheetSchema = new Schema({
  exam: {
    type: Schema.Types.ObjectId,
    ref: "Exam",
    required: true,
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  department: {
    type: Schema.Types.ObjectId,
    ref: "Department",
    required: true,
  },
  semester: {
    type: Schema.Types.ObjectId,
    ref: "Semester",
    required: true,
  },
  subject: {
    type: Schema.Types.ObjectId,
    ref: "Subject",
    required: true,
  },
  examDate: {
    type: Date,
    validate: {
      validator: function (value) {
        return value >= new Date();
      },
      message: function () {
        return "exam date cannot be less than today";
      },
    },
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  student: {
    type: Schema.Types.ObjectId,
    ref: "Student",
  },
  room: {
    type: Schema.Types.ObjectId,
    ref: "Room",
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});
const Datesheet = mongoose.model("Datesheet", datesheetSchema);
module.exports = Datesheet;
