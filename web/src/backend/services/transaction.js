import mongoose from "mongoose";
import transactionModel from "../models/transactions";

export const createTransaction = async ({ receiver, sender, assets }) => {
	assets = assets.map((asset) => mongoose.Types.ObjectId(asset));
	let result = await new transactionModel({
		receiver: mongoose.Types.ObjectId(receiver),
		sender: mongoose.Types.ObjectId(sender),
		assets,
	});
	return { result, status: true };
};

export const populateTransaction = async (transaction) => {
	return await transaction
		.populate({ path: "sender", select: "name" })
		.populate({ path: "receiver", select: "name" })
		.populate({ path: "assets", select: "name" })
		.lean();
};

export const getTransactionById = async (transactionId) => {
	const result = await transactionModel
		.findOne({ _id: mongoose.Types.ObjectId(transactionId) })
		.populate({ path: "sender", select: "name email" })
		.populate({ path: "receiver", select: "name email" })
		.populate({ path: "assets", select: "name quantity unit description" })
		.lean();
	let status = true;
	if (!result) {
		status = false;
	}
	return { result, status };
};

export const getTransactionOfSender = async (
	sender,
	{ limit, offset },
	populateInfo
) => {
	try {
		const transactions = await transactionModel
			.find({ sender: mongoose.Types.ObjectId(sender) })
			.skip(offset)
			.limit(limit)
			.populate({ path: "sender", select: populateInfo.sender })
			.populate({ path: "receiver", select: populateInfo.receiver })
			.populate({ path: "assets", select: populateInfo.assets })
			.lean();
		return { status: true, transactions };
	} catch (err) {
		return { status: false, message: err };
	}
};

export const getTransactionOfAsset = async ({ _id, limit, offset }) => {
	try {
		const result = await transactionModel
			.find({ assets: { $in: [mongoose.Types.ObjectId(_id)] } })
			.skip(offset)
			.limit(limit)
			.populate("sender", "name email")
			.populate("receiver", "name email")
			.lean();
		return { status: true, result };
	} catch (err) {
		return { status: false, message: err };
	}
};
