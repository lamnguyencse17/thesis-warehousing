import { IAsset, INewAsset } from "../types/asset";
import { IAssetPayloadArray, ITransactionPayload } from "../types/payload";
import { ITransaction } from "../types/transaction";

export const convertAsset =  (payload:INewAsset): IAssetPayloadArray => {
    let assetPayload:IAssetPayloadArray = []
    for (let asset of payload){
        const {name,
            owner,
            quantity,
            unit,
            description,
            ID
        } = asset
        assetPayload.push({name, owner, quantity, unit, description, _id: ID})        
    }
    return assetPayload
}

export const convertTransaction = (payload:ITransaction): ITransactionPayload => {
    let transactionPayload = {assets: payload.assets, receiver: payload.newOwner, _id: payload.ID, sender: payload.oldOwner};
    return transactionPayload
}