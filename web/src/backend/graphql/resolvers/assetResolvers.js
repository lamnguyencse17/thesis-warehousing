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
		getManyAssetsOfSelf: async (root, { limit, offset}, context) => {
			const owner = context.user._id;
			const {status, assets, message} = await getAssetsOfOwner(owner, {limit, offset});
			if (!status) {
				throw new ApolloError(message);
			}  
			return assets;
		}
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
