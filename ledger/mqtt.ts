import mqtt, { Client } from "mqtt";
import { ITransaction } from "./types/transaction";

let client:mqttClient|null;



class mqttClient {
  private client: Client|null
  constructor(){
    this.client = null
  }
  public initConnection = () => {
    this.client = mqtt.connect("mqtt://localhost:1883")
    this.client.on("connect", () => {
      this.client?.subscribe("transactions", (err) => {
        if (err){
          console.log(err)
          return;
        }
        console.log("MQTT Ready!")
      })
    })
  }
  public publishTransaction = (transaction:ITransaction) => {
    this.client?.publish("transactions", JSON.stringify(transaction), (err) => {
      if (err){
        console.log(err)
      }
    })
  }
}

client = new mqttClient()

export default client;

