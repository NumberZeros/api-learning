/* eslint-disable no-useless-catch */
require("../../Schema/lessons");

const mongoose = require("mongoose");
const Lessons = mongoose.model("Lessons");
const _ = require("lodash");

const messages = require("../../messages/courses.messages");
const packages = require("../../packages/Common");

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
        const data = await Lessons.find({
          isDelete: false,
          // name: { $regex: `${search}`, $options: "i" },
        })
          .limit(limit)
          .skip(skip)
          .populate({
            path: "idCourse",
            match: { isDelete: false, _id: query.idCourse },
          })
          .where("idCourse")
          .ne(null)
          .exec();
        const alldocs = await Lessons.countDocuments({ isDelete: false })
          .populate({
            path: "idCourse",
            match: { isDelete: false, _id: query.idCourse },
          })
          .where("idCourse")
          .ne(null)
          .exec();
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
      } else {
        return {
          data: await Lessons.find({
            isDelete: false,
          })
            .populate({
              path: "idCourse",
              match: { isDelete: false, _id: query.idCourses },
            })
            .where("idCourse")
            .ne(null),
        };
      }
    } catch (err) {
      throw err;
    }
  },
  async findAllMyCourses({ idCourses, idSpeaker, query }) {
    try {
      if (!_.isEmpty(query)) {
        const {
          limit,
          page,
          nextPage,
          // search,
          skip,
        } = packages.DevicePagination(query);
        const data = await Lessons.find({ isDelete: false, idSpeaker })
          .limit(limit)
          .skip(skip)
          .populate({
            path: "idCourse",
            match: { isDelete: false, _id: idCourses },
          })
          .where("idCourse")
          .ne(null)
          .exec();
        const alldocs = await Lessons.countDocuments({ isDelete: false })
          .populate({
            path: "idCourse",
            match: { isDelete: false, _id: idCourses },
          })
          .where("idCourse")
          .ne(null)
          .exec();
        const totalPage = parseInt(alldocs / limit) + 1;
        return {
          data,
          pagination: {
            limit,
            page,
            nextPage: nextPage === totalPage ? null : nextPage,
            totalPage,
          },
        };
      } else
        return {
          data: await Lessons.find({ isDelete: false, idSpeaker })
            .populate({
              path: "idCourse",
              match: { isDelete: false, _id: idCourses },
            })
            .where("idCourse")
            .ne(null)
            .exec(),
        };
    } catch (err) {
      throw err;
    }
  },
  async save({ name, description, note, link, idCourse }) {
    try {
      const data = await new Lessons({
        name,
        description,
        note,
        link,
        idCourse,
      }).save();
      return {
        data: data,
      };
    } catch (err) {
      throw err;
    }
  },
  async update({ _id, name, description, note, link, idCourse }) {
    try {
      const updateAt = new Date();
      const data = await Lessons.findOneAndUpdate(
        { _id: _id },
        { name, description, note, link, updateAt, idCourse },
        {
          new: true,
          upsert: true,
          rawResult: true,
        }
      ).select(["_id", "name", "description", "note", "link", "updateAt"]);
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
      const updateAt = new Date();
      const data = await Lessons.findOneAndUpdate(
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
};
