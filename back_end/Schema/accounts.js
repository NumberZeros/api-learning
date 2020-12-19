const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AccountsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
  },
  address: {
    type: String,
  },
  birthdate: {
    type: Date,
  },
  gender: {
    type: Number,
    default: 0,
  },
  isDelete: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    enum: ["user", "speaker", "admin"],
    default: "user",
  },
  typeAccount: {
    type: String,
    enum: ["free", "pro"],
    default: "free",
  },
  createAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("Accounts", AccountsSchema);
