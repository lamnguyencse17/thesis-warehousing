const { ApolloServer, ApolloError } = require("apollo-server-express");
import schemas from "./graphql/schemas";
import resolvers from "./graphql/resolvers";
import jwt from "jsonwebtoken";

const graphqlServer = new ApolloServer({
	typeDefs: schemas,
	resolvers,
	subscriptions: {
		onConnect: async (connectionParams, webSocket) => {
			console.log("Client Connected");
		},
	},
	context: async ({req}) => {
		const {_id, email} = jwt.verify(req.cookies.token, process.env.SECRET_KEY);
		return {user: {_id, email}};
	}
});
export default graphqlServer;
