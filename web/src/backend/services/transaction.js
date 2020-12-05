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

export const syncTransaction = async ({ _id, receiver, sender, assets }) => {
	let transaction = await transactionModel
		.findOne({ _id: mongoose.Types.ObjectId(_id) })
		.lean();
	if (!transaction) {
		try {
			const newTransaction = await transactionModel.create({
				_id: mongoose.Types.ObjectId(_id),
				receiver,
				sender,
				assets,
			});
			return newTransaction;
		} catch (err) {
			console.log(err);
		}
	}
};

export const getTransactionOfSender = async (sender, { limit, offset }, populateInfo) => {
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
