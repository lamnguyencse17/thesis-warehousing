import MqttClient from "../mqtt";
import { ITransaction } from "../types/transaction";

const TransferAssetHandler = (payload: ITransaction) => {
  MqttClient.publishTransaction(payload).then(() => {
    console.log("Successfully Published");
  }).catch(err => {
    console.log(err);
  });
};

export default TransferAssetHandler;