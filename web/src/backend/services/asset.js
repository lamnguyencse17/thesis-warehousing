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

export const createAsset = async ({
	name,
	quantity,
	unit,
	description,
	owner,
}) => {
	let asset = await new assetModel({
		name,
		quantity,
		unit,
		description,
		owner: mongoose.Types.ObjectId(owner),
	});
	return { asset, status: true };
};

export const syncAsset = async (newAssets) => {
	for (let asset of newAssets) {
		let { _id, name, quantity, unit, description, owner } = asset;
		let syncStatus = await assetModel.exists({
			_id: mongoose.Types.ObjectId(_id),
		});
		if (!syncStatus) {
			try {
				await assetModel.create({
					_id: mongoose.Types.ObjectId(_id),
					name,
					quantity,
					unit,
					description,
					owner: mongoose.Types.ObjectId(owner),
				});
			} catch (err) {
				console.log(err);
			}
		}
	}
};

export const validateTransferRight = async (sender, assets) => {
	let parsedAssets = assets.map(asset => mongoose.Types.ObjectId(asset));
	const validateResult = await assetModel.find({
		_id: { $in: parsedAssets},
		owner: mongoose.Types.ObjectId(sender)
	}).select("_id").lean();
	if (validateResult.length !== assets.length){
		return {status: false, message: "Some assets do not belong to you"};
	}
	return {status: true};
};

export const updateOwner = async (owner, assets) => {
	let parsedAssets = assets.map(asset => mongoose.Types.ObjectId(asset));
	const {n, nModified, ok} = await assetModel.updateMany({
		_id: {$in: parsedAssets},
	}, {owner: mongoose.Types.ObjectId(owner)});
	console.log(n, nModified);
	if (n !== nModified || nModified !== assets.length){
		return false;
	}
	return true;
};