import mongoose from "mongoose";
import transactionModel from "../models/transactions";

export const createTransaction = async ({ receiver, sender, assets }) => {
  assets = assets.map((asset) => mongoose.Types.ObjectId(asset));
  const result = await transactionModel.create({
    receiver: mongoose.Types.ObjectId(receiver),
    sender: mongoose.Types.ObjectId(sender),
    assets,
  });
  return { result, status: true };
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
