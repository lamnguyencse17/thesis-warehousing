import { gql } from "apollo-server-express";

export default gql`
	type Transaction {
		_id: ID!
		receiver: TransactionUser!
		sender: TransactionUser!
		assets: [Asset!]!
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
