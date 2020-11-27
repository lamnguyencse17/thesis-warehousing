import axios from "axios";

export const createTransactionRequest = async ({
	ID,
	IDs,
	newOwner,
	oldOwner,
}) => {
	const url = `${process.env.LEDGER_SERVER}/transfer`;
	try {
		await axios.post(url, { ID, IDs, newOwner, oldOwner });
		return { status: true };
	} catch (err) {
		return {
			status: false,
			errCode: err.response.status,
			message: err.response.data.message,
		};
	}
};
