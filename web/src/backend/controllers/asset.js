import { createAsset, getAssetById, saveNewAsset } from "../services/asset";
import { OK_RESPONSE, HANDLED_ERROR_RESPONSE } from "../constants/http";
import { validateCreateAsset } from "../validators/assetValidator";

import { createAssetRequest } from "../requests/assets";
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
  const { name, quantity, unit, description } = req.body;
  let validateResult = validateCreateAsset({
    name,
    quantity,
    unit,
    description,
  });
  if (!validateResult.status) {
    return res
      .status(HANDLED_ERROR_RESPONSE)
      .json({ message: validateResult.message });
  }
  let newAssetModel = await createAsset({
    name,
    quantity,
    unit,
    description,
  });
  if (newAssetModel.status !== true) {
    return res
      .status(HANDLED_ERROR_RESPONSE)
      .json({ message: "Something went wrong" });
  }
  let ID = result._id;
  let assetRequest = await createAssetRequest({
    ID,
    name,
    quantity,
    unit,
    description,
  });
  if (assetRequest.status !== true) {
    return res
      .status(HANDLED_ERROR_RESPONSE)
      .json({ message: "Something went wrong" });
  }
  const saveNewAsset = await saveNewAsset(newAssetModel.result);
  result = saveNewAsset.result.toObject();
  const asset = { ...result };
  return res.status(OK_RESPONSE).json(asset);
};
