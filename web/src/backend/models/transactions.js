import mongoose from "mongoose";

const Transactions = mongoose.Schema;

export const TransactionsSchema = new Transactions({
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
});

const transactionModel = mongoose.model("Transactions", TransactionsSchema);
export default transactionModel;
