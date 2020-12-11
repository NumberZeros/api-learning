/* eslint-disable no-useless-catch */
require("../../Schema/lessons");

const mongoose = require("mongoose");
const Lessons = mongoose.model("Lessons");
const messages = require("../../messages/courses.messages");

module.exports = {
  async findAll(idCourses) {
    const data = await Lessons.find({ isDelete: false })
      .populate({
        path: "idCourse",
        match: { isDelete: false, _id: idCourses },
      })
      .where("idCourse")
      .ne(null)
      .exec();
    return data;
  },
  async findAllMyCourses({ idCourses, idSpeaker }) {
    const data = await Lessons.find({ isDelete: false, idSpeaker })
      .populate({
        path: "idCourse",
        match: { isDelete: false, _id: idCourses },
      })
      .where("idCourse")
      .ne(null)
      .exec();
    return data;
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
