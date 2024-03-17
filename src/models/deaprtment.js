const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const departmentSchema = new Schema({
  department_name: {
    type: String,
    required: true,
    minlength: [2, "minimum 2 length is required"],
    unique: true,
  },
  incharge_name: {
    type: String,
    required: true,
    minlength: [5, "minimum 5 length is required"],
  },
  description: {
    type: String,
    required: true,
    minlength: [5, "minimum 5 length is required"],
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});
const Department = mongoose.model("Department", departmentSchema);
module.exports = Department;
