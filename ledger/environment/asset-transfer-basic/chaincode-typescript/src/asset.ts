/*
  SPDX-License-Identifier: Apache-2.0
*/

import {Object, Property} from 'fabric-contract-api';

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
// export class Asset {


//     @Property()
//     public ID: string;

//     @Property()
//     public Color: string;

//     @Property()
//     public Size: number;

//     @Property()
//     public Owner: string;

//     @Property()
//     public AppraisedValue: number;
// }


