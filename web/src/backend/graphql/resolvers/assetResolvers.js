import { UserInputError } from "apollo-server-express";
import pubsub from "../../pubsub";
import { getAssetById } from "../../services/asset";

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
	// Mutation: {
	// 	createOneAsset: async (root, args, context) => {
	// 		const {name, quantity, unit, description, owner} = args;
	// 		const {status, asset} = await createAsset({name, quantity, unit, description, owner});
	// 		if (!status){
	// 			throw new UserInputError("No Asset Id Found", {
	// 				invalidArgs: "_id"
	// 			});
	// 		}
	// 		asset.save();
	// 		// pubsub.publish("assetCreated", {assetCreated: asset});
	// 		return asset;
	// 	},
	// }
};
