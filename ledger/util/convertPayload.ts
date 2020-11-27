import { IAsset } from "../types/asset";
import { IAssetPayload, ITransactionPayload } from "../types/payload";
import { ITransaction } from "../types/transaction";

export const convertAsset =  (payload:IAsset): IAssetPayload => {
    let assetPayload = {...payload, _id: payload.ID};
    delete assetPayload.ID;
    return assetPayload
}

export const convertTransaction = (payload:ITransaction): ITransactionPayload => {
    return payload
}