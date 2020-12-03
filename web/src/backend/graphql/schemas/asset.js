import { gql } from "apollo-server-express";

export default gql`
	type Asset {
		_id: ID!
		name: String!
		quantity: Int!
		description: String
		owner: ID!
		unit: Int!
	}

	type Subscription {
		assetCreated: Asset
	}

	# type Mutation {
	# 	createOneAsset(name: String, quantity: Int!, description: String, owner: ID!, unit: Int!): Asset
	# }

	type Query {
		getOneAsset(_id: ID!): Asset
	}
`;
