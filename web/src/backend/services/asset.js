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
  const result = await new assetModel({ name, quantity, unit, description });
  return { result, status: true };
};

export const saveNewAsset = async (assetModel) => {
  const result = assetModel.save();
  let status = true;
  if (!result) {
    status = false;
  }
  return { result, status };
};
