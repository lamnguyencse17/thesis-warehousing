import mongoose from "mongoose";

const Transactions = mongoose.Schema;

export const TransactionsSchema = new Transactions(
	{
		_id: { type: mongoose.Schema.Types.ObjectId, auto: true, required: true },
		receiver: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "Users",
		},
		sender: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "Users",
		},
		assets: [
			{ type: mongoose.Schema.Types.ObjectId, required: true, ref: "Assets" },
		],
	},
	{ _id: false }
);

TransactionsSchema.pre("find", function () {
	this._startTime = Date.now();
});

TransactionsSchema.post("find", function () {
	if (this._startTime != null) {
		console.log("Runtime in MS: ", Date.now() - this._startTime);
	}
});

const transactionModel = mongoose.model("Transactions", TransactionsSchema);
export default transactionModel;
