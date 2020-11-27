import mongoose from "mongoose";

const Assets = mongoose.Schema;

export const AssetSchema = new Assets({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true, required: true },
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  unit: { type: Number, required: true },
  description: { type: String }
}, { _id: false });

const assetModel = mongoose.model("Assets", AssetSchema);

export default assetModel;
