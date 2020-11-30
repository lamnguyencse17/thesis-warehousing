import { INewAsset } from "../types/asset";

export const convertStringToAssetArray = (stringAsset: string) : INewAsset => {
    return JSON.parse(stringAsset);
}