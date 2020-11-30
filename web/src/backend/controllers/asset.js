import { createAsset, getAssetById } from "../services/asset";
import { HANDLED_ERROR_RESPONSE, OK_RESPONSE } from "../constants/http";
import {validateAssetRequest, validateCreateAsset, validateOwner} from "../validators/assetValidator";

import { createAssetRequest } from "../requests/assets";
import { isUserExits } from "../services/user";

export const getAssetController = async (req, res) => {
	const assetId = req.params.assetId;
	let { result, status } = await getAssetById(assetId);
	if (!status) {
		return res
			.status(HANDLED_ERROR_RESPONSE)
			.json({ message: "Something went wrong" });
	}
	result = result.toObject();
	const asset = { ...result };
	return res.status(OK_RESPONSE).json(asset);
};

export const createAssetController = async (req, res) => {
	const {assets, owner} = req.body;
	if (!validateAssetRequest(req.body)){
		return res.status(HANDLED_ERROR_RESPONSE).json({message: "Invalid Request. Please reference usage again"});
	}
	const validateOwnerResult = validateOwner(owner);
	if (!validateOwnerResult.status){
				return res
			.status(HANDLED_ERROR_RESPONSE)
			.json({ message: validateResult.message });
	}
	// const { name, quantity, unit, description, owner } = req.body;
	let validateResult;
	for (let asset of assets){
		validateResult = validateCreateAsset(asset);
		if (!validateResult.status) {
			return res
				.status(HANDLED_ERROR_RESPONSE)
				.json({ message: validateResult.message });
		}
	}
	const validateUserResult = await isUserExits(owner);
	if (!validateUserResult) {
		return res
			.status(HANDLED_ERROR_RESPONSE)
			.json({ message: "User does not exists" });
	}
	// Handled Till Here
	let newAssets = [];
	for (let asset of assets){
		let createdAsset = await createAsset({...asset, owner});
		if (!createdAsset.status) {
			return res
				.status(HANDLED_ERROR_RESPONSE)
				.json({ message: "Something went wrong" });
		}
		newAssets.push(createdAsset.asset);
		
	}
	// let { asset, status } = await createAsset({
	// 	name,
	// 	quantity,
	// 	unit,
	// 	description,
	// 	owner,
	// });
	// let ID = asset._id;
	if (process.env.MODE != "test" && process.env.NODE_ENV != "test") {
		let assetRequest = await createAssetRequest(newAssets);
		if (!assetRequest.status) {
			return res
				.status(HANDLED_ERROR_RESPONSE)
				.json({ message: "Something went wrong" });
		}
	}
	for (let asset of newAssets){
		asset.save();
		asset = asset.toObject();
	}
	return res.status(OK_RESPONSE).json(newAssets);
};
