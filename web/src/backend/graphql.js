const { ApolloServer } = require("apollo-server-express");
import schemas from "./graphql/schemas";
import resolvers from "./graphql/resolvers";

const graphqlServer = new ApolloServer({
	typeDefs: schemas,
	resolvers,
	subscriptions: {
		onConnect: async (connectionParams, webSocket) => {
			console.log("Client Connected");
		},
	},
});
export default graphqlServer;
