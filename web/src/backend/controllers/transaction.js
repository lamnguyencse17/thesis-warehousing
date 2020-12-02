import { createTransaction, getTransactionById } from "../services/transaction";
import { HANDLED_ERROR_RESPONSE, OK_RESPONSE } from "../constants/http";
import { validateCreateTransaction } from "../validators/transactionValidator";
import { createTransactionRequest } from "../requests/transaction";
import { updateOwner, validateTransferRight } from "../services/asset";

export const createTransactionController = async (req, res) => {
	const { receiver, assets } = req.body;
	const sender = req._id;
	let validateResult = validateCreateTransaction({ receiver, assets });
	if (!validateResult.status) {
		return res
			.status(HANDLED_ERROR_RESPONSE)
			.json({ message: validateResult.message });
	}
	let validateTransferResult = await validateTransferRight(sender, assets);
	if (!validateTransferResult.status) {
		return res
			.status(HANDLED_ERROR_RESPONSE)
			.json({ message: validateTransferResult.message });
	}
	// this is for CI Test
	let { result, status } = await createTransaction({
		receiver,
		sender,
		assets,
	});
	if (!status) {
		return res
			.status(HANDLED_ERROR_RESPONSE)
			.json({ message: "Something went wrong" });
	}
	if (process.env.MODE != "test" && process.env.NODE_ENV != "test") {
		const createTransactionResult = await createTransactionRequest({
			ID: result._id,
			IDs: assets,
			newOwner: receiver,
			oldOwner: sender,
		});
		if (!createTransactionResult.status) {
			return res
				.status(HANDLED_ERROR_RESPONSE)
				.json({ message: createTransactionResult.message });
		}
	}
	const updateAssetResult = await updateOwner(receiver, assets);
		if (!updateAssetResult){
			return res.status(HANDLED_ERROR_RESPONSE).json({message: "Something went wrong"});
		}
	await result.save(async (err) => {
		if (err) {
			console.log(err);
			return res.status(HANDLED_ERROR_RESPONSE).json({ message: err });
		}
		result
			.populate({ path: "sender", select: "name" })
			.populate({ path: "receiver", select: "name" })
			.populate({ path: "assets", select: "name" })
			.execPopulate()
			.then((transaction) => {
				return res.status(OK_RESPONSE).json(transaction);
			});
	});
};

export const getTransactionController = async (req, res) => {
	const transactionId = req.params.transactionId;
	let { result, status } = await getTransactionById(transactionId);
	if (!status) {
		return res
			.status(HANDLED_ERROR_RESPONSE)
			.json({ message: "Something went wrong" });
	}
	const transaction = { ...result };
	return res.status(OK_RESPONSE).json(transaction);
};
