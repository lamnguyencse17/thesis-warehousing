import { createAsset, getAssetById } from "../services/asset"
import { HANDLED_ERROR_RESPONSE, OK_RESPONSE } from "../constants/http"
import { validateCreateAsset } from "../validators/assetValidator"

import { createAssetRequest } from "../requests/assets"
import { isUserExits } from "../services/user"

export const getAssetController = async (req, res) => {
	const assetId = req.params.assetId
	let { result, status } = await getAssetById(assetId)
	if (!status) {
		return res
			.status(HANDLED_ERROR_RESPONSE)
			.json({ message: "Something went wrong" })
	}
	result = result.toObject()
	const asset = { ...result }
	return res.status(OK_RESPONSE).json(asset)
}

export const createAssetController = async (req, res) => {
	const { name, quantity, unit, description, owner } = req.body
	let validateResult = validateCreateAsset({
		name,
		quantity,
		unit,
		description,
		owner,
	})
	if (!validateResult.status) {
		return res
			.status(HANDLED_ERROR_RESPONSE)
			.json({ message: validateResult.message })
	}
	const validateUserResult = await isUserExits(owner)
	if (!validateUserResult) {
		return res
			.status(HANDLED_ERROR_RESPONSE)
			.json({ message: "User does not exists" })
	}
	let { asset, status } = await createAsset({
		name,
		quantity,
		unit,
		description,
		owner,
	})
	if (!status) {
		return res
			.status(HANDLED_ERROR_RESPONSE)
			.json({ message: "Something went wrong" })
	}

	let ID = asset._id
	if (process.env.MODE != "test" && process.env.NODE_ENV != "test") {
		let assetRequest = await createAssetRequest({
			ID,
			name,
			quantity,
			unit,
			description,
			owner,
		})
		if (!assetRequest.status) {
			return res
				.status(HANDLED_ERROR_RESPONSE)
				.json({ message: "Something went wrong" })
		}
	}
	asset.save()
	asset = asset.toObject()
	return res.status(OK_RESPONSE).json(asset)
}
