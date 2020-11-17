const express = require("express");
const { registerController } = require("../../controllers/user");
const router = express.Router();

router.post("/", registerController);

module.exports = router;