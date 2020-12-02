const { ApolloServer } = require("apollo-server-express");
import schemas from "./graphql/schemas";
import resolvers from "./graphql/resolvers";

const graphqlServer = new ApolloServer({
	typeDefs: schemas,
	resolvers,
});
export default graphqlServer;
