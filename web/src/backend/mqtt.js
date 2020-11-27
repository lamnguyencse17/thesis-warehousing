import mqtt from "mqtt";
import { syncAsset } from "./services/asset";

const mqttService = () => {
    const client = mqtt.connect("mqtt://localhost:1883");
    client.on("connect", () => {
        client.subscribe("transactions", (err) => {
            if (err){
                console.log(err);
            }
        });
        client.subscribe("assets", (err) => {
            if (err){
                console.log(err);
            }
        });
        console.log("MQTT Ready");
    });
    client.on("message", async (topic, message) => {
        const payload = JSON.parse(message.toString());
        console.log(payload);
        switch (topic){
            case "assets": {
                await syncAsset(payload);
            }
        }
    });
};

export default mqttService;