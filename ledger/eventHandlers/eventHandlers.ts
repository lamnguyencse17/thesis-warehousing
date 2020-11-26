import { ContractEvent } from "fabric-network";
import CreateAssetHandler from "./CreateAssetEvent";

export default async (event: ContractEvent): Promise<void> => {
  const { eventName, chaincodeId } = event;
  let { payload } = event;
  let parsedPayload;
  if (!!payload) {
    parsedPayload = JSON.parse(payload.toString());
  }
  if (eventName === "CreateAsset" && !!payload) {
    CreateAssetHandler(parsedPayload);
  }
  // console.log(chaincodeId);
  // console.log(eventName);
  // console.log(payload?.toString());
};

