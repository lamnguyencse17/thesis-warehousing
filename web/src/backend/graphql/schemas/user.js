import { gql } from "apollo-server-express";

export default gql`
	type User {
		_id: ID!
		name: String!
		email: String!
		password: String!
	}
	extend type Query {
		getManyAssetsOfSelf(limit: Int!, offset: Int!): [Asset]!
		getManyTransactionOfSelf(limit: Int!, offset: Int!): [Transaction]!
	}
`;
