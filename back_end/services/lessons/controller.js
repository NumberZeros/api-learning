const service = require("./services");
const Token = require("../../packages/Token");
const messages = require("../../messages/courses.messages");

module.exports = {
  async findAll(req, res) {
    try {
      const { headers, query } = req;
      const token = await Token.Authencatetion(headers);
      if (!token) throw { message: messages.NOT_LOGIN };
      else if (token.role === "user")
        throw { message: messages.NOT_ALLOW_YOUR_ROLE };
      else if (token.role === "speaker")
        return res.send(
          await service.findAllMyCourses({
            idCourse: query.idCourse,
            idSpeaker: token._id,
            query,
          })
        );
      else return res.send(await service.findAll(query));
    } catch (err) {
      return res.status(400).send({
        status: "failure",
        messages: err,
      });
    }
  },
  async save(req, res) {
    // chi co speaker moi duoc tao
    try {
      const { body, headers } = req;
      const token = await Token.Authencatetion(headers);
      if (!token) throw { message: messages.NOT_LOGIN };
      else if (token.role !== "speaker")
        throw { message: messages.NOT_ALLOW_YOUR_ROLE };
      const data = await service.save(body);
      return res.send(data);
    } catch (err) {
      return res.status(400).send({
        message: err,
      });
    }
  },
  async update(req, res) {
    // chi co speaker moi duoc  sua
    try {
      const { body, headers } = req;
      const token = await Token.Authencatetion(headers);
      if (!token) throw { message: messages.NOT_LOGIN };
      else if (token.role !== "speaker")
        throw { message: messages.NOT_ALLOW_YOUR_ROLE };
      const data = await service.update(body);
      return res.send(data);
    } catch (err) {
      return res.status(400).send({
        status: err,
      });
    }
  },
  async delete(req, res) {
    try {
      const { body, headers } = req;
      const token = await Token.Authencatetion(headers);
      if (!token) throw { message: messages.NOT_LOGIN };
      else if (token.role !== "user")
        throw { message: messages.NOT_ALLOW_YOUR_ROLE };
      const data = await service.delete(body);
      return res.send(data);
    } catch (err) {
      return res.status(400).send({
        status: err,
      });
    }
  },
};
