import { INewAsset } from "../types/asset";

export const convertStringToAssetArray = (stringAsset: string) : INewAsset => {
    const newAsset = JSON.parse(stringAsset);
    return newAsset;
}