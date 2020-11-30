export interface IAsset {
  docType?: string;
  ID?: string;
  _id?: string;
  name: string;
  owner: string;
  quantity: number;
  unit: number;
  description: string;
}

export interface INewAsset extends Array<IAsset> {}