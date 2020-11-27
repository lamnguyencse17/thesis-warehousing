const { ApolloServer } = require("apollo-server-express")
import schemas from "./graphql/schemas"
import resolvers from "./graphql/resolvers"

const graphqlServer = new ApolloServer({
	typeDefs: schemas,
	resolvers,
	subscriptions: {
		onConnect: (connectionParams, webSocket) => {
			console.log(connectionParams)
		},
	},
})
export default graphqlServer
