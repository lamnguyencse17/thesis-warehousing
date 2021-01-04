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
import { Asset } from "./types/asset";
import { convertStringToAssetArray } from "./util/convertTypes";

@Info({
  title: "AssetTransfer",
  description: "Smart contract for trading assets",
})
export class AssetTransferContract extends Contract {
  @Transaction()
  public async InitLedger(ctx: Context): Promise<void> {
    const assets: Asset[] = [
      {
        ID: "5fb392d6dab9670184275ece",
        name: "Thung tao 1",
        owner: "5fb411df8173b602387d8768",
        quantity: 5,
        unit: 0,
        description: "Initial Value Of Ledger",
      },
      {
        ID: "5fb3973d30f5e20439a8e2b0",
        name: "Thung tao 2",
        owner: "5fb411df8173b602387d8768",
        quantity: 5,
        unit: 0,
        description: "Initial Value Of Ledger",
      },
      {
        ID: "5fb39787e29be70483d63e3f",
        name: "Thung tao 3",
        owner: "5fb411df8173b602387d8768",
        quantity: 5,
        unit: 0,
        description: "Initial Value Of Ledger",
      },
      {
        ID: "5fb39797e29be70483d63e40",
        name: "Thung tao 4",
        owner: "5fb411df8173b602387d8768",
        quantity: 5,
        unit: 0,
        description: "Initial Value Of Ledger",
      },
      {
        ID: "5fb397dc41e16304cf4ee662",
        name: "Thung tao 5",
        owner: "5fb411df8173b602387d8768",
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
  public async CreateAsset(ctx: Context, newAsset: string): Promise<Asset> {
    const convertedAssets = convertStringToAssetArray(newAsset);
    console.log(convertedAssets);
    for (let asset of convertedAssets) {
      try {
        asset.ID = asset._id;
        delete asset._id;
        await ctx.stub.putState(asset._id, Buffer.from(newAsset));
      } catch (err) {
        return err;
      }
    }
    // ctx.stub.setEvent('CreateAsset', Buffer.from(JSON.stringify(convertedAssets)));
    // const newAsset = { ID, name, owner, quantity, unit, description };
    // try {
    //   await ctx.stub.putState(
    //     ID,
    //     Buffer.from(newAsset)
    //   );
    //   ctx.stub.setEvent('CreateAsset', Buffer.from(newAsset));
    // } catch (err) {
    //   return err;
    // }
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
    ctx.stub.setEvent("UpdateAsset", Buffer.from(updatedAsset));
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
    const assetJSON = await ctx.stub.getState(ID);
    ctx.stub.setEvent("DeleteAsset", Buffer.from(assetJSON));
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
    TXID: string,
    IDstrings: string,
    newOwner: string,
    oldOwner: string
  ): Promise<void> {
    try {
      const IDs = JSON.parse(IDstrings);
      for (let ID of IDs) {
        let assetString = await this.ReadAsset(ctx, ID);
        let asset = JSON.parse(assetString);
        asset.owner = newOwner;
        await ctx.stub.putState(ID, Buffer.from(JSON.stringify(asset)));
      }
      const eventInfo = JSON.stringify({
        TXID,
        assets: JSON.parse(IDstrings),
        newOwner,
        oldOwner,
      });
      ctx.stub.setEvent("TransferAsset", Buffer.from(eventInfo));
    } catch (err) {
      return err;
    }
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
  @Transaction(false)
  @Returns("string")
  public async GetHistoryOfAsset(ctx: Context, key: string): Promise<string> {
    const histories = [];
    const promiseOfIterator = ctx.stub.getHistoryForKey(key);
    for await (const keyMod of promiseOfIterator) {
      const resp = {
        timestamp: keyMod.timestamp,
        txid: keyMod.txId,
        data: "",
      };
      if (keyMod.isDelete) {
        resp.data = "KEY DELETED";
      } else {
        resp.data = keyMod.value.toString();
      }
      histories.push(resp);
    }
    return JSON.stringify(histories);
  }
}
