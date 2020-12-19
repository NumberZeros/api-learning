const express = require("express");
const router = express.Router();
const controler = require("./controller");

const user = "user";
router.get(`/${user}/get-my-courses`, controler.findAllMyCourses);
router.post(`/${user}/request-speaker`, controler.requestSpeaker);

module.exports = router;
