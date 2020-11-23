/*
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Context,
  Contract,
  Info,
  Returns,
  Transaction,
} from "fabric-contract-api";
import { Asset } from "./asset";

@Info({
  title: "AssetTransfer",
  description: "Smart contract for trading assets",
})
export class AssetTransferContract extends Contract {
  @Transaction()
  public async InitLedger(ctx: Context): Promise<void> {
    const assets: Asset[] = [
      {
        ID: "5fba3fae25f941ad09b95b1f",
        name: "Thung tao 1",
        owner: "5fba3fb7bfb9abe89e8b1bb4",
        quantity: 5,
        unit: 0,
        description: "Initial Value Of Ledger",
      },
      {
        ID: "5fba402f29c36bec9acb540d",
        name: "Thung tao 2",
        owner: "5fba3fb7bfb9abe89e8b1bb4",
        quantity: 5,
        unit: 0,
        description: "Initial Value Of Ledger",
      },
      {
        ID: "5fba402a6c1aaa206eb731da",
        name: "Thung tao 3",
        owner: "5fba3fb7bfb9abe89e8b1bb4",
        quantity: 5,
        unit: 0,
        description: "Initial Value Of Ledger",
      },
      {
        ID: "5fba4027a798290b270f2957",
        name: "Thung tao 4",
        owner: "5fba3fb7bfb9abe89e8b1bb4",
        quantity: 5,
        unit: 0,
        description: "Initial Value Of Ledger",
      },
      {
        ID: "5fba4023fd3764cd36761d91",
        name: "Thung tao 5",
        owner: "5fba3fb7bfb9abe89e8b1bb4",
        quantity: 5,
        unit: 0,
        description: "Initial Value Of Ledger",
      },
    ];

    for (const asset of assets) {
      asset.docType = "asset";
      try {
        await ctx.stub.putState(asset.ID, Buffer.from(JSON.stringify(asset)));
      } catch (err) {
        console.log(err);
      }
      console.info(`Asset ${asset.ID} initialized`);
    }
  }

  // CreateAsset issues a new asset to the world state with given details.
  @Transaction()
  public async CreateAsset(ctx: Context, newAsset: Asset): Promise<void> {
    try {
      await ctx.stub.putState(
        newAsset.ID,
        Buffer.from(JSON.stringify(newAsset))
      );
    } catch (err) {
      return err
    }
  }

  // ReadAsset returns the asset stored in the world state with given id.
  @Transaction(false)
  public async ReadAsset(ctx: Context, ID: string): Promise<string> {
    const assetJSON = await ctx.stub.getState(ID); // get the asset from chaincode state
    if (!assetJSON || assetJSON.length === 0) {
      throw new Error(`The asset ${ID} does not exist`);
    }
    return assetJSON.toString();
  }

  // UpdateAsset updates an existing asset in the world state with provided parameters.
  @Transaction()
  public async UpdateAsset(ctx: Context, updatedAsset: Asset): Promise<void> {
    const exists = await this.AssetExists(ctx, updatedAsset.ID);
    if (!exists) {
      throw new Error(`The asset ${updatedAsset.ID} does not exist`);
    }
    // overwriting original asset with new asset
    // const updatedAsset = {
    //     ID: id,
    //     Color: color,
    //     Size: size,
    //     Owner: owner,
    //     AppraisedValue: appraisedValue,
    // };
    return ctx.stub.putState(
      updatedAsset.ID,
      Buffer.from(JSON.stringify(updatedAsset))
    );
  }

  // DeleteAsset deletes an given asset from the world state.
  @Transaction()
  public async DeleteAsset(ctx: Context, ID: string): Promise<void> {
    const exists = await this.AssetExists(ctx, ID);
    if (!exists) {
      throw new Error(`The asset ${ID} does not exist`);
    }
    return ctx.stub.deleteState(ID);
  }

  // AssetExists returns true when asset with given ID exists in world state.
  @Transaction(false)
  @Returns("boolean")
  public async AssetExists(ctx: Context, ID: string): Promise<boolean> {
    const assetJSON = await ctx.stub.getState(ID);
    return assetJSON && assetJSON.length > 0;
  }

  // TransferAsset updates the owner field of asset with given id in the world state.
  @Transaction()
  public async TransferAsset(
    ctx: Context,
    ID: string,
    newOwner: string
  ): Promise<void> {
    const assetString = await this.ReadAsset(ctx, ID);
    const asset = JSON.parse(assetString);
    asset.owner = newOwner;
    await ctx.stub.putState(ID, Buffer.from(JSON.stringify(asset)));
  }

  // GetAllAssets returns all assets found in the world state.
  @Transaction(false)
  @Returns("string")
  public async GetAllAssets(ctx: Context): Promise<string> {
    const allResults = [];
    // range query with empty string for startKey and endKey does an open-ended query of all assets in the chaincode namespace.
    const iterator = await ctx.stub.getStateByRange("", "");
    let result = await iterator.next();
    while (!result.done) {
      const strValue = Buffer.from(result.value.value.toString()).toString(
        "utf8"
      );
      let record;
      try {
        record = JSON.parse(strValue);
      } catch (err) {
        console.log(err);
        record = strValue;
      }
      allResults.push({ Key: result.value.key, Record: record });
      result = await iterator.next();
    }
    return JSON.stringify(allResults);
  }
}
