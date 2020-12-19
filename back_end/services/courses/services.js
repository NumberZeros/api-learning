/* eslint-disable no-useless-catch */
require("../../Schema/courses");

const mongoose = require("mongoose");
const Courses = mongoose.model("Courses");
const packages = require("../../packages/Common");
const messages = require("../../messages/courses.messages");
const _ = require("lodash");
module.exports = {
  async findAll(query) {
    try {
      if (!_.isEmpty(query)) {
        const {
          limit,
          page,
          nextPage,
          search,
          skip,
        } = packages.DevicePagination(query);
        const data = await Courses.find({
          isDelete: false,
          // name: { $regex: `${search}`, $options: "i" },
        })
          .limit(limit)
          .skip(skip)
          .exec();
        const alldocs = await Courses.countDocuments({
          isDelete: false,
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
      } else return await Courses.find({ isDelete: false });
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  async save({ name, description, idSpeaker, note }) {
    try {
      const courses = await new Courses({
        name,
        description,
        idSpeaker,
        note,
      }).save();
      return {
        data: courses,
      };
    } catch (err) {
      throw err;
    }
  },
  async update({ _id, name, description, note }) {
    try {
      const updateAt = new Date();
      const data = await Courses.findOneAndUpdate(
        { _id: _id },
        { name, description, note, updateAt },
        {
          new: true,
          upsert: true,
          rawResult: true,
        }
      ).select(["_id", "name", "description", "note", "updateAt"]);
      if (!data) throw messages.NOT_FOUND_USER;
      return {
        data: data.value,
      };
    } catch (err) {
      throw err;
    }
  },
  async delete({ _id, name, description, note }) {
    try {
      const updateAt = new Date();
      const data = await Courses.findOneAndUpdate(
        { _id: _id },
        { isDelete: true, updateAt },
        {
          new: true,
          upsert: true,
          rawResult: true,
        }
      ).select(["_id", "name", "description", "note", "updateAt", "isDelete"]);
      if (!data) throw messages.NOT_FOUND_USER;
      return {
        data: data.value,
      };
    } catch (err) {
      throw err;
    }
  },
  async validate({ _id, idAdmin, isValidate }) {
    try {
      const updateAt = new Date();
      const data = await Courses.findOneAndUpdate(
        { _id: _id },
        {
          updateAt,
          isValidate,
          validateByAdmin: idAdmin,
        },
        {
          new: true,
          upsert: true,
          rawResult: true,
        }
      ).select([
        "_id",
        "name",
        "description",
        "note",
        "updateAt",
        "isValidate",
        "validateByAdmin",
      ]);
      if (!data) throw messages.NOT_FOUND_USER;
      return {
        data: data.value,
      };
    } catch (err) {
      throw err;
    }
  },
};
