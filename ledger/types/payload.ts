export interface IAssetPayload {
  _id?: string;
  name: string;
  owner: string;
  quantity: number;
  unit: number;
  description: string;
}
export interface ITransactionPayload {
  assets: string[];
  newOwner: string;
}
