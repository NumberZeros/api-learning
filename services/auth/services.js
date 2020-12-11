/* eslint-disable no-useless-catch */
require("../../Schema/accounts");

const mongoose = require("mongoose");
const moment = require("moment");

const Accounts = mongoose.model("Accounts");
const Constants = require("../../Schema/constants");
const messages = require("../../messages/accounts.messages");
const common = require("../../packages/Common");

module.exports = {
  //login
  async login({ email, password }) {
    try {
      const data = await Accounts.findOne({ email, password })
        .select([
          "_id",
          "name",
          "email",
          "role",
          "phone",
          "address",
          "birthdate",
          "gender",
          "role",
          "typeAccount",
        ])
        .exec();
      if (!data) throw messages.NOT_FOUND_USER;
      return {
        _id: data._id,
        email: data.email,
        name: data.name,
        role: data.role,
      };
    } catch (err) {
      throw err;
    }
  },
  // update info
  async updateInfo({ name, phone, address, birthdate, gender, _id }) {
    try {
      const data = await Accounts.findOneAndUpdate(
        { _id: _id },
        { name, phone, address, birthdate, gender },
        {
          new: true,
          upsert: true,
          rawResult: true,
        }
      ).select([
        "_id",
        "name",
        "email",
        "role",
        "phone",
        "address",
        "birthdate",
        "gender",
        "role",
        "typeAccount",
      ]);
      if (!data) throw messages.NOT_FOUND_USER;
      console.log(data);
      return data.value;
    } catch (err) {
      throw err;
    }
  },
  async ressetPassword(email) {
    try {
      const dataUser = Accounts.findOne({ email }).exec();
      if (!dataUser) throw `${messages.NOT_FOUND_EMAIL}: ${email}`;
      else if (dataUser.isDelete) throw messages.ACCOUNT_BLOCK;
      else {
        const code = await common.GengerateCode(6);
        const data = await new Constants({
          email,
          code,
        }).save();
        return data;
      }
    } catch (err) {
      throw err;
    }
  },
  async newPassword(code, newPassword) {
    try {
      const now = moment().utc();
      const befor = moment().subtract(10, "minutes").utc();
      const constants = await Constants.findOne({
        code,
        isDelete: false,
        createAt: {
          $gte: befor,
          $lt: now,
        },
      }).exec();
      if (constants) {
        const data = await Accounts.findOneAndUpdate(
          { email: constants.email },
          { password: newPassword },
          { new: true }
        ).exec();
        await Constants.findOneAndUpdate(
          { _id: constants._id },
          { isDelete: true }
        ).exec();
        return data;
      } else throw messages.NOT_VALID_CODE;
    } catch (err) {
      throw err;
    }
  },
  async findAll() {
    return await Accounts.find({});
  },
  async save({ name }) {
    return await new Accounts({ name }).save();
  },
};
