import { createAsset, getAssetById } from "../services/asset";
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

  let { asset, status } = await createAsset({
    name,
    quantity,
    unit,
    description,
  });
  if (!status) {
    return res
      .status(HANDLED_ERROR_RESPONSE)
      .json({ message: "Something went wrong" });
  }

  let ID = asset._id;

  let assetRequest = await createAssetRequest({
    ID,
    name,
    quantity,
    unit,
    description,
  });
  if (!assetRequest.status) {
    return res
      .status(HANDLED_ERROR_RESPONSE)
      .json({ message: "Something went wrong" });
  }
  asset.save();
  asset = asset.toObject();
  return res.status(OK_RESPONSE).json(asset);
};
