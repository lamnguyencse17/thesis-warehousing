import { createTransaction, getTransactionById, populateTransaction } from "../services/transaction";
import { OK_RESPONSE, HANDLED_ERROR_RESPONSE } from "../constants/http";
import { validateCreateTransaction } from "../validators/transactionValidator";
import { createTransactionRequest } from "../requests/transaction";

export const createTransactionController = async (req, res) => {
  const { receiver, sender, assets } = req.body;
  let validateResult = validateCreateTransaction({ receiver, sender, assets });
  if (!validateResult.status) {
    return res
      .status(HANDLED_ERROR_RESPONSE)
      .json({ message: validateResult.message });
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
  if (process.env.MODE != "test") {
    const createTransactionResult = await createTransactionRequest({
      ID: result._id,
      IDs: assets,
      newOwner: receiver,
      oldOwner: sender
    });
    if (!createTransactionResult.status) {
      return res
        .status(HANDLED_ERROR_RESPONSE)
        .json({ message: createTransactionResult.message });
    }
  }
  result.save();
  return res.status(OK_RESPONSE).json(result);
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
