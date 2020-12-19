const express = require("express");
const router = express.Router();
const controler = require("./controller");

const speaker = "speaker";
router.get(`/${speaker}/courses`, controler.findAll);
router.post(`/${speaker}/courses`, controler.save);
router.put(`/${speaker}/courses`, controler.update);
router.delete(`/${speaker}/courses`, controler.delete);

const admin = "admin";
router.get(`/${admin}/courses`, controler.findAll);
router.post(`/${admin}/courses`, controler.validate);
router.delete(`/${admin}/courses`, controler.delete);

module.exports = router;
