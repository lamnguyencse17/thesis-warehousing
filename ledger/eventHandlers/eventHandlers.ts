import { ContractEvent } from "fabric-network";

export default async (event: ContractEvent): Promise<void> => {
  const { eventName, payload, chaincodeId } = event;
  console.log(chaincodeId);
  console.log(eventName);
  console.log(payload?.toString());
};

