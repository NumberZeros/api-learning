const express = require("express");
const router = express.Router();
const controler = require("./controller");

const speaker = "speaker";
router.get(`/${speaker}/lessons`, controler.findAll);
router.post(`/${speaker}/lessons`, controler.save);
router.put(`/${speaker}/lessons`, controler.update);
router.delete(`/${speaker}/lessons`, controler.delete);

const admin = "admin";
router.get(`/${admin}/lessons`, controler.findAll);
router.delete(`/${admin}/lessons`, controler.delete);

module.exports = router;
