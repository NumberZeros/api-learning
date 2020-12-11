const service = require("./services");
const Token = require("../../packages/Token");
const messages = require("../../messages/accounts.messages");

module.exports = {
  // auth
  async login(req, res) {
    try {
      const {
        body: { email, password },
      } = req;
      const dataUser = await service.login({ email, password });
      const token = await Token.GenerateToken({
        _id: dataUser._id,
        email: dataUser.email,
        role: dataUser.role,
      });
      return res.send({
        ...dataUser,
        token,
      });
    } catch (err) {
      return res.status(404).send({
        messages: err,
      });
    }
  },
  async updateInfo(req, res) {
    try {
      const { body } = req;
      const { headers } = req;
      const token = await Token.Authencatetion(headers);
      if (!token) throw { message: messages.NOT_LOGIN };
      const dataUser = await service.updateInfo(body);
      return res.send(dataUser);
    } catch (err) {
      return res.status(404).send({
        messages: err,
      });
    }
  },
  async ressetPassword(req, res) {
    try {
      const {
        body: { email },
      } = req;
      const data = await service.ressetPassword(email);
      return res.send(data);
    } catch (err) {
      return res.status(404).send({
        messages: err,
      });
    }
  },
  async newPassword(req, res) {
    try {
      const {
        body: { code, newPassword },
      } = req;
      const data = await service.newPassword(code, newPassword);
      return res.send(data);
    } catch (err) {
      return res.status(404).send({
        messages: err,
      });
    }
  },
  async findAll(req, res) {
    try {
      const { headers } = req;
      const token = await Token.Authencatetion(headers);
      if (!token) throw { message: messages.NOT_LOGIN };
      const users = await service.findAll({});
      return res.send({
        status: "success",
        body: users && users.length ? users : [],
      });
    } catch (err) {
      return res.status(400).send({
        status: err.message,
      });
    }
  },
  async save(req, res) {
    try {
      const { body, headers } = req;
      const token = await Token.Authencatetion(headers);
      if (!token) throw { message: messages.NOT_LOGIN };
      await service.save(req.body);
      return res.send({
        status: "success",
      });
    } catch (err) {
      return res.status(400).send({
        status: "failure",
      });
    }
  },
};
