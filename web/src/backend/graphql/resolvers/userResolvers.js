import { ApolloError } from "apollo-server-express";
import { getAssetsOfOwner } from "../../services/asset";
import { getTransactionOfSender } from "../../services/transaction";
import parseTransactionQuery from "./util/parseTransactionQuery";

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
		getManyTransactionOfSelf: async (
			root,
			{ limit, offset },
			context,
			info
		) => {
			const populateInfo = parseTransactionQuery(info);
			const { status, transactions, message } = await getTransactionOfSender(
				// sender,
				"5fc735570b9d80018ca7620e",
				{
					limit,
					offset,
				},
				populateInfo
			);
			if (!status) {
				throw new ApolloError(message);
			}
			return transactions;
		},
	},
};