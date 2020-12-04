import { ApolloError, UserInputError } from "apollo-server-express";
import pubsub from "../../pubsub";
import { getAssetById, getAssetsOfOwner } from "../../services/asset";

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
