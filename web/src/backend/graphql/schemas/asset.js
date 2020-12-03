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

	type Query {
		getOneAsset(_id: ID!): Asset
		getManyAssetsOfSelf(owner: ID!, limit: Int!, offset: Int!): [Asset]!
	}
`;
