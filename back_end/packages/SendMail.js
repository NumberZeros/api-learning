/* eslint-disable no-useless-catch */
const sgMail = require("@sendgrid/mail");
const config = require("../config");

sgMail.setApiKey(config.sendgirdKey);

module.exports = {
  async Send(to, subject, text, html) {
    try {
      console.log("token sendgrid", config.sendgirdKey);
      const message = {
        from: "no-reply@gmail.com",
        to,
        subject,
        text,
        html,
      };
      await sgMail.send(message);
    } catch (err) {
      throw err;
    }
  },
};
