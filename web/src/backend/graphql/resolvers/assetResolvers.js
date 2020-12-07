import { ApolloError, UserInputError } from "apollo-server-express";
import pubsub from "../../pubsub";
import { getAssetById } from "../../services/asset";
import { getTransactionOfAsset } from "../../services/transaction";

export default {
	Query: {
		getOneAsset: async (root, args, context) => {
			const { _id } = args;
			const { status, result } = await getAssetById(_id);
			if (!status) {
				throw new UserInputError("No Asset Id Found", {
					invalidArgs: "_id",
				});
			}
			return result;
		},
		getAssetHistory: async (root, { limit, offset, _id }, context) => {
			let asset = await getAssetById(_id);
			if (!asset.status) {
				throw new UserInputError("No Asset Id Found", {
					invalidArgs: "_id",
				});
			}
			const transactions = await getTransactionOfAsset({ _id, limit, offset });
			if (!transactions.status) {
				throw new ApolloError(transactions.message);
			}
			return { ...asset.result.toJSON(), transactions: transactions.result };
		},
	},
	Subscription: {
		assetCreated: {
			resolve: (payload, args, context, info) => {
				return payload;
			},
			subscribe: () => {
				return pubsub.asyncIterator("assetCreated");
			},
		},
	},
};
