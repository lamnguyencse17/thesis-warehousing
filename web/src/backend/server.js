import mongoose from "mongoose";
import passport from "passport";
import app from "./app";

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
});

require("./utils/passport")(passport);


app.listen(parseInt(process.env.PORT), () => {
    console.log("Running on 3000 port");
});