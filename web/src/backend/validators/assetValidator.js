import {
	isValidAssetDescription,
	isValidAssetName,
	isValidMongoId,
	isValidQuantity,
	isValidUnit,
} from "./utils"

export const validateCreateAsset = ({
	description,
	unit,
	name,
	quantity,
	owner,
}) => {
	let status = true
	let message = []
	if (!isValidAssetName(name)) {
		status = false
		message.push("Invalid name")
	}
	if (!isValidMongoId(owner)) {
		status = false
		message.push("Invalid owner")
	}
	if (description) {
		if (!isValidAssetDescription(description)) {
			status = false
			message.push("Invalid description")
		}
	}
	if (!isValidQuantity(quantity)) {
		status = false
		message.push("Invalid quantity")
	}
	if (!isValidUnit(unit)) {
		status = false
		message.push("Invalid unit")
	}
	return { status, message }
}
