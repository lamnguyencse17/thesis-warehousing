import { gql } from "apollo-server-express";

export default gql`
	type User {
		id: ID!
		name: String!
		email: String!
		password: String!
	}
	extend type Query {
		getManyAssetsOfSelf(limit: Int!, offset: Int!): [Asset]!
		getManyTransactionOfSelf(limit: Int!, offset: Int!): [Transaction]!
	}
`;
// Add inside when implement
// extend type Query {}

// extend type Mutation {}
