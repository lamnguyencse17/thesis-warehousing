import axios from "axios"

export const createAssetRequest = async ({
	ID,
	name,
	quantity,
	unit,
	description,
	owner,
}) => {
	const url = `${process.env.LEDGER_SERVER}/asset/`
	try {
		await axios.post(url, {
			ID,
			name,
			quantity,
			unit,
			description,
			owner,
		})
		return { status: true }
	} catch (err) {
		return {
			status: false,
			errCode: err.response.status,
			message: err.response.data.message,
		}
	}
}
