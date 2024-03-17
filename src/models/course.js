const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseSchema = new Schema({
  course_name: {
    type: String,
    required: true,
    minlength: [3, "minimum 5 length is required"],
  },
  description: {
    type: String,
    required: true,
    minlength: [5, "minimum 5 length is required"],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});
const Course = mongoose.model("Course", courseSchema);
module.exports = Course;
