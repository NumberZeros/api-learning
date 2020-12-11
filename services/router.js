const express = require("express");
const router = express.Router();

router.use(require("./auth/router"));
router.use(require("./courses/router"));
router.use(require("./lessons/router"));

module.exports = router;
