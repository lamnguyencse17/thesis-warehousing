import mongoose from "mongoose";
import passport from "passport";
import app from "./app";
import graphqlServer from "./graphql";
import { createServer } from "http";

mongoose.connect(process.env.MONGODB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true,
});

require("./utils/passport")(passport);

graphqlServer.applyMiddleware({ app });

const server = createServer(app);
graphqlServer.installSubscriptionHandlers(server);

server.listen({ port: process.env.PORT || 3000 }, () => {
	console.log(
		`Graphql started, listening on port ${graphqlServer.graphqlPath} for incoming requests.`,
		`\nSubscription listening on port ${graphqlServer.subscriptionsPath} for incoming requests.`
	);
});
