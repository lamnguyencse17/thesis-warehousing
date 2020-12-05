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
	},
	{ _id: false }
);

AssetSchema.pre("find", function () {
	this._startTime = Date.now();
});

AssetSchema.post("find", function () {
	if (this._startTime != null) {
		console.log("Runtime in MS: ", Date.now() - this._startTime);
	}
});

const assetModel = mongoose.model("Assets", AssetSchema);

export default assetModel;
