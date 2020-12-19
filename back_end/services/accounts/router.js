const express = require("express");
const router = express.Router();
const controler = require("./controller");

const admin = "admin";
router.get(`/${admin}/manage-speaker`, controler.findAllSpeaker);
router.post(`/${admin}/manage-speaker`, controler.save);
router.put(`/${admin}/manage-speaker`, controler.update);
router.delete(`/${admin}/manage-speaker`, controler.delete);

router.get(`/${admin}/manage-user`, controler.findAllUser);
router.post(`/${admin}/manage-user`, controler.saveUser);
router.delete(`/${admin}/manage-user`, controler.banUser);

router.get(
  `/${admin}/get-all-require-speaker`,
  controler.getAllRequireSpeakers
);
router.post(
  `/${admin}/validate-request-speaker`,
  controler.validateRequestSpeaker
);

module.exports = router;
