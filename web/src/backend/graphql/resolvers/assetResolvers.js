import { UserInputError } from "apollo-server-express";
import { getAssetById } from "../../services/asset";
import {PubSub} from "graphql-subscriptions";

const pubsub = new PubSub();

export default {
	Query: {
		getOneAsset: async (root, args, context) => {
			const {_id} = args;
			const {status, result} = await getAssetById(_id);
			if (!status){
				throw new UserInputError("No Asset Id Found", {
					invalidArgs: "_id"
				});
			}
			return result;
		}
	},

	Subscription: {
		assetCreated: {
			subscribe: () => pubsub.asyncIterator(["assetCreated"])
		}
	}
	// Mutation: {
	//     // createTransaction: () => {},
	// }
};
