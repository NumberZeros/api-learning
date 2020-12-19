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
      const data = await service.findAll(query);
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
  async save(req, res) {
    try {
      const { body, headers } = req;
      const token = await Token.Authencatetion(headers);
      if (!token) throw { message: messages.NOT_LOGIN };
      else if (token.role === "user")
        throw { message: messages.NOT_ALLOW_YOUR_ROLE };
      const data = await service.save({ ...body, idSpeaker: token._id });
      return res.send(data);
    } catch (err) {
      return res.status(400).send({
        status: err,
      });
    }
  },
  async update(req, res) {
    try {
      const { body, headers } = req;
      const token = await Token.Authencatetion(headers);
      if (!token) throw { message: messages.NOT_LOGIN };
      else if (token.role === "user")
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
      else if (token.role === "user")
        throw { message: messages.NOT_ALLOW_YOUR_ROLE };
      const data = await service.delete(body);
      return res.send(data);
    } catch (err) {
      return res.status(400).send({
        status: err,
      });
    }
  },
  async validate(req, res) {
    try {
      const { body, headers } = req;
      const token = await Token.Authencatetion(headers);
      if (!token) throw { message: messages.NOT_LOGIN };
      else if (token.role !== "admin")
        throw { message: messages.NOT_ALLOW_YOUR_ROLE };
      const data = await service.validate({ ...body, idAdmin: token._id });
      return res.send(data);
    } catch (err) {
      return res.status(400).send({
        status: err,
      });
    }
  },
};
