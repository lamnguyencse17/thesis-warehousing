import assetModel from "../models/assets"
import mongoose from "mongoose"

export const getAssetById = async (assetId) => {
	const result = await assetModel.findOne({
		_id: mongoose.Types.ObjectId(assetId),
	})
	let status = true
	if (!result) {
		status = false
	}
	return { result, status }
}

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
	})
	return { asset, status: true }
}

export const syncAsset = async ({
	_id,
	name,
	quantity,
	unit,
	description,
	owner,
}) => {
	let asset = await assetModel.exists({ _id: mongoose.Types.ObjectId(_id) })
	if (!asset) {
		try {
			const newAsset = await assetModel.create({
				_id: mongoose.Types.ObjectId(_id),
				name,
				quantity,
				unit,
				description,
				owner: mongoose.Types.ObjectId(owner),
			})
			return newAsset
		} catch (err) {
			console.log(err)
		}
	}
}
