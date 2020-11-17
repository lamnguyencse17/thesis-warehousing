const express = require("express");
const { getUserController } = require("../controllers/user");
const router = express.Router();

router.get("/", getUserController);

module.exports = router;