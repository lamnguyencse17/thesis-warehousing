import MqttClient from "../mqtt";
import { IAsset } from "../types/asset";
import convertPayload from "../util/convertPayload";

const CreateAssetHandler = (payload: IAsset) => {
  const assetPayload = convertPayload(payload);
  setTimeout(() => {
    MqttClient.publishAsset(assetPayload).then(() => {
      console.log("Successfully Published");
    }).catch(err => {
      console.log(err);
    });
  }, 5000)
};

export default CreateAssetHandler;