const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RequestSpeakerSchema = new Schema({
  validateByAdmin: {
    type: Schema.Types.ObjectId,
    ref: "Accounts",
  },
  idAccount: {
    type: Schema.Types.ObjectId,
    ref: "Accounts",
  },
  isValidate: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  isDelete: {
    type: Boolean,
    default: false,
  },
  createAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("RequestSpeaker", RequestSpeakerSchema);
