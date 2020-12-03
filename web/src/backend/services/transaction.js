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
		.populate({ path: "sender", select: "name" })
		.populate({ path: "receiver", select: "name" })
		.populate({ path: "assets", select: "name" })
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
