import {
	isValidAssetDescription,
	isValidAssetName,
	isValidMongoId,
	isValidQuantity,
	isValidUnit,
} from "./utils";

export const validateAssetRequest = (request) => {
	return !request.owner === undefined || !request.assets === undefined || !request.assets.length <= 0;
};

export const validateCreateAsset = ({
	description,
	unit,
	name,
	quantity,
}) => {
	let status = true;
	let message = [];
	if (!isValidAssetName(name)) {
		status = false;
		message.push("Invalid name");
	}
	if (description) {
		if (!isValidAssetDescription(description)) {
			status = false;
			message.push("Invalid description");
		}
	}
	if (!isValidQuantity(quantity)) {
		status = false;
		message.push("Invalid quantity");
	}
	if (!isValidUnit(unit)) {
		status = false;
		message.push("Invalid unit");
	}
	return { status, message };
};

export const validateOwner = (owner) => {
	let status = true;
	let message = [];
	if (!isValidMongoId(owner)) {
		status = false;
		message.push("Invalid owner");
	}
	return { status, message };
};
