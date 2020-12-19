require("dotenv").config();
const port = process.env.PORT_DEV || 9000;
const dbRetryTime = process.env.RETRY_TIME || 2000;
const mongoPort = process.env.MONGO_PORT || 27017;
const mongoUri = `mongodb://${
  process.env.DB_SERVER_NAME || "localhost"
}:${mongoPort}/${process.env.DB_NAME}`;
const sendgirdKey = process.env.SENDGRID_API_KEY;

module.exports = {
  port,
  dbRetryTime,
  mongoUri,
  sendgirdKey,
};
