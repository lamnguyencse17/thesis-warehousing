import mqtt, { Client } from "mqtt";
import { ASSET_TOPIC, TRANSACTION_TOPIC } from "./types/topics";
import { IAssetPayloadArray, ITransactionPayload } from "./types/payload";

let client:mqttClient;



class mqttClient {
  private client: Client
  constructor(){
    this.client = mqtt.connect("mqtt://localhost:1883")
  }

  public initConnection = () => {
    this.client.on("connect", () => {
      this.client.subscribe(TRANSACTION_TOPIC, (err) => {
        if (err){
          console.log(err)
          return;
        }
        console.log("MQTT Ready!")
      })
    })
  }
  public publishTransaction = (transaction:ITransactionPayload): Promise<void> => {
    return new Promise((resolve, reject) => {
      this.client.publish(TRANSACTION_TOPIC, JSON.stringify(transaction), (err) => {
        if (err){
          reject(err)
        }
        resolve()
      })
    })
  }
  public publishAsset = (asset:IAssetPayloadArray): Promise<void> => {
    return new Promise((resolve, reject) => {
      this.client.publish(ASSET_TOPIC, JSON.stringify(asset), (err) => {
        if (err){
          reject(err)
        }
        resolve()
      })
    })
  }
}

client = new mqttClient()

export default client;

