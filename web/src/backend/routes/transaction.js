import express from "express";
import {
	createTransactionController,
	getTransactionController,
} from "../controllers/transaction";

const router = express.Router();
router.post("/", createTransactionController);
router.get("/:transactionId", getTransactionController);
module.exports = router;
