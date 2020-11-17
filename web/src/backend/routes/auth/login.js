const express = require("express");
const { logInController } = require("../../controllers/user");
const router = express.Router();

router.post("/", logInController);

module.exports = router;