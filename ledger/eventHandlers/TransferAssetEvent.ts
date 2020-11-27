import MqttClient from "../mqtt";
import { ITransaction } from "../types/transaction";
import { convertTransaction } from "../util/convertPayload";

const TransferAssetHandler = (payload: ITransaction) => {
  const transactionPayload = convertTransaction(payload)
  setTimeout(() => {
    MqttClient.publishTransaction(transactionPayload).then(() => {
      console.log("Successfully Published");
    }).catch(err => {
      console.log(err);
    });
  }, 4000)
};

export default TransferAssetHandler;