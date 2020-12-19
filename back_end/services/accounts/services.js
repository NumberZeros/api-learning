/* eslint-disable no-useless-catch */
require("../../Schema/accounts");
require("../../Schema/requestSpeaker");

const mongoose = require("mongoose");
const Accounts = mongoose.model("Accounts");
const RequestSpeaker = mongoose.model("RequestSpeaker");
const _ = require("lodash");

const messages = require("../../messages/accounts.messages");
const packages = require("../../packages/Common");

module.exports = {
  async findAllSpeaker(query) {
    try {
      if (!_.isEmpty(query)) {
        const {
          limit,
          page,
          nextPage,
          search,
          skip,
        } = packages.DevicePagination(query);
        const data = await Accounts.find({
          isDelete: false,
          role: "speaker",
          // name: { $regex: `${search}`, $options: "i" },
        })
          .limit(limit)
          .skip(skip)
          .exec();
        const alldocs = await Accounts.countDocuments({
          isDelete: false,
          role: "speaker",
        }).exec();
        const totalPage = parseInt(alldocs / limit) + 1;
        return {
          data,
          pagination: {
            limit,
            page,
            nextPage: nextPage === totalPage ? null : nextPage,
            search,
            totalPage,
          },
        };
      } else throw messages.NOT_PAGINATION;
    } catch (err) {
      throw err;
    }
  },
  async save({ name, email, password, phone, address, birthdate, gender }) {
    try {
      const data = await new Accounts({
        name,
        email,
        password,
        phone,
        address,
        birthdate,
        gender,
        role: "speaker",
        typeAccount: "free",
      }).save();
      return {
        data: data,
      };
    } catch (err) {
      const { keyValue } = err;
      if (keyValue.email) throw messages.EMAIL_EXIST;
      throw err;
    }
  },
  async update({ _id, name, email, phone, address, birthdate, gender }) {
    try {
      const data = await Accounts.findOneAndUpdate(
        { _id: _id },
        { name, email, phone, address, birthdate, gender },
        {
          new: true,
          upsert: true,
          rawResult: true,
        }
      ).select([
        "_id",
        "name",
        "email",
        "phone",
        "address",
        "birthdate",
        "gender",
      ]);
      if (!data) throw messages.NOT_FOUND_USER;
      return {
        data: data.value,
      };
    } catch (err) {
      throw err;
    }
  },
  async delete({ _id }) {
    try {
      const data = await Accounts.findOneAndUpdate(
        { _id: _id },
        { isDelete: true },
        {
          new: true,
          upsert: true,
          rawResult: true,
        }
      ).select([
        "_id",
        "name",
        "email",
        "phone",
        "address",
        "birthdate",
        "gender",
      ]);
      if (!data) throw messages.NOT_FOUND_USER;
      return {
        data: data.value,
      };
    } catch (err) {
      throw err;
    }
  },
  async findAllUser(query) {
    try {
      if (!_.isEmpty(query)) {
        const {
          limit,
          page,
          nextPage,
          search,
          skip,
        } = packages.DevicePagination(query);
        const data = await Accounts.find({
          isDelete: false,
          role: "user",
          // name: { $regex: `${search}`, $options: "i" },
        })
          .limit(limit)
          .skip(skip)
          .exec();
        const alldocs = await Accounts.countDocuments({
          isDelete: false,
          role: "user",
        }).exec();
        const totalPage = parseInt(alldocs / limit) + 1;
        return {
          data,
          pagination: {
            limit,
            page,
            nextPage: nextPage === totalPage ? null : nextPage,
            search,
            totalPage,
          },
        };
      } else throw messages.NOT_PAGINATION;
    } catch (err) {
      throw err;
    }
  },
  async banUser({ _id }) {
    try {
      const data = await Accounts.findOneAndUpdate(
        { _id: _id },
        { isDelete: true },
        {
          new: true,
          upsert: true,
          rawResult: true,
        }
      ).select([
        "_id",
        "name",
        "email",
        "phone",
        "address",
        "birthdate",
        "gender",
      ]);
      if (!data) throw messages.NOT_FOUND_USER;
      return {
        data: data.value,
      };
    } catch (err) {
      throw err;
    }
  },
  async saveUser({ name, email, password, phone, address, birthdate, gender }) {
    try {
      const data = await new Accounts({
        name,
        email,
        password,
        phone,
        address,
        birthdate,
        gender,
        role: "user",
        typeAccount: "free",
      }).save();
      return {
        data: data,
      };
    } catch (err) {
      const { keyValue } = err;
      if (keyValue.email) throw messages.EMAIL_EXIST;
      throw err;
    }
  },
  async getAllRequireSpeakers(query) {
    try {
      if (!_.isEmpty(query)) {
        const {
          limit,
          page,
          nextPage,
          search,
          skip,
        } = packages.DevicePagination(query);
        const data = await RequestSpeaker.find({
          isDelete: false,
          isValidate: false,
          // name: { $regex: `${search}`, $options: "i" },
        })
          .limit(limit)
          .skip(skip)
          .exec();
        const alldocs = await RequestSpeaker.countDocuments({
          isDelete: false,
          role: "user",
        }).exec();
        const totalPage = parseInt(alldocs / limit) + 1;
        return {
          data,
          pagination: {
            limit,
            page,
            nextPage: nextPage === totalPage ? null : nextPage,
            search,
            totalPage,
          },
        };
      } else throw messages.NOT_PAGINATION;
    } catch (err) {
      throw err;
    }
  },
  async validateRequestSpeaker({ _id, isValidate }) {
    try {
      const isHave = await RequestSpeaker.findOne({ _id })
        .populate({ path: "idAccount", match: { isDelete: false } })
        .exec();
      console.log(isHave);
      if (_.isEmpty(isHave)) throw messages.NOT_FOUND_REQUEST_SPEAKER;
      else if (!isHave.idAccount) throw messages.ACCOUNT_BLOCK;
      const { idAccount } = isHave;
      const newDataRequest = await RequestSpeaker.findOneAndUpdate(
        { _id },
        { isDelete: true, isValidate: isValidate ? isValidate : false },
        { new: true }
      ).exec();
      if (isValidate)
        await Accounts.findOneAndUpdate(
          { _id: idAccount._id },
          { role: "speaker" },
          { new: true }
        ).exec();

      return newDataRequest;
    } catch (err) {
      throw err;
    }
  },
};
