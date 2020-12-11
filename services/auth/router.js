const express = require("express");
const router = express.Router();

const controller = require("./controller");

//authen
const auth = "auth";
router.post(`/${auth}/login`, controller.login);
router.put(`/${auth}/update-info`, controller.updateInfo);
router.post(`/${auth}/reset-password`, controller.ressetPassword);
router.put(`/${auth}/new-password`, controller.newPassword);

// manage user
const users = "users";
router.get(`/${users}`, controller.findAll);
router.post(`/${users}`, controller.save);

module.exports = router;
