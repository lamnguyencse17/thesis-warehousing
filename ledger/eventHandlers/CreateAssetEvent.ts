import MqttClient from "../mqtt";
import { IAsset, INewAsset } from "../types/asset";
import { convertAsset } from "../util/convertPayload";

const CreateAssetHandler = (payload: INewAsset) => {
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