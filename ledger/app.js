/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

import { createCipher } from 'crypto';

const { Gateway, Wallets } = require('fabric-network');
const FabricCAServices = require('fabric-ca-client');
const path = require('path');
const { buildCAClient, registerAndEnrollUser, enrollAdmin } = require('./util/CAUtil.js');
const { buildCCPOrg1, buildWallet } = require('./util/AppUtil.js');

const channelName = 'mychannel';
const chaincodeName = 'basic';
const mspOrg1 = 'Org1MSP';
const walletPath = path.join(__dirname, 'wallet');
const org1UserId = 'appUser';

function prettyJSONString(inputString) {
    return JSON.stringify(JSON.parse(inputString), null, 2);
}

class LedgerClient {
    initInstance = async () => {
        try {
            this.ccp = buildCCPOrg1();
            this.caClient = buildCAClient(FabricCAServices, this.ccp, 'ca.org1.example.com');
            this.wallet = await buildWallet(Wallets, walletPath);
            await enrollAdmin(this.caClient, this.wallet, mspOrg1);
            await registerAndEnrollUser(this.caClient, this.wallet, mspOrg1, org1UserId, 'org1.department1');
            this.gateway = new Gateway();
            await this.gateway.connect(this.ccp, {
                wallet: this.wallet,
                identity: org1UserId,
                discovery: { enabled: true, asLocalhost: true }
            });
            this.network = await this.gateway.getNetwork(channelName);
            this.contract = this.network.getContract(chaincodeName);
            console.log(this.network)
        } catch (error) {
            console.error(`******** FAILED to run the application: ${error}`);
        }
    }
    initLedger = async () => {
        try {
            await this.contract.submitTransaction('InitLedger');
        }
        catch(err) {
            console.log(err)
        }
        console.log('*** Result: committed');
    }
    queryAll = async () => {
        console.log('\n--> Evaluate Transaction: GetAllAssets, function returns all the current assets on the ledger');
		let result = await this.contract.evaluateTransaction('GetAllAssets');
		console.log(`*** Result: ${prettyJSONString(result.toString())}`);
    }
}

const instance = new LedgerClient();

export default instance;