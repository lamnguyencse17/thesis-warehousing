export interface ITransaction {
  ID?: string,
  assets: string[],
  newOwner: string,
  oldOwner: string
}