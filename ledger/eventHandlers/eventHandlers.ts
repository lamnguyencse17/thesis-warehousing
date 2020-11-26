import { ContractEvent } from "fabric-network";
import CreateAssetHandler from "./CreateAssetEvent";
import TransferAssetHandler from "./TransferAssetEvent";
import { CREATE_ASSET_EVENT, TRANSFER_ASSET_EVENT } from "../types/events";

export default async (event: ContractEvent): Promise<void> => {
  const { eventName, chaincodeId } = event;
  let { payload } = event;
  let parsedPayload;
  if (!!payload) {
    parsedPayload = JSON.parse(payload.toString());
  }
  switch(eventName){
    case CREATE_ASSET_EVENT:{
      CreateAssetHandler(parsedPayload);
      break;
    }
    case TRANSFER_ASSET_EVENT:{
      TransferAssetHandler(parsedPayload);
      break;
    }
  }
};

