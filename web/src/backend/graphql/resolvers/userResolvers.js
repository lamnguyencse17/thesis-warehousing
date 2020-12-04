import { ApolloError } from "apollo-server-express";
import { getAssetsOfOwner } from "../../services/asset";
import { getTransactionOfSender } from "../../services/transaction";
import {
	parseResolveInfo,
	simplifyParsedResolveInfoFragmentWithType,
} from "graphql-parse-resolve-info";
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
	// Mutation: {
	// createTransaction: () => {},
	// }
};

const parseTransactionQuery = (info) => {
	const parsedResolveInfoFragment = parseResolveInfo(info);
	const rootField = parsedResolveInfoFragment.fieldsByTypeName.Transaction;
	//* This should be changed based on Schema
	let populateInfo = {receiver: "", sender: "", assets: ""};
	Object.keys(rootField).forEach(root => {
		if (root === "_id"){
			return;
		}
		//* targetFields is an unknown field that is based on Schema.
		//* fieldsByTypeName has only 1 key which is the Schema name so just ram in with [0] is good enough
		const key = Object.keys(rootField[root].fieldsByTypeName)[0];
		const targetFields = rootField[root].fieldsByTypeName[key];
		Object.keys(targetFields).forEach(field => {
			if (field === "_id"){
				return;
			}
			//* this weird string format is Mongoose populate string
			if (populateInfo[root].length === 0){
				populateInfo[root] += field;
				return;
			}
			populateInfo[root] += ` ${field}`;
		});
	});
	return populateInfo;
};