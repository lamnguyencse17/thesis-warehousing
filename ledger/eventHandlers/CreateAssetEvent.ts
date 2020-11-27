import MqttClient from "../mqtt";
import { IAsset } from "../types/asset";
import { convertAsset } from "../util/convertPayload";

const CreateAssetHandler = (payload: IAsset) => {
  const assetPayload = convertAsset(payload);
  setTimeout(() => {
    MqttClient.publishAsset(assetPayload).then(() => {
      console.log("Successfully Published");
    }).catch(err => {
      console.log(err);
    });
  }, 4000)
};

export default CreateAssetHandler;