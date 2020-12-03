import { gql } from "apollo-server-express";

export default gql`
	type Transaction {
		_id: ID!
		receiver: TransactionUser!
		sender: TransactionUser!
		assets: [TransactionAsset!]!
	}
	type TransactionAsset {
		_id: ID!
		name: String!
		quantity: Int!
		description: String
		unit: Int!
	}
	type TransactionUser {
		_id: ID!
		name: String!
		email: String!
	}
	extend type Query {
		getOneTransaction(_id: ID!): Transaction
	}
	extend type Subscription {
		transactionCreated: Transaction
	}
`;

// Add inside when implement
// extend type Query {}

// extend type Mutation {}
