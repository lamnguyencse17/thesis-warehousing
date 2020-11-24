import assetModel from "../models/assets";
import mongoose from "mongoose";

export const getAssetById = async (assetId) => {
  const result = await assetModel.findOne({
    _id: mongoose.Types.ObjectId(assetId),
  });
  let status = true;
  if (!result) {
    status = false;
  }
  return { result, status };
};

export const createAsset = async ({ name, quantity, unit, description }) => {
  let asset = await new assetModel({ name, quantity, unit, description });
  return { asset, status: true };
};
