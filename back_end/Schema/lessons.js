const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LessonsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  note: String,
  link: String,
  idCourse: { type: Schema.Types.ObjectId, ref: "Courses" },
  isDelete: {
    type: Boolean,
    default: false,
  },
  updateAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("Lessons", LessonsSchema);
