import express from "express"
import morgan from "morgan"
import cors from "cors"
import bodyParser from "body-parser"
import LedgerClient from "./app";
import fs from "fs";

const app: express.Application = express();

fs.rmdirSync("./wallet", { recursive: true });

app.use(morgan("tiny"))
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
LedgerClient.initInstance().then(()=> {
    LedgerClient.initLedger()
})

app.get("/asset/:ID", async (req, res) => {
    const asset = await LedgerClient.queryAsset(req.params.ID)
    return res.json(asset)
})

app.post("/asset/", async (req, res) => {
    const status = await LedgerClient.createAsset(req.body);
    if (!status){
        return res.json({message: "Asset Create Failed"});
    }
    return res.json({message: "Success", ID: req.body.ID});
})

app.post("/transfer", async (req, res) => {
    const status = await LedgerClient.transferAsset(req.body)
    if (!status){
        return res.json({message: "Asset Create Failed"});
    }
    return res.json({message: "Success"});
})

app.use("/", async (req, res) => {
    const transactions = await LedgerClient.queryAll()
    return res.json(transactions);
})

app.listen(3001, () => {
    console.log("listening on port 3001")
})