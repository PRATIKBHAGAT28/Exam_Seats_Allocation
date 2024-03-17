const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const semesterSchema = new Schema({
  semester: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});
const Semester = mongoose.model("Semester", semesterSchema);
module.exports = Semester;
