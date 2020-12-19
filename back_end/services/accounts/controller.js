const service = require("./services");
const Token = require("../../packages/Token");
const messages = require("../../messages/courses.messages");

module.exports = {
  async findAllSpeaker(req, res) {
    try {
      const { headers, query } = req;
      const token = await Token.Authencatetion(headers);
      if (!token) throw { message: messages.NOT_LOGIN };
      else if (token.role !== "admin")
        throw { message: messages.NOT_ALLOW_YOUR_ROLE };
      return res.send({
        status: "success",
        data: await service.findAllSpeaker(query),
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
      else if (token.role !== "admin")
        throw { message: messages.NOT_ALLOW_YOUR_ROLE };
      console.log(body);
      const data = await service.save(body);
      return res.send(data);
    } catch (err) {
      return res.status(400).send({
        message: err,
      });
    }
  },
  async update(req, res) {
    try {
      const { body, headers } = req;
      const token = await Token.Authencatetion(headers);
      if (!token) throw { message: messages.NOT_LOGIN };
      else if (token.role !== "admin")
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
      else if (token.role !== "admin")
        throw { message: messages.NOT_ALLOW_YOUR_ROLE };
      const data = await service.delete(body);
      return res.send(data);
    } catch (err) {
      return res.status(400).send({
        status: err,
      });
    }
  },
  async findAllUser(req, res) {
    try {
      const { headers, query } = req;
      const token = await Token.Authencatetion(headers);
      if (!token) throw { message: messages.NOT_LOGIN };
      else if (token.role !== "admin")
        throw { message: messages.NOT_ALLOW_YOUR_ROLE };
      return res.send({
        status: "success",
        ...(await service.findAllUser(query)),
      });
    } catch (err) {
      return res.status(400).send({
        status: "failure",
        messages: err,
      });
    }
  },
  async saveUser(req, res) {
    try {
      const { body, headers } = req;
      const token = await Token.Authencatetion(headers);
      if (!token) throw { message: messages.NOT_LOGIN };
      else if (token.role !== "admin")
        throw { message: messages.NOT_ALLOW_YOUR_ROLE };
      console.log(body);
      const data = await service.saveUser(body);
      return res.send(data);
    } catch (err) {
      return res.status(400).send({
        message: err,
      });
    }
  },
  async banUser(req, res) {
    // chi co speaker moi duoc  sua
    try {
      const { body, headers } = req;
      const token = await Token.Authencatetion(headers);
      if (!token) throw { message: messages.NOT_LOGIN };
      else if (token.role !== "admin")
        throw { message: messages.NOT_ALLOW_YOUR_ROLE };
      const data = await service.banUser(body);
      return res.send(data);
    } catch (err) {
      return res.status(400).send({
        status: err,
      });
    }
  },
  async getAllRequireSpeakers(req, res) {
    try {
      const { headers, query } = req;
      const token = await Token.Authencatetion(headers);
      if (!token) throw { message: messages.NOT_LOGIN };
      else if (token.role !== "admin")
        throw { message: messages.NOT_ALLOW_YOUR_ROLE };
      return res.send({
        status: "success",
        ...(await service.getAllRequireSpeakers(query)),
      });
    } catch (err) {
      return res.status(400).send({
        status: "failure",
        messages: err,
      });
    }
  },
  async validateRequestSpeaker(req, res) {
    try {
      const { body, headers } = req;
      const token = await Token.Authencatetion(headers);
      if (!token) throw { message: messages.NOT_LOGIN };
      else if (token.role !== "admin")
        throw { message: messages.NOT_ALLOW_YOUR_ROLE };
      console.log(body);
      const data = await service.validateRequestSpeaker(body);
      return res.send(data);
    } catch (err) {
      return res.status(400).send({
        message: err,
      });
    }
  },
};
