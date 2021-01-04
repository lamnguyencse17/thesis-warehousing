import mongoose from "mongoose";

const Assets = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

export const AssetSchema = new Assets(
	{
		_id: { type: ObjectId, auto: true, required: true },
		name: { type: String, required: true },
		quantity: { type: Number, required: true },
		unit: { type: Number, required: true },
		description: { type: String },
		owner: { type: ObjectId, ref: "User", required: true },
		createdAt: {
			type: Date,
			default: Date.now(),
		},
	},
	{ _id: false }
);

const assetModel = mongoose.model("Assets", AssetSchema);

export default assetModel;
