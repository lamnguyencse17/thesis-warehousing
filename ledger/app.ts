/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

"use strict";

import { IAsset } from "./types/asset";
import { Gateway, Wallets } from "fabric-network";
import FabricCAServices from "fabric-ca-client";
import { buildCAClient, enrollAdmin, registerAndEnrollUser } from "./util/CAUtil.js";
import { buildCCPOrg1, buildWallet } from "./util/AppUtil.js";
import path from "path";
import eventHandlers from "./eventHandlers/eventHandlers";


const channelName = "mychannel";
const chaincodeName = "basic";
const mspOrg1 = "Org1MSP";
const walletPath = path.join(__dirname, "wallet");
const org1UserId = "9";


function prettyJSONString(inputString: string) {
  return JSON.stringify(JSON.parse(inputString), null, 2);
}

class LedgerClient {
  ccp: any;
  caClient: any;
  wallet: any;
  gateway: any;
  network: any;
  contract: any;

  initInstance = async () => {
    try {
      this.ccp = buildCCPOrg1();
      this.caClient = buildCAClient(
        FabricCAServices,
        this.ccp,
        "ca.org1.example.com"
      );
      this.wallet = await buildWallet(Wallets, walletPath);
      await enrollAdmin(this.caClient, this.wallet, mspOrg1);
      await registerAndEnrollUser(
        this.caClient,
        this.wallet,
        mspOrg1,
        org1UserId,
        "org1.department1"
      );
      this.gateway = new Gateway();
      await this.gateway.connect(this.ccp, {
        wallet: this.wallet,
        identity: org1UserId,
        discovery: { enabled: true, asLocalhost: true }
      });
      this.network = await this.gateway.getNetwork(channelName);
      this.contract = this.network.getContract(chaincodeName);
      await this.contract.addContractListener(eventHandlers);
    } catch (error) {
      console.error(`******** FAILED to run the application: ${error}`);
    }
  };

  initLedger = async () => {
    try {
      await this.contract.submitTransaction("InitLedger");
    } catch (err) {
      console.log(err);
    }
    console.log("*** Result: committed");
  };

  queryAll = async () => {
    console.log(
      "\n--> Evaluate Transaction: GetAllAssets, function returns all the current assets on the ledger"
    );
    let result = await this.contract.evaluateTransaction("GetAllAssets");
    return JSON.parse(result);
  };

  queryAsset = async (ID: string) => {
    const result = await this.contract.evaluateTransaction("ReadAsset", ID);
    return JSON.parse(result);
  };

  createAsset = async (newAsset: IAsset) => {
    const { ID } = newAsset;
    const newAssetString = JSON.stringify(newAsset);
    try {
      await this.contract.submitTransaction("CreateAsset", newAssetString, ID);
      return true;
    } catch (err) {
      return false;
    }
  };

  transferAsset = async (ID: string, newOwner: string) => {
    try {
      await this.contract.submitTransaction("TransferAsset", ID, newOwner);
      return true;
    } catch (err) {
      return false;
    }
  };
}

const instance = new LedgerClient();

export default instance;
