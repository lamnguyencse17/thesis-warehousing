import mqtt from "mqtt";
import { syncAsset } from "./services/asset";
import { syncTransaction } from "./services/transaction";

const mqttService = () => {
	const client = mqtt.connect("mqtt://localhost:1883");
	client.on("connect", () => {
		client.subscribe("transactions", (err) => {
			if (err) {
				console.error(err);
			}
		});
		client.subscribe("assets", (err) => {
			if (err) {
				console.error(err);
			}
		});
		console.log("MQTT Ready");
	});
	client.on("message", async (topic, message) => {
		const payload = JSON.parse(message.toString());
		console.log(payload);
		switch (topic) {
			case "assets": {
				await syncAsset(payload);
				break;
			}
			case "transactions": {
				await syncTransaction(payload);
				break;
			}
		}
	});
};

export default mqttService;
