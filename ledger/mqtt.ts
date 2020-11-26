import mqtt, { Client } from "mqtt";
import { ITransaction } from "./types/transaction";
import { IAsset } from "./types/asset";

let client:mqttClient;



class mqttClient {
  private client: Client
  constructor(){
    this.client = mqtt.connect("mqtt://localhost:1883")
  }

  public initConnection = () => {
    this.client.on("connect", () => {
      this.client.subscribe("transactions", (err) => {
        if (err){
          console.log(err)
          return;
        }
        console.log("MQTT Ready!")
      })
    })
  }
  public publishTransaction = (transaction:ITransaction): Promise<void> => {
    return new Promise((resolve, reject) => {
      this.client.publish("transactions", JSON.stringify(transaction), (err) => {
        if (err){
          reject(err)
        }
        resolve()
      })
    })
  }
  public publishAsset = (asset:IAsset): Promise<void> => {
    return new Promise((resolve, reject) => {
      this.client.publish("asset", JSON.stringify(asset), (err) => {
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

