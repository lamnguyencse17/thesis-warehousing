import { ApolloError } from "apollo-server-express";
import { getAssetsOfOwner } from "../../services/asset";

export default {
	Query: {
		getManyAssetsOfSelf: async (root, { limit, offset }, context) => {
			const owner = context.user._id;
			const { status, assets, message } = await getAssetsOfOwner(owner, {
				limit,
				offset,
			});
			if (!status) {
				throw new ApolloError(message);
			}
			return assets;
		},
		getManyTransactionOfSelf: async (root, { limit, offset }, context) => {
			const owner = context.user._id;
			const { status, assets, message } = await getAssetsOfOwner(owner, {
				limit,
				offset,
			});
			if (!status) {
				throw new ApolloError(message);
			}
			return assets;
		},
	},
	// Mutation: {
	//     // createTransaction: () => {},
	// }
};
