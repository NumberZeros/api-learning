const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CoursesSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  idSpeaker: {
    type: Schema.Types.ObjectId,
    ref: "Accounts",
  },
  listStudent: [
    {
      type: Schema.Types.ObjectId,
      ref: "Accounts",
    },
  ],
  note: String,
  isValidate: Boolean,
  validateByAdmin: {
    type: Schema.Types.ObjectId,
    ref: "Accounts",
  },
  isDelete: {
    type: Boolean,
    default: false,
  },
  updateAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("Courses", CoursesSchema);
