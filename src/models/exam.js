const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const examSchema = new Schema({
  exam_name: {
    type: String,
    required: true,
  },
  exam_year: {
    type: Date,
    required: true,
  },
  exam_type: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});
const Exam = mongoose.model("Exam", examSchema);
module.exports = Exam;
