import { gql } from "apollo-server-express";

export default gql`
	type Transaction {
		_id: ID!
		receiver: User!
		sender: User!
		assets: [Asset!]!
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
