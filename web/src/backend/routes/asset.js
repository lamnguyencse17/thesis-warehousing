import express from "express";

const {
	getAssetController,
	createAssetController,
} = require("../controllers/asset");
const router = express.Router();

router.get("/:assetId", getAssetController);
router.post("/", createAssetController);

module.exports = router;
