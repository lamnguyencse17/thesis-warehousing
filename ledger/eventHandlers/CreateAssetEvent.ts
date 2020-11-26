import MqttClient from "../mqtt";
import { IAsset } from "../types/asset";

const CreateAssetHandler = (payload: IAsset) => {
  MqttClient.publishAsset(payload).then(() => {
    console.log("Successfully Published");
  }).catch(err => {
    console.log(err);
  });
};

export default CreateAssetHandler;