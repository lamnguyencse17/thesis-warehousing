import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import compression from "compression";
import cookieParser from "cookie-parser";
import { graphqlHTTP } from 'express-graphql';
import path from "path";
import schema from "./graphql/index";

const app = express();

app.use(morgan("tiny"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(compression());
app.use(express.static("public"));
app.use("/api", require("./routes"));
app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true,
  }));
app.get("*", (req, res) => {
    res.sendFile(path.join(process.cwd() + "/public/index.html"));
});

export default app;