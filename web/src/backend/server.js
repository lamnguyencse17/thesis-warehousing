import mongoose from "mongoose";
import passport from "passport";
import app from "./app";
import graphqlServer from "./graphql";

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

require("./utils/passport")(passport);

graphqlServer.listen({ port: 5000 },() =>
  console.log(
    `Graphql started, listening on port ${graphqlServer.graphqlPath} for incoming requests.`,
  ),
);

app.listen(parseInt(process.env.PORT), () => {
  console.log("Running on 3000 port");
});
