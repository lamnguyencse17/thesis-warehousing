import { createTransaction, getTransactionById } from "../services/transaction";
import { OK_RESPONSE, HANDLED_ERROR_RESPONSE } from "../constants/http";

export const createTransactionController = async (req, res) => {
    const {receiver, sender, assets} = req.body;
    // let validateResult = validateCreateAsset({name, quantity, unit, description});
    // if (!validateResult.status) {
    //   return res
    //     .status(HANDLED_ERROR_RESPONSE)
    //     .json({ message: validateResult.message });
    // }
    let { result, status } = await createTransaction({receiver, sender, assets});
    if (!status) {
      return res
        .status(HANDLED_ERROR_RESPONSE)
        .json({ message: "Something went wrong" });
    }
    result = result.toObject();
    const transaction = {...result};
    return res.status(OK_RESPONSE).json(transaction);
};

export const getTransactionController = async (req, res) => {
    const transactionId = req.params.transactionId;
    let { result, status } = await getTransactionById(transactionId);
    if (!status) {
      return res
        .status(HANDLED_ERROR_RESPONSE)
        .json({ message: "Something went wrong" });
    }
    const transaction = {...result};
    return res.status(OK_RESPONSE).json(transaction);
};