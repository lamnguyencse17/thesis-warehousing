import { composeWithMongoose } from "graphql-compose-mongoose";
import mongoose from "mongoose";

const Assets = mongoose.Schema;

export const AssetSchema = new Assets({
  name: {type: String, required: true},
  quantity: {type: Number, required: true},
  unit: {type: Number, required: true},
  description: {type: String}
});

const assetModel = mongoose.model("Assets", AssetSchema);

export default assetModel;
export const assetTC = composeWithMongoose(assetModel);
