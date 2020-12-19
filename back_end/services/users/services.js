/* eslint-disable no-useless-catch */
require("../../Schema/requestSpeaker");
require("../../Schema/courses");

const mongoose = require("mongoose");
const RequestSpeaker = mongoose.model("RequestSpeaker");
const Courses = mongoose.model("Courses");

const _ = require("lodash");

const packages = require("../../packages/Common");
const messages = require("../../messages/accounts.messages");
module.exports = {
  async requestSpeaker({ idAccount, title, description }) {
    try {
      const isHave = await RequestSpeaker.findOne({ idAccount }).exec();
      if (isHave) throw messages.EXIST_REQUIRE;
      else if (!isHave.isValidate) throw messages.REJECT_REQUIRE;
      else if (isHave.isValidate) throw messages.REQUIRE_IS_VALID;
      else {
        const data = await RequestSpeaker({
          idAccount,
          title,
          description,
        }).save();
        return data;
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
        const data = await Courses.find({ isDelete: false, idSpeaker })
          .limit(limit)
          .skip(skip)
          .populate({
            path: "idCourse",
            match: { isDelete: false, _id: idCourses },
          })
          .where("idCourse")
          .ne(null)
          .exec();
        const alldocs = await Courses.countDocuments({ isDelete: false })
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
          data: await Courses.find({ isDelete: false, idSpeaker })
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
};
