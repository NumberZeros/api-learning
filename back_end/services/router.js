const express = require("express");
const router = express.Router();

router.use(require("./auth/router"));
router.use(require("./courses/router"));
router.use(require("./lessons/router"));
router.use(require("./accounts/router"));
router.use(require("./users/router"));

module.exports = router;
