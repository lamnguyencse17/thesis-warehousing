/*
  SPDX-License-Identifier: Apache-2.0
*/

import { Object, Property } from "fabric-contract-api";

@Object()
export class Asset {
  @Property()
  public docType?: string;

  @Property()
  public ID: string;

  @Property()
  public name: string;

  @Property()
  public owner: string;

  @Property()
  public quantity: number;

  @Property()
  public unit: number;

  @Property()
  public description: string;
}

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

