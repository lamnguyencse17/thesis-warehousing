import { INewAsset } from "../types/asset";
import { convertAsset } from "../util/convertPayload";

const CreateAssetHandler = (payload: INewAsset) => {
  const assetPayload = convertAsset(payload);
};

export default CreateAssetHandler;
