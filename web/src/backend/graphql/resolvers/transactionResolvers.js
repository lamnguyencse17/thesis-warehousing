import { getTransactionById } from "../../services/transaction";
import { UserInputError } from "apollo-server-express";
import pubsub from "../../pubsub";


export default {
	Query: {
		getOneTransaction: async (root, args, context) => {
			const {_id} = args;
			const {status, result} = await getTransactionById(_id);
			if (!status) {
				throw new UserInputError("No Asset Id Found", {
					invalidArgs: "_id",
				});
			}
			return result;
		}
	},
	Subscription: {
		transactionCreated: {
			resolve: (payload, args, context, info) => {
				return payload;
			},
			subscribe: () => {
				return pubsub.asyncIterator("transactionCreated");
			}
		}
	}
};
