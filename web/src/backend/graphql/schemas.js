import userSchema from "./schemas/user";
import assetSchema from "./schemas/asset";
import transactionSchema from "./schemas/transaction";
import { gql } from "apollo-server-express";

const Schema = gql`
	type Query {
		_: Boolean
	}
	type Mutation {
		_: Boolean
	}
`;

export default [Schema, userSchema, assetSchema, transactionSchema];
