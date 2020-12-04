const {
	ApolloServer,
	ApolloError,
	AuthenticationError,
} = require("apollo-server-express");
import schemas from "./graphql/schemas";
import resolvers from "./graphql/resolvers";
import jwt from "jsonwebtoken";
import { getUserById } from "./services/user";

const verifyUser = async (_id) => {
	const {status} = await getUserById(_id);
	if (!status) {
		throw AuthenticationError("No User Found");
	}
};

const graphqlServer = new ApolloServer({
	typeDefs: schemas,
	resolvers,
	subscriptions: {
		onConnect: async ({ token }, websocket, context) => {
			try {
				const { _id, email } = jwt.verify(token, process.env.SECRET_KEY);
				await verifyUser(_id);
				return { user: { _id, email } };
			} catch (err) {
				throw AuthenticationError(err);
			}
		},
	},
	context: async ({ req }) => {
		const { _id, email } = jwt.verify(
			req.cookies.token,
			process.env.SECRET_KEY
		);
		await verifyUser(_id);
		return { user: { _id, email } };
	},
	introspection: true,
});
export default graphqlServer;
