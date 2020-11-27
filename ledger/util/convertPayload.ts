import { IAsset } from "../types/asset";
import { IAssetPayload } from "../types/payload";

export default (payload:IAsset): IAssetPayload => {
    let assetPayload = {...payload, _id: payload.ID};
    delete assetPayload.ID;
    return assetPayload
}