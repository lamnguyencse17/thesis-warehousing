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

	type AssetHistory {
		_id: ID!
		name: String!
		quantity: Int!
		description: String
		owner: ID!
		unit: Int!
		transactions: [AssetTransaction]!
	}
	type AssetTransaction {
		_id: ID!
		receiver: TransactionUser!
		sender: TransactionUser!
	}
	type Query {
		getOneAsset(_id: ID!): Asset
		getAssetHistory(_id: ID!, limit: Int!, offset: Int!): AssetHistory
	}
`;
