import axios from "axios";

export const createAssetRequest = async (newAssets) => {
	const url = `${process.env.LEDGER_SERVER}/asset/`;
	try {
		await axios.post(url, newAssets);
		return { status: true };
	} catch (err) {
		return {
			status: false,
			errCode: err.response.status,
			message: err.response.data.message,
		};
	}
};
