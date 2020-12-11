const jwt = require("jsonwebtoken");
require("dotenv").config();

async function Authencatetion(data, role) {
  try {
    const { authencation } = data;
    const user = await jwt.verify(
      authencation,
      process.env.ACCESS_TOKEN_SECRET
    );
    return user;
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function GenerateToken(props) {
  try {
    const token = await jwt.sign(
      { ...props },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "12h",
      }
    );
    return token;
  } catch (err) {
    res.sendStatus(403);
  }
}

module.exports = {
  Authencatetion,
  GenerateToken,
};
