const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ConstantsSchema = new Schema({
  code: {
    type: String,
    required: true,
  },
  email: {
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

module.exports = mongoose.model("Constants", ConstantsSchema);
