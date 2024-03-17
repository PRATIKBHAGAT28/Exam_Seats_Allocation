const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roomSchema = new Schema({
  room: {
    type: String,
    required: true,
    minlength: [3, "minimum 5 length is required"],
    unique: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});
const Room = mongoose.model("Room", roomSchema);
module.exports = Room;
