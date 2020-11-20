import express from "express"
import morgan from "morgan"
import cors from "cors"
import bodyParser from "body-parser"
import LedgerClient from "./app";

const app = express()

app.use(morgan("tiny"))
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
LedgerClient.initInstance().then(()=> {
    LedgerClient.initLedger()
})

app.use("/", (req, res) => {
    LedgerClient.queryAll()
    return res.send("done");
})

app.listen(3001, () => {
    console.log("listening")
})