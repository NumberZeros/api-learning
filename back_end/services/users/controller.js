const service = require("./services");
const Token = require("../../packages/Token");
const messages = require("../../messages/accounts.messages");

module.exports = {
  async requestSpeaker(req, res) {
    try {
      const { headers, body } = req;
      const token = await Token.Authencatetion(headers);
      if (!token) throw { message: messages.NOT_LOGIN };
      else if (token.role !== "user")
        throw { message: messages.REQUEST_SPEAKER_FOR_USER };
      return res.send({
        status: "success",
        data: await service.requestSpeaker({ ...body, idAccount: token._id }),
      });
    } catch (err) {
      return res.status(400).send({
        status: "failure",
        messages: err,
      });
    }
  },
  async findAllMyCourses(req, res) {
    try {
      const { headers, query } = req;
      const token = await Token.Authencatetion(headers);
      if (!token) throw { message: messages.NOT_LOGIN };
      else if (token.role === "user")
        throw { message: messages.NOT_ALLOW_YOUR_ROLE };
      const data = await service.findAllMyCourses(query);
      return res.send({
        status: "success",
        data,
      });
    } catch (err) {
      return res.status(400).send({
        status: "failure",
        messages: err,
      });
    }
  },
};
