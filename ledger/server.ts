import express from "express";
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";
import LedgerClient from "./app";
import MqttClient from "./mqtt";
import fs from "fs";

const app: express.Application = express();

fs.rmdirSync("./wallet", { recursive: true });

app.use(morgan("tiny"));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

LedgerClient.initInstance().then(() => {
  LedgerClient.initLedger();
  MqttClient?.initConnection()
});

app.get("/asset/:ID", async (req, res) => {
  const asset = await LedgerClient.queryAsset(req.params.ID);
  return res.status(200).json(asset);
});

app.post("/asset/", async (req, res) => {
  const status = await LedgerClient.createAsset(req.body);
  if (!status) {
    return res.status(400).json({ message: "Asset Create Failed" });
  }
  return res.status(200).json({ message: "Success", ID: req.body.ID });
});

app.post("/transfer", async (req, res) => {
  const { IDs, newOwner } = req.body;
  const IDstrings = JSON.stringify(IDs);
  const status = await LedgerClient.transferAsset(IDstrings, newOwner);
  if (!status) {
    return res.status(400).json({ message: "Asset Create Failed" });
  }
  return res.status(200).json({ message: "Success" });
});

app.use("/", async (req, res) => {
  const transactions = await LedgerClient.queryAll();
  return res.status(200).json(transactions);
});

app.listen(3001, () => {
  console.log("listening on port 3001");
});
