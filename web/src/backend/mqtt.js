import mqtt from "mqtt";

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
    client.on("message", (topic, message) => {
        console.log(topic);
        const payload = JSON.parse(message.toString());
        console.log(payload);
    });
};

export default mqttService;