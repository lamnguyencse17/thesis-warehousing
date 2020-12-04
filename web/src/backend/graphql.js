const { ApolloServer, ApolloError } = require("apollo-server-express");
import schemas from "./graphql/schemas";
import resolvers from "./graphql/resolvers";
import passport from "passport";

const graphqlServer = new ApolloServer({
	typeDefs: schemas,
	resolvers,
	subscriptions: {
		onConnect: async (connectionParams, webSocket) => {
			console.log("Client Connected");
		},
	},
	context: async ({req}) => {
		console.log(req.cookies);		
	}
});
export default graphqlServer;
